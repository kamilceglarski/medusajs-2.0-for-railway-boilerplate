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
    imageSrc: "https://picsum.photos/seed/engrave/1200/800",
    imageAlt: "Usługa grawerowania",
  },
  {
    title: "Tabliczki znamionowe",
    description:
      "Projektujemy i wykonujemy trwałe tabliczki znamionowe z numerami seryjnymi i danymi technicznymi.",
    imageSrc: "https://picsum.photos/seed/nameplate/1200/800",
    imageAlt: "Tabliczki znamionowe",
  },
  {
    title: "Płytki PCB",
    description:
      "Prototypowanie i małoseryjna produkcja płytek PCB z kontrolą jakości i szybkim terminem realizacji.",
    imageSrc: "https://picsum.photos/seed/pcb/1200/800",
    imageAlt: "Płytki PCB",
  },
]

const Services = () => {
  return (
    <section id="uslugi" className="w-full">
      

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

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {services.map((service) => (
            <div key={service.title} className="group text-center">
              <div className="relative h-72 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
                  {service.title}
                </h3>
                <Text className="mt-2 text-sm text-gray-600">
                  {service.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default Services


