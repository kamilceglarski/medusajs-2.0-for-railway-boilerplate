import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService, IOrderModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)
  
  const order = await orderModuleService.retrieveOrder(data.id, { relations: ['items', 'summary', 'shipping_address'] })

  // Store line-item notes as a single primitive string for clarity and editability in Admin
  try {
    const currentMeta = (order as any).metadata ? { ...(order as any).metadata } : {}
    const lines: string[] = []
    for (const it of order.items || []) {
      const raw = (it?.metadata as any)?.notes
      const note = typeof raw === 'string' ? raw.trim() : ''
      if (!note) continue
      const productTitle = it?.product_title || 'Produkt'
      const variantTitle = it?.variant_title ? ` (${it.variant_title})` : ''
      const sku = it?.variant_sku ? ` [${it.variant_sku}]` : ''
      lines.push(`• ${productTitle}${variantTitle}${sku}: ${note}`)
    }

    if (lines.length > 0) {
      currentMeta["notes_summary"] = lines.join('\n')
      await (orderModuleService as any).updateOrders([
        { id: order.id, metadata: currentMeta },
      ])
    }
  } catch (e) {
    console.warn('Could not aggregate line item notes to order metadata:', e)
  }
  const shippingAddress = await (orderModuleService as any).orderAddressService_.retrieve(order.shipping_address.id)

  try {
    await notificationModuleService.createNotifications({
      to: order.email,
      channel: 'email',
      template: EmailTemplates.ORDER_PLACED,
      data: {
        emailOptions: {
          replyTo: 'info@example.com',
          subject: 'Lumoria-studio.pl - Potwierdzenie zamówienia'
        },
        order,
        shippingAddress,
        preview: 'Dziękuję za złożenie zamówienia!'
      }
    })
  } catch (error) {
    console.error('Error sending order confirmation notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: 'order.placed'
}
