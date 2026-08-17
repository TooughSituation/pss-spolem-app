import type { FlyerPage, Promotion } from "@/lib/types";

export const promotions: Promotion[] = [
  {
    id: "promo-maslo",
    productId: "maslo",
    title: "Masło Extra 200 g",
    subtitle: "Tylko 6,99 zł zamiast 8,99 zł",
    discountPercent: 22,
    validUntil: "2026-08-20",
    image:
      "/images/catalog/1589985270826-4b7bb135bc9d.jpg",
    tag: "Hit tygodnia",
  },
  {
    id: "promo-kurczak",
    productId: "kurczak",
    title: "Filet z kurczaka 500 g",
    subtitle: "Świeże mięso w promocji −15%",
    discountPercent: 15,
    validUntil: "2026-08-20",
    image:
      "/images/catalog/1604503468506-a8da13d82791.jpg",
    tag: "Świeże",
  },
  {
    id: "promo-szynka",
    productId: "szynka",
    title: "Szynka konserwowa PSS",
    subtitle: "Marka własna taniej o złotówkę",
    discountPercent: 15,
    validUntil: "2026-08-20",
    image:
      "/images/catalog/1524438418049-ab2acb7aa48f.jpg",
    tag: "Marka własna",
  },
  {
    id: "promo-sok",
    productId: "sok-pom",
    title: "Sok pomarańczowy 1 l",
    subtitle: "Witamina C w lepszej cenie",
    discountPercent: 21,
    validUntil: "2026-08-20",
    image:
      "/images/catalog/1600271886742-f049cd451bba.jpg",
    tag: "Napoje",
  },
  {
    id: "promo-rogale",
    productId: "rogale",
    title: "Rogale maślane 4 szt.",
    subtitle: "Ciepłe z porannego wypieku",
    discountPercent: 18,
    validUntil: "2026-08-18",
    image:
      "/images/catalog/1555507036-ab794f27d2e9.jpg",
    tag: "Piekarnia",
  },
  {
    id: "promo-proszek",
    productId: "proszek",
    title: "Proszek do prania 3 kg",
    subtitle: "Duże opakowanie −5 zł",
    discountPercent: 17,
    validUntil: "2026-08-24",
    image:
      "/images/catalog/1610557892470-55d9e80c0bce.jpg",
    tag: "Dom",
  },
];

export const flyerPages: FlyerPage[] = [
  {
    id: "cover",
    title: "Gazetka tygodnia",
    subtitle: "14–20 sierpnia 2026",
    productIds: [],
    accent: "from-primary-dark to-primary",
  },
  {
    id: "swieze",
    title: "Świeże na stół",
    subtitle: "Nabiał, pieczywo i mięso",
    productIds: ["maslo", "rogale", "szynka", "mleko"],
    accent: "from-amber-600 to-orange-500",
  },
  {
    id: "warzywa",
    title: "Warzywa i owoce",
    subtitle: "Sezon z polskich pól",
    productIds: ["pomidory", "jablka", "ziemniaki", "marchew"],
    accent: "from-sky-600 to-primary",
  },
  {
    id: "wlasne",
    title: "Marka własna PSS",
    subtitle: "Jakość spółdzielni, uczciwa cena",
    productIds: ["chleb-wiejski", "sok-jablkowy", "kasza", "olej"],
    accent: "from-primary-dark to-[#2e7ec8]",
  },
  {
    id: "dom",
    title: "Dom i spiżarnia",
    subtitle: "Chemia i zakupy na zapas",
    productIds: ["proszek", "makaron", "ryz", "herbata"],
    accent: "from-sky-700 to-cyan-600",
  },
];

export const flyerValid = {
  from: "2026-08-14",
  to: "2026-08-20",
};