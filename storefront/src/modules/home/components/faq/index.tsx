"use client"

import { useState } from "react"
import { Heading, Text } from "@medusajs/ui"
import { ChevronDown } from "@medusajs/icons"

const faqData = [
    {
        question: "Jakie materiały oferujecie do grawerowania?",
        answer: "Właściwie na każdym materiale możemy grawerować. Najpopularniejsze materiały to sklejka, akryl, skóra, szkło, metal, aluminium."
    },
    {
        question: "Jakie są ceny za grawerowanie?",
        answer: "Ceny zależą od rozmiaru, złożoności projektu i ilości sztuk. Przy większych zamówieniach oferujemy atrakcyjne rabaty. Wyślij nam projekt, a wycenimy go bezpłatnie."
    },
    {
        question: "W jakich formatach mogę przesłać projekt?",
        answer: "Przyjmujemy projekty w każdym formacie; ważne, aby zdjęcia miały dobrą rozdzielczość. W przypadku plików wektorowych (AI, EPS, PDF) zapewniamy najlepszą jakość."
    },
    {
        question: "Czy oferujecie darmową dostawę?",
        answer: "Tak, od zamówień powyżej 200 zł oferujemy darmową dostawę."
    }
]

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-16 bg-ui-bg-subtle">
            <div className="content-container">
                <div className="text-center mb-12">
                    <Heading level="h2" className="text-3xl font-bold mb-4">
                        Najczęściej zadawane pytania
                    </Heading>
                    <Text className="text-ui-fg-subtle text-lg">
                        Odpowiedzi na najważniejsze pytania o nasze usługi grawerskie
                    </Text>
                </div>

                <div className="max-w-3xl mx-auto">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="mb-4 border border-ui-border-base rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-ui-bg-subtle transition-colors duration-200"
                            >
                                <Text className="font-medium text-ui-fg-base pr-4">
                                    {faq.question}
                                </Text>
                                <div className="flex-shrink-0">
                                    <ChevronDown
                                        className={`w-5 h-5 text-ui-fg-muted transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index
                                    ? 'max-h-96 opacity-100'
                                    : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-4">
                                    <Text className="text-ui-fg-subtle leading-relaxed">
                                        {faq.answer}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Text className="text-ui-fg-subtle mb-4">
                        Nie znalazłeś odpowiedzi na swoje pytanie?
                    </Text>
                    <a
                        href="/contact"
                        className="inline-flex items-center text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium transition-colors duration-200"
                    >
                        Skontaktuj się z nami
                        <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default FAQ
