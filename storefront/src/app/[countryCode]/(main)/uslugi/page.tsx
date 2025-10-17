import { Metadata } from "next"
import ServicesClient from "./services-client"

export const metadata: Metadata = {
    title: "Usługi – Grawerowanie laserowe i dekoracje ze sklejki | Lumoria Studio",
    description: "Oferujemy precyzyjne grawerowanie laserowe, dekoracje ze sklejki, personalizowane prezenty i gadżety firmowe. Szybka realizacja 2-3 dni robocze.",
    keywords: [
        "grawerowanie laserowe",
        "dekoracje ze sklejki",
        "personalizowane prezenty",
        "gadżety firmowe",
        "dekoracje ślubne",
        "tabliczki grawerowane",
        "laser CO2"
    ],
}

const ServicesPage = () => {
    return <ServicesClient />
}

export default ServicesPage
