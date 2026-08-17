# Projekt: pss-spolem-app — PWA B2C PSS Społem

> Ostatnia aktualizacja: **17.08.2026**
> Kontekst dla GrokWeb / Grok Build
> **Status:** pełny mock B2C + **oficjalne logo PSS Społem** + spójny polish UI. Nadal frontend + Zustand/localStorage.

To **nie** jest oficjalna aplikacja KZRSS / PSS Społem. Dane, sklepy i ceny są przykładowe.

## Linki i lokalizacja

| Zasób | Wartość |
|-------|---------|
| **Folder lokalny** | `C:\Users\user\pss-spolem-app` |
| **GitHub** | https://github.com/TooughSituation/pss-spolem-app |
| **Branch** | `main` |
| **Live preview** | https://pss-spolem-app-toough-situation.vercel.app (alias: https://pss-spolem-app.vercel.app) |
| **Vercel** | `toough-situation/pss-spolem-app` · auto-deploy z `main` |
| **Dashboard** | https://vercel.com/toough-situation/pss-spolem-app |

## ⚠️ Izolacja projektów

| Projekt | Folder | GitHub | Vercel |
|---------|--------|--------|--------|
| **pss-spolem-app** (ten) | `C:\Users\user\pss-spolem-app` | `TooughSituation/pss-spolem-app` · `main` | `toough-situation/pss-spolem-app` |
| akwen-web | `C:\Users\user\akwen-web` | `TooughSituation/akwen-web` · `master` | `toough-situation/akwen-web` |

Projekty są **w pełni odseparowane**. **Nie mieszać** `package.json`, `.env`, `node_modules`, commitów. Workspace GrokWeb bywa otwarty w `akwen-web` — kod PSS jest w sibling folderze.

## Stack

