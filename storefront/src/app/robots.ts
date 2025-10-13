import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:8000"
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/account"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
