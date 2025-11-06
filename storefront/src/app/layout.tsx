import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Lumoria Studio - Precyzyjne grawerowanie laserowe i dekoracje ze sklejki",
    template: "%s | Lumoria Studio"
  },
  description: "Tworzymy wyjątkowe dekoracje i precyzyjne grawery ze sklejki. Personalizowane tabliczki, dekoracje ślubne, prezenty i gadżety firmowe. Szybka realizacja 2-3 dni robocze.",
  keywords: [
    "grawerowanie laserowe",
    "dekoracje ze sklejki",
    "personalizowane tabliczki",
    "dekoracje ślubne",
    "gadżety firmowe",
    "laser CO2",
    "precyzyjne grawery",
    "Lumoria Studio"
  ],
  authors: [{ name: "Lumoria Studio" }],
  creator: "Lumoria Studio",
  publisher: "Lumoria Studio",
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
    title: "Lumoria Studio - Precyzyjne grawerowanie laserowe i dekoracje ze sklejki",
    description: "Tworzymy wyjątkowe dekoracje i precyzyjne grawery ze sklejki. Personalizowane tabliczki, dekoracje ślubne, prezenty i gadżety firmowe.",
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
    title: "Lumoria Studio - Precyzyjne grawerowanie laserowe",
    description: "Tworzymy wyjątkowe dekoracje i precyzyjne grawery ze sklejki. Szybka realizacja 2-3 dni robocze.",
    images: ["/images/LOGO_DUZE_JAKOSC_2.webp"],
  },
  alternates: {
    canonical: getBaseURL(),
  },
  verification: {
    google: "j5eg3CSJw6IRTiZrMfQg2JDzz_rTsjuXg-Y8eCDyi0I",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pl" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
