import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Polityka Prywatności | Lumoria Studio",
    description: "Polityka prywatności i ochrony danych osobowych w Lumoria Studio",
}

export default function PrivacyPolicyPage() {
    return (
        <div className="content-container py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Polityka Prywatności</h1>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <p className="text-gray-600 mb-8">
                            <strong>Data ostatniej aktualizacji:</strong> {new Date().toLocaleDateString('pl-PL')}
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Lumoria Studio szanuje prywatność swoich klientów i dokłada wszelkich starań,
                            aby chronić dane osobowe powierzone nam podczas korzystania z naszych usług.
                            Niniejsza Polityka Prywatności wyjaśnia, jakie dane zbieramy, w jaki sposób
                            je wykorzystujemy oraz jakie prawa przysługują Państwu w związku z przetwarzaniem
                            danych osobowych.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">1. Administrator Danych</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Administratorem Państwa danych osobowych jest Lumoria Studio z siedzibą w Polsce.
                            W sprawach dotyczących ochrony danych osobowych można kontaktować się z nami
                            pod adresem e-mail: noreply@lumoria-studio.pl
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">2. Zakres Zbieranych Danych</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            W ramach prowadzonej działalności zbieramy następujące kategorie danych osobowych:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Dane kontaktowe:</strong> imię, nazwisko, adres e-mail, numer telefonu</li>
                            <li><strong>Dane adresowe:</strong> adres dostawy i rozliczeniowy</li>
                            <li><strong>Dane transakcyjne:</strong> historia zamówień, dane dotyczące płatności</li>
                            <li><strong>Dane techniczne:</strong> adres IP, dane o urządzeniu, preferencje przeglądarki</li>
                            <li><strong>Dane marketingowe:</strong> preferencje komunikacyjne, zgody marketingowe</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">3. Cel Przetwarzania Danych</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Państwa dane osobowe przetwarzamy w następujących celach:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Realizacja zamówień i świadczenie usług</li>
                            <li>Obsługa klienta i komunikacja</li>
                            <li>Prowadzenie dokumentacji księgowej i podatkowej</li>
                            <li>Marketing i newsletter (za zgodą)</li>
                            <li>Analiza i ulepszanie naszych usług</li>
                            <li>Zapewnienie bezpieczeństwa i wykrywanie nadużyć</li>
                            <li>Wykonywanie usług grawerowania i personalizacji produktów</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">4. Podstawa Prawna Przetwarzania</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Państwa dane osobowe przetwarzamy na podstawie:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Wykonania umowy sprzedaży lub świadczenia usług (art. 6 ust. 1 lit. b RODO)</li>
                            <li>Wypełnienia obowiązków prawnych, np. podatkowych (art. 6 ust. 1 lit. c RODO)</li>
                            <li>Prawnie uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO)</li>
                            <li>Zgody na przetwarzanie danych w celach marketingowych (art. 6 ust. 1 lit. a RODO)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">5. Okres Przechowywania Danych</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Dane osobowe przechowujemy przez okres niezbędny do realizacji celów, dla których
                            zostały zebrane, w szczególności:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                            <li>Dane dotyczące zamówień - przez okres wymagany przepisami prawa podatkowego (5 lat)</li>
                            <li>Dane marketingowe - do momentu wycofania zgody</li>
                            <li>Dane konta użytkownika - do momentu usunięcia konta</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">6. Udostępnianie Danych</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Państwa dane osobowe mogą być udostępniane następującym kategoriom odbiorców:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Dostawcom usług kurierskich i logistycznych</li>
                            <li>Operatorom płatności (Stripe)</li>
                            <li>Dostawcom usług IT i hostingowych</li>
                            <li>Firmom księgowym i prawnym</li>
                            <li>Organom publicznym, gdy wymaga tego prawo</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">7. Państwa Prawa</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Zgodnie z RODO przysługują Państwu następujące prawa:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Prawo dostępu</strong> do swoich danych osobowych</li>
                            <li><strong>Prawo do sprostowania</strong> nieprawidłowych lub niekompletnych danych</li>
                            <li><strong>Prawo do usunięcia</strong> danych ("prawo do bycia zapomnianym")</li>
                            <li><strong>Prawo do ograniczenia przetwarzania</strong> danych</li>
                            <li><strong>Prawo do przenoszenia danych</strong> do innego administratora</li>
                            <li><strong>Prawo do sprzeciwu</strong> wobec przetwarzania danych</li>
                            <li><strong>Prawo do cofnięcia zgody</strong> w dowolnym momencie</li>
                            <li><strong>Prawo do wniesienia skargi</strong> do organu nadzorczego (UODO)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">8. Pliki Cookie</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Nasza strona internetowa wykorzystuje pliki cookie w celu zapewnienia prawidłowego
                            funkcjonowania serwisu, personalizacji treści, analizy ruchu oraz w celach marketingowych.
                            Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookie w swojej
                            przeglądarce.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">9. Bezpieczeństwo Danych</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Państwa
                            danych osobowych przed przypadkowym lub niezgodnym z prawem zniszczeniem, utratą,
                            zmianą, nieuprawnionym ujawnieniem lub dostępem. Wykorzystujemy szyfrowanie SSL/TLS,
                            bezpieczne serwery oraz regularne audyty bezpieczeństwa.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">10. Zmiany w Polityce Prywatności</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności.
                            O wszelkich zmianach będziemy informować na stronie internetowej. Zachęcamy do
                            regularnego przeglądania niniejszego dokumentu.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">11. Kontakt</h2>
                        <p className="text-gray-700 leading-relaxed">
                            W przypadku pytań dotyczących przetwarzania danych osobowych lub chęci skorzystania
                            z przysługujących Państwu praw, prosimy o kontakt:
                        </p>
                        <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-700"><strong>Lumoria Studio</strong></p>
                            <p className="text-gray-700">Email: noreply@lumoria-studio.pl</p>
                            <p className="text-gray-700">Strona: www.lumoria-studio.pl</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

