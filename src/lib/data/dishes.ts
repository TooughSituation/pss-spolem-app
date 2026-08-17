import type { Dish, DishAddon } from "@/lib/types";

const sosy: DishAddon[] = [
  { id: "sos-czosnek", name: "Sos czosnkowy", price: 0, group: "sos", type: "radio" },
  { id: "sos-ostry", name: "Sos ostry", price: 0, group: "sos", type: "radio" },
  { id: "sos-grzyb", name: "Sos grzybowy", price: 2, group: "sos", type: "radio" },
];

const dodatki: DishAddon[] = [
  { id: "frytki", name: "Porcja frytek", price: 6, group: "extra", type: "checkbox" },
  { id: "surowka", name: "Surówka z kapusty", price: 4, group: "extra", type: "checkbox" },
  { id: "chleb", name: "Pieczywo PSS", price: 2, group: "extra", type: "checkbox" },
];

const rozmiar: DishAddon[] = [
  { id: "rozmiar-std", name: "Standard", price: 0, group: "rozmiar", type: "radio" },
  { id: "rozmiar-duza", name: "Duża porcja", price: 6, group: "rozmiar", type: "radio" },
];

export const dishes: Dish[] = [
  {
    id: "jajecznica",
    name: "Jajecznica z pieczywem",
    description: "Trzy jajka, masło PSS i świeża kajzerka.",
    price: 14.5,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    categoryId: "sniadania",
    isDaily: false,
    addons: rozmiar,
  },
  {
    id: "omlet",
    name: "Omlet z szynką",
    description: "Puszysty omlet, szynka konserwowa PSS i szczypiorek.",
    price: 16.9,
    image:
      "https://images.unsplash.com/photo-1612240498936-65f5101365d2?auto=format&fit=crop&w=800&q=80",
    categoryId: "sniadania",
    isDaily: false,
    addons: dodatki,
  },
  {
    id: "owsianka",
    name: "Owsianka z jabłkiem",
    description: "Płatki, mleko 3,2% i jabłka Ligol.",
    price: 11.5,
    image:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
    categoryId: "sniadania",
    isDaily: false,
    addons: [],
  },
  {
    id: "zurek",
    name: "Żurek staropolski",
    description: "Z jajkiem, kiełbasą śląską i pieczywem.",
    price: 16.9,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    categoryId: "zupy",
    isDaily: true,
    addons: rozmiar.concat(dodatki.filter((a) => a.id === "chleb")),
  },
  {
    id: "barszcz",
    name: "Barszcz czerwony z uszkami",
    description: "Klarowny barszcz i uszka z grzybami.",
    price: 15.5,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    categoryId: "zupy",
    isDaily: true,
    addons: rozmiar,
  },
  {
    id: "pomidorowa",
    name: "Zupa pomidorowa",
    description: "Na wywarze, z ryżem i śmietaną 18%.",
    price: 12.9,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    categoryId: "zupy",
    isDaily: false,
    addons: rozmiar,
  },
  {
    id: "ogorkowa",
    name: "Zupa ogórkowa",
    description: "Klasyczna, z ziemniakami i koperkiem.",
    price: 13.5,
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80",
    categoryId: "zupy",
    isDaily: false,
    addons: [],
  },
  {
    id: "schabowy",
    name: "Schabowy z ziemniakami",
    description: "Kotlet, ziemniaki z koperkiem i surówka.",
    price: 28.9,
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=80",
    categoryId: "dania-glowne",
    isDaily: true,
    addons: [...sosy, ...dodatki, ...rozmiar],
  },
  {
    id: "mielony",
    name: "Kotlet mielony",
    description: "Dwa kotlety, puree i buraczki.",
    price: 24.5,
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80",
    categoryId: "dania-glowne",
    isDaily: true,
    addons: [...sosy, ...dodatki],
  },
  {
    id: "de-volaille",
    name: "De volaille",
    description: "Kurczak z masłem, frytki i surówka.",
    price: 29.9,
    image:
      "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?auto=format&fit=crop&w=800&q=80",
    categoryId: "dania-glowne",
    isDaily: false,
    addons: [...sosy, ...dodatki],
  },
  {
    id: "gulasz",
    name: "Gulasz wołowy",
    description: "Duszona wołowina, kasza gryczana PSS.",
    price: 27.5,
    image:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80",
    categoryId: "dania-glowne",
    isDaily: false,
    addons: rozmiar,
  },
  {
    id: "ryba",
    name: "Ryba panierowana",
    description: "Filet, ziemniaki i mizeria.",
    price: 26.9,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    categoryId: "dania-glowne",
    isDaily: false,
    addons: sosy,
  },
  {
    id: "nalesniki-ser",
    name: "Naleśniki z serem",
    description: "Domowy twaróg, śmietana i cukier.",
    price: 14.5,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    categoryId: "nalesniki",
    isDaily: true,
    addons: rozmiar,
  },
  {
    id: "nalesniki-szpinak",
    name: "Naleśniki ze szpinakiem",
    description: "Szpinak, ser i czosnek.",
    price: 16.9,
    image:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80",
    categoryId: "nalesniki",
    isDaily: false,
    addons: sosy,
  },
  {
    id: "nalesniki-dzem",
    name: "Naleśniki z dżemem",
    description: "Dżem truskawkowy PSS.",
    price: 12.9,
    image:
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80",
    categoryId: "nalesniki",
    isDaily: false,
    addons: [],
  },
  {
    id: "zestaw-dnia",
    name: "Zestaw dnia",
    description: "Zupa + danie główne + kompot.",
    price: 32.0,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    categoryId: "zestawy",
    isDaily: true,
    addons: rozmiar,
  },
  {
    id: "zestaw-schabowy",
    name: "Zestaw schabowy",
    description: "Żurek, schabowy, kompot.",
    price: 36.5,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    categoryId: "zestawy",
    isDaily: false,
    addons: dodatki,
  },
  {
    id: "ziemniaki",
    name: "Ziemniaki z koperkiem",
    description: "Gotowane, masło PSS.",
    price: 7.5,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    categoryId: "dodatki",
    isDaily: false,
    addons: [],
  },
  {
    id: "frytki-solo",
    name: "Frytki",
    description: "Chrupiące, ze sólą.",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    categoryId: "dodatki",
    isDaily: false,
    addons: sosy,
  },
  {
    id: "surowka-solo",
    name: "Surówka mieszana",
    description: "Kapusta, marchew, majonez.",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    categoryId: "dodatki",
    isDaily: false,
    addons: [],
  },
  {
    id: "szarlotka",
    name: "Szarlotka",
    description: "Na ciepło, ze śmietaną.",
    price: 9.9,
    image:
      "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80",
    categoryId: "desery",
    isDaily: false,
    addons: [],
  },
  {
    id: "sernik",
    name: "Sernik krakowski",
    description: "Klasyczny, z kruszonką.",
    price: 10.5,
    image:
      "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=800&q=80",
    categoryId: "desery",
    isDaily: false,
    addons: [],
  },
  {
    id: "kompot",
    name: "Kompot owocowy",
    description: "Dzbanek 0,3 l, jabłko i śliwka.",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80",
    categoryId: "napoje-gastro",
    isDaily: false,
    addons: [],
  },
  {
    id: "herbata-szklanka",
    name: "Herbata",
    description: "Czarna, szklanka 0,2 l.",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    categoryId: "napoje-gastro",
    isDaily: false,
    addons: [],
  },
];

export const deliverySlots = [
  "11:30–12:00",
  "12:00–12:30",
  "12:30–13:00",
  "13:30–14:00",
  "16:00–16:30",
  "16:30–17:00",
];

export function getDish(id: string) {
  return dishes.find((dish) => dish.id === id);
}

export function dailyDishes() {
  return dishes.filter((dish) => dish.isDaily);
}

export function dishesByCategory(categoryId: string) {
  return dishes.filter((dish) => dish.categoryId === categoryId);
}

export function dishUnitPrice(dish: Dish, addonIds: string[]) {
  const extras = dish.addons
    .filter((addon) => addonIds.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);
  return dish.price + extras;
}
