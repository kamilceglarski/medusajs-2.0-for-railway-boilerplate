import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Sklep – Grawerowanie laserowe i dekoracje ze sklejki | Lumoria Studio",
  description: "Wszystkie produkty: grawerowanie laserowe, dekoracje i prezenty ze sklejki, personalizacja na zamówienie.",
  keywords: ["grawerowanie laserowe", "dekoracje ze sklejki", "prezenty grawerowane", "personalizacja"],
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
