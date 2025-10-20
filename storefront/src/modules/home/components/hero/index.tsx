"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@medusajs/ui"

const words = ["precyzyjne", "wyjątkowe", "na wymiar", "profesjonalne"]

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const current = words[wordIndex]
    const isWordComplete = !deleting && displayed === current
    const isWordEmpty = deleting && displayed.length === 0

    const delay = isWordComplete ? 1200 : isWordEmpty ? 600 : deleting ? 80 : 120

    const timeout = setTimeout(() => {
      if (isWordComplete) {
        setDeleting(true)
        return
      }
      if (isWordEmpty) {
        setDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return
      }

      if (!deleting) {
        const next = current.slice(0, displayed.length + 1)
        setDisplayed(next)
      } else {
        const next = current.slice(0, displayed.length - 1)
        setDisplayed(next)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex])

  // Scroll to next section function
  const scrollToNext = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lumoria Studio",
            "description": "Tworzymy wyjątkowe dekoracje i precyzyjne grawery ze sklejki. Personalizowane tabliczki, dekoracje ślubne, prezenty i gadżety firmowe.",
            "url": "https://lumoria-studio.com",
            "logo": "https://lumoria-studio.com/images/LOGO_DUZE_JAKOSC.png",
            "image": "https://lumoria-studio.com/images/LOGO_DUZE_JAKOSC.png",
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "Polish"
            },
            "offers": {
              "@type": "Offer",
              "description": "Precyzyjne grawerowanie laserowe i dekoracje ze sklejki",
              "price": "Od 50 zł",
              "priceCurrency": "PLN",
              "availability": "https://schema.org/InStock",
              "deliveryTime": "2-3 dni robocze"
            },
            "service": {
              "@type": "Service",
              "name": "Grawerowanie laserowe",
              "description": "Precyzyjne grawerowanie laserowe CO2 na sklejce",
              "provider": {
                "@type": "Organization",
                "name": "Lumoria Studio"
              }
            }
          })
        }}
      />
      <section className="relative min-h-[100dvh] w-full overflow-hidden border-b border-ui-border-base bg-white -mt-16 pt-16 pb-24 sm:pb-16" role="banner" aria-label="Główna sekcja Lumoria Studio">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full animate-pulse" style={{ backgroundColor: '#0E3E4D30' }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-lg rotate-45 animate-bounce" style={{ backgroundColor: '#B5764140', animationDuration: '3s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 rounded-full animate-pulse" style={{ backgroundColor: '#0E3E4D50', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 rounded-lg rotate-12 animate-bounce" style={{ backgroundColor: '#B5764160', animationDuration: '4s', animationDelay: '2s' }}></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 min-h-full w-full flex items-center py-8 sm:py-12">
          <div className="content-container px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              {/* Logo and Badge - Centered on mobile, left aligned on desktop */}
              <div className={`flex flex-col sm:flex-row items-center sm:items-start sm:items-center gap-6 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Image
                    src="/images/LOGO_DUZE_JAKOSC.png"
                    alt="Lumoria Studio - Logo firmy specjalizującej się w precyzyjnym grawerowaniu laserowym i dekoracjach ze sklejki"
                    width={240}
                    height={120}
                    className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto object-contain drop-shadow-lg"
                    priority
                    aria-label="Logo Lumoria Studio"
                  />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium shadow-md" style={{ backgroundColor: '#0E3E4D20', color: '#0E3E4D' }}>
                  <span className="w-2 h-2 rounded-full mr-3 animate-pulse" style={{ backgroundColor: '#0E3E4D' }}></span>
                  ✨ Precyzyjne grawerowanie laserowe
                </div>
              </div>

              {/* Main heading */}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center sm:text-left transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#0E3E4D' }}>
                <span className="block">Grawerowanie laserowe</span>
                <span className="block" style={{ color: '#B57641' }} aria-live="polite" aria-label={`Animowane słowo: ${displayed}`}>
                  {displayed}
                  <span className="animate-pulse" style={{ color: '#B57641' }} aria-hidden="true">|</span>
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ color: '#0E3E4D' }}>dekoracje ze sklejki</span>
              </h1>

              {/* Description */}
              <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl leading-relaxed text-center sm:text-left transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#0E3E4D' }}>
                Tworzymy <strong style={{ color: '#B57641' }}>wyjątkowe dekoracje</strong> i <strong style={{ color: '#B57641' }}>precyzyjne grawery</strong> ze sklejki.
                Personalizowane tabliczki, dekoracje ślubne, prezenty i gadżety firmowe — wszystko na najwyższym poziomie.
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 items-center sm:items-start transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} role="group" aria-label="Główne akcje">
                <Button asChild size="large" variant="primary" className="text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto" style={{ backgroundColor: '#0E3E4D' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0A2F3A'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0E3E4D'} aria-label="Przejdź do katalogu produktów Lumoria Studio">
                  <Link href="/store">Zobacz nasze produkty</Link>
                </Button>
                <Button asChild size="large" variant="secondary" className="border-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto" style={{ borderColor: '#B57641', color: '#B57641' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#B57641'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#B57641'; }} aria-label="Zamów bezpłatną wycenę grawerowania laserowego">
                  <Link href="/contact">Bezpłatna wycena</Link>
                </Button>
              </div>

              {/* Features grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center sm:justify-items-start transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} role="list" aria-label="Zalety usług Lumoria Studio">
                <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 border" style={{ borderColor: '#0E3E4D30' }} role="listitem">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0E3E4D20' }} aria-hidden="true">
                    <span className="text-base sm:text-lg" style={{ color: '#0E3E4D' }}>⚡</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base" style={{ color: '#0E3E4D' }}>Szybka realizacja</div>
                    <div className="text-xs sm:text-sm" style={{ color: '#0E3E4D' }}>2-3 dni robocze</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 border" style={{ borderColor: '#B5764130' }} role="listitem">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#B5764120' }} aria-hidden="true">
                    <span className="text-base sm:text-lg" style={{ color: '#B57641' }}>🎯</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base" style={{ color: '#0E3E4D' }}>Precyzyjny grawer</div>
                    <div className="text-xs sm:text-sm" style={{ color: '#0E3E4D' }}>Laser CO2</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 border sm:col-span-2 lg:col-span-1" style={{ borderColor: '#0E3E4D30' }} role="listitem">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0E3E4D20' }} aria-hidden="true">
                    <span className="text-base sm:text-lg" style={{ color: '#0E3E4D' }}>🚚</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base" style={{ color: '#0E3E4D' }}>Darmowa dostawa</div>
                    <div className="text-xs sm:text-sm" style={{ color: '#0E3E4D' }}>Od 100 zł</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated scroll arrow */}
        <div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          onClick={scrollToNext}
          role="button"
          tabIndex={0}
          aria-label="Przewiń do następnej sekcji"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              scrollToNext()
            }
          }}
        >
          <div className="flex flex-col items-center cursor-pointer group" style={{ color: '#0E3E4D' }}>
            <span className="text-sm mb-3 animate-pulse group-hover:animate-none font-medium">Zobacz więcej</span>
            <div className="animate-bounce group-hover:animate-none transition-transform duration-500 group-hover:translate-y-1" style={{ animationDuration: '2s' }}>
              <svg
                className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero