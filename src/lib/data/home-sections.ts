import type { HomeSection, HomeShortcut } from "@/lib/types";

export const homeShortcuts: HomeShortcut[] = [
  {
    id: "wlasne",
    label: "Marka własna",
    emoji: "🌿",
    href: "/oferta?kategoria=wlasne",
  },
  {
    id: "pieczywo",
    label: "Pieczywo",
    emoji: "🍞",
    href: "/oferta?kategoria=pieczywo",
  },
  {
    id: "nabial",
    label: "Nabiał",
    emoji: "🥛",
    href: "/oferta?kategoria=nabial",
  },
  {
    id: "mieso",
    label: "Mięso",
    emoji: "🥓",
    href: "/oferta?kategoria=mieso",
  },
  {
    id: "promocje",
    label: "Promocje",
    emoji: "🏷️",
    href: "/promocje",
  },
];

export const homeSections: HomeSection[] = [
  {
    id: "shortcuts",
    type: "category-shortcuts",
    order: 1,
    items: ["wlasne", "pieczywo", "nabial", "mieso", "promocje"],
  },
  {
    id: "hity",
    type: "horizontal-products",
    title: "Hity tygodnia",
    href: "/promocje",
    order: 2,
    items: ["maslo", "kurczak", "szynka", "rogale", "sok-pom"],
  },
  {
    id: "mid-banner",
    type: "banner",
    order: 3,
    items: ["gazetka"],
  },
  {
    id: "own-grid",
    type: "grid-products",
    title: "Produkcja własna",
    href: "/oferta?kategoria=wlasne",
    order: 4,
    items: ["chleb-wiejski", "mleko", "sok-jablkowy", "kasza"],
  },
  {
    id: "clearance",
    type: "horizontal-products",
    title: "Wyprzedaż",
    href: "/promocje",
    order: 5,
    items: ["proszek", "sok-pom", "rogale", "maslo", "kurczak"],
  },
];

function rotate<T>(items: T[], by: number) {
  if (!items.length || !by) return items;
  const offset = by % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

export function getHomeSections(rotateBy = 0) {
  return [...homeSections]
    .sort((a, b) => a.order - b.order)
    .map((section) =>
      section.type === "horizontal-products" || section.type === "grid-products"
        ? { ...section, items: rotate(section.items, rotateBy) }
        : section,
    );
}

export function getShortcut(id: string) {
  return homeShortcuts.find((item) => item.id === id);
}
