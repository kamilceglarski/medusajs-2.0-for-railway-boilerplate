// storefront/src/app/api/checkout/complete/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cartId = searchParams.get("cart_id")

  if (!cartId) {
    return NextResponse.redirect(
      new URL("/checkout?step=payment&error=no_cart_id", request.url)
    )
  }

  try {
    // Finalizuj zamówienie w Medusa
    const completeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cartId}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!completeResponse.ok) {
      const errorData = await completeResponse.json().catch(() => ({}))
      console.error("Failed to complete order:", errorData)
      throw new Error("Failed to complete order")
    }

    const data = await completeResponse.json()

    if (!data.order || !data.order.id) {
      throw new Error("Order data missing")
    }

    // Przekieruj do strony potwierdzenia
    return NextResponse.redirect(
      new URL(`/pl/order/confirmed/${data.order.id}`, request.url)
    )
  } catch (error) {
    console.error("Error completing checkout:", error)
    return NextResponse.redirect(
      new URL("/checkout?step=payment&error=payment_failed", request.url)
    )
  }
}