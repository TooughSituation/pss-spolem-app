import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "pieczywo",
    name: "Pieczywo",
    description: "Świeże z piekarni spółdzielczej",
    emoji: "🍞",
    tint: "from-amber-100 to-orange-50",
  },
  {
    id: "nabial",
    name: "Nabiał",
    description: "Mleko, sery i jaja",
    emoji: "🥛",
    tint: "from-sky-100 to-blue-50",
  },
  {
    id: "mieso",
    name: "Mięso i wędliny",
    description: "Ladka mięsna i wędliny",
    emoji: "🥓",
    tint: "from-rose-100 to-red-50",
  },
  {
    id: "warzywa",
    name: "Warzywa i owoce",
    description: "Sezonowo i lokalnie",
    emoji: "🍎",
    tint: "from-lime-100 to-green-50",
  },
  {
    id: "wlasne",
    name: "Produkty własne PSS",
    description: "Marka spółdzielcza",
    emoji: "🌿",
    tint: "from-emerald-100 to-green-50",
  },
  {
    id: "napoje",
    name: "Napoje",
    description: "Soki, woda i kawa",
    emoji: "🧃",
    tint: "from-orange-100 to-amber-50",
  },
  {
    id: "chemia",
    name: "Chemia gospodarcza",
    description: "Dom i czystość",
    emoji: "🧴",
    tint: "from-violet-100 to-purple-50",
  },
  {
    id: "spozywcze",
    name: "Spożywcze",
    description: "Spiżarnia na co dzień",
    emoji: "🛒",
    tint: "from-yellow-100 to-lime-50",
  },
  {
    id: "mrozonki",
    name: "Mrożonki",
    description: "Wygodnie i szybko",
    emoji: "🧊",
    tint: "from-cyan-100 to-sky-50",
  },
  {
    id: "slodycze",
    name: "Słodycze i przekąski",
    description: "Na małą przyjemność",
    emoji: "🍫",
    tint: "from-pink-100 to-rose-50",
  },
];

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}