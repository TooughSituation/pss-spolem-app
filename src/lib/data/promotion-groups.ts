import { products } from "@/lib/data/products";
import type { Product, PromotionGroup } from "@/lib/types";

export const ALL_PROMOTION_GROUP_ID = "wszystkie";

export const promotionGroups: PromotionGroup[] = [
  { id: "hity", name: "Hity tygodnia", order: 1, isActive: true },
  { id: "wlasne", name: "Marka własna", order: 2, isActive: true },
  { id: "wyprzedaz", name: "Wyprzedaż", order: 3, isActive: true },
  { id: "pieczywo", name: "Pieczywo", order: 4, isActive: true },
  { id: "nabial", name: "Nabiał", order: 5, isActive: true },
  { id: "chemia", name: "Chemia", order: 6, isActive: true },
];

const productGroupIds: Record<string, string[]> = {
  maslo: ["hity", "nabial"],
  kurczak: ["hity"],
  szynka: ["hity", "wlasne"],
  rogale: ["hity", "pieczywo", "wyprzedaz"],
  "sok-pom": ["hity", "wyprzedaz"],
  jaja: ["hity", "nabial"],
  "chleb-wiejski": ["wlasne", "pieczywo"],
  mleko: ["wlasne", "nabial"],
  jogurt: ["wlasne", "nabial"],
  "sok-jablkowy": ["wlasne"],
  kasza: ["wlasne"],
  olej: ["wlasne"],
  parowki: ["wlasne"],
  herbatniki: ["wlasne"],
  maka: ["wlasne"],
  dzem: ["wlasne"],
  proszek: ["wyprzedaz", "chemia"],
  plyn: ["wyprzedaz", "chemia"],
  papier: ["wyprzedaz", "chemia"],
  czekolada: ["wyprzedaz"],
  woda: ["wyprzedaz"],
  herbata: ["wyprzedaz"],
  kajzerki: ["pieczywo"],
  tostowy: ["pieczywo"],
  gouda: ["nabial"],
  smietana: ["wlasne", "nabial"],
  worki: ["chemia"],
  slaska: ["wlasne"],
  paluszki: ["wyprzedaz"],
};

export function getActivePromotionGroups() {
  return [...promotionGroups]
    .filter((group) => group.isActive)
    .sort((a, b) => a.order - b.order);
}

export function withPromotionGroups(product: Product): Product {
  return {
    ...product,
    groupIds: product.groupIds ?? productGroupIds[product.id] ?? [],
  };
}

export function getPromotionCatalog() {
  return products
    .map(withPromotionGroups)
    .filter((product) => (product.groupIds?.length ?? 0) > 0);
}

export function getProductsInGroup(groupId: string) {
  const catalog = getPromotionCatalog();
  if (groupId === ALL_PROMOTION_GROUP_ID) return catalog;
  return catalog.filter((product) => product.groupIds?.includes(groupId));
}
