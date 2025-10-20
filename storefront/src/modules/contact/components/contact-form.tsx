"use client"

import { useState } from "react"

const ContactForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const mailtoHref = `mailto:kontakt@lumoria-studio.pl?subject=${encodeURIComponent(
        "Wiadomość ze strony Lumoria Studio"
    )}&body=${encodeURIComponent(`Imię i nazwisko: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}`)}`

    return (
        <form className="rounded-lg border p-6 bg-white" action={mailtoHref} method="post">
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
                        className="w-full rounded-md border px-3 py-2 bg-transparent" placeholder="jan@przyklad.pl" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm text-ui-fg-muted mb-1">Wiadomość</label>
                    <textarea id="message" name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 bg-transparent" placeholder="Opisz, czego potrzebujesz..." />
                </div>
                <div className="flex gap-3">
                    <button type="submit" className="px-5 py-2 rounded-md text-white" style={{ backgroundColor: "#0E3E4D" }}>
                        Wyślij
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ContactForm


