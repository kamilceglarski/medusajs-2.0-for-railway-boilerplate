"use client"
// src/components/TestimonialsSlider.jsx

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Twoja lista opinii (pozostaje bez zmian)
const testimonials = [
  {
    name: 'Artur',
    location: 'Łódź',
    rating: 5,
    text: 'Wysłałem zapytanie o cięcie laserem na adres mailowy. Jeszcze tego samego dnia dostałem odpowiedź z wyceną. Okazało się, że firma posiada w swojej ofercie szeroki wachlarz sklejek. Towar dotarł do mnie w trzy dni robocze. Polecam!',
  },
  {
    name: 'Joanna',
    location: 'Kraków',
    rating: 5,
    text: 'Wpadłam na pomysł tworzenia tablic sensorycznych dla dziecka. Z pomocą przyszła mi firma i ich cięcie laserem. Nie tylko wycięli dla mnie wszystkie potrzebne elementy, ale również pomogli w przygotowaniu projektu! Efekty idealnie pasowały.',
  },
  {
    name: 'Antoni',
    location: 'Warszawa',
    rating: 4,
    text: 'Jako nieliczni są w stanie wykonać cięcie laserowe w małych seriach prototypowych. Współpraca układa się dobrze, ze względu na szybki czas realizacji oraz dostępność materiału od ręki. Wycinanie laserowe daje nam duże możliwości.',
  },
  {
    name: 'Katarzyna',
    location: 'Gdańsk',
    rating: 5,
    text: 'Pełen profesjonalizm i wspaniałe doradztwo. Moje personalizowane podkładki pod kubki wyszły idealnie, goście byli zachwyceni. Na pewno wrócę po więcej!',
  },
  {
    name: 'Michał',
    location: 'Poznań',
    rating: 5,
    text: 'Zamówiłem grawerowaną mapę miasta na prezent. Jakość wykonania przerosła moje oczekiwania. Precyzja cięcia i dbałość o detale na najwyższym poziomie. Obdarowany był zachwycony. Szybka wysyłka i świetny kontakt.',
  },
  {
    name: 'Ewelina',
    location: 'Wrocław',
    rating: 5,
    text: 'Niesamowite ozdoby świąteczne! Zamówiłam zestaw ażurowych bombek ze sklejki. Są lekkie, pięknie wykonane i dodały naszym świętom wyjątkowego klimatu. Polecam każdemu, kto ceni sobie oryginalny design i jakość.',
  },
]

const StarRating = ({ rating }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ))}
  </div>
)

const TestimonialsSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false }, [Autoplay({ delay: 5000, stopOnInteraction: true })])
  // Zmiana: dodano align: 'start' i skipSnaps: false dla lepszego zachowania mobilnego

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  return (
    <section className="w-full bg-ui-bg-subtle py-16 sm:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative">
        <h2 className="text-3xl font-semibold text-ui-fg-base sm:text-4xl mb-12">
          Zobacz, co mówią o nas klienci
        </h2>

        {/* Strzałki nawigacyjne */}
        <button
            className="absolute top-1/2 left-2 md:-left-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white shadow-md transition-all z-10"
            onClick={scrollPrev}
            aria-label="Poprzednia opinia"
        >
            <FaChevronLeft size={24} />
        </button>
        <button
            className="absolute top-1/2 right-2 md:-right-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white shadow-md transition-all z-10"
            onClick={scrollNext}
            aria-label="Następna opinia"
        >
            <FaChevronRight size={24} />
        </button>

        <div className="overflow-hidden mx-auto" ref={emblaRef}>
          {/* Usunąłem pl-4 z diva slajdu i przeniosłem padding do kontenera z treścią */}
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0" // Usunięto px-2/pl-4
                key={index}
              >
                {/* Dodano padding do wewnętrznego diva z treścią, aby lepiej kontrolować odstępy */}
                <div className="flex flex-col h-full bg-white p-6 sm:p-8 text-left rounded-lg border border-ui-border-base shadow-sm mx-2"> {/* Dodano mx-2 dla odstępu między slajdami */}
                  <StarRating rating={testimonial.rating} />
                  <p className="flex-grow text-ui-fg-subtle mb-6 text-sm">{`"${testimonial.text}"`}</p>
                  <footer>
                    <p className="font-semibold text-ui-fg-base">{testimonial.name}</p>
                    <p className="text-sm text-ui-fg-muted">{testimonial.location}</p>
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSlider