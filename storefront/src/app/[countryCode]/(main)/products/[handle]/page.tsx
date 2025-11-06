import { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"
import ProductStructuredData from "@components/structured-data/product-schema"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProductByHandle(handle, region.id)

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} - Grawerowanie laserowe | Lumoria Studio`,
    description: product.description || `${product.title} - precyzyjne grawerowanie laserowe. Szybka realizacja 2-3 dni. Wysoka jakość. Personalizacja.`,
    keywords: [
      product.title,
      "grawerowanie laserowe",
      "dekoracje ze sklejki",
      "personalizacja",
      "prezent",
    ],
    openGraph: {
      title: `${product.title} | Lumoria Studio`,
      description: product.description || `${product.title} - grawerowanie laserowe`,
      images: product.thumbnail ? [product.thumbnail] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Lumoria Studio`,
      description: product.description || product.title,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
    alternates: {
      canonical: `/${params.countryCode}/products/${handle}`,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProductByHandle(params.handle, region.id)
  if (!pricedProduct) {
    notFound()
  }

  return (
    <>
      <ProductStructuredData
        product={pricedProduct}
        countryCode={params.countryCode}
      />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
      />
    </>
  )
}
