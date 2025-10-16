"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@medusajs/ui"

const words = ["personalizowane", "wyjątkowe", "na wymiar"]

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const current = words[wordIndex]
    const isWordComplete = !deleting && displayed === current
    const isWordEmpty = deleting && displayed.length === 0

    const delay = isWordComplete ? 900 : isWordEmpty ? 500 : deleting ? 110 : 140

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

  // Ensure autoplay on mount (fallback for stricter browsers)
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const tryPlay = async () => {
      try {
        await el.play()
      } catch (_e) {
        // Best-effort: keep muted and attempt again shortly
        setTimeout(() => {
          el.play().catch(() => { })
        }, 300)
      }
    }
    tryPlay()
  }, [])

  // Scroll to next section function
  const scrollToNext = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden border-b border-ui-border-base bg-ui-bg-subtle -mt-16 pt-16">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-background.png"
        src="/videos/hero.mp4"
      />

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="content-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl small:text-5xl font-semibold tracking-tight text-white">
              Grawer i dekoracje ze sklejki <br />
              <span className="ml-2 text-ui-bg-base px-2 py-1 rounded bg-white/10">
                {displayed}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Personalizowane tabliczki, dekoracje i prezenty ze sklejki — precyzyjny grawer, szybka realizacja.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button asChild size="large" variant="primary">
                <Link href="/search">Zamów personalizację</Link>
              </Button>
            </div>

            {/* Logos row */}
            <div className="mt-8 flex items-center gap-6 text-white/70">
              <span className="text-sm">Zaufali nam:</span>
              <ul className="flex items-center gap-4 text-sm">
                <li className="opacity-80">TechCrunch</li>
                <li className="opacity-80">Forbes</li>
                <li className="opacity-80">Google</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Animated scroll arrow */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center text-white/80 cursor-pointer group">
          <span className="text-sm mb-3 animate-pulse group-hover:animate-none">Zobacz więcej</span>
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