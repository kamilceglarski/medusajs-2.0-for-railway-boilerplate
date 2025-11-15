"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { omit } from "lodash"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { getAuthHeaders, getCartId, removeCartId, setCartId } from "./cookies"
import { getProductsById } from "./products"
import { getRegion } from "./regions"

export async function retrieveCart() {
  const cartId = getCartId()

  if (!cartId) {
    return null
  }

  return await sdk.store.cart
    .retrieve(cartId, {})
    .then(({ cart }) => {
      // If the cart is completed, clear cookie so a fresh cart is generated next time
      if ((cart as any)?.completed_at) {
        removeCartId()
        return null
      }
      return cart
    })
    .catch(() => {
      return null
    })
}

export async function getOrSetCart(countryCode: string) {
  let cart = await retrieveCart()
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  if (!cart) {
    const cartResp = await sdk.store.cart.create({ region_id: region.id })
    cart = cartResp.cart
    setCartId(cart.id)
    revalidateTag("cart")
  }

  if (cart && cart?.region_id !== region.id) {
    await sdk.store.cart.update(
      cart.id,
      { region_id: region.id },
      {},
      getAuthHeaders()
    )
    revalidateTag("cart")
  }

  return cart
}

export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = getCartId()
  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating")
  }

  return sdk.store.cart
    .update(cartId, data, {}, getAuthHeaders())
    .then(({ cart }) => {
      revalidateTag("cart")
      return cart
    })
    .catch(medusaError)
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
  notes,
  customImages,
}: {
  variantId: string
  quantity: number
  countryCode: string
  notes?: string
  customImages?: string[]
}) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart")
  }

  const cart = await getOrSetCart(countryCode)
  if (!cart) {
    throw new Error("Error retrieving or creating cart")
  }

  // Przygotuj metadata z notes i customImages
  const metadata: Record<string, any> = {}
  if (notes) {
    metadata.notes = notes
  }
  if (customImages && customImages.length > 0) {
    metadata.customImages = customImages
    console.log('🔍 Adding customImages to cart:', customImages)
  }

  await sdk.store.cart
    .createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      },
      {},
      getAuthHeaders()
    )
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)
}

export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item")
  }

  const cartId = getCartId()
  if (!cartId) {
    throw new Error("Missing cart ID when updating line item")
  }

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, getAuthHeaders())
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)
}

export async function deleteLineItem(lineId: string) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item")
  }

  const cartId = getCartId()
  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item")
  }

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, {}, getAuthHeaders())
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)
  revalidateTag("cart")
}

export async function enrichLineItems(
  lineItems:
    | HttpTypes.StoreCartLineItem[]
    | HttpTypes.StoreOrderLineItem[]
    | null,
  regionId: string
) {
  if (!lineItems) return []

  // Prepare query parameters
  const queryParams = {
    ids: lineItems.map((lineItem) => lineItem.product_id!),
    regionId: regionId,
  }

  // Fetch products by their IDs
  const products = await getProductsById(queryParams)
  // If there are no line items or products, return an empty array
  if (!lineItems?.length || !products) {
    return []
  }

  // Enrich line items with product and variant information
  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p: any) => p.id === item.product_id)
    const variant = product?.variants?.find(
      (v: any) => v.id === item.variant_id
    )

    // If product or variant is not found, return the original item
    if (!product || !variant) {
      return item
    }

    // If product and variant are found, enrich the item
    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, "variants"),
      },
    }
  }) as HttpTypes.StoreCartLineItem[]

  return enrichedItems
}

export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  return sdk.store.cart
    .addShippingMethod(
      cartId,
      { option_id: shippingMethodId },
      {},
      getAuthHeaders()
    )
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)
}

export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: {
    provider_id: string
    context?: Record<string, unknown>
  }
) {
  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, getAuthHeaders())
    .then((resp) => {
      revalidateTag("cart")
      return resp
    })
    .catch(medusaError)
}

