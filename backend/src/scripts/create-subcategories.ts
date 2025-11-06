/**
 * Skrypt do tworzenia kategorii i podkategorii
 * Uruchom: npx medusa exec ./src/scripts/create-subcategories.ts
 */

export default async function createSubcategories({
    container,
}: any) {
    const logger = container.resolve("logger")
    const categoryModuleService = container.resolve("productCategoryService")

    try {
        // 1. Utwórz kategorie główne
        const bozeNarodzenie = await categoryModuleService.create({
            name: "Boże Narodzenie",
            handle: "boze-narodzenie",
            description: "Świąteczne dekoracje i ozdoby",
            is_active: true,
        })

        const urodziny = await categoryModuleService.create({
            name: "Urodziny",
            handle: "urodziny",
            description: "Dekoracje urodzinowe",
            is_active: true,
        })

        const walentynki = await categoryModuleService.create({
            name: "Walentynki",
            handle: "walentynki",
            description: "Romantyczne dekoracje i prezenty",
            is_active: true,
        })

        logger.info("✅ Utworzono kategorie główne")

        // 2. Dodaj podkategorię "Toppery" do "Urodziny"
        await categoryModuleService.create({
            name: "Toppery",
            handle: "toppery",
            description: "Toppery na tort urodzinowy",
            parent_category_id: urodziny.id,
            is_active: true,
        })

        logger.info("✅ Dodano podkategorię 'Toppery' do 'Urodziny'")

        logger.info("🎉 Wszystkie kategorie zostały utworzone!")

    } catch (error) {
        logger.error("❌ Błąd podczas tworzenia kategorii:", error)
        throw error
    }
}
