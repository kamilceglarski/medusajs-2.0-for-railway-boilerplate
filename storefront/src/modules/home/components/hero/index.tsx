"use client"

import Link from "next/link"
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
    <section className="relative h-screen w-full overflow-hidden border-b border-ui-border-base bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 -mt-16 pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300/40 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-amber-400/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-orange-200/60 rounded-lg rotate-12 animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="content-container">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
              ✨ Precyzyjne grawerowanie laserowe
            </div>

            {/* Main heading */}
            <h1 className={`text-5xl small:text-6xl font-bold tracking-tight text-gray-900 mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Grawerowanie laserowe <br />
              <span className="text-amber-600">
                {displayed}
                <span className="animate-pulse text-amber-400">|</span>
              </span>
              <br />
              <span className="text-4xl small:text-5xl text-gray-700">dekoracje ze sklejki</span>
            </h1>

            {/* Description */}
            <p className={`text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Tworzymy <strong className="text-amber-600">wyjątkowe dekoracje</strong> i <strong className="text-amber-600">precyzyjne grawery</strong> ze sklejki.
              Personalizowane tabliczki, dekoracje ślubne, prezenty i gadżety firmowe — wszystko na najwyższym poziomie.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col small:flex-row gap-4 mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Button asChild size="large" variant="primary" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold">
                <Link href="/search">Zobacz nasze produkty</Link>
              </Button>
              <Button asChild size="large" variant="secondary" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg font-semibold">
                <Link href="/contact">Bezpłatna wycena</Link>
              </Button>
            </div>

            {/* Features grid */}
            <div className={`grid grid-cols-1 small:grid-cols-3 gap-6 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-amber-200/50">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 text-lg">⚡</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Szybka realizacja</div>
                  <div className="text-sm text-gray-600">2-3 dni robocze</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-amber-200/50">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 text-lg">🎯</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Precyzyjny grawer</div>
                  <div className="text-sm text-gray-600">Laser CO2</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-amber-200/50">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 text-lg">🚚</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Darmowa dostawa</div>
                  <div className="text-sm text-gray-600">Od 100 zł</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated scroll arrow */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center text-amber-600 cursor-pointer group">
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
  )
}

export default Hero