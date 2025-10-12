// Backend: src/api/store/custom/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import Stripe from "stripe"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2024-04-10",
})

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { cart_id } = req.body as { cart_id: string }

  try {
    // 1. Pobierz koszyk używając Query API
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: carts } = await query.graph({
      entity: "cart",
      fields: [
        "id",
        "email",
        "currency_code",
        "total",
        "shipping_total",
        "items.*",
        "items.variant.*",
        "items.variant.product.*",
        "region.*",
      ],
      filters: { id: cart_id },
    })

    const cart = carts?.[0]

    if (!cart) {
      res.status(404).json({ message: "Cart not found" })
      return
    }

    // 2. Przygotuj line items dla Stripe
    const line_items = cart.items.map((item: any) => ({
      price_data: {
        currency: cart.currency_code,
        product_data: {
          name: item.variant?.product?.title || item.title || "Product",
          description: item.variant?.title || "",
        },
        unit_amount: Math.round(item.unit_price),
      },
      quantity: item.quantity,
    }))

    // Dodaj shipping jeśli jest
    if (cart.shipping_total && cart.shipping_total > 0) {
      line_items.push({
        price_data: {
          currency: cart.currency_code,
          product_data: {
            name: "Shipping",
          },
          unit_amount: Math.round(cart.shipping_total),
        },
        quantity: 1,
      })
    }

    // 3. Utwórz sesję Stripe - przekierowanie do endpointu finalizującego
    const successUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/api/checkout/complete?cart_id=${cart_id}&session_id={CHECKOUT_SESSION_ID}`
      : `http://localhost:8000/api/checkout/complete?cart_id=${cart_id}&session_id={CHECKOUT_SESSION_ID}`

    const cancelUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/checkout?step=payment`
      : `http://localhost:8000/checkout?step=payment`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "blik", "p24"],
      line_items,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        cart_id: cart.id,
      },
      customer_email: cart.email,
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error("Stripe session error:", error)
    res.status(500).json({ 
      message: error instanceof Error ? error.message : "Internal server error" 
    })
  }
}