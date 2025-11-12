import "server-only"
import { sdk } from "@lib/config"
import { getAuthHeaders } from "@lib/data/cookies"
import { revalidateTag } from "next/cache"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Basic validation: require phone number
        if (!body.phone || String(body.phone).trim() === "") {
            return new Response(JSON.stringify({ error: "Numer telefonu jest wymagany" }), { status: 400 })
        }

        // Build address object from incoming JSON
        const address = {
            first_name: body.first_name || undefined,
            last_name: body.last_name || undefined,
            company: body.company || undefined,
            address_1: body.address_1 || undefined,
            address_2: body.address_2 || undefined,
            postal_code: body.postal_code || undefined,
            city: body.city || undefined,
            province: body.province || undefined,
            country_code: body.country_code || undefined,
            phone: body.phone || undefined,
        }

        // Retrieve current customer using cookie-based auth headers
        const custResp = await sdk.store.customer.retrieve({}, { next: { tags: ["customer"] }, ...getAuthHeaders() })
        const customer = custResp?.customer

        if (!customer) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 })
        }

        // Use the SDK's createAddress store route to add an address for the
        // currently authenticated customer. This avoids sending an `addresses`
        // field to the generic update route which may reject it.
        const createResp = await sdk.store.customer.createAddress(address, {}, getAuthHeaders())
        const updated = createResp

        // Revalidate customer cache tag so UI sees fresh addresses
        try {
            revalidateTag("customer")
        } catch (_) {
            // ignore if revalidation not available in environment
        }

        return new Response(JSON.stringify({ customer: updated?.customer || null }), { status: 200 })
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error?.message || String(error) }), { status: 500 })
    }
}
