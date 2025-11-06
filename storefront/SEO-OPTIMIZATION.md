# SEO - Optymalizacja dla Lumoria Studio

## ✅ Co zostało zrobione:

### 1. **Sitemap.xml** - `/sitemap.xml`
- ✅ Automatycznie generowana mapa strony
- ✅ Zawiera wszystkie produkty, kategorie, kolekcje
- ✅ Strony statyczne (usługi, kontakt, obsługa klienta)
- ✅ Priorytety i częstotliwość aktualizacji
- ✅ Daty ostatniej modyfikacji

### 2. **Robots.txt** - `/robots.txt`
- ✅ Zoptymalizowane reguły dla crawlerów
- ✅ Dozwolone ścieżki dla Google/Bing
- ✅ Zablokowane prywatne sekcje (konto, checkout, API)
- ✅ Crawl delay dla ochrony serwera
- ✅ Link do sitemap.xml

### 3. **Structured Data (Schema.org JSON-LD)**
- ✅ **Organization** - dane firmy
- ✅ **LocalBusiness** - lokalizacja biznesu
- ✅ **WebSite** - wyszukiwarka na stronie
- ✅ **Product** - dane produktów dla Google Shopping
- ✅ **BreadcrumbList** - nawigacja okruszkowa

### 4. **Meta Tags**
- ✅ Rozszerzone keywords (17+ słów kluczowych)
- ✅ Open Graph dla social media
- ✅ Twitter Cards
- ✅ Google verification
- ✅ Canonical URLs
- ✅ Language alternates (pl-PL)

### 5. **Produkty - SEO**
- ✅ Poprawione tytuły z frazami kluczowymi
- ✅ Descriptions z call-to-action
- ✅ Product Schema z cenami i dostępnością
- ✅ Keywords dla każdego produktu

---

## 📋 CO MUSISZ ZROBIĆ:

### **WAŻNE - Uzupełnij dane w pliku:**
`/storefront/src/components/structured-data/index.tsx`

✅ **ZAKOŃCZONE** - Wszystkie dane zostały uzupełnione:

1. **Numer telefonu:** ✅
   ```typescript
   "telephone": "+48-737-268-975"
   ```

2. **Adres firmy:** ✅
   ```typescript
   "addressLocality": "Rybnik"
   "addressRegion": "Śląskie"
   ```

3. **Współrzędne GPS:** ✅
   ```typescript
   "latitude": 50.08378641152977,
   "longitude": 18.446463426426664
   ```

4. **Godziny otwarcia:** ✅
   ```typescript
   "opens": "07:00",
   "closes": "21:00"
   // Wszystkie dni tygodnia (Pn-Nd)
   ```

5. **Social Media:** ✅
   ```typescript
   "sameAs": [
     "https://www.facebook.com/lumoriastudio",
     "https://www.instagram.com/lumoria_studio/",
   ]
   ```

---

## 🚀 Następne kroki (opcjonalne, ale zalecane):

### 1. **Google Search Console**
- ✅ Już masz weryfikację: `j5eg3CSJw6IRTiZrMfQg2JDzz_rTsjuXg-Y8eCDyi0I`
- 📤 Prześlij sitemap: `https://twoja-domena.pl/sitemap.xml`

### 2. **Google Business Profile**
- Załóż profil firmy w Google
- Dodaj logo, zdjęcia produktów
- Zbieraj opinie klientów

### 3. **Szybkość strony**
- Zoptymalizuj wszystkie obrazy (WebP ✅)
- Użyj CDN dla statycznych plików
- Włącz cache w przeglądarce

### 4. **Content Marketing**
- Blog z poradami (np. "Jak wybrać prezent personalizowany")
- Opisy produktów > 150 słów
- Alt text dla wszystkich zdjęć ✅ **AUTOMATYCZNE**

### 📸 **Alt Text - Jak działa:**
Zdjęcia produktów dodawane przez panel Medusa.js **automatycznie otrzymują SEO-friendly alt text**, który zawiera:

**Format alt text:**
- Główne zdjęcie: `"{Nazwa produktu} - grawerowanie laserowe Lumoria Studio"`
- Kolejne zdjęcia: `"{Nazwa produktu} - zdjęcie 2 - grawerowanie laserowe"`
- Miniaturki: `"{Nazwa produktu} - grawerowanie laserowe ze sklejki | Lumoria Studio Rybnik"`

**Korzyści:**
- ✅ Google rozumie co jest na zdjęciu
- ✅ Obrazki pojawiają się w Google Images
- ✅ Lepsze pozycjonowanie dla fraz kluczowych
- ✅ Dostępność dla osób niewidomych (screen readers)

**Nie musisz nic robić** - wystarczy dodać zdjęcia w panelu admin i system sam doda odpowiedni alt text!

### 5. **Linki zwrotne (Backlinks)**
- Dodaj firmę do katalogów (Google Maps, Yelp)
- Współpraca z blogerami
- Profile w social media

---

## 📊 Monitorowanie SEO:

### **Narzędzia do sprawdzania:**
1. **Google Search Console** - https://search.google.com/search-console
2. **Google Analytics 4** - https://analytics.google.com
3. **PageSpeed Insights** - https://pagespeed.web.dev
4. **Schema Validator** - https://validator.schema.org

### **Sprawdź regularnie:**
- Pozycje w wynikach wyszukiwania
- CTR (Click-Through Rate)
- Błędy indeksowania
- Broken links
- Szybkość ładowania

---

## 🎯 Słowa kluczowe (dla treści):

### **Główne:**
- grawerowanie laserowe
- dekoracje ze sklejki
- personalizowane tabliczki
- prezenty z grawerem

### **Długi ogon (Long-tail):**
- "grawerowanie laserowe warszawa"
- "personalizowane bombki choinkowe"
- "toppery na tort z grawerem"
- "tabliczki ślubne ze sklejki"
- "prezent urodzinowy personalizowany"

### **Lokalne:**
- grawerowanie laserowe Rybnik
- dekoracje ze sklejki Rybnik
- prezenty personalizowane Rybnik
- grawerowanie laserowe Śląsk
- grawerowanie laserowe Śląskie
- laser Rybnik
- grawer Rybnik

---

## ⚠️ Checklist przed wdrożeniem:

- [x] Uzupełnij numer telefonu w structured data
- [x] Dodaj prawdziwy adres firmy
- [x] Zaktualizuj współrzędne GPS
- [x] Sprawdź godziny otwarcia
- [x] Dodaj linki do social media (gdy będą)
- [ ] Prześlij sitemap do Google Search Console
- [x] Sprawdź czy wszystkie produkty mają opisy
- [x] Dodaj alt text do wszystkich zdjęć (automatyczne z nazwy produktu)
- [ ] Przetestuj stronę na schema.org validator

---

## 📈 Spodziewane rezultaty:

### **Tydzień 1-2:**
- Google zacznie indeksować nowe strony
- Wzrost z 2 do 10+ zindeksowanych stron

### **Miesiąc 1:**
- Pierwsze pozycje w długim ogonie
- 20-50 zindeksowanych stron

### **Miesiąc 2-3:**
- Pozycje na pierwsze 3 strony Google
- Wzrost organicznego ruchu o 50-100%

### **Miesiąc 6+:**
- TOP 10 dla głównych fraz
- Stabilny ruch organiczny 500-1000 wizyt/miesiąc

---

## 💡 Porady:

1. **Regularnie dodawaj nowe produkty** - Google lubi świeże treści
2. **Aktualizuj opisy** - unikaj duplicate content
3. **Zbieraj opinie** - ważne dla local SEO
4. **Linkuj wewnętrznie** - połącz produkty z kategoriami
5. **Mobile-first** - 80% użytkowników z telefonu

---

**Powodzenia! 🚀**

*Jeśli masz pytania, sprawdź dokumentację Next.js SEO lub skontaktuj się z developerem.*
