// backend/src/api/checkout/complete/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  console.log("=== CHECKOUT COMPLETE CALLED ===")
  
  const { cart_id, session_id } = req.query

  console.log("Cart ID:", cart_id)
  console.log("Session ID:", session_id)

  if (!cart_id || typeof cart_id !== "string") {
    const redirectUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/checkout?step=payment&error=no_cart_id`
      : "http://localhost:8000/checkout?step=payment&error=no_cart_id"
    
    return res.redirect(redirectUrl)
  }

  const publishableKey = process.env.MEDUSA_PUBLISHABLE_KEY || "pk_f77f0615ecdd30f3ae032146861b57d692c321290d5410f5d4c3adb3acbee89a"
  const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

  try {
    // 1. Zweryfikuj sesję Stripe
    if (session_id && typeof session_id === "string") {
      console.log("Verifying Stripe session...")
      const stripe = require("stripe")(process.env.STRIPE_API_KEY)
      const session = await stripe.checkout.sessions.retrieve(session_id)
      
      console.log("Stripe session status:", session.payment_status)
      
      if (session.payment_status !== "paid") {
        throw new Error("Payment not completed")
      }
      console.log("Payment verified successfully!")
    }

    // 2. Utwórz payment collection dla koszyka
    console.log("Creating payment collection...")
    const paymentCollectionResponse = await fetch(
      `${backendUrl}/store/payment-collections`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": publishableKey,
        },
        body: JSON.stringify({
          cart_id: cart_id,
        }),
      }
    )

    let paymentCollectionId

    if (paymentCollectionResponse.ok) {
      const paymentData = await paymentCollectionResponse.json()
      paymentCollectionId = paymentData.payment_collection?.id
      console.log("Payment collection created:", paymentCollectionId)
    } else {
      const errorData = await paymentCollectionResponse.json().catch(() => ({}))
      console.log("Payment collection response:", errorData)
      // Może już istnieć - kontynuuj
    }

    // 3. Utwórz payment session w payment collection
    if (paymentCollectionId) {
      console.log("Creating payment session in payment collection...")
      
      const paymentSessionResponse = await fetch(
        `${backendUrl}/store/payment-collections/${paymentCollectionId}/payment-sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": publishableKey,
          },
          body: JSON.stringify({
            provider_id: "pp_system_default", // lub "stripe" jeśli masz skonfigurowane
          }),
        }
      )

      if (paymentSessionResponse.ok) {
        const sessionData = await paymentSessionResponse.json()
        console.log("Payment session created:", sessionData.payment_session?.id)
        
        const paymentSessionId = sessionData.payment_session?.id
        
        // Oznacz payment session jako authorized (płatność zakończona w Stripe)
        if (paymentSessionId) {
          console.log("Authorizing payment session...")
          
          const authorizeResponse = await fetch(
            `${backendUrl}/store/payment-collections/${paymentCollectionId}/payment-sessions/${paymentSessionId}/authorize`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key": publishableKey,
              },
            }
          )
          
          if (authorizeResponse.ok) {
            console.log("Payment session authorized successfully!")
          } else {
            const authError = await authorizeResponse.json().catch(() => ({}))
            console.error("Failed to authorize payment session:", authError)
          }
        }
      } else {
        const sessionError = await paymentSessionResponse.json().catch(() => ({}))
        console.error("Failed to create payment session:", sessionError)
      }
    }

    // 4. Finalizuj zamówienie
    console.log("Completing cart...")
    const completeResponse = await fetch(
      `${backendUrl}/store/carts/${cart_id}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": publishableKey,
        },
      }
    )

    console.log("Complete cart response status:", completeResponse.status)
    
    if (!completeResponse.ok) {
      const errorData = await completeResponse.json().catch(() => ({}))
      console.error("Complete cart error response:", errorData)
      throw new Error(errorData.message || "Failed to complete cart")
    }

    const responseData = await completeResponse.json()
    console.log("Complete cart response:", responseData)
    
    const order = responseData.order

    if (!order || !order.id) {
      console.error("Order missing in response!")
      throw new Error("Order creation failed")
    }

    console.log("Order created successfully:", order.id)

    // 5. Usuń koszyk po pomyślnym zamówieniu
    console.log("Deleting cart...")
    try {
      const deleteResponse = await fetch(
        `${backendUrl}/store/carts/${cart_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": publishableKey,
          },
        }
      )

      if (deleteResponse.ok) {
        console.log("Cart deleted successfully")
      } else {
        console.log("Cart deletion failed (non-critical):", await deleteResponse.text())
      }
    } catch (deleteError) {
      console.log("Cart deletion error (non-critical):", deleteError)
    }

    // 6. Przekieruj do strony potwierdzenia
    const locale = "pl"
    const redirectUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/${locale}/order/confirmed/${order.id}`
      : `http://localhost:8000/${locale}/order/confirmed/${order.id}`
    
    console.log("Redirecting to:", redirectUrl)
    
    return res.redirect(redirectUrl)

  } catch (error) {
    console.error("Error completing checkout:", error)
    
    const redirectUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/checkout?step=payment&error=payment_failed`
      : "http://localhost:8000/checkout?step=payment&error=payment_failed"
    
    return res.redirect(redirectUrl)
  }
}