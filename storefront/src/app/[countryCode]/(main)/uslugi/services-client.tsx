"use client"

import { useEffect, useState } from "react"
import { Button } from "@medusajs/ui"
import { ArrowRightMini, CheckCircleSolid, StarSolid, Camera, ShieldCheck, CreditCard } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ServicesClient = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [activeService, setActiveService] = useState(0)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const services = [
        {
            id: 1,
            title: "Grawerowanie laserowe",
            description: "Precyzyjne grawerowanie na sklejce, drewnie, skórze i innych materiałach",
            features: [
                "Laser CO2 najwyższej jakości",
                "Precyzja do 0.1mm",
                "Wszystkie materiały",
                "Projekty 2D i 3D"
            ],
            icon: "⚡",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200"
        },
        {
            id: 2,
            title: "Dekoracje ślubne",
            description: "Unikalne dekoracje na ślub - tabliczki, numery stolików, dekoracje sali",
            features: [
                "Personalizowane tabliczki",
                "Numery stolików",
                "Dekoracje sali weselnej",
                "Pamiątki ślubne"
            ],
            icon: "💍",
            color: "from-pink-500 to-rose-500",
            bgColor: "bg-pink-50",
            borderColor: "border-pink-200"
        },
        {
            id: 3,
            title: "Gadżety firmowe",
            description: "Profesjonalne gadżety firmowe - tabliczki, szyldy, znaki firmowe",
            features: [
                "Szyldy firmowe",
                "Tabliczki biurowe",
                "Znaki informacyjne",
                "Gadżety promocyjne"
            ],
            icon: "🏢",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50",
            borderColor: "border-green-200"
        },
        {
            id: 4,
            title: "Prezenty personalizowane",
            description: "Wyjątkowe prezenty na każdą okazję - urodziny, rocznice, święta",
            features: [
                "Prezenty urodzinowe",
                "Pamiątki rocznicowe",
                "Dekoracje świąteczne",
                "Prezenty dla dzieci"
            ],
            icon: "🎁",
            color: "from-purple-500 to-violet-500",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200"
        }
    ]

    const advantages = [
        {
            icon: <Camera className="w-6 h-6" />,
            title: "Szybka realizacja",
            description: "2-3 dni robocze"
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Gwarancja jakości",
            description: "100% satysfakcji"
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: "Darmowa dostawa",
            description: "Od 200 zł"
        },
        {
            icon: <StarSolid className="w-6 h-6" />,
            title: "Doświadczenie",
            description: "5+ lat na rynku"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200/40 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-green-200/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-purple-200/60 rounded-lg rotate-12 animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            Nasze <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">usługi</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Precyzyjne grawerowanie laserowe, dekoracje ze sklejki i personalizowane prezenty.
                            Tworzymy wyjątkowe rzeczy na każdą okazję.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <Button asChild size="large" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                            <LocalizedClientLink href="/store" className="flex items-center">
                                Zobacz nasze produkty
                                <ArrowRightMini className="w-5 h-5 ml-2" />
                            </LocalizedClientLink>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Co oferujemy
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Kompleksowe usługi grawerowania laserowego i tworzenia dekoracji ze sklejki
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${service.bgColor} ${service.borderColor} border-2`}
                                style={{
                                    animationDelay: `${index * 200}ms`,
                                    animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                                }}
                                onMouseEnter={() => setActiveService(index)}
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                                            {service.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-3">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-slate-700 group-hover:text-slate-800 transition-colors">
                                                <CheckCircleSolid className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Dlaczego wybrać nas?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Profesjonalne podejście, najwyższa jakość i szybka realizacja
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {advantages.map((advantage, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center group"
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                    animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                                }}
                            >
                                <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                    <div className="flex items-center justify-center w-full h-full ml-0.5 mt-0.5">
                                        {advantage.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {advantage.title}
                                </h3>
                                <p className="text-slate-600">
                                    {advantage.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Gotowy na wyjątkowy projekt?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Skontaktuj się z nami i omówmy Twój pomysł. Stworzymy coś wyjątkowego!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button asChild size="large" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold w-full sm:w-auto max-w-xs">
                            <LocalizedClientLink href="/contact" className="flex items-center justify-center w-full">Bezpłatna wycena</LocalizedClientLink>
                        </Button>
                        <Button asChild size="large" variant="transparent" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold w-full sm:w-auto max-w-xs">
                            <LocalizedClientLink href="/store" className="flex items-center justify-center w-full">Zobacz produkty</LocalizedClientLink>
                        </Button>
                    </div>
                </div>
            </section>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    )
}

export default ServicesClient
