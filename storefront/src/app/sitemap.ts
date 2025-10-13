import type { MetadataRoute } from "next"
import { listCategories } from "@lib/data/categories"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:8000"
  const country = "pl"

  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/${country}`, changefreq: "weekly", priority: 1 },
    { url: `${base}/${country}/store`, changefreq: "weekly", priority: 0.9 },
    { url: `${base}/${country}/categories`, changefreq: "weekly", priority: 0.8 },
  ]

  try {
    const cats = await listCategories()
    for (const c of cats || []) {
      urls.push({
        url: `${base}/${country}/categories/${encodeURIComponent(c.handle)}`,
        changefreq: "weekly",
        priority: 0.7,
      })
    }
  } catch {}

  return urls
}
