# PSS Społem — aplikacja B2C (PWA)

Mobilna aplikacja webowa (PWA, mobile-first) dla klientów sieci sklepów **PSS Społem**. To kompletny, działający mockup pierwszej wersji: katalog, gazetka, lista zakupów, sklepy, program lojalnościowy „Społem znaczy razem”, profil oraz click & collect.

> Nie jest to oficjalny produkt Krajowego Związku Rewizyjnego Spółdzielni Spożywców „Społem”. Dane, sklepy i ceny są przykładowe.

## Live i repo

- GitHub: [TooughSituation/pss-spolem-app](https://github.com/TooughSituation/pss-spolem-app)
- Preview: po deployu na Vercel (gałąź `main`)

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui + Lucide
- Zustand (persist w `localStorage`)
- Framer Motion + CSS transitions
- next-themes (jasny / ciemny / system)
- PWA: `manifest.webmanifest` + service worker

## Ekrany

| Ścieżka | Opis |
| --- | --- |
| `/` | Home: punkty, skróty, promocje, gazetka, kategorie, najbliższe sklepy |
| `/oferta` | Katalog z wyszukiwarką, kategoriami i filtrami |
| `/oferta/[id]` | Karta produktu |
| `/promocje` | Lista promocji + wejście do gazetki |
| `/promocje/gazetka` | Interaktywna gazetka (swipe) |
| `/lista` | Lista zakupów (ręcznie / z katalogu / udostępnianie) |
| `/sklepy` | Mapa + lista sklepów |
| `/sklepy/[id]` | Godziny, kontakt, nawigacja, zamówienie |
| `/lojalnosc` | Wirtualna karta, QR, punkty, nagrody, historia |
| `/profil` | Dane, zamówienia, powiadomienia, motyw |
| `/skanuj` | Mock skanera kodów kreskowych |
| `/zamow` | Click & collect / dostawa |

Dolna nawigacja: **Home · Promocje · Lista · Sklepy · Profil**.

## Start lokalny

```bash
npm install
npm run dev
```

Aplikacja: [http://localhost:3000](http://localhost:3000). Na desktopie widać ramkę telefonu; na mobile zajmuje cały ekran.

## Struktura

```
src/
  app/                 # routing App Router
  components/
    layout/            # app shell, bottom nav, nagłówki
    home/ catalog/ promos/ list/ stores/ loyalty/ profile/ scan/ order/
    product/ ui/ brand/
  lib/
    data/              # produkty, sklepy, promocje, użytkownik
    stores/            # Zustand: lista, koszyk, profil
    format.ts types.ts
public/
  manifest.webmanifest
  sw.js
  icons/ images/
```

Stan jest lokalny (bez backendu). Lista zakupów, koszyk, punkty i ustawienia zapisują się w przeglądarce.

## Dalszy rozwój

1. **Backend i auth** — Next.js Route Handlers + baza (np. Neon) + logowanie SMS/karta.
2. **Lojalność PSS** — integracja z programem „Społem znaczy razem” (saldo, paragony, bony).
3. **Geolokalizacja** — prawdziwe GPS + Google/Mapbox i katalog sklepów z poszczególnych spółdzielni.
4. **Gazetki** — CMS / PDF-y od spółdzielni, OCR produktów.
5. **Skaner** — `BarcodeDetector` / Quagga, powiązanie z EAN z ERP.
6. **Zamówienia** — stany magazynowe sklepu, sloty odbioru, płatność.
7. **Push** — Web Push na nową gazetkę i status zamówienia.

## Design

Kolorystyka spółdzielcza: zieleń `#009241`, biel/krem, czerwień akcentowa i pomarańcz świeżości. Język interfejsu: **polski**.

## Licencja

Projekt demonstracyjny. Zdjęcia produktów pochodzą z Unsplash. Nazwa i znak Społem należą do właściwych spółdzielni.