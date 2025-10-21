import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Regulamin | Lumoria Studio",
    description: "Regulamin świadczenia usług i sprzedaży produktów w Lumoria Studio",
}

export default function TermsOfUsePage() {
    return (
        <div className="content-container py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Regulamin Sklepu</h1>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <p className="text-gray-600 mb-8">
                            <strong>Data ostatniej aktualizacji:</strong> {new Date().toLocaleDateString('pl-PL')}
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego Lumoria Studio,
                            warunki zawierania umów sprzedaży oraz prawa i obowiązki stron. Prosimy o uważne
                            zapoznanie się z poniższymi postanowieniami przed złożeniem zamówienia.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">1. Postanowienia Ogólne</h2>

                        <h3 className="text-xl font-semibold mb-3 mt-6">1.1. Definicje</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Sklep</strong> - sklep internetowy Lumoria Studio dostępny pod adresem www.lumoria-studio.pl</li>
                            <li><strong>Sprzedawca</strong> - Lumoria Studio prowadzące działalność gospodarczą</li>
                            <li><strong>Klient</strong> - osoba fizyczna, prawna lub jednostka organizacyjna dokonująca zakupów w Sklepie</li>
                            <li><strong>Konsument</strong> - osoba fizyczna dokonująca zakupu niezwiązanego bezpośrednio z działalnością gospodarczą</li>
                            <li><strong>Produkt</strong> - dostępna w Sklepie rzecz ruchoma będąca przedmiotem umowy sprzedaży</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-3 mt-6">1.2. Zakres Zastosowania</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Regulamin stosuje się do wszystkich umów sprzedaży zawieranych za pośrednictwem Sklepu
                            internetowego Lumoria Studio. Korzystanie ze Sklepu oznacza akceptację postanowień
                            niniejszego Regulaminu.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">2. Oferta i Asortyment</h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            Sklep oferuje następujące kategorie produktów:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Artykuły dekoracyjne do wnętrz</li>
                            <li>Ozdoby i akcesoria do domu</li>
                            <li>Prezenty personalizowane</li>
                            <li>Produkty z możliwością grawerowania i personalizacji</li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed mt-4">
                            Wszystkie ceny podane w Sklepie są cenami brutto (zawierają podatek VAT) i wyrażone
                            są w złotych polskich (PLN). Ceny produktów nie obejmują kosztów dostawy, które są
                            wskazywane podczas składania zamówienia.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">3. Składanie Zamówień</h2>

                        <h3 className="text-xl font-semibold mb-3 mt-6">3.1. Proces Zamawiania</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                            <li>Wybór produktów i dodanie ich do koszyka</li>
                            <li>Wypełnienie formularza zamówienia z danymi do wysyłki i rozliczenia</li>
                            <li>Wybór sposobu dostawy i płatności</li>
                            <li>Potwierdzenie zamówienia i akceptacja Regulaminu</li>
                            <li>Otrzymanie potwierdzenia zamówienia na adres e-mail</li>
                        </ol>

                        <h3 className="text-xl font-semibold mb-3 mt-6">3.2. Realizacja Zamówienia</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Zamówienie zostaje przyjęte do realizacji po otrzymaniu potwierdzenia płatności.
                            Standardowy czas realizacji zamówienia wynosi 2-5 dni roboczych. W przypadku produktów
                            personalizowanych czas realizacji może być dłuższy i wynosi do 10 dni roboczych.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">4. Płatności</h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            Sklep oferuje następujące formy płatności:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Płatność kartą płatniczą (Visa, Mastercard, American Express)</li>
                            <li>Szybkie przelewy online</li>
                            <li>BLIK</li>
                            <li>Przelew bankowy tradycyjny</li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed mt-4">
                            Płatności elektroniczne obsługiwane są przez zaufanego partnera - Stripe.
                            Sprzedawca nie przechowuje danych kart płatniczych.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">5. Dostawa</h2>

                        <h3 className="text-xl font-semibold mb-3 mt-6">5.1. Metody Dostawy</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Produkty dostarczane są na terenie Polski za pośrednictwem firm kurierskich.
                            Koszt dostawy uzależniony jest od wybranej metody wysyłki i wagi przesyłki.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-6">5.2. Czas Dostawy</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Przesyłka kurierska: 1-3 dni robocze od momentu wysyłki</li>
                            <li>Paczkomaty: 1-2 dni robocze od momentu wysyłki</li>
                            <li>Dostawa międzynarodowa: według ustaleń indywidualnych</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">6. Prawo Odstąpienia od Umowy (dla Konsumentów)</h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            Konsument ma prawo odstąpić od umowy bez podania przyczyny w terminie 14 dni od
                            dnia otrzymania produktu. Aby skorzystać z prawa odstąpienia, należy poinformować
                            Sprzedawcę o swojej decyzji.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-6">6.1. Wyjątki</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Prawo odstąpienia nie przysługuje w przypadku:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Produktów personalizowanych wykonanych według specyfikacji Klienta (np. z grawerem)</li>
                            <li>Produktów, które mogą ulec szybkiemu zepsuciu</li>
                            <li>Produktów dostarczonych w zapieczętowanym opakowaniu, które po otwarciu nie nadają się do zwrotu</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-3 mt-6">6.2. Zwrot Kosztów</h3>
                        <p className="text-gray-700 leading-relaxed">
                            W przypadku odstąpienia od umowy, Sprzedawca zwraca wszystkie otrzymane płatności,
                            w tym koszty dostawy (z wyjątkiem dodatkowych kosztów wynikających z wybranego przez
                            Klienta sposobu dostawy innego niż najtańszy). Zwrot następuje niezwłocznie,
                            nie później niż 14 dni od dnia otrzymania oświadczenia o odstąpieniu.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">7. Reklamacje i Gwarancja</h2>

                        <h3 className="text-xl font-semibold mb-3 mt-6">7.1. Rękojmia</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Sprzedawca odpowiada za wady fizyczne i prawne produktu na zasadach określonych
                            w ustawie z dnia 23 kwietnia 1964 r. - Kodeks cywilny. Reklamację można zgłosić
                            pisemnie na adres e-mail: noreply@lumoria-studio.pl
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-6">7.2. Gwarancja</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Na wybrane produkty Sprzedawca udziela gwarancji producenta lub własnej gwarancji.
                            Szczegółowe warunki gwarancji określone są w dokumencie gwarancyjnym dołączanym
                            do produktu.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">8. Usługi Personalizacji</h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            Lumoria Studio oferuje usługi grawerowania i personalizacji produktów:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Grawerowanie laserowe na drewnie, metalu i innych materiałach</li>
                            <li>Personalizacja napisów, dat, dedykacji</li>
                            <li>Realizacja projektów na zamówienie</li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed mt-4">
                            Produkty personalizowane są wykonywane według specyfikacji podanej przez Klienta.
                            Klient ponosi odpowiedzialność za poprawność przekazanych danych (tekst, grafika).
                            Produkty personalizowane nie podlegają zwrotowi, chyba że zawierają wady wykonania.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">9. Ochrona Danych Osobowych</h2>

                        <p className="text-gray-700 leading-relaxed">
                            Zasady przetwarzania danych osobowych określa
                            <a href="/pl/content/privacy-policy" className="text-blue-600 hover:underline ml-1">
                                Polityka Prywatności
                            </a>.
                            Administrator danych dokłada wszelkich starań, aby chronić dane osobowe Klientów
                            zgodnie z wymogami RODO.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">10. Pozasądowe Rozwiązywanie Sporów</h2>

                        <p className="text-gray-700 leading-relaxed">
                            Konsument ma prawo skorzystać z pozasądowych sposobów rozpatrywania reklamacji
                            i dochodzenia roszczeń. W tym celu może zwrócić się do stałego polubownego sądu
                            konsumenckiego lub skorzystać z platformy ODR dostępnej pod adresem:
                            http://ec.europa.eu/consumers/odr/
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">11. Postanowienia Końcowe</h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            W sprawach nieuregulowanych w niniejszym Regulaminie zastosowanie mają przepisy:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Ustawy z dnia 23 kwietnia 1964 r. - Kodeks cywilny</li>
                            <li>Ustawy z dnia 30 maja 2014 r. o prawach konsumenta</li>
                            <li>Ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną</li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed mt-6">
                            Sprzedawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie z ważnych
                            przyczyn technicznych, prawnych lub organizacyjnych. O zmianach Klienci zostaną
                            poinformowani z 7-dniowym wyprzedzeniem.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">12. Kontakt</h2>

                        <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-700"><strong>Lumoria Studio</strong></p>
                            <p className="text-gray-700">Email: noreply@lumoria-studio.pl</p>
                            <p className="text-gray-700">Strona: www.lumoria-studio.pl</p>
                            <p className="text-gray-700 mt-4">
                                Jesteśmy do Państwa dyspozycji w dni robocze w godzinach 9:00-17:00
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

