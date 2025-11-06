import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:8000"
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/pl/",
          "/pl/store",
          "/pl/products/",
          "/pl/categories/",
          "/pl/collections/",
          "/pl/uslugi",
          "/pl/contact",
          "/pl/customer-service",
        ],
        disallow: [
          "/api/",
          "/account/",
          "/checkout/",
          "/cart/",
          "/_next/",
          "/admin/",
          "/*.json$",
          "/pl/account/",
          "/pl/checkout/",
        ],
        crawlDelay: 1,
      },
      // Specjalne reguły dla Google Bot (bez ograniczeń)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/account/", "/checkout/", "/cart/"],
      },
      // Specjalne reguły dla Bing Bot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/account/", "/checkout/", "/cart/"],
      },
    ],
    sitemap: `${base}/pl/sitemap.xml`,
  }
}

