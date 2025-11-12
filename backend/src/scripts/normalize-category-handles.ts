import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import slugify from "slugify"

export default async function normalizeCategoryHandles({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    logger.info("Normalizing product category handles (listing only)...")

    // Use the Query API to list product categories in a reliable way
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    try {
        const { data } = await query.graph({
            entity: "product_category",
            fields: ["id", "name", "handle"],
            // no filters to fetch all
        })

        const categories = Array.isArray(data) ? data : []

        logger.info(`Found ${categories.length} categories.`)

        // Show mapping suggestions (do not modify DB automatically here)
        for (const c of categories) {
            const desiredHandle = slugify((c.name as string) || "", { lower: true, strict: true })
            if (!desiredHandle) continue
            if ((c.handle || "") !== desiredHandle) {
                logger.info(`Category '${c.name}': current='${c.handle}', suggested='${desiredHandle}'`)
            }
        }

        logger.info("Normalization check complete. To actually update handles, run a safer admin-side migration or enable updates in this script.")
    } catch (err: any) {
        logger.error("Failed to fetch categories via query.graph: " + (err?.message || err))
    }
}
