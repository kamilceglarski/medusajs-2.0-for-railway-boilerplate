import Image from "next/image"

const PersonalizationDetails = () => {
    return (
        <section className="mt-6 bg-white/70 p-4 rounded border" aria-labelledby="personalization-heading">
            <h3 id="personalization-heading" className="text-lg font-semibold mb-2">Jak zamówić personalizowany grawer?</h3>
            <p className="text-sm mb-3">Chcesz, aby Twoje produkty były jeszcze bardziej wyjątkowe? Skorzystaj z opcji graweru!</p>

            <p className="font-medium mb-2">Prosimy o podanie wszystkich niezbędnych informacji w polu „Uwagi do zamówienia” podczas finalizacji zakupu:</p>

            <ul className="list-inside list-decimal ml-4 space-y-2 text-sm mb-4">
                <li>
                    <strong>Tekst Graweru:</strong> Wpisz dokładną treść, jaka ma zostać wygrawerowana (np. "Jan Kowalski, 01.01.2025" lub "Dla Kochanej Babci").
                </li>
                <li>
                    <strong>Wybór Czcionki:</strong> Podaj numer lub nazwę czcionki, której mamy użyć. Lista dostępnych czcionek znajduje się na jednym ze zdjęć w galerii produktu (np. "Czcionka nr 3. Lobster").
                </li>
            </ul>

            <p className="text-sm mb-3"><strong>Ważne:</strong> W przypadku braku informacji o wybranej czcionce w uwagach, zostanie ona przez nas wybrana losowo, aby zapewnić jak najlepszy efekt wizualny.</p>

            {/* Illustrative image with the actual fonts list file */}
            <div className="mt-4">
                <h4 className="text-base font-semibold mb-2">Lista dostępnych czcionek</h4>
                <div className="w-full max-w-sm mx-auto">
                    {/* Use the provided company image for available fonts, centered */}
                    <Image src="/images/CzcionkaGrawerLumoriaStudio.webp" alt="Lista dostępnych czcionek Lumoria Studio" width={400} height={600} className="object-contain rounded border mx-auto" />
                </div>
            </div>
        </section>
    )
}

export default PersonalizationDetails
