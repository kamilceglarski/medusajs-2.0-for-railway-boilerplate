import { ReactNode } from 'react'
import { MedusaError } from '@medusajs/framework/utils'
import { InviteUserEmail, INVITE_USER, isInviteUserData } from './invite-user'
import { OrderPlacedTemplate, ORDER_PLACED, isOrderPlacedTemplateData } from './order-placed'
import { ResetPasswordEmail, RESET_PASSWORD, isResetPasswordData } from './reset-password'

export const EmailTemplates = {
  INVITE_USER,
  ORDER_PLACED,
  RESET_PASSWORD,
} as const

export type EmailTemplateType = keyof typeof EmailTemplates

export function generateEmailTemplate(templateKey: string, data: unknown): ReactNode {
  // Exact matches first
  switch (templateKey) {
    case EmailTemplates.INVITE_USER:
      if (!isInviteUserData(data)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Invalid data for template "${EmailTemplates.INVITE_USER}"`
        )
      }
      return <InviteUserEmail {...data} />

    case EmailTemplates.ORDER_PLACED:
      if (!isOrderPlacedTemplateData(data)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Invalid data for template "${EmailTemplates.ORDER_PLACED}"`
        )
      }
      return <OrderPlacedTemplate {...data} />

    case EmailTemplates.RESET_PASSWORD:
      if (!isResetPasswordData(data)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Invalid data for template "${EmailTemplates.RESET_PASSWORD}"`
        )
      }
      return <ResetPasswordEmail {...data} />
  }

  // Fallback: if template key is something the auth module uses that contains both
  // "reset" and "password" (several packages use different keys), map it to our reset template.
  const key = templateKey?.toLowerCase?.() ?? ''
  if (key.includes('reset') && key.includes('password')) {
    if (!isResetPasswordData(data)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Invalid data for template "${templateKey}" (mapped to reset-password)`
      )
    }
    return <ResetPasswordEmail {...data} />
  }

  throw new MedusaError(
    MedusaError.Types.INVALID_DATA,
    `Unknown template key: "${templateKey}"`
  )
}

export { InviteUserEmail, OrderPlacedTemplate, ResetPasswordEmail }
