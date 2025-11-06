import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import StructuredData from "@components/structured-data"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Lumoria Studio - Precyzyjne grawerowanie laserowe Rybnik | Dekoracje ze sklejki",
    template: "%s | Lumoria Studio"
  },
  description: "Lumoria Studio w Rybniku - tworzymy wyjątkowe dekoracje i precyzyjne grawery ze sklejki. Personalizowane tabliczki, dekoracje ślubne, prezenty i gadżety firmowe. Szybka realizacja 2-3 dni robocze. Tel: 737-268-975",
  keywords: [
    "grawerowanie laserowe",
    "grawerowanie laserowe Rybnik",
    "dekoracje ze sklejki",
    "dekoracje ze sklejki Rybnik",
    "personalizowane tabliczki",
    "dekoracje ślubne",
    "gadżety firmowe",
    "laser CO2",
    "precyzyjne grawery",
    "Lumoria Studio",
    "grawerowanie laserowe Polska",
    "grawerowanie Śląsk",
    "prezenty personalizowane",
    "drewniane dekoracje",
    "bombki z grawerem",
    "toppery na tort",
    "dekoracje urodzinowe",
    "dekoracje świąteczne",
    "walentynki prezenty",
    "tabliczki drewniane",
    "Rybnik",
  ],
  authors: [{ name: "Lumoria Studio" }],
  creator: "Lumoria Studio",
  publisher: "Lumoria Studio",
  category: "E-commerce",
  applicationName: "Lumoria Studio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: getBaseURL(),
    siteName: "Lumoria Studio",
    title: "Lumoria Studio - Precyzyjne grawerowanie laserowe Rybnik",
    description: "Lumoria Studio w Rybniku - tworzymy wyjątkowe dekoracje i precyzyjne grawery ze sklejki. Personalizowane tabliczki, dekoracje ślubne, prezenty i gadżety firmowe. Szybka realizacja 2-3 dni.",
    images: [
      {
        url: "/images/LOGO_DUZE_JAKOSC_2.webp",
        width: 1200,
        height: 630,
        alt: "Lumoria Studio - Precyzyjne grawerowanie laserowe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumoria Studio - Precyzyjne grawerowanie laserowe Rybnik",
    description: "Tworzymy wyjątkowe dekoracje i precyzyjne grawery ze sklejki w Rybniku. Szybka realizacja 2-3 dni robocze. Tel: 737-268-975",
    images: ["/images/LOGO_DUZE_JAKOSC_2.webp"],
    creator: "@lumoriastudio",
  },
  alternates: {
    canonical: getBaseURL(),
    languages: {
      'pl-PL': `${getBaseURL()}/pl`,
    },
  },
  verification: {
    google: "j5eg3CSJw6IRTiZrMfQg2JDzz_rTsjuXg-Y8eCDyi0I",
    // Dodaj inne weryfikacje gdy będą dostępne:
    // yandex: "your-yandex-verification-code",
    // other: {
    //   me: ['your-email@domain.com', 'https://your-link.com'],
    // },
  },
  other: {
    "google-site-verification": "j5eg3CSJw6IRTiZrMfQg2JDzz_rTsjuXg-Y8eCDyi0I",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pl" data-mode="light">
      <head>
        <StructuredData />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
