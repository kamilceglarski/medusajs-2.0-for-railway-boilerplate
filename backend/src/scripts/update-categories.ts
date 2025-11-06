import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
    updateProductCategoriesWorkflow,
    createProductCategoriesWorkflow
} from "@medusajs/medusa/core-flows"

// ========================================
// KONFIGURACJA HIERARCHII KATEGORII
// ========================================
// Dodaj tutaj relacje: "Kategoria rodzica" -> ["Podkategoria 1", "Podkategoria 2", ...]
const CATEGORY_HIERARCHY: Record<string, string[]> = {
    "Urodziny": ["Toppery", "Dekoracje urodzinowe", "Zaproszenia", "Walentynki"],
    "Ślub": ["Tabliczki ślubne", "Księgi gości", "Winietki"],
    // Dodaj więcej relacji tutaj...
}

export default async function updateCategories({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    logger.info("Aktualizacja hierarchii kategorii...")
    logger.info(`Znaleziono ${Object.keys(CATEGORY_HIERARCHY).length} kategorii głównych do przetworzenia`)

    try {
        // Iteruj przez wszystkie kategorie główne
        for (const [parentName, childrenNames] of Object.entries(CATEGORY_HIERARCHY)) {
            logger.info(`\n--- Przetwarzanie: ${parentName} ---`)

            // Pobierz lub utwórz kategorię główną
            let parentId = await getOrCreateCategory(container, query, logger, parentName)

            // Dla każdej podkategorii
            for (const childName of childrenNames) {
                try {
                    // Pobierz podkategorię
                    const { data: childCategories } = await query.graph({
                        entity: "product_category",
                        fields: ["id", "name", "handle", "parent_category_id"],
                        filters: { name: childName },
                    })

                    if (!childCategories || childCategories.length === 0) {
                        // Utwórz podkategorię jeśli nie istnieje
                        logger.info(`  ⚠️  Podkategoria '${childName}' nie istnieje. Tworzę...`)

                        const { result } = await createProductCategoriesWorkflow(container).run({
                            input: {
                                product_categories: [
                                    {
                                        name: childName,
                                        handle: childName.toLowerCase().replace(/\s+/g, "-"),
                                        is_active: true,
                                        parent_category_id: parentId,
                                    },
                                ],
                            },
                        })

                        logger.info(`  ✅ Utworzono '${childName}' jako podkategorię '${parentName}'`)
                    } else {
                        const childId = childCategories[0].id
                        const currentParentId = childCategories[0].parent_category_id

                        // Sprawdź czy podkategoria ma już prawidłowego rodzica
                        if (currentParentId === parentId) {
                            logger.info(`  ✓  '${childName}' już jest podkategorią '${parentName}'`)
                        } else {
                            // Zaktualizuj parent_category_id
                            await updateProductCategoriesWorkflow(container).run({
                                input: {
                                    selector: { id: childId },
                                    update: { parent_category_id: parentId },
                                },
                            })

                            logger.info(`  ✅ Ustawiono '${childName}' jako podkategorię '${parentName}'`)
                        }
                    }
                } catch (childError) {
                    logger.error(`  ❌ Błąd przy przetwarzaniu '${childName}':`, childError)
                }
            }
        }

        logger.info("\n✅ Zakończono aktualizację hierarchii kategorii!")
    } catch (error) {
        logger.error("❌ Błąd podczas aktualizacji kategorii:", error)
        throw error
    }
}

// Funkcja pomocnicza: pobierz lub utwórz kategorię
async function getOrCreateCategory(
    container: any,
    query: any,
    logger: any,
    categoryName: string
): Promise<string> {
    const { data: categories } = await query.graph({
        entity: "product_category",
        fields: ["id", "name", "handle"],
        filters: { name: categoryName },
    })

    if (!categories || categories.length === 0) {
        logger.info(`  ⚠️  Kategoria główna '${categoryName}' nie istnieje. Tworzę...`)

        const { result } = await createProductCategoriesWorkflow(container).run({
            input: {
                product_categories: [
                    {
                        name: categoryName,
                        handle: categoryName.toLowerCase().replace(/\s+/g, "-"),
                        is_active: true,
                    },
                ],
            },
        })

        logger.info(`  ✅ Utworzono kategorię główną '${categoryName}'`)
        return result[0].id
    }

    logger.info(`  ✓  Znaleziono kategorię główną '${categoryName}'`)
    return categories[0].id
}