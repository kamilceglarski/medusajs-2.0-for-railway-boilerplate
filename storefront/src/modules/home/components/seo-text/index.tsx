import Link from "next/link"
import { Text } from "@medusajs/ui"

const SeoText = () => {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="content-container">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Grawerowanie laserowe – Usługi, Produkty i Personalizacja
        </h2>
        <Text className="mt-2 text-base leading-7 text-gray-700">
          Oferujemy precyzyjne grawerowanie laserowe oraz personalizację na zamówienie. Tworzymy dekoracje ze sklejki, prezenty grawerowane i gadżety na wyjątkowe okazje – od ślubów po prezenty firmowe.
        </Text>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Frazy główne (Produkty i Usługi)</h3>
            <ul className="mt-3 list-disc pl-5 text-gray-700 text-sm">
              <li>grawerowanie laserowe, usługi grawerskie, precyzyjny grawer</li>
              <li>grawerowanie na zamówienie, personalizacja laserowa</li>
              <li>grawerowanie w sklejce, cięcie laserem sklejka, wycinanie ze sklejki</li>
              <li>tabliczki grawerowane sklejka, dekoracje ze sklejki, prezenty grawerowane</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Frazy celujące w okazje</h3>
            <ul className="mt-3 list-disc pl-5 text-gray-700 text-sm">
              <li>dekoracje ślubne sklejka, podziękowania dla gości grawerowane</li>
              <li>winietki ślubne sklejka, toppery na tort grawerowane</li>
              <li>grawer na prezent urodzinowy, prezenty na chrzest grawerowane</li>
              <li>grawerowanie logo na drewnie, prezenty firmowe grawer</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pozycjonowanie lokalne (Śląsk)</h3>
            <ul className="mt-3 list-disc pl-5 text-gray-700 text-sm">
              <li>grawerowanie laserowe Śląsk, dekoracje ze sklejki Śląsk</li>
              <li>usługi grawerskie Rybnik, grawer Gliwice</li>
              <li>grawerowanie Strzelce Opolskie, dekoracje weselne Opole</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Frazy long-tail</h3>
            <ul className="mt-3 list-disc pl-5 text-gray-700 text-sm">
              <li>gdzie wygrawerować tabliczkę ze sklejki?</li>
              <li>personalizowane winietki ślubne cena</li>
              <li>grawer laserem na sklejce cennik, projekty na wesele</li>
              <li>drewniane toppery na tort na zamówienie</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-700">
          Sprawdź nasze <Link href="/pl/store" className="text-ui-fg-interactive underline">produkty</Link> i <Link href="/pl/categories" className="text-ui-fg-interactive underline">kategorie</Link>, aby znaleźć idealną personalizację.
        </div>
      </div>
    </section>
  )
}

export default SeoText
