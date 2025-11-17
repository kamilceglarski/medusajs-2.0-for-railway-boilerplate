import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Obsługa Klienta | Lumoria Studio",
    description: "Informacje o dostawie, zwrotach, reklamacjach i najczęściej zadawane pytania dotyczące naszych usług grawerowania laserowego.",
}

export default function CustomerServicePage() {
    return (
        <div className="content-container py-10 sm:py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: "#0E3E4D" }}>
                    Obsługa Klienta
                </h1>
                <p className="text-ui-fg-subtle mb-10 text-base sm:text-lg">
                    Wszystko, co musisz wiedzieć o zamówieniach, dostawie i zwrotach.
                </p>

                <div className="space-y-8">
                    {/* Dostawa i wysyłka */}
                    <section className="rounded-lg border p-6 bg-white">
                        <h2 className="font-semibold text-2xl mb-4" style={{ color: "#0E3E4D" }}>
                            📦 Dostawa i wysyłka
                        </h2>
                        <div className="space-y-4 text-base text-ui-fg-subtle">
                            <div>
                                <h3 className="font-semibold text-lg mb-2" style={{ color: "#0E3E4D" }}>Czas realizacji</h3>
                                <p>Standardowy czas realizacji to <strong>2-3 dni robocze</strong> od potwierdzenia zamówienia. W przypadku większych zamówień lub personalizacji, czas może ulec wydłużeniu – zawsze informujemy o tym z wyprzedzeniem.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2" style={{ color: "#0E3E4D" }}>Opcje dostawy</h3>
                                <ul className="list-disc list-inside space-y-2 ml-2">
                                    <li><strong>Kurier InPost/DPD</strong> – 1-2 dni robocze, 19,99 zł</li>
                                    <li><strong>Paczkomat InPost</strong> – 1-2 dni robocze, 16,99 zł</li>
                                    <li><strong>Pocztex Kurier</strong> – 1-2 dni robocze, 16,00 zł</li>
                                    <li><strong>Odbiór osobisty</strong> – za darmo (po wcześniejszym umówieniu)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Płatności */}
                    <section className="rounded-lg border p-6 bg-white">
                        <h2 className="font-semibold text-2xl mb-4" style={{ color: "#0E3E4D" }}>
                            💳 Płatności
                        </h2>
                        <div className="space-y-3 text-base text-ui-fg-subtle">
                            <p>Akceptujemy następujące formy płatności:</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>Przelewy online (Przelewy24, PayU)</li>
                                <li>BLIK</li>
                                <li>Karty płatnicze (Visa, Mastercard)</li>
                                <li>Płatność przy odbiorze (za pobraniem) – +10 zł</li>
                            </ul>
                        </div>
                    </section>

                    {/* Zwroty i reklamacje */}
                    <section className="rounded-lg border p-6 bg-white">
                        <h2 className="font-semibold text-2xl mb-4" style={{ color: "#0E3E4D" }}>
                            🔄 Zwroty i reklamacje
                        </h2>
                        <div className="space-y-4 text-base text-ui-fg-subtle">
                            <div>
                                <h3 className="font-semibold text-lg mb-2" style={{ color: "#0E3E4D" }}>Prawo do zwrotu</h3>
                                <p>Masz prawo zwrócić produkt w ciągu <strong>14 dni</strong> od jego otrzymania bez podania przyczyny. Produkt musi być w stanie nienaruszonym, w oryginalnym opakowaniu.</p>
                                <p className="mt-2"><strong>Uwaga:</strong> Produkty personalizowane (z grawerem na zamówienie) nie podlegają zwrotowi, zgodnie z art. 38 pkt 3 Ustawy o prawach konsumenta.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2" style={{ color: "#0E3E4D" }}>Reklamacje</h3>
                                <p>Jeśli produkt jest uszkodzony lub wadliwy, skontaktuj się z nami w ciągu <strong>7 dni</strong> od otrzymania przesyłki. Rozpatrujemy reklamacje w ciągu 14 dni roboczych.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2" style={{ color: "#0E3E4D" }}>Jak zgłosić zwrot/reklamację?</h3>
                                <p>Prosimy o zgłoszenie zwrotu lub reklamacji za pomocą naszego <a href="/contact" className="text-ui-fg-interactive underline">formularza kontaktowego</a>. To najprostszy sposób — prosimy opisać problem i dołączyć zdjęcia. Jeśli wolisz, możesz również wysłać e-mail na <a href="mailto:lumoria@hotmail.com" className="text-ui-fg-interactive underline">lumoria@hotmail.com</a> lub zadzwonić pod numer <a href="tel:+48737268975" className="text-ui-fg-interactive underline">+48 737 268 975</a>.</p>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="rounded-lg border p-6 bg-white">
                        <h2 className="font-semibold text-2xl mb-4" style={{ color: "#0E3E4D" }}>
                            ❓ Najczęściej zadawane pytania (FAQ)
                        </h2>
                        <div className="space-y-4 text-base">
                            <details className="group">
                                <summary className="font-semibold cursor-pointer list-none flex items-center gap-2" style={{ color: "#0E3E4D" }}>
                                    <span className="group-open:rotate-90 transition-transform">▶</span>
                                    Czy mogę zamówić produkt z własnym projektem?
                                </summary>
                                <p className="mt-2 ml-6 text-ui-fg-subtle">
                                    Tak! Wyślij nam swój projekt graficzny na adres lumoria@hotmail.com, a my przygotujemy wycenę i podgląd przed realizacją.
                                </p>
                            </details>

                            <details className="group">
                                <summary className="font-semibold cursor-pointer list-none flex items-center gap-2" style={{ color: "#0E3E4D" }}>
                                    <span className="group-open:rotate-90 transition-transform">▶</span>
                                    Jakie materiały wykorzystujecie?
                                </summary>
                                <p className="mt-2 ml-6 text-ui-fg-subtle">
                                    Pracujemy głównie na sklejce brzozowej (3mm, 4mm, 6mm) oraz pleksi (akryl). Dla projektów specjalnych wykorzystujemy również drewno bukowe, dębowe i orzechowe.
                                </p>
                            </details>

                            <details className="group">
                                <summary className="font-semibold cursor-pointer list-none flex items-center gap-2" style={{ color: "#0E3E4D" }}>
                                    <span className="group-open:rotate-90 transition-transform">▶</span>
                                    Czy realizujecie zamówienia hurtowe?
                                </summary>
                                <p className="mt-2 ml-6 text-ui-fg-subtle">
                                    Tak! Oferujemy atrakcyjne ceny dla zamówień hurtowych i firmowych. Skontaktuj się z nami, aby uzyskać indywidualną wycenę.
                                </p>
                            </details>

                            <details className="group">
                                <summary className="font-semibold cursor-pointer list-none flex items-center gap-2" style={{ color: "#0E3E4D" }}>
                                    <span className="group-open:rotate-90 transition-transform">▶</span>
                                    Jak przebiega proces personalizacji?
                                </summary>
                                <p className="mt-2 ml-6 text-ui-fg-subtle">
                                    Po złożeniu zamówienia skontaktujemy się z Tobą, aby potwierdzić szczegóły personalizacji (tekst, czcionka, układ). Wysyłamy podgląd do akceptacji przed rozpoczęciem grawerowania.
                                </p>
                            </details>

                            {/* Removed 'Czy produkty można myć?' per content update request */}
                        </div>
                    </section>

                    {/* Kontakt */}
                    <section className="rounded-lg border p-6 bg-white" style={{ backgroundColor: "#f9fafb" }}>
                        <h2 className="font-semibold text-2xl mb-4" style={{ color: "#0E3E4D" }}>
                            💬 Potrzebujesz pomocy?
                        </h2>
                        <p className="text-base text-ui-fg-subtle mb-4">
                            Jeśli nie znalazłeś odpowiedzi na swoje pytanie, skontaktuj się z nami – chętnie pomożemy!
                        </p>
                        <div className="flex">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-white font-semibold transition-colors hover:opacity-90"
                                style={{ backgroundColor: "#0E3E4D" }}
                            >
                                ✉️ Przejdź do formularza kontaktowego
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
