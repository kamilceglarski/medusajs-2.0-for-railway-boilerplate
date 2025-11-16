// Backend: src/api/store/custom/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import Stripe from "stripe"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const stripe = new Stripe(process.env.STRIPE_API_KEY!)

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
        unit_amount: Math.round(item.unit_price * 100),
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
          unit_amount: Math.round(cart.shipping_total * 100),
        },
        quantity: 1,
      })
    }

    // 3. Utwórz sesję Stripe - przekierowanie do endpointu finalizującego
    const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
    const successUrl = `${backendUrl}/checkout/complete?cart_id=${cart_id}&session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = process.env.STOREFRONT_URL
      ? `${process.env.STOREFRONT_URL}/pl/checkout?step=payment`
      : `http://localhost:8000/pl/checkout?step=payment`

    // Determine payment methods to request. Can be overridden via env:
    // STRIPE_PAYMENT_METHODS="card,blik,p24"
    const configuredMethods = process.env.STRIPE_PAYMENT_METHODS
      ? process.env.STRIPE_PAYMENT_METHODS.split(",").map((s) => s.trim())
      : ["card", "blik"]

    let session
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: configuredMethods,
        line_items,
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          cart_id: cart.id,
        },
        customer_email: cart.email,
      })
    } catch (err: any) {
      // If Stripe rejects the provided payment method types (e.g. p24 not enabled),
      // fall back to a safe default and retry with ['card'] to avoid failing the checkout.
      console.warn("Stripe session create failed with methods:", configuredMethods, "error:", err?.message)

      // Retry with card only as a safe fallback
      try {
        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: successUrl,
          cancel_url: cancelUrl,
          metadata: {
            cart_id: cart.id,
          },
          customer_email: cart.email,
        })
        console.info("Stripe session created with fallback payment method: card")
      } catch (err2: any) {
        // if retry fails, rethrow so outer catch handles it
        console.error("Stripe session retry with 'card' failed:", err2)
        throw err2
      }
    }

    res.json({ url: session.url })
  } catch (error) {
    console.error("Stripe session error:", error)
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error"
    })
  }
}