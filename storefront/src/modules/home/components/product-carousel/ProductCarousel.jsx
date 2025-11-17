"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'

const products = [
    {
        id: 'b1',
        title: 'Choinka dekoracyjna',
        price: 'od 12,90 zł',
        image: '/images/BestsellerySekcja/Choinka_Stojaca.webp',
        path: '/pl/products/drewniana-azurowa-choinka-3d-swiateczna-dekoracja-na-sto',
    },
    {
        id: 'b2',
        title: 'Cyfry urodzinowe',
        price: 'od 8,90 zł',
        image: '/images/BestsellerySekcja/CyfryUrodziny123.webp',
        path: '/pl/products/cyfra-urodzinowa-3d-ze-sklejki-dekoracja-na-roczek-urodziny',
    },
    {
        id: 'b3',
        title: 'Czołg – prezent urodzinowy',
        price: 'od 44,90 zł',
        image: '/images/BestsellerySekcja/CzolgPrezentNaUrodziny.webp',
        path: '/pl/products/drewniany-czog-na-puszki-500ml-oryginalny-personalizowany-prezent-urodzinowy',
    },
    {
        id: 'b4',
        title: 'Pudełko na urodziny ze świeczką',
        price: 'od 44,90 zł',
        image: '/images/BestsellerySekcja/PudelkoNaUrodzinyZeSwieczka.webp',
        path: '/pl/products/drewniane-pudeko-w-ksztacie-tortu-ze-swieczka',
    },
    {
        id: 'b5',
        title: 'Pudełko na wino – personalizowane',
        price: 'od 54,90 zł',
        image: '/images/BestsellerySekcja/PudelkoNaWinoPrezent74Tekst.webp',
        path: '/pl/products/drewniane-pudeko-na-wino-z-azurowa-kratka-i-sercami',
    },
    {
        id: 'b6',
        title: 'Pudełko choinka',
        price: 'od 75,90 zł',
        image: '/images/BestsellerySekcja/Pudelko_Choinka.webp',
        path: '/pl/products/drewniane-pudeko-swiateczne-choinka-z-azurowa-pokrywka',
    },
]

const ProductCard = ({ p }) => {
    const base = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '')
    const href = p.path ? (base ? `${base}${p.path}` : p.path) : (p.href || '#')

    return (
        <Link href={href} className="block mx-2">
            <div className="flex flex-col bg-white rounded-lg border border-ui-border-base shadow-sm overflow-hidden">
                <div className="h-48 w-full relative bg-gray-100">
                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4 flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-ui-fg-base">{p.title}</h3>
                    <div className="text-sm text-ui-fg-subtle">{p.price}</div>
                    <div className="mt-2">
                        <span className="inline-block bg-ui-primary text-white px-3 py-2 rounded text-sm">Zobacz</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const ProductCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false, draggable: true }, [Autoplay({ delay: 4000, stopOnInteraction: true })])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        setScrollSnaps(emblaApi.scrollSnapList())

        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', () => setScrollSnaps(emblaApi.scrollSnapList()))

        // initialize selected index
        onSelect()

        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi])

    return (
        <section className="w-full py-12">
            <div className="content-container">
                <div className="flex items-center justify-center gap-6 mb-6">
                    <button aria-label="Poprzedni" onClick={scrollPrev} className="hidden sm:inline-flex items-center justify-center bg-white rounded-full p-2 shadow hover:scale-105 transition-transform">
                        <FaChevronLeft size={16} />
                    </button>
                    <h2 className="text-2xl font-semibold text-center">Bestsellery i nowości</h2>
                    <button aria-label="Następny" onClick={scrollNext} className="hidden sm:inline-flex items-center justify-center bg-white rounded-full p-2 shadow hover:scale-105 transition-transform">
                        <FaChevronRight size={16} />
                    </button>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {products.map((p) => (
                            <div key={p.id} className="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0 p-2">
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination dots */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    {(scrollSnaps.length ? scrollSnaps : products.map((_, i) => i)).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                            className={`w-2 h-2 rounded-full ${selectedIndex === idx ? 'bg-black' : 'bg-gray-300'}`}
                            aria-label={`Przejdź do slajdu ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductCarousel
