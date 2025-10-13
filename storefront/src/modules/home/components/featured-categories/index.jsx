// src/modules/home/components/featured-categories.tsx
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"
import Image from "next/image"

// ZMIANA: Nowe, dopracowane opisy i te same dane co poprzednio
const popularCategories = [
  {
    name: "Dekoracje Ścienne",
    description: "Ożyw swoje ściany unikalnymi mapami, mandalami i cytatami wyciętymi z laserową precyzją.",
    imageUrl: "/images/kategoria-dekoracje.jpg",
    handle: "/categories/dekoracje-scienne",
  },
  {
    name: "Personalizowane Prezenty",
    description: "Podaruj coś wyjątkowego. Grawerujemy Twoje pomysły na drewnie i szkle, tworząc pamiątki na lata.",
    imageUrl: "/images/kategoria-prezenty.jpg",
    handle: "/categories/personalizowane-prezenty",
  },
  {
    name: "Ozdoby Sezonowe",
    description: "Dodaj magii świętom i specjalnym okazjom dzięki naszym ozdobom na Boże Narodzenie, Wielkanoc i nie tylko.",
    imageUrl: "/images/kategoria-ozdoby.jpg",
    handle: "/categories/ozdoby-sezonowe",
  },
]

const FeaturedCategories = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="content-container">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Odkryj Nasze Kategorie
          </h2>
          <Text className="mt-2 text-lg leading-8 text-gray-600">
            Znajdź idealny produkt na każdą okazję i do każdego wnętrza.
          </Text>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {popularCategories.map((category) => (
            <LocalizedClientLink href={category.handle} key={category.name} className="group text-center">
              {/* ZMIANA: Ustawiono stałą wysokość kontenera obrazu dla idealnego wyrównania */}
              <div className="relative h-72 w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={category.imageUrl}
                  alt={`Zdjęcie kategorii ${category.name}`}
                  fill // Używamy 'fill' dla lepszego dopasowania
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* ZMIANA: Poprawiono strukturę i style tekstu */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
                  {category.name}
                </h3>
                <Text className="mt-2 text-sm text-gray-600">
                  {category.description}
                </Text>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedCategories