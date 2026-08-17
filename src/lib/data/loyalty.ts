import type {
  LoyaltyReward,
  LoyaltyTransaction,
  LoyaltyVoucher,
} from "@/lib/types";

export const loyaltyRewards: LoyaltyReward[] = [
  {
    id: "kawa",
    title: "Darmowa kawa",
    description: "Kawa w barze mlecznym PSS. Odbierz przy kasie.",
    pointsCost: 80,
  },
  {
    id: "kompot",
    title: "Kompot w stołówce",
    description: "Szklanka kompotu do obiadu w barze Społem.",
    pointsCost: 40,
  },
  {
    id: "rabat-10",
    title: "Rabat 10% na zakupy",
    description: "Jednorazowo, do 150 zł koszyka w sklepach PSS.",
    pointsCost: 200,
  },
  {
    id: "bon-20",
    title: "E-bon 20 zł",
    description: "Do wykorzystania w sklepach PSS Społem Białystok.",
    pointsCost: 250,
  },
  {
    id: "bon-50",
    title: "E-bon 50 zł",
    description: "Najczęściej wymieniana nagroda. Ważny 90 dni.",
    pointsCost: 500,
  },
  {
    id: "bon-100",
    title: "E-bon 100 zł",
    description: "Na większe zakupy. Ważny 90 dni od wymiany.",
    pointsCost: 900,
  },
  {
    id: "torba",
    title: "Torba wielorazowa PSS",
    description: "Bawełniana torba. Odbierz w sklepie Centrum.",
    pointsCost: 120,
  },
  {
    id: "deser",
    title: "Szarlotka w barze",
    description: "Porcja szarlotki ze śmietaną w barze mlecznym.",
    pointsCost: 90,
  },
];

export const seedTransactions: LoyaltyTransaction[] = [
  {
    id: "tx-12",
    date: "2026-08-16",
    description: "Zakupy — PSS Społem Centrum",
    points: 28,
    type: "earn",
  },
  {
    id: "tx-11",
    date: "2026-08-14",
    description: "Obiad w Barze mlecznym Lipowa",
    points: 6,
    type: "earn",
  },
  {
    id: "tx-10",
    date: "2026-08-12",
    description: "Zakupy — PSS Społem Bojary",
    points: 19,
    type: "earn",
  },
  {
    id: "tx-09",
    date: "2026-08-08",
    description: "Wymiana: E-bon 20 zł",
    points: -250,
    type: "spend",
  },
  {
    id: "tx-08",
    date: "2026-08-05",
    description: "Zakupy — click & collect",
    points: 22,
    type: "earn",
  },
  {
    id: "tx-07",
    date: "2026-08-01",
    description: "Premia za gazetkę tygodnia",
    points: 15,
    type: "earn",
  },
  {
    id: "tx-06",
    date: "2026-07-28",
    description: "Zakupy — PSS Społem Piasta",
    points: 31,
    type: "earn",
  },
  {
    id: "tx-05",
    date: "2026-07-22",
    description: "Wymiana: Darmowa kawa",
    points: -80,
    type: "spend",
  },
  {
    id: "tx-04",
    date: "2026-07-18",
    description: "Zakupy — PSS Społem Antoniuk",
    points: 14,
    type: "earn",
  },
  {
    id: "tx-03",
    date: "2026-07-10",
    description: "Bonus powitalny",
    points: 50,
    type: "earn",
  },
  {
    id: "tx-02",
    date: "2026-07-04",
    description: "Premia urodzinowa",
    points: 50,
    type: "earn",
  },
  {
    id: "tx-01",
    date: "2026-06-26",
    description: "Zakupy — PSS Społem Centrum",
    points: 41,
    type: "earn",
  },
];

export const seedVouchers: LoyaltyVoucher[] = [
  {
    id: "v-kawa",
    rewardId: "kawa",
    title: "Darmowa kawa",
    pointsCost: 80,
    code: "EB-KAWA-4F2C",
    status: "aktywny",
    expiresAt: "2026-11-22",
  },
  {
    id: "v-20",
    rewardId: "bon-20",
    title: "E-bon 20 zł",
    pointsCost: 250,
    code: "EB-20-8K1A",
    status: "aktywny",
    expiresAt: "2026-11-08",
  },
  {
    id: "v-kompot",
    rewardId: "kompot",
    title: "Kompot w stołówce",
    pointsCost: 40,
    code: "EB-KOMP-1Q9D",
    status: "wykorzystany",
    expiresAt: "2026-09-30",
  },
];

export function getLoyaltyReward(id: string) {
  return loyaltyRewards.find((reward) => reward.id === id);
}
