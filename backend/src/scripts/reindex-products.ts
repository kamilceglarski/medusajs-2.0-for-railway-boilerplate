import { Modules } from "@medusajs/framework/utils"

export default async function reindexProducts({ container }) {
    const logger = container.resolve("logger")

    try {
        logger.info("Starting product reindexing...")

        // Sprawdź konfigurację MeiliSearch
        if (!process.env.MEILISEARCH_HOST || !process.env.MEILISEARCH_ADMIN_KEY) {
            logger.error("MeiliSearch not configured. Set MEILISEARCH_HOST and MEILISEARCH_ADMIN_KEY")
            return
        }

        const { MeiliSearch } = await import('meilisearch')

        const client = new MeiliSearch({
            host: process.env.MEILISEARCH_HOST,
            apiKey: process.env.MEILISEARCH_ADMIN_KEY
        })

        const productModule = container.resolve(Modules.PRODUCT)

        // Pobierz wszystkie produkty
        logger.info("Fetching all products...")
        const result = await productModule.listProducts({}, {
            relations: ["variants", "images"]
        })

        const products = Array.isArray(result) ? result : (result?.products || [])
        logger.info(`Found ${products.length} products`)

        // Przygotuj dokumenty do indeksacji
        const documents = products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            handle: product.handle,
            thumbnail: product.thumbnail,
            variant_sku: product.variants?.map(v => v.sku).filter(Boolean).join(' ') || '',
            status: product.status,
        }))

        // Dodaj wszystkie produkty do MeiliSearch
        const index = client.index('products')

        logger.info("Indexing products in MeiliSearch...")
        await index.addDocuments(documents, { primaryKey: 'id' })

        logger.info("✅ Product reindexing completed successfully!")
        logger.info(`Total ${documents.length} products sent to MeiliSearch for indexing`)

        // Pokaż statystyki indeksu
        const stats = await index.getStats()
        logger.info(`Index stats: ${stats.numberOfDocuments} documents indexed`)

    } catch (error: any) {
        logger.error(`Error reindexing products: ${error.message}`)
        throw error
    }
}

