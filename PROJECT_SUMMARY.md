# Projekt: pss-spolem-app — PWA B2C PSS Społem

> Ostatnia aktualizacja: **14.08.2026**
> Kontekst dla GrokWeb / Grok Build
> **Status:** kompletny mockup v1 — wszystkie ekrany, PWA, deploy na Vercel

To **nie** jest oficjalna aplikacja KZRSS / PSS Społem. Dane, sklepy i ceny są przykładowe.

## Linki i lokalizacja

| Zasób | Wartość |
|-------|---------|
| **Folder lokalny** | `C:\Users\user\pss-spolem-app` |
| **GitHub** | https://github.com/TooughSituation/pss-spolem-app |
| **Branch** | `main` @ `c48650e` |
| **Live preview** | https://pss-spolem-app-toough-situation.vercel.app |
| **Vercel** | `toough-situation/pss-spolem-app` · auto-deploy z `main` |
| **Dashboard** | https://vercel.com/toough-situation/pss-spolem-app |

## ⚠️ Izolacja projektów

| Projekt | Folder | GitHub | Vercel |
|---------|--------|--------|--------|
| **pss-spolem-app** (ten) | `C:\Users\user\pss-spolem-app` | `TooughSituation/pss-spolem-app` · `main` | `toough-situation/pss-spolem-app` |
| akwen-web | `C:\Users\user\akwen-web` | `TooughSituation/akwen-web` · `master` | `toough-situation/akwen-web` |

Projekty są **w pełni odseparowane**. Sesja, która stworzyła mockup, była otwarta w workspace `akwen-web` — kod PSS powstał w sibling folderze. **Nie mieszać** `package.json`, `.env`, `node_modules`, commitów.

## Stack

- Next.js **15.5.23** (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui (radix-nova) + Lucide
- Zustand + persist (`localStorage`) — bez backendu
- Framer Motion + CSS transitions
- next-themes (jasny / ciemny / system)
- `qrcode.react` — wirtualna karta lojalnościowa
- PWA: `public/manifest.webmanifest` + `public/sw.js` + ikony
- Język UI: **polski**
- Design: zieleń spółdzielcza `#009241`, krem, czerwień `#C8102E`, pomarańcz świeżości; font Plus Jakarta Sans

## Stan (v1 mockup)

| Moduł | Ścieżka | Stan |
|-------|---------|------|
| Home | `/` | ✅ punkty, skróty, promocje, gazetka, kategorie, sklepy |
| Oferta | `/oferta` | ✅ 43 produkty, search, kategorie, filtry |
| Produkt | `/oferta/[id]` | ✅ SSG, lista + koszyk |
| Promocje | `/promocje` | ✅ karty + wejście do gazetki |
| Gazetka | `/promocje/gazetka` | ✅ swipe, dodawanie do listy |
| Lista zakupów | `/lista` | ✅ ręcznie / katalog, qty, share |
| Sklepy | `/sklepy` | ✅ mapa SVG Warszawa + 8 sklepów |
| Sklep | `/sklepy/[id]` | ✅ godziny, tel, nawigacja, zamów |
| Lojalność | `/lojalnosc` | ✅ karta + QR, punkty, nagrody, historia |
| Profil | `/profil` | ✅ zamówienia, powiadomienia, motyw |
| Skaner | `/skanuj` | ✅ mock kamery → EAN |
| Zamów | `/zamow` | ✅ click & collect / dostawa (lokalnie) |
| PWA + dark mode | — | ✅ |
| Backend / auth | — | ⏳ brak — wszystko w `localStorage` |

Dolna nawigacja: **Home · Promocje · Lista · Sklepy · Profil**.

## Struktura

```
src/app/                 # routing App Router
src/components/
  layout/                # AppShell, BottomNav, ScreenHeader
  home/ catalog/ promos/ list/ stores/ loyalty/ profile/ scan/ order/
  product/ brand/ ui/
src/lib/
  data/                  # products, stores, promotions, user
  stores/                # Zustand: shopping-list, cart, user
  format.ts types.ts
public/                  # manifest, sw.js, icons/, images/
```

Kluczowe store: `pss-shopping-list`, `pss-cart`, `pss-user` (klucze persist).

## Deploy

```bash
cd C:\Users\user\pss-spolem-app
npm install
npm run dev          # http://localhost:3000
git push origin main # auto-deploy Vercel
```

Build lokalny (`npm run build`) przechodzi — 66 stron statycznych.

## Dalszy rozwój (kolejne etapy)

- [ ] Backend + auth (SMS / numer karty)
- [ ] Integracja „Społem znaczy razem” (saldo, paragony, bony)
- [ ] Prawdziwa geolokalizacja + Mapbox/Google
- [ ] Gazetki z CMS / PDF
- [ ] Skaner `BarcodeDetector` + EAN z ERP
- [ ] Zamówienia: stany sklepu, płatność, push

## Szybki start dla GrokWeb (kolejna sesja)

1. **Otwórz folder** `C:\Users\user\pss-spolem-app` — **nie** `akwen-web`
2. **Repo:** `TooughSituation/pss-spolem-app` · `main` · live jak wyżej
3. **To mockup B2C PWA** — stan w Zustand/localStorage, brak API
4. **Design:** mobile-first, ramka telefonu na desktopie, kolory PSS
5. **Deploy:** `git push origin main` (Vercel podpięty)
6. **Język:** polski

### Wklejka kontekstowa (krótka)

```
pss-spolem-app · PWA B2C PSS Społem (mockup, nie oficjalna apka)
Folder: C:\Users\user\pss-spolem-app  (SIBLING akwen-web — nie mieszać)
GitHub: https://github.com/TooughSituation/pss-spolem-app · main
Live:   https://pss-spolem-app-toough-situation.vercel.app
Vercel: toough-situation/pss-spolem-app · auto-deploy z main

Stack: Next.js 15.5.23 App Router, TS, Tailwind v4, shadcn, Zustand persist, next-themes, PWA
UI PL, mobile-first, bottom nav: Home | Promocje | Lista | Sklepy | Profil

Ekrany: / /oferta /oferta/[id] /promocje /promocje/gazetka /lista
        /sklepy /sklepy/[id] /lojalnosc /profil /skanuj /zamow

Dane mock: src/lib/data/*  · store: src/lib/stores/*
Brak backendu. Kolejny etap: auth, lojalność PSS, geo, prawdziwy skaner/ERP.
```

## Kontekst developera

Komunikacja po polsku. Użytkownik pracuje równolegle nad innymi projektami (akwen-web, cmkw) — zawsze potwierdzać **który folder / które repo** przed edycją i deploym.
