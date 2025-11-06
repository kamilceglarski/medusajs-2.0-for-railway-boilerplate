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

        const personalizowane = await categoryModuleService.create({
            name: "Produkty Personalizowane",
            handle: "produkty-personalizowane",
            description: "Produkty z grawerowaniem i personalizacją",
            is_active: true,
        })

        logger.info("✅ Utworzono kategorie główne")

        // 2. Dodaj podkategorie do "Boże Narodzenie"
        await categoryModuleService.create({
            name: "Ozdoby choinkowe",
            handle: "ozdoby-choinkowe",
            description: "Piękne ozdoby na choinkę",
            parent_category_id: bozeNarodzenie.id,
            is_active: true,
        })

        await categoryModuleService.create({
            name: "Dekoracje stołu",
            handle: "dekoracje-stolu",
            description: "Świąteczne dekoracje na stół",
            parent_category_id: bozeNarodzenie.id,
            is_active: true,
        })

        await categoryModuleService.create({
            name: "Bombki personalizowane",
            handle: "bombki-personalizowane",
            description: "Bombki z grawerowaniem",
            parent_category_id: bozeNarodzenie.id,
            is_active: true,
        })

        logger.info("✅ Dodano podkategorie do 'Boże Narodzenie'")

        // 3. Dodaj podkategorie do "Urodziny"
        await categoryModuleService.create({
            name: "Dekoracje urodzinowe",
            handle: "dekoracje-urodzinowe",
            description: "Dekoracje na przyjęcia urodzinowe",
            parent_category_id: urodziny.id,
            is_active: true,
        })

        await categoryModuleService.create({
            name: "Napisy urodzinowe",
            handle: "napisy-urodzinowe",
            description: "Grawerowane napisy urodzinowe",
            parent_category_id: urodziny.id,
            is_active: true,
        })

        logger.info("✅ Dodano podkategorie do 'Urodziny'")

        // 4. Dodaj podkategorie do "Produkty Personalizowane"
        await categoryModuleService.create({
            name: "Tabliczki z nazwiskami",
            handle: "tabliczki-z-nazwiskami",
            description: "Personalizowane tabliczki",
            parent_category_id: personalizowane.id,
            is_active: true,
        })

        await categoryModuleService.create({
            name: "Grawerowane pudełka",
            handle: "grawerowane-pudelka",
            description: "Pudełka drewniane z grawerowaniem",
            parent_category_id: personalizowane.id,
            is_active: true,
        })

        logger.info("✅ Dodano podkategorie do 'Produkty Personalizowane'")

        logger.info("🎉 Wszystkie kategorie i podkategorie zostały utworzone!")

    } catch (error) {
        logger.error("❌ Błąd podczas tworzenia kategorii:", error)
        throw error
    }
}
