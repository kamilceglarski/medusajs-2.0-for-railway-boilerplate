"use client"

import { useFormState } from "react-dom"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { requestPasswordReset, performPasswordReset } from "@lib/data/customer"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const ResetPassword = () => {
    const params = useSearchParams()
    const token = params?.get("token") ?? null

    const [message, formAction] = useFormState(token ? performPasswordReset : requestPasswordReset, null)

    // client-side validation for matching passwords
    const [clientError, setClientError] = useState<string | null>(null)
    const handleBeforeSubmit = (formData: FormData) => {
        if (token) {
            const p = formData.get('password') as string
            const r = formData.get('repeat_password') as string
            if (p !== r) {
                return 'Hasła nie są takie same'
            }
        }
        return undefined
    }

    // toast state
    const [toastVisible, setToastVisible] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const [toastType, setToastType] = useState<'success' | 'error'>('success')

    useEffect(() => {
        // message can be an object { success, message } or a string (old-style errors)
        if (!message) return

        let m: string | undefined
        let ok = false

        if (typeof message === 'string') {
            m = message
            ok = false
        } else if (typeof message === 'object') {
            m = (message as any).message ?? JSON.stringify(message)
            ok = Boolean((message as any).success)
        }

        if (m) {
            setToastMessage(m)
            setToastType(ok ? 'success' : 'error')
            setToastVisible(true)

            const t = setTimeout(() => setToastVisible(false), 6000)
            return () => clearTimeout(t)
        }
    }, [message])

    return (
        <div className="max-w-sm w-full flex flex-col items-center relative">
            <h1 className="text-large-semi uppercase mb-6">Resetuj hasło</h1>
            <p className="text-center text-base-regular text-ui-fg-base mb-4">
                {token
                    ? "Podaj nowe hasło dla swojego konta."
                    : "Podaj adres e-mail, a wyślemy link do zresetowania hasła."}
            </p>

            <form className="w-full" action={formAction} onSubmit={(e) => {
                // Client-side logging to help debug whether form is submitted
                try {
                    const el = e.currentTarget as HTMLFormElement
                    const fd = new FormData(el)
                    const emailVal = fd.get('email')
                    console.log(`[ResetPassword] form submit, token=${token ? 'yes' : 'no'}, email=${emailVal}`)
                } catch (err) {
                    console.warn('[ResetPassword] failed to log form submit', err)
                }

                const fd = new FormData(e.currentTarget as HTMLFormElement)
                const err = handleBeforeSubmit(fd)
                if (err) {
                    e.preventDefault()
                    setClientError(err)
                } else {
                    setClientError(null)
                }
            }}>
                <div className="flex flex-col w-full gap-y-2">
                    {!token && (
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            data-testid="reset-email-input"
                        />
                    )}

                    {token && (
                        <>
                            <input type="hidden" name="token" value={token} />
                            <Input
                                label="Nowe hasło"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                data-testid="reset-password-input"
                            />
                            <Input
                                label="Powtórz nowe hasło"
                                name="repeat_password"
                                type="password"
                                autoComplete="off"
                                required
                                data-testid="reset-password-repeat-input"
                            />
                        </>
                    )}
                </div>

                {/* normalize message and only show inline error when it's an actual error */}
                {(() => {
                    // message can be string or { success, message }
                    let normalized: string | null = null
                    let isError = false

                    if (clientError) {
                        normalized = clientError
                        isError = true
                    } else if (typeof message === 'string') {
                        normalized = message
                        isError = true
                    } else if (message && typeof message === 'object') {
                        const m = (message as any).message ?? null
                        const ok = Boolean((message as any).success)
                        normalized = m
                        isError = !ok
                    }

                    // Only render inline ErrorMessage when the result is an error
                    return isError ? <ErrorMessage error={normalized} data-testid="reset-error-message" /> : null
                })()}

                <SubmitButton className="w-full mt-6">
                    {token ? "Zresetuj hasło" : "Wyślij link do resetu"}
                </SubmitButton>
            </form>

            <span className="text-center text-ui-fg-base text-small-regular mt-6">
                <LocalizedClientLink href="/account" className="underline">
                    Powrót do logowania
                </LocalizedClientLink>
            </span>

            {/* Toast / popup */}
            {toastVisible && toastMessage && (
                <div className={`fixed top-20 right-6 z-50 max-w-xs w-auto rounded-md shadow-lg p-4 text-sm ${toastType === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`} role="status">
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            <strong className="block mb-1">{toastType === 'success' ? 'Sukces' : 'Błąd'}</strong>
                            <div className="whitespace-pre-wrap">{toastMessage}</div>
                        </div>
                        <button className="ml-4 text-ui-fg-subtle" onClick={() => setToastVisible(false)} aria-label="Zamknij">
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResetPassword
