import type { MetadataRoute } from "next"
import { listCategories } from "@lib/data/categories"
import { getProductsList } from "@lib/data/products"
import { getCollectionsList } from "@lib/data/collections"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:8000"
  const country = "pl"

  const urls: MetadataRoute.Sitemap = [
    // Strona główna - najwyższy priorytet
    {
      url: `${base}/${country}`,
      changeFrequency: "daily",
      priority: 1.0,
      lastModified: new Date()
    },

    // Strony główne
    {
      url: `${base}/${country}/store`,
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date()
    },

    // Strony statyczne - usługi, kontakt, obsługa klienta
    {
      url: `${base}/${country}/uslugi`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: new Date()
    },
    {
      url: `${base}/${country}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: new Date()
    },
    {
      url: `${base}/${country}/customer-service`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: new Date()
    },
  ]

  // Dodaj kategorie
  try {
    const cats = await listCategories()
    for (const c of cats || []) {
      urls.push({
        url: `${base}/${country}/categories/${encodeURIComponent(c.handle)}`,
        changeFrequency: "weekly",
        priority: 0.8,
        lastModified: new Date(c.updated_at || c.created_at || new Date())
      })
    }
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error)
  }

  // Dodaj kolekcje
  try {
    const collections = await getCollectionsList(0, 100)
    for (const collection of collections.collections || []) {
      urls.push({
        url: `${base}/${country}/collections/${encodeURIComponent(collection.handle)}`,
        changeFrequency: "weekly",
        priority: 0.7,
        lastModified: new Date(collection.updated_at || collection.created_at || new Date())
      })
    }
  } catch (error) {
    console.error("Error fetching collections for sitemap:", error)
  }

  // Dodaj produkty
  try {
    const { response } = await getProductsList({
      pageParam: 0,
      queryParams: { limit: 100 },
      countryCode: country
    })

    for (const product of response.products || []) {
      urls.push({
        url: `${base}/${country}/products/${encodeURIComponent(product.handle)}`,
        changeFrequency: "weekly",
        priority: 0.6,
        lastModified: new Date(product.updated_at || product.created_at || new Date())
      })
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error)
  }

  return urls
}