- Next.js **15.5.23** (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui + własne komponenty Design System
- Zustand + persist (`localStorage`) — **bez prawdziwego API**
- Framer Motion, Lucide, `qrcode.react`
- next-themes — **forced light mode** (dark na razie wyłączony)
- PWA: `public/manifest.webmanifest` + `public/sw.js` (v2: nie cachuje `/` ani RSC) + ikony
- Język UI: **polski**
- Design: paleta PSS Społem Białystok, font **Inter**, mobile-first `max-w-[430px]`

## Design System (obowiązujący)

| Token | Hex |
|-------|-----|
| Primary | `#0055A4` |
| Primary Dark | `#003366` |
| Background | `#FFFFFF` |
| Accent Light | `#E8F1FA` |
| Text Primary | `#1A1A2E` |
| Text Secondary | `#5A5A7A` |
| Success | `#28A745` |
| Error | `#DC3545` |
| Warning | `#FFC107` |

Pliki: `src/lib/theme/colors.ts`, `src/lib/theme/typography.ts`, `src/app/globals.css` (CSS variables → Tailwind).

Komponenty: `src/components/design-system/` — AppButton, AppCard, AppBadge, AppChip/AppTag, AppInput, AppEmptyState, AppSkeleton, AppTopBar, BottomTabBar.

Logo: oficjalny lockup PSS Społem Białystok (PSS + „spolem” + Białystok) w `public/logo/` — PNG `#0055A4`, wariant biały i znak PSS. Komponent: `src/components/brand/spolem-mark.tsx` (Top Bar, login, OTP, splash, karta, gazetka, 404/offline).

## Auth (mock, tylko frontend)

- Store: `src/lib/stores/auth.ts` · persist key **`pss-auth`** · `skipHydration` + ręczny `rehydrate()` + twardy timeout 1s (nie wolno wisieć na splashu)
- API: `user`, `isAuthenticated`, `login(phone, code)`, `logout()`, `updateProfile()`
- Ekrany: `/login` (telefon + opcjonalna karta), `/otp` (6 cyfr)
- **Jedyny akceptowany kod: `123456`**
- Po sukcesie mock user:
  `{ id: "1", phone, name: "Anna", loyaltyCardNumber: "1234567890", pointsBalance: 1250 }`
- Niezalogowany na trasach Main → `/login`
- Stary klucz persist `pss-user` zostaje dla extras (powiadomienia, ulubiony sklep, redeem)

## Nawigacja i trasy

**Bottom tabs (dokładnie 5):** Home `/` · Promocje `/promocje` · Gastronomia `/gastronomia` · Sklepy `/sklepy` · Profil `/profil`

AppTopBar (oficjalne logo + lista zakupów z badge + dzwonek) na wszystkich ekranach Main po zalogowaniu. Cienka belka primary u góry, delikatna krawędź na dole.

| Moduł | Ścieżka | Stan |
|-------|---------|------|
| Login | `/login` | ✅ mock SMS |
| OTP | `/otp` | ✅ tylko `123456` |
| Home | `/` | ✅ greeting, karta punktów + QR 160px, carousel, 5 sekcji z mocka, pull-to-refresh |
| Promocje | `/promocje` | ✅ chipsy grup, siatka 2 kol., search, filtry, % rabatu |
| Gazetka | `/promocje/gazetka` | ✅ fullscreen |
| Gastronomia | `/gastronomia` | ✅ kategorie, dania dnia, koszyk, checkout, status |
| Sklepy | `/sklepy` | ✅ Leaflet/OSM, 10 placówek Białystok, filtry, lista, szczegóły |
| Profil | `/profil` | ✅ dane, CRUD adresów, historia zamówień, ustawienia, usuń konto |
| Ustawienia | `/ustawienia` | ✅ edycja imienia i telefonu |
| Lojalność | `/lojalnosc` | ✅ karta + QR 160px, historia, wymiana, e-bony |
| Oferta / produkt stary | `/oferta`, `/oferta/[id]` | ✅ zostaje |
| Lista | `/lista` | ✅ ręcznie + z Home/Promocji, grupy, share, persist |
| Skaner / zamów | `/skanuj`, `/zamow` | ✅ |
| Danie | `/danie/[id]` | ✅ dodatki, uwagi, dodaj do koszyka |
| Checkout | `/checkout` | ✅ adres, slot, płatność mock |
| Status zamówienia | `/zamowienie/[id]` | ✅ Przyjęte → Dostarczone (czas) |
| Placeholdery | `/produkt/[id]` | 🔶 Coming soon |
| Legal | `/regulamin`, `/polityka-prywatnosci`, `/kontakt` | ✅ publiczne |

## Struktura

```
src/app/                      # routing App Router
src/components/
  design-system/              # AppButton, AppCard, AppTopBar, BottomTabBar…
  auth/                       # LoginView, OtpView
  layout/                     # AppShell (+ AuthGate), ScreenHeader
  home/ catalog/ promos/ list/ stores/ loyalty/ profile/ scan/ order/
  gastronomia/ legal/ placeholders/ brand/ ui/
src/lib/
  theme/                      # colors.ts, typography.ts
  auth/routes.ts              # public / auth / fullscreen
  stores/                     # auth, user, cart, shopping-list
  data/                       # banners, home-sections, promotion-groups, products, stores, promotions, user
  constants.ts types.ts
public/                       # manifest, sw.js, icons/, images/, logo/
```

Klucze persist: `pss-auth` (punkty + karta), `pss-loyalty` (transakcje + e-bony), `pss-user`, `pss-shopping-list`, `pss-cart`, `pss-gastro-cart`.

## Deploy

```bash
cd C:\Users\user\pss-spolem-app
npm install
npm run dev          # http://localhost:3000
git push origin main # auto-deploy Vercel
```

Build lokalny (`npm run build`) przechodzi.

## Co jest gotowe / co dalej

**Zrobione:** DS, Auth, Home, Promocje, Sklepy, Gastronomia, Lojalność A1, Profil A2, Lista, **logo + polish UI**.

**Logo:** oficjalny znak PSS Społem Białystok w Top Barze, na logowaniu, splashu, karcie członkowskiej, gazetce i ikonach PWA.

**Zdjęcia:** lokalne pliki w `public/images/catalog/` (nie Unsplash). `SafeImage` z placeholderem gdy plik padnie.

**Branding / polish:** karta członkowska z logo i chipem, jednolite karty (produkty / dania / sklepy / nagrody), CTA z hover/active, cieplejsze empty states, Inter, primary `#0055A4`.

**Lista (`/lista`):** dodawanie ręczne i z Home/Promocji (`AddToListButton`), ilości, odhaczanie, grupy kategorii, Web Share / schowek. Wejście: ikona koszyka w Top Barze.

**Następny krok:** backend / płatności. Admin `/admin` (mock) nie wszedł w ten krok.

Dalsze etapy (później):

- [ ] Prawdziwe płatności / status realtime
- [ ] Backend + SMS
- [ ] Prawdziwe API + SMS
- [ ] Integracja „Społem znaczy razem”
- [ ] Prawdziwa geolokalizacja
- [ ] Gazetki z CMS / PDF
- [ ] Skaner `BarcodeDetector` + EAN z ERP

## Szybki start dla GrokWeb (kolejna sesja)

1. **Otwórz folder** `C:\Users\user\pss-spolem-app` — **nie** `akwen-web`
2. **Repo:** `TooughSituation/pss-spolem-app` · `main` · live jak wyżej
3. **To mockup B2C PWA** — stan w Zustand/localStorage, brak API
4. **Auth mock:** kod SMS `123456` → user Anna, 1250 pkt
5. **Design:** mobile-first, ramka telefonu, paleta `#0055A4`, Inter, light only
6. **Deploy:** `git push origin main` (Vercel podpięty)
7. **Język:** polski
8. **Kolejny krok:** backend / płatności albo szlif UX

### Wklejka kontekstowa (krótka)

```
pss-spolem-app · PWA B2C PSS Społem (mockup, nie oficjalna apka)
Folder: C:\Users\user\pss-spolem-app  (SIBLING akwen-web — nie mieszać)
GitHub: https://github.com/TooughSituation/pss-spolem-app · main
Live:   https://pss-spolem-app-toough-situation.vercel.app
Vercel: toough-situation/pss-spolem-app · auto-deploy z main

Stack: Next.js 15.5.23 App Router, TS, Tailwind v4, shadcn + DS, Zustand persist, PWA
UI PL, mobile-first, light mode, Inter, paleta #0055A4
Bottom nav: Home | Promocje | Gastronomia | Sklepy | Profil
Auth mock: /login /otp · kod 123456 · persist pss-auth
        hydracja: skipHydration + timeout 1s — splash nie może wisieć
Top Bar stały na Main. Profil: dane + punkty + wylogowanie.

Home v2: greeting, PointsCard+QR, BannerCarousel, dynamiczne sekcje
Promocje v2: chipsy grup, search, filtry, siatka 2 kol., % rabatu
        dane: banners.ts, home-sections.ts, promotion-groups.ts

Ekrany: /login /otp / /promocje /gastronomia /danie/[id] /checkout /zamowienie/[id]
        /sklepy /sklepy/[id] /profil /ustawienia /oferta /oferta/[id]
        /promocje/gazetka /lista /lojalnosc /skanuj /zamow

Dane mock: src/lib/data/*  · store: src/lib/stores/auth.ts + user/cart/list
Sklepy v2: Leaflet/OSM, 10 placówek Białystok
Gastronomia: 8 kat. / 24 dania, pss-gastro-cart, /danie /checkout /zamowienie
Lojalność A1: pss-auth.pointsBalance + pss-loyalty
Profil A2 + Lista zakupów (pss-shopping-list, dodawanie z Home/Promocji)
Logo: public/logo/pss-spolem.png (+ white, mark) · SpolemMark w Top Bar / login / splash / karcie
Zdjęcia: lokalne public/images/catalog/*.jpg · SafeImage + placeholder
Mapa: Leaflet bez atrybucji w UI
Branding: karta członkowska, belka Top Bar, gazetkowe bannery, spójne karty/CTA
Brak backendu. KOLEJNY KROK: backend / płatności. Admin /admin niepriorytetowe.
```

## Kontekst developera

Komunikacja po polsku. Użytkownik pracuje równolegle nad innymi projektami (akwen-web, cmkw) — zawsze potwierdzać **który folder / które repo** przed edycją i deploym.
