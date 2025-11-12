import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import { EmailTemplates } from '../modules/email-notifications/templates'

export default async function testSendResetEmail({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    try {
        const notificationModuleService = container.resolve(Modules.NOTIFICATION)

        // Send test email to developer address by default
        const to = process.env.TEST_RESET_EMAIL || 'kamilceglarski2002@gmail.com' || process.env.MEDUSA_ADMIN_EMAIL || 'admin@yourmail.com'
        const storefront = process.env.STOREFRONT_URL || 'http://localhost:8000'
        const resetLink = `${storefront}/pl/reset-password?token=test-token-123`

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

        logger.info(`Test reset email sent to ${to}`)
        console.log(`Test reset email sent to ${to}`)
    } catch (error: any) {
        logger.error(`Failed to send test reset email: ${error?.message ?? error}`)
        console.error('Failed to send test reset email:', error)
        process.exit(1)
    }
}
