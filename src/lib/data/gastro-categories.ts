import type { GastroCategory } from "@/lib/types";

export const gastroCategories: GastroCategory[] = [
  { id: "sniadania", name: "Śniadania", emoji: "🍳" },
  { id: "zupy", name: "Zupy", emoji: "🥣" },
  { id: "dania-glowne", name: "Dania główne", emoji: "🍖" },
  { id: "nalesniki", name: "Naleśniki", emoji: "🥞" },
  { id: "zestawy", name: "Zestawy", emoji: "🍱" },
  { id: "dodatki", name: "Dodatki", emoji: "🥗" },
  { id: "desery", name: "Desery", emoji: "🍰" },
  { id: "napoje-gastro", name: "Napoje", emoji: "🥤" },
];

export function getGastroCategory(id: string) {
  return gastroCategories.find((item) => item.id === id);
}
