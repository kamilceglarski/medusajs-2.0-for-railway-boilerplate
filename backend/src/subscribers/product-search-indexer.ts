import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function productSearchIndexer({
    event,
    container,
}: SubscriberArgs<any>) {
    const logger = container.resolve("logger")

    try {
        // Sprawdź czy MeiliSearch jest dostępny
        if (!process.env.MEILISEARCH_HOST || !process.env.MEILISEARCH_ADMIN_KEY) {
            logger.info("MeiliSearch not configured, skipping indexing")
            return
        }

        const { MeiliSearch } = await import('meilisearch')

        const client = new MeiliSearch({
            host: process.env.MEILISEARCH_HOST,
            apiKey: process.env.MEILISEARCH_ADMIN_KEY
        })

        const productModule = container.resolve(Modules.PRODUCT)

        // Pobierz ID produktu z eventu
        const productId = event.data?.id

        if (!productId) {
            logger.warn("No product ID in event")
            return
        }

        // Pobierz produkt z bazy
        const product = await productModule.retrieveProduct(productId)

        if (!product) {
            logger.warn(`Product ${productId} not found`)
            return
        }

        // Przygotuj dokument do indeksacji
        const document = {
            id: product.id,
            title: product.title,
            description: product.description,
            handle: product.handle,
            thumbnail: product.thumbnail,
            variant_sku: product.variants?.map(v => v.sku).filter(Boolean).join(' '),
            status: product.status,
        }

        // Dodaj do MeiliSearch
        const index = client.index('products')
        await index.addDocuments([document], { primaryKey: 'id' })

        logger.info(`Product ${product.id} indexed in MeiliSearch`)
    } catch (error: any) {
        logger.error(`Error indexing product: ${error.message}`)
    }
}

export const config: SubscriberConfig = {
    event: [
        "product.created",
        "product.updated",
        "product.deleted",
    ],
}

// Subscriber dla usuwania produktów
export async function productSearchDeleter({
    event,
    container,
}: SubscriberArgs<any>) {
    const logger = container.resolve("logger")

    try {
        if (!process.env.MEILISEARCH_HOST || !process.env.MEILISEARCH_ADMIN_KEY) {
            return
        }

        const { MeiliSearch } = await import('meilisearch')

        const client = new MeiliSearch({
            host: process.env.MEILISEARCH_HOST,
            apiKey: process.env.MEILISEARCH_ADMIN_KEY
        })

        const productId = event.data?.id

        if (!productId) {
            return
        }

        // Usuń z MeiliSearch
        const index = client.index('products')
        await index.deleteDocument(productId)

        logger.info(`Product ${productId} removed from MeiliSearch`)
    } catch (error: any) {
        logger.error(`Error removing product from search: ${error.message}`)
    }
}

export const deleteConfig: SubscriberConfig = {
    event: "product.deleted",
}

