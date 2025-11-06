"use client"

import Script from "next/script"
import { HttpTypes } from "@medusajs/types"

type ProductStructuredDataProps = {
    product: HttpTypes.StoreProduct
    countryCode: string
}

export default function ProductStructuredData({
    product,
    countryCode,
}: ProductStructuredDataProps) {
    const baseUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl"

    // Pobierz cenę produktu (pierwsza wariant)
    const variant = product.variants?.[0]
    const price = variant?.calculated_price?.calculated_amount
        ? (variant.calculated_price.calculated_amount / 100).toFixed(2)
        : "0.00"

    const currency = variant?.calculated_price?.currency_code?.toUpperCase() || "PLN"

    // Pobierz URL pierwszego zdjęcia
    const imageUrl = product.thumbnail || product.images?.[0]?.url || `${baseUrl}/images/LOGO_DUZE_JAKOSC_2.webp`

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "description": product.description || product.subtitle || "Produkt z grawerowaniem laserowym",
        "image": imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`,
        "url": `${baseUrl}/${countryCode}/products/${product.handle}`,
        "sku": product.id,
        "brand": {
            "@type": "Brand",
            "name": "Lumoria Studio"
        },
        "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/${countryCode}/products/${product.handle}`,
            "priceCurrency": currency,
            "price": price,
            "availability": product.status === "published"
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "Organization",
                "name": "Lumoria Studio"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "1"
        }
    }

    return (
        <Script
            id={`product-schema-${product.id}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(productSchema),
            }}
        />
    )
}
