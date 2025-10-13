"use client"

import { useState, useEffect } from "react"
import { Button, Heading, Text, clx } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Divider from "@modules/common/components/divider"
import ErrorMessage from "@modules/checkout/components/error-message"

const Payment = ({ cart }: { cart: any }) => {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setError(null)
  }, [isOpen])

  if (!mounted) return null

  const handleEdit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleStripeCheckout = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Cart data:", cart) // Debug

      // Sprawdź strukturę koszyka
      if (!cart?.id) {
        throw new Error("Brak ID koszyka")
      }

      if (!cart?.items || cart.items.length === 0) {
        throw new Error("Koszyk jest pusty")
      }

      const payload = {
        cart_id: cart.id,
        items: cart.items,
        currency_code: cart.region?.currency_code || cart.currency_code || "pln",
      }

      console.log("Sending payload:", payload) // Debug

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/custom`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": "pk_f77f0615ecdd30f3ae032146861b57d692c321290d5410f5d4c3adb3acbee89a"
          },
          body: JSON.stringify(payload),
        }
      )

      const data = await response.json()

      console.log("Response data:", data) // Debug

      if (!response.ok) {
        throw new Error(data.message || "Błąd tworzenia sesji Stripe")
      }

      if (!data.url) {
        throw new Error("Brak URL do przekierowania")
      }

      // Przekierowanie do Stripe Checkout
      window.location.href = data.url
    } catch (err: any) {
      console.error("Checkout error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen,
            }
          )}
        >
          Payment
          
        </Heading>
        
      </div>

      {isOpen ? (
        <div data-testid="payment-container">
          <div className="pb-8">

            <ErrorMessage
              error={error}
              data-testid="payment-error-message"
            />

            <Button
              size="large"
              className="mt-6"
              onClick={handleStripeCheckout}
              isLoading={loading}
              disabled={!cart?.items || cart.items.length === 0}
              data-testid="submit-payment-button"
            >
              Zapłać 
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment