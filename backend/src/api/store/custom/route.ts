// @ts-nocheck
import Stripe from "stripe"

export async function POST(req: any, res: any) {
  try {
    const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
      apiVersion: "2024-04-10",
    })

    const { cart_id, items, currency_code } = req.body

    if (!cart_id || !items || items.length === 0) {
      return res.status(400).json({ message: "cart_id and items are required" })
    }

    const successUrl = process.env.STOREFRONT_URL 
      ? `${process.env.STOREFRONT_URL}/order/success`
      : `http://localhost:8000/api/checkout/complete?cart_id=${cart_id}`
    
    const cancelUrl = process.env.STOREFRONT_URL
      ? `${process.env.STOREFRONT_URL}/cart`
      : `http://localhost:8000/cart`

    console.log("Creating Stripe session for cart:", cart_id)

    const line_items = items.map((item: any) => {
      let unitAmount = item.unit_price || item.subtotal || 0
      
      if (unitAmount < 1) {
        unitAmount = Math.round(unitAmount * 100 * 100)
      } else if (unitAmount < 100) {
        unitAmount = Math.round(unitAmount * 100)
      } else {
        unitAmount = Math.round(unitAmount)
      }
      
      if (unitAmount < 200) {
        unitAmount = 200
      }
      
      return {
        price_data: {
          currency: currency_code || "pln",
          product_data: { 
            name: item.title || item.product_title || "Product",
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity || 1,
      }
    })

    // Dostępne metody płatności w zależności od waluty
    const getPaymentMethods = (currency: string) => {
      const methods: string[] = ["card"] // Karty zawsze dostępne
      
      switch (currency.toLowerCase()) {
        case "pln":
          methods.push("blik", "p24") // BLIK i Przelewy24 dla PLN
          break
        case "eur":
          methods.push(
            "ideal",        // Holandia
            "giropay",      // Niemcy
            "sepa_debit",   // Europa
            "sofort",       // Europa
            "bancontact"    // Belgia
          )
          break
        case "usd":
          methods.push(
            "affirm",       // Płatności ratalne
            "afterpay_clearpay", // Płatności odroczone
            "cashapp"       // Cash App
          )
          break
        case "gbp":
          methods.push(
            "bacs_debit",   // UK Direct Debit
            "afterpay_clearpay"
          )
          break
        default:
          // Tylko karty dla innych walut
          break
      }
      
      return methods
    }

    const paymentMethods = getPaymentMethods(currency_code || "pln")
    console.log("Payment methods enabled:", paymentMethods)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: paymentMethods,
      line_items: line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        cart_id: cart_id,
      },
      // Opcjonalnie: automatyczna kontrola podatków
      // automatic_tax: { enabled: true },
      
      // Opcjonalnie: zapisywanie metod płatności dla przyszłych transakcji
      // payment_intent_data: {
      //   setup_future_usage: "off_session",
      // },
    })

    console.log("Stripe session created:", session.id)

    res.json({ url: session.url })
  } catch (err: any) {
    console.error("Stripe checkout error:", err)
    res.status(500).json({ 
      message: err.message,
    })
  }
}