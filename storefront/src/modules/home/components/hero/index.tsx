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

  return (
    <section className="relative h-[80vh] w-full overflow-hidden border-b border-ui-border-base bg-ui-bg-subtle">
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
    </section>
  )
}

export default Hero