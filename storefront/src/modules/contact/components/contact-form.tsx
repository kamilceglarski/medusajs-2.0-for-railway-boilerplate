"use client"

import { useState } from "react"

const ContactForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(email)
    const canSubmit = name.trim().length > 1 && isEmailValid && message.trim().length > 5 && status !== "sending"

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("sending")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            })
            if (!res.ok) throw new Error("Request failed")
            setStatus("ok")
            setName("")
            setEmail("")
            setMessage("")
        } catch {
            setStatus("error")
        }
    }

    return (
        <form className="rounded-lg border p-6 bg-white" onSubmit={onSubmit}>
            <h2 className="font-semibold text-lg mb-4" style={{ color: "#0E3E4D" }}>Napisz do nas</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm text-ui-fg-muted mb-1">Imię i nazwisko</label>
                    <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 bg-transparent" placeholder="Jan Kowalski" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm text-ui-fg-muted mb-1">Email</label>
                    <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 bg-transparent ${email && !isEmailValid ? 'border-red-500' : ''}`}
                        placeholder="jan@przyklad.pl" />
                    {email && !isEmailValid && (
                        <p className="text-red-600 text-xs mt-1">Podaj poprawny adres e‑mail w formacie nazwa@domena.tld</p>
                    )}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm text-ui-fg-muted mb-1">Wiadomość</label>
                    <textarea id="message" name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 bg-transparent" placeholder="Opisz, czego potrzebujesz..." />
                </div>
                <div className="flex items-center gap-3">
                    <button type="submit" disabled={!canSubmit} className="px-5 py-2 rounded-md text-white disabled:opacity-70" style={{ backgroundColor: "#0E3E4D" }}>
                        {status === "sending" ? "Wysyłanie..." : "Wyślij"}
                    </button>
                    {status === "ok" && <span className="text-green-600 text-sm">Wiadomość wysłana. Dziękujemy!</span>}
                    {status === "error" && <span className="text-red-600 text-sm">Błąd wysyłki. Spróbuj ponownie.</span>}
                </div>
            </div>
        </form>
    )
}

export default ContactForm


