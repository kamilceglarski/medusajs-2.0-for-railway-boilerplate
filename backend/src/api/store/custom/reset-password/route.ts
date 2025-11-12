import { ModuleRegistrationName } from "@medusajs/utils"
import { EmailTemplates } from "../../../../modules/email-notifications/templates"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { randomBytes } from "crypto"
import Scrypt from "scrypt-kdf"
import { Pool } from "pg"

// Simple in-memory token store (for production, use Redis or DB)
// Structure: { token: { email, expiresAt } }
const resetTokens = new Map<string, { email: string; expiresAt: number }>()

// Clean up expired tokens every 10 minutes
setInterval(() => {
    const now = Date.now()
    for (const [token, data] of resetTokens.entries()) {
        if (data.expiresAt < now) {
            resetTokens.delete(token)
        }
    }
}, 10 * 60 * 1000)

// POST /store/custom/reset-password
export async function POST(req: any, res: any) {
    const { identifier, email } = req.body || {}
    const to = (identifier || email || '').toString()

    if (!to) {
        return res.status(400).json({ error: 'Missing identifier/email in body' })
    }

    try {
        const notificationModuleService = req.scope.resolve(ModuleRegistrationName.NOTIFICATION)

        const storefront = process.env.STOREFRONT_URL || 'http://localhost:8000'

        // 1) Trigger Medusa's store reset endpoint to generate/persist a real token
        try {
            const medusaBase = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000'
            const resetResp = await fetch(`${medusaBase.replace(/\/$/, '')}/auth/customer/emailpass/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // include publishable key if available (store endpoints often require it)
                    ...(process.env.MEDUSA_PUBLISHABLE_KEY ? { 'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY } : {}),
                },
                body: JSON.stringify({ identifier: to }),
            })

            if (!resetResp.ok) {
                // Log but continue — we will still attempt to read any token that may exist
                const txt = await resetResp.text().catch(() => '')
                console.warn('[store/custom/reset-password] medusa reset endpoint returned', resetResp.status, txt)
            } else {
                console.log('[store/custom/reset-password] medusa reset endpoint triggered for', to)
            }
        } catch (triggerErr: any) {
            console.warn('[store/custom/reset-password] could not trigger medusa reset endpoint:', triggerErr)
        }

        // 2) Instead of relying on Medusa's token storage, generate our own secure token
        // and call Medusa's updateProvider endpoint directly with it
        let token: string | undefined

        try {
            const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

            // Verify customer exists
            const { data: customers } = await query.graph({
                entity: 'customer',
                fields: ['id', 'email'],
                filters: { email: to },
                limit: 1,
            })

            const cust = customers?.[0]

            if (cust?.id) {
                console.log('[store/custom/reset-password] customer found:', cust.id)

                // Generate a secure random token (32 bytes = 64 hex chars)
                token = randomBytes(32).toString('hex')

                // Store token with 1 hour expiration
                const expiresAt = Date.now() + 60 * 60 * 1000 // 1 hour
                resetTokens.set(token, { email: to, expiresAt })

                console.log('[store/custom/reset-password] generated and stored secure token for', to, 'expires in 1h')
            } else {
                console.warn('[store/custom/reset-password] customer not found for', to)
                // If account doesn't exist, do not send a reset email. Return localized message.
                return res.status(404).json({ success: false, message: 'Konto o podanym adresie e-mail nie istnieje' })
            }
        } catch (queryErr: any) {
            console.warn('[store/custom/reset-password] error querying for customer:', queryErr)
        }

        // 3) Fallback: if customer doesn't exist, still send email with a dummy token
        // (per user requirement to always send email to entered address)
        if (!token) {
            console.warn('[store/custom/reset-password] generating fallback token (customer may not exist)')
            token = randomBytes(32).toString('hex')
        }
        const resetLink = `${storefront}/pl/reset-password?token=${token}`

        // 4) Send notification using notification module service (same as test script)
        await notificationModuleService.createNotifications({
            to,
            channel: 'email',
            template: EmailTemplates.RESET_PASSWORD,
            data: {
                emailOptions: {
                    subject: 'Reset hasła — Lumoria Studio',
                    replyTo: process.env.RESEND_FROM_EMAIL || undefined,
                },
                email: to,
                resetLink,
                preview: 'Zresetuj swoje hasło',
            },
        })

        return res.status(200).json({ success: true, message: `Reset email queued for ${to}`, token_found: !!token })
    } catch (err: any) {
        console.error('[store/custom/reset-password] error sending notification:', err)
        return res.status(500).json({ error: err?.message ?? String(err) })
    }
}

// PUT /store/custom/reset-password - Complete password reset with token
export async function PUT(req: any, res: any) {
    const { token, password } = req.body || {}

    if (!token || !password) {
        return res.status(400).json({ error: 'Missing token or password' })
    }

    try {
        // 1) Verify token exists and is not expired
        const tokenData = resetTokens.get(token)

        if (!tokenData) {
            console.warn('[store/custom/reset-password PUT] token not found:', token.substring(0, 10) + '...')
            return res.status(400).json({ error: 'Invalid or expired token' })
        }

        if (tokenData.expiresAt < Date.now()) {
            console.warn('[store/custom/reset-password PUT] token expired for:', tokenData.email)
            resetTokens.delete(token)
            return res.status(400).json({ error: 'Token has expired' })
        }

        console.log('[store/custom/reset-password PUT] valid token for:', tokenData.email)

        // 2) Find provider_identity for this email and update password
        const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

        // Find provider_identity by email (entity_id)
        const { data: providerIdentities } = await query.graph({
            entity: 'provider_identity',
            fields: ['id', 'entity_id', 'provider', 'auth_identity_id'],
            filters: {
                entity_id: tokenData.email,
                provider: 'emailpass'
            },
            limit: 1,
        })

        const providerIdentity = providerIdentities?.[0]
        if (!providerIdentity) {
            console.error('[store/custom/reset-password PUT] provider_identity not found for:', tokenData.email)
            return res.status(404).json({ error: 'Account not found' })
        }

        console.log('[store/custom/reset-password PUT] found provider_identity:', providerIdentity.id)

        try {
            // Generate scrypt-kdf buffer using the same format Medusa uses (binary header + params + salt + hash)
            // Use logN=14 (N=16384), r=8, p=1 which is commonly used by Medusa
            const kdfBuf = await Scrypt.kdf(password, { logN: 14, r: 8, p: 1 })
            const passwordHash = Buffer.from(kdfBuf).toString('base64')

            console.log('[store/custom/reset-password PUT] generated scrypt-kdf hash, length:', passwordHash.length)

            // Update provider_identity with new password hash using direct SQL
            const pool = new Pool({
                connectionString: process.env.DATABASE_URL || 'postgres://postgres:medusa@localhost:5432/medusa_db'
            })

            await pool.query(
                `UPDATE provider_identity 
                 SET provider_metadata = jsonb_set(
                   COALESCE(provider_metadata, '{}'::jsonb),
                   '{password}',
                   $1::jsonb
                 )
                 WHERE id = $2`,
                [JSON.stringify(passwordHash), providerIdentity.id]
            )

            await pool.end()

            console.log('[store/custom/reset-password PUT] password updated successfully')
        } catch (authErr: any) {
            console.error('[store/custom/reset-password PUT] auth module error:', authErr)
            throw authErr
        }

        // 3) Delete token after successful use
        resetTokens.delete(token)
        console.log('[store/custom/reset-password PUT] password reset completed for:', tokenData.email)

        return res.status(200).json({ success: true, message: 'Password updated successfully' })
    } catch (err: any) {
        console.error('[store/custom/reset-password PUT] error:', err)
        return res.status(500).json({ error: err?.message ?? String(err) })
    }
}