export async function applyPromotions(codes: string[]) {
  const cartId = getCartId()
  if (!cartId) {
    throw new Error("No existing cart found")
  }

  try {
    await updateCart({ promo_codes: codes })
    revalidateTag("cart")
  } catch (error: any) {
    // Sprawdź czy błąd dotyczy niepoprawnego kodu promocyjnego
    const errorMessage = error?.message || String(error)
    if (errorMessage.includes("promotion code") || errorMessage.includes("invalid")) {
      throw new Error("Kod promocyjny jest nieprawidłowy")
    }
    // Inne błędy przekaż dalej
    throw error
  }
}

export async function applyGiftCard(code: string) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function removeDiscount(code: string) {
  // const cartId = getCartId()
  // if (!cartId) return "No cartId cookie found"
  // try {
  //   await deleteDiscount(cartId, code)
  //   revalidateTag("cart")
  // } catch (error: any) {
  //   throw error
  // }
}

export async function removeGiftCard(
  codeToRemove: string,
  giftCards: any[]
  // giftCards: GiftCard[]
) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, {
  //       gift_cards: [...giftCards]
  //         .filter((gc) => gc.code !== codeToRemove)
  //         .map((gc) => ({ code: gc.code })),
  //     }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function submitPromotionForm(
  currentState: unknown,
  formData: FormData
) {
  const code = formData.get("code") as string

  // Walidacja - sprawdź czy kod nie jest pusty
  if (!code || code.trim() === "") {
    return "Proszę wprowadzić kod promocyjny"
  }

  try {
    await applyPromotions([code])
    return null // Sukces - brak błędu
  } catch (e: any) {
    // Zwróć przyjazną wiadomość o błędzie
    const errorMessage = e?.message || String(e)

    // Sprawdź czy błąd dotyczy niepoprawnego kodu promocyjnego
    if (errorMessage.includes("promotion code") || errorMessage.includes("invalid") || errorMessage.includes("nieprawidłowy")) {
      return "Kod promocyjny jest nieprawidłowy. Sprawdź poprawność kodu i spróbuj ponownie."
    }

    // Dla innych błędów zwróć ogólną wiadomość
    return "Wystąpił błąd podczas aplikowania kodu promocyjnego. Spróbuj ponownie."
  }
}

export async function setInpostPoint(currentState: unknown, formData: FormData) {
  try {
    if (!formData) throw new Error("No form data found when setting InPost point")
    const cart = await retrieveCart()
    if (!cart?.id) throw new Error("No existing cart found when setting InPost point")
    // Save the inpost point as a plain text string so it's easy to read in the admin UI
    const raw = (formData.get("inpost_point") as string) || ""

    let existingMeta = (cart as any).metadata || {}
    // Remove dpd_point if present — user requested it removed from metadata
    if ((existingMeta as any).dpd_point) {
      const copy = { ...existingMeta }
      delete (copy as any).dpd_point
      existingMeta = copy
    }

    await updateCart({ metadata: { ...existingMeta, inpost_point: raw } as any })
    revalidateTag("cart")
  } catch (e: any) {
    return e.message
  }
}

// TODO: Pass a POJO instead of a form entity here
// Walidacja numeru telefonu
const validatePhone = (phone: string): boolean => {
  if (!phone) return false

  // Usuń wszystkie spacje i myślniki
  const cleanPhone = phone.replace(/[\s\-]/g, '')

  // Sprawdź różne formaty:
  // 1. 9 cyfr (np. 123456789)
  // 2. +48 + 9 cyfr (np. +48123456789)
  // 3. 11 cyfr (np. 48123456789)
  // 4. +48 + spacja + 9 cyfr (np. +48 123456789)

  const patterns = [
    /^\d{9}$/, // 9 cyfr
    /^\+48\d{9}$/, // +48 + 9 cyfr
    /^\d{11}$/, // 11 cyfr
    /^\+48\s\d{9}$/, // +48 + spacja + 9 cyfr
  ]

  return patterns.some(pattern => pattern.test(cleanPhone))
}

