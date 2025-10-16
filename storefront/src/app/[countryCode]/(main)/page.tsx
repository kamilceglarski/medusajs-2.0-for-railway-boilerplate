import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

import TestimonialsSlider from "@modules/home/components/reviewSection/TestimonialsSlider";
import FeaturedCategories from "@modules/home/components/featured-categories"
import Services from "@modules/home/components/services"
import FAQ from "@modules/home/components/faq"


export const metadata: Metadata = {
  title: "Grawerowanie laserowe | Dekoracje ze sklejki | Lumoria Studio",
  description:
    "Lumoria Studio: grawerowanie laserowe, dekoracje i prezenty ze sklejki, personalizacja na zamówienie. Usługi grawerskie – Śląsk (Rybnik, Gliwice) i cała Polska.",
  keywords: [
    "grawerowanie laserowe", "usługi grawerskie", "precyzyjny grawer", "grawerowanie na zamówienie", "personalizacja laserowa",
    "grawerowanie w sklejce", "cięcie laserem sklejka", "wycinanie ze sklejki", "tabliczki grawerowane sklejka",
    "dekoracje ze sklejki", "prezenty grawerowane", "pamiątki grawerowane", "drewniane gadżety z grawerem",
    "dekoracje ślubne sklejka", "podziękowania dla gości grawerowane", "winietki ślubne sklejka", "toppery na tort grawerowane",
    "grawerowanie laserowe Śląsk", "dekoracje ze sklejki Śląsk", "usługi grawerskie Rybnik", "grawer Gliwice",
  ],
  openGraph: {
    title: "Lumoria Studio – grawerowanie laserowe i dekoracje ze sklejki",
    description:
      "Grawer laserem, personalizacja, dekoracje i prezenty ze sklejki. Realizacja na Śląsku i w całej Polsce.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumoria Studio – grawerowanie laserowe",
    description:
      "Precyzyjne grawerowanie laserowe i dekoracje ze sklejki. Personalizacja na zamówienie.",
  },
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <Services />
      <FAQ />
      <TestimonialsSlider />
    </>
  )
}