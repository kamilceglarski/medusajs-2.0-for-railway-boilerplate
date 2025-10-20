import { NextRequest } from "next/server"

const RECIPIENTS = [
    "kamilceglarski2002@gmail.com",
    "grawer73@gmail.com",
]

export async function POST(req: NextRequest) {
    try {
        let body: any = null
        try {
            body = await req.json()
        } catch {
            return new Response(
                JSON.stringify({ error: "Invalid JSON body" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            )
        }
        const { name, email, message } = body || {}

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            )
        }

        const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY
        const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: "Email service not configured" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            )
        }

        const subject = `Nowa wiadomość ze strony Lumoria Studio – ${name}`
        const text = `Imię i nazwisko: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}`

        const payload = {
            from,
            to: RECIPIENTS,
            subject,
            text,
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        if (!res.ok) {
            const bodyText = await res.text()
            return new Response(
                JSON.stringify({ error: "Failed to send", details: bodyText }),
                { status: 502, headers: { "Content-Type": "application/json" } }
            )
        }

        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    } catch (e: any) {
        return new Response(
            JSON.stringify({ error: "Unexpected error", details: e?.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        )
    }
}


