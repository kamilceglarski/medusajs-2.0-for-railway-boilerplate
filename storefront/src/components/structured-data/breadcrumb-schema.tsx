"use client"

import Script from "next/script"

type BreadcrumbItem = {
    name: string
    url: string
}

type BreadcrumbSchemaProps = {
    items: BreadcrumbItem[]
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl"

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
        }))
    }

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema),
            }}
        />
    )
}