// Walidacja kodu pocztowego
const validatePostalCode = (postalCode: string): boolean => {
  if (!postalCode) return false

  // Sprawdź formaty:
  // 1. xx-xxx (np. 12-345)
  // 2. xxxxx (np. 12345)

  const patterns = [
    /^\d{2}-\d{3}$/, // xx-xxx
    /^\d{5}$/, // xxxxx
  ]

  return patterns.some(pattern => pattern.test(postalCode))
}

export async function setAddresses(currentState: unknown, formData: FormData) {
  try {
    if (!formData) {
      throw new Error("No form data found when setting addresses")
    }
    const cartId = getCartId()
    if (!cartId) {
      throw new Error("No existing cart found when setting addresses")
    }

    // Walidacja telefonu
    const shippingPhone = formData.get("shipping_address.phone") as string
    if (shippingPhone && !validatePhone(shippingPhone)) {
      throw new Error("Wprowadź prawidłowy numer telefonu (9 cyfr, +48 9 cyfr lub 11 cyfr)")
    }

    const billingPhone = formData.get("billing_address.phone") as string
    if (billingPhone && !validatePhone(billingPhone)) {
      throw new Error("Wprowadź prawidłowy numer telefonu rozliczeniowego (9 cyfr, +48 9 cyfr lub 11 cyfr)")
    }

    // Walidacja kodu pocztowego
    const shippingPostalCode = formData.get("shipping_address.postal_code") as string
    if (shippingPostalCode && !validatePostalCode(shippingPostalCode)) {
      throw new Error("Wprowadź prawidłowy kod pocztowy (xx-xxx lub xxxxx)")
    }

    const billingPostalCode = formData.get("billing_address.postal_code") as string
    if (billingPostalCode && !validatePostalCode(billingPostalCode)) {
      throw new Error("Wprowadź prawidłowy kod pocztowy rozliczeniowy (xx-xxx lub xxxxx)")
    }

    const data = {
      shipping_address: {
        first_name: formData.get("shipping_address.first_name"),
        last_name: formData.get("shipping_address.last_name"),
        address_1: formData.get("shipping_address.address_1"),
        address_2: "",
        company: formData.get("shipping_address.company"),
        postal_code: formData.get("shipping_address.postal_code"),
        city: formData.get("shipping_address.city"),
        country_code: formData.get("shipping_address.country_code"),
        province: formData.get("shipping_address.province"),
        phone: formData.get("shipping_address.phone"),
      },
      email: formData.get("email"),
    } as any

    const sameAsBilling = formData.get("same_as_billing")
    if (sameAsBilling === "on") data.billing_address = data.shipping_address

    if (sameAsBilling !== "on")
      data.billing_address = {
        first_name: formData.get("billing_address.first_name"),
        last_name: formData.get("billing_address.last_name"),
        address_1: formData.get("billing_address.address_1"),
        address_2: "",
        company: formData.get("billing_address.company"),
        postal_code: formData.get("billing_address.postal_code"),
        city: formData.get("billing_address.city"),
        country_code: formData.get("billing_address.country_code"),
        province: formData.get("billing_address.province"),
        phone: formData.get("billing_address.phone"),
      }
    await updateCart(data)
  } catch (e: any) {
    return e.message
  }

  redirect(
    `/${formData.get("shipping_address.country_code")}/checkout?step=delivery`
  )
}

export async function placeOrder() {
  const cartId = getCartId()
  if (!cartId) {
    throw new Error("No existing cart found when placing an order")
  }

  const cartRes = await sdk.store.cart
    .complete(cartId, {}, getAuthHeaders())
    .then((cartRes) => {
      revalidateTag("cart")
      return cartRes
    })
    .catch(medusaError)

  if (cartRes?.type === "order") {
    const countryCode =
      cartRes.order.shipping_address?.country_code?.toLowerCase()
    removeCartId()
    redirect(`/${countryCode}/order/confirmed/${cartRes?.order.id}`)
  }

  return cartRes.cart
}

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(countryCode: string, currentPath: string) {
  const cartId = getCartId()
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  if (cartId) {
    await updateCart({ region_id: region.id })
    revalidateTag("cart")
  }

  revalidateTag("regions")
  revalidateTag("products")

  redirect(`/${countryCode}${currentPath}`)
}
