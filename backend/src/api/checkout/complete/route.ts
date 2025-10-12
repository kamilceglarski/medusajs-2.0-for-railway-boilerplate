// backend/src/api/checkout/complete/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { cart_id, session_id } = req.query

  if (!cart_id || typeof cart_id !== "string") {
    const redirectUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/checkout?step=payment&error=no_cart_id`
      : "http://localhost:8000/checkout?step=payment&error=no_cart_id"
    
    return res.redirect(redirectUrl)
  }

  try {
    // Opcjonalnie: Zweryfikuj sesję Stripe
    if (session_id && typeof session_id === "string") {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
      const session = await stripe.checkout.sessions.retrieve(session_id)
      
      if (session.payment_status !== "paid") {
        throw new Error("Payment not completed")
      }
    }

    // Pobierz query z kontenera
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    // Pobierz koszyk
    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "region_id"],
      filters: { id: cart_id },
    })

    const cart = carts?.[0]

    if (!cart) {
      throw new Error("Cart not found")
    }

    // Finalizuj zamówienie używając workflow
    const { completeCartWorkflow } = await import(
      "@medusajs/medusa/core-flows"
    )

    const { result } = await completeCartWorkflow(req.scope).run({
      input: { id: cart_id },
    })

    const order = result

    if (!order || !order.id) {
      throw new Error("Order creation failed")
    }

    // Przekieruj do strony potwierdzenia
    const locale = "pl" // lub pobierz z cart.region
    const redirectUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/${locale}/order/confirmed/${order.id}`
      : `http://localhost:8000/${locale}/order/confirmed/${order.id}`
    
    return res.redirect(redirectUrl)

  } catch (error) {
    console.error("Error completing checkout:", error)
    
    const redirectUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/checkout?step=payment&error=payment_failed`
      : "http://localhost:8000/checkout?step=payment&error=payment_failed"
    
    return res.redirect(redirectUrl)
  }
}