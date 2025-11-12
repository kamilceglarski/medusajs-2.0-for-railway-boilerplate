"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cache } from "react"
import { getAuthHeaders, removeAuthToken, setAuthToken } from "./cookies"

export const getCustomer = cache(async function () {
  return await sdk.store.customer
    .retrieve({}, { next: { tags: ["customer"] }, ...getAuthHeaders() })
    .then(({ customer }) => customer)
    .catch(() => null)
})

export const updateCustomer = cache(async function (
  body: HttpTypes.StoreUpdateCustomer
) {
  const updateRes = await sdk.store.customer
    .update(body, {}, getAuthHeaders())
    .then(({ customer }) => customer)
    .catch(medusaError)

  revalidateTag("customer")
  return updateRes
})

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const phone = formData.get("phone") as string

  // Validate required phone number
  if (!phone || phone.trim() === "") {
    return "Numer telefonu jest wymagany"
  }

  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: phone,
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    const customHeaders = { authorization: `Bearer ${token}` }

    const { customer: createdCustomer } = await sdk.store.customer.create(
      customerForm,
      {},
      customHeaders
    )

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    setAuthToken(typeof loginToken === 'string' ? loginToken : loginToken.location)

    revalidateTag("customer")
    return createdCustomer
  } catch (error: any) {
    return error.toString()
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await sdk.auth
      .login("customer", "emailpass", { email, password })
      .then((token) => {
        setAuthToken(typeof token === 'string' ? token : token.location)
        revalidateTag("customer")
      })
  } catch (error: any) {
    // Translate common auth error to Polish for the UI
    const raw = error && (error.message || error.toString()) || String(error)
    if (raw.includes('Invalid email or password') || raw.includes('Invalid email or password')) {
      return 'Nieprawidłowy e-mail lub hasło'
    }
    return raw
  }
}

export async function requestPasswordReset(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get('email') as string

  try {
    // Debug logging: confirm server action invocation from Next and the email value.
    // This will appear in the Next.js server logs when the form is submitted.
    try {
      console.log(`[requestPasswordReset] called with email: ${email}`)
    } catch (logErr) {
      // ignore logging errors
    }
    // Always attempt to send the reset email to the provided address. The
    // Medusa backend will decide whether to dispatch the email (account
    // existence) and will respond accordingly.
    // Use the backend store route which calls the notification module the same
    // way the test script does. This avoids depending on medusa's auth reset
    // behavior which may not trigger notifications in some setups.
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const url = `${backendUrl.replace(/\/$/, '')}/store/custom/reset-password`

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // The Medusa server expects the publishable key header for store requests
          ...(process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
            ? { 'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY }
            : {}),
        },
        body: JSON.stringify({ identifier: email }),
      })

      // Log response for debugging
      try {
        console.log('[requestPasswordReset] POST', url, 'status', resp.status)
      } catch (logErr) { }

      if (!resp.ok) {
        // Try to parse JSON error message from backend, fall back to plain text
        let errMsg = ''
        try {
          const json = await resp.json()
          errMsg = json?.message || json?.error || JSON.stringify(json)
        } catch (_) {
          errMsg = await resp.text().catch(() => '')
        }
        throw new Error(errMsg || `Backend responded with ${resp.status}`)
      }

      return { success: true, message: 'Link do resetu został wysłany na podany adres e-mail.' }
    } catch (fetchErr: any) {
      try {
        console.error('[requestPasswordReset] fetch error:', fetchErr)
      } catch (_) { }
      return { success: false, message: (fetchErr && fetchErr.message) || String(fetchErr) }
    }
  } catch (error: any) {
    // Log the error so it's visible in Next server logs when invoked from the UI
    try {
      console.error('[requestPasswordReset] error:', error)
    } catch (logErr) {
      // ignore
    }
    return { success: false, message: error.toString() }
  }
}

export async function performPasswordReset(
  _currentState: unknown,
  formData: FormData
) {
  const password = formData.get('password') as string
  const token = formData.get('token') as string

  try {
    // Log invocation for debugging
    try {
      console.log(`[performPasswordReset] called with token: ${token ? 'present' : 'missing'}`)
    } catch (logErr) { }

    // Call our custom backend endpoint that validates our generated tokens
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const url = `${backendUrl.replace(/\/$/, '')}/store/custom/reset-password`

    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
          ? { 'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY }
          : {}),
      },
      body: JSON.stringify({ token, password }),
    })

    try {
      console.log('[performPasswordReset] PUT response status:', resp.status)
    } catch (logErr) { }

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `Server responded with ${resp.status}`)
    }

    return { success: true, message: 'Hasło zostało zresetowane. Możesz się teraz zalogować.' }
  } catch (error: any) {
    try {
      console.error('[performPasswordReset] error:', error)
    } catch (logErr) { }
    return { success: false, message: error.toString() }
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()
  removeAuthToken()
  revalidateTag("auth")
  revalidateTag("customer")
  redirect(`/${countryCode}/account`)
}

export async function addCustomerAddress(_currentState: unknown, formData: FormData) {
  const address = {
    first_name: (formData.get("first_name") as string) || undefined,
    last_name: (formData.get("last_name") as string) || undefined,
    company: (formData.get("company") as string) || undefined,
    address_1: (formData.get("address_1") as string) || undefined,
    address_2: (formData.get("address_2") as string) || undefined,
    postal_code: (formData.get("postal_code") as string) || undefined,
    city: (formData.get("city") as string) || undefined,
    province: (formData.get("province") as string) || undefined,
    country_code: (formData.get("country_code") as string) || undefined,
    phone: (formData.get("phone") as string) || undefined,
  }

  // Validate required phone number
  if (!address.phone || String(address.phone).trim() === "") {
    return "Numer telefonu jest wymagany"
  }

  try {
    const customer = await getCustomer()
    if (!customer) {
      return "Brak zalogowanego użytkownika"
    }

    // Use store.createAddress so the backend creates the address resource
    const resp = await sdk.store.customer.createAddress(address, {}, getAuthHeaders())
    const updated = resp?.customer
      ? resp.customer
      : null

    revalidateTag("customer")
    return updated
  } catch (error: any) {
    return error.toString()
  }
}

export async function updateCustomerAddress(_currentState: unknown, formData: FormData) {
  const addressId = (formData.get("address_id") as string) || (formData.get("addressId") as string)

  const address = {
    id: addressId,
    first_name: (formData.get("first_name") as string) || undefined,
    last_name: (formData.get("last_name") as string) || undefined,
    company: (formData.get("company") as string) || undefined,
    address_1: (formData.get("address_1") as string) || undefined,
    address_2: (formData.get("address_2") as string) || undefined,
    postal_code: (formData.get("postal_code") as string) || undefined,
    city: (formData.get("city") as string) || undefined,
    province: (formData.get("province") as string) || undefined,
    country_code: (formData.get("country_code") as string) || undefined,
    phone: (formData.get("phone") as string) || undefined,
  }

  try {
    const customer = await getCustomer()
    if (!customer) {
      return "Brak zalogowanego użytkownika"
    }

    // Use the store.updateAddress method to update the specific address
    const resp = await sdk.store.customer.updateAddress(addressId, address, {}, getAuthHeaders())
    const updated = resp?.customer ? resp.customer : null

    revalidateTag("customer")
    return updated
  } catch (error: any) {
    return error.toString()
  }
}

export async function deleteCustomerAddress(addressId: string) {
  try {
    const customer = await getCustomer()
    if (!customer) {
      throw new Error("Brak zalogowanego użytkownika")
    }

    const currentAddresses = customer.addresses || []
    const newAddresses = currentAddresses.filter((a: any) => a.id !== addressId)

    // Use the SDK's deleteAddress store method which removes the address
    const resp = await sdk.store.customer.deleteAddress(addressId, getAuthHeaders())
    const updated = resp?.parent || null

    revalidateTag("customer")
    return updated
  } catch (error: any) {
    throw error
  }
}
