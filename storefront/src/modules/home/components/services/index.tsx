import Image from "next/image"
import { Text } from "@medusajs/ui"

type ServiceItem = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

const services: ServiceItem[] = [
  {
    title: "Grawerowanie",
    description:
      "Precyzyjne grawerowanie na metalach, drewnie i tworzywach. Idealne do personalizacji i oznaczeń.",
    imageSrc: "/images/services-grawerowanie.jpg",
    imageAlt: "Usługa grawerowania",
  },
  {
    title: "Tabliczki znamionowe",
    description:
      "Projektujemy i wykonujemy trwałe tabliczki znamionowe z numerami seryjnymi i danymi technicznymi.",
    imageSrc: "/images/services-tabliczki.jpg",
    imageAlt: "Tabliczki znamionowe",
  },
  {
    title: "Płytki PCB",
    description:
      "Prototypowanie i małoseryjna produkcja płytek PCB z kontrolą jakości i szybkim terminem realizacji.",
    imageSrc: "/images/services-pcb.jpg",
    imageAlt: "Płytki PCB",
  },
]

const Services = () => {
  return (
    <section className="w-full">
      

        <div className="bg-white py-12 sm:py-16">
      <div className="content-container">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Usługi
          </h2>
          <Text className="mt-2 text-lg leading-8 text-gray-600">
            Znajdź idealny produkt na każdą okazję i do każdego wnętrza.
          </Text>
        </div>

        <div className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-md border border-ui-border-base bg-ui-bg-base overflow-hidden"
            >
              <div className="aspect-[16/9] w-full relative bg-ui-bg-subtle">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-5 small:p-6">
                <h3 className="text-base font-medium text-ui-fg-base mb-2">
                  {service.title}
                </h3>
                <p className="text-ui-fg-subtle text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default Services


