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

  // Store line-item notes and custom images as metadata for clarity and editability in Admin
  try {
    const currentMeta = (order as any).metadata ? { ...(order as any).metadata } : {}
    const lines: string[] = []
    const customImages: string[] = []

    for (const it of order.items || []) {
      const productTitle = it?.product_title || 'Produkt'
      const variantTitle = it?.variant_title ? ` (${it.variant_title})` : ''
      const sku = it?.variant_sku ? ` [${it.variant_sku}]` : ''

      // Handle notes
      const raw = (it?.metadata as any)?.notes
      const note = typeof raw === 'string' ? raw.trim() : ''
      if (note) {
        lines.push(`• ${productTitle}${variantTitle}${sku}: ${note}`)
      }

      // Handle custom images
      const images = (it?.metadata as any)?.customImages
      if (Array.isArray(images) && images.length > 0) {
        customImages.push(...images)
        console.log(`📸 Found ${images.length} custom images for ${productTitle}${variantTitle}${sku}:`, images)
      }
    }

    // Add notes summary if any
    if (lines.length > 0) {
      currentMeta["notes_summary"] = lines.join('\n')
    }

    // Add custom images if any - save as readable string format
    if (customImages.length > 0) {
      currentMeta["custom_images"] = customImages.join('\n')
      console.log(`📸 Added ${customImages.length} custom images to order metadata:`, customImages)
    }

    // Update order metadata if we have any data to add
    if (lines.length > 0 || customImages.length > 0) {
      await (orderModuleService as any).updateOrders([
        { id: order.id, metadata: currentMeta },
      ])
    }
  } catch (e) {
    console.warn('Could not aggregate line item metadata to order metadata:', e)
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
