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
  const [paymentCompleted, setPaymentCompleted] = useState(false)

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/custom`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      const data = await response.json()

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
                !isOpen && !paymentCompleted,
            }
          )}
        >
          Płatność
          {!isOpen && paymentCompleted && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentCompleted && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
                data-testid="edit-payment-button"
              >
                Edytuj
            </button>
          </Text>
        )}
      </div>

      {isOpen ? (
        <div data-testid="payment-container">
          <div className="pb-8">
            <Text className="txt-medium-plus text-ui-fg-base mb-4">
              Wybierz metodę płatności
            </Text>

            <div className="flex flex-col gap-y-2">
              <div
                className="flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 hover:shadow-borders-interactive-with-active border-ui-border-interactive"
                onClick={handleStripeCheckout}
              >
                <div className="flex items-center gap-x-4">
                  <div className="w-5 h-5 rounded-full border-2 border-ui-border-interactive flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-ui-fg-interactive"></div>
                  </div>
                  <span className="text-base-regular">
                    Credit/Debit Card, BLIK, P24
                  </span>
                </div>
                <span className="justify-self-end text-ui-fg-subtle text-small-regular">
                  via Stripe
                </span>
              </div>
            </div>
          </div>

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
            Continue to Stripe
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {paymentCompleted && (
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Method
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  Stripe Payment
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment