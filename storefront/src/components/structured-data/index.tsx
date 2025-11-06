import Script from "next/script"

export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Lumoria Studio",
        "description": "Precyzyjne grawerowanie laserowe i dekoracje ze sklejki. Personalizowane tabliczki, dekoracje ślubne, prezenty i gadżety firmowe.",
        "url": process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl",
        "logo": `${process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl"}/images/LOGO_DUZE_JAKOSC_2.webp`,
        "image": `${process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl"}/images/LOGO_DUZE_JAKOSC_2.webp`,
        "foundingDate": "2024",
        "sameAs": [
            "https://www.facebook.com/lumoriastudio",
            "https://www.instagram.com/lumoria_studio/",
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "telephone": "+48-737-268-975",
            "availableLanguage": ["Polish", "pl"]
        }
    }

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl",
        "name": "Lumoria Studio",
        "description": "Precyzyjne grawerowanie laserowe i dekoracje ze sklejki",
        "url": process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl",
        "telephone": "+48-737-268-975",
        "priceRange": "$$",
        "image": `${process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl"}/images/LOGO_DUZE_JAKOSC_2.webp`,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "PL",
            "addressLocality": "Rybnik",
            "addressRegion": "Śląskie"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.08378641152977,
            "longitude": 18.446463426426664
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "07:00",
                "closes": "21:00"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/lumoriastudio",
            "https://www.instagram.com/lumoria_studio/"
        ]
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Lumoria Studio",
        "url": process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${process.env.NEXT_PUBLIC_STOREFRONT_URL || "https://lumoriastudio.pl"}/pl/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    }

    return (
        <>
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <Script
                id="local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
                }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </>
    )
}
