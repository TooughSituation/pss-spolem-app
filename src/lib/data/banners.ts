import type { HomeBanner } from "@/lib/types";

export const homeBanners: HomeBanner[] = [
  {
    id: "gazetka",
    image: "/images/flyer.jpg",
    title: "Gazetka tygodnia",
    subtitle: "Oferty 14–20 sierpnia",
    link: "/promocje/gazetka",
    order: 1,
  },
  {
    id: "lojalnosc",
    image: "/images/card.jpg",
    title: "Zbieraj punkty",
    subtitle: "1 pkt za każde wydane 5 zł",
    link: "/lojalnosc",
    order: 2,
  },
  {
    id: "pieczywo",
    image:
      "/images/catalog/1509440159596-0249088772ff.jpg",
    title: "Świeże z piekarni",
    subtitle: "Codzienny wypiek PSS Społem",
    link: "/oferta?kategoria=pieczywo",
    order: 3,
  },
  {
    id: "gastronomia",
    image:
      "/images/catalog/1547592180-85f173990554.jpg",
    title: "Stołówka Społem",
    subtitle: "Danie dnia już wkrótce w aplikacji",
    link: "/gastronomia",
    order: 4,
  },
  {
    id: "sklepy",
    image: "/images/hero.jpg",
    title: "Nasze sklepy",
    subtitle: "Znajdź najbliższy na mapie",
    link: "/sklepy",
    order: 5,
  },
];

export function getBanner(id: string) {
  return homeBanners.find((banner) => banner.id === id);
}

export function getHomeBanners(rotateBy = 0) {
  const sorted = [...homeBanners].sort((a, b) => a.order - b.order);
  if (!rotateBy) return sorted;
  const offset = rotateBy % sorted.length;
  return [...sorted.slice(offset), ...sorted.slice(0, offset)];
}
