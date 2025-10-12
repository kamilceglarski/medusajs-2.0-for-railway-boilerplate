"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"

const StripeCheckoutButton = ({ cartId }: { cartId: string }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStripeCheckout = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/store/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: cartId }),
      })

      if (!response.ok) {
        throw new Error("Nie udało się rozpocząć płatności.")
      }

      const data = await response.json()

      // Przekierowanie do Stripe Checkout
      window.location.href = data.url
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd.")
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      <Button
        onClick={handleStripeCheckout}
        isLoading={loading}
        disabled={loading || !cartId}
      >
        Zapłać przez Stripe
      </Button>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  )
}

export default StripeCheckoutButton