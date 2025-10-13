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

  // Aggregate line-item notes into order.metadata.notes_map as { [product_title]: note }
  try {
    const notesMap: Record<string, string> = {}
    for (const it of (order.items || [])) {
      const note = (it?.metadata as any)?.notes
      if (!note || String(note).trim().length === 0) continue
      const key = it?.product_title || 'Produkt'
      const val = String(note).trim()
      if (notesMap[key]) {
        notesMap[key] = `${notesMap[key]} | ${val}`
      } else {
        notesMap[key] = val
      }
    }

    if (Object.keys(notesMap).length > 0) {
      await (orderModuleService as any).updateOrders([
        { id: order.id, metadata: { ...(order as any).metadata, notes_map: notesMap } },
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
