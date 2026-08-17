import type { LoyaltyTxn, Order, Reward, UserProfile } from "@/lib/types";

export const defaultProfile: UserProfile = {
  firstName: "Anna",
  lastName: "Kowalska",
  email: "anna.kowalska@email.pl",
  phone: "+48 512 345 678",
  cardNumber: "1234567890",
  points: 1250,
  memberSince: "2019-03-12",
  favoriteStoreId: "mokotow",
  notifications: {
    promotions: true,
    flyer: true,
    loyalty: true,
    orders: true,
  },
};

export const loyaltyHistory: LoyaltyTxn[] = [
  {
    id: "t1",
    date: "2026-08-12",
    label: "Zakupy w sklepie",
    points: 24,
    storeName: "PSS Społem Mokotów",
  },
  {
    id: "t2",
    date: "2026-08-08",
    label: "Zakupy w sklepie",
    points: 18,
    storeName: "PSS Społem Ochota",
  },
  {
    id: "t3",
    date: "2026-08-01",
    label: "Wymiana na bon 50 zł",
    points: -500,
  },
  {
    id: "t4",
    date: "2026-07-28",
    label: "Zakupy w sklepie",
    points: 31,
    storeName: "PSS Społem Mokotów",
  },
  {
    id: "t5",
    date: "2026-07-19",
    label: "Zakupy — click & collect",
    points: 16,
    storeName: "PSS Społem Mokotów",
  },
  {
    id: "t6",
    date: "2026-07-04",
    label: "Premia urodzinowa",
    points: 50,
  },
];

export const rewards: Reward[] = [
  {
    id: "bon-20",
    name: "Bon zakupowy 20 zł",
    points: 250,
    description: "Do wykorzystania w każdym sklepie PSS uczestniczącym w programie.",
  },
  {
    id: "bon-50",
    name: "Bon zakupowy 50 zł",
    points: 500,
    description: "Najczęściej wybierana nagroda. Ważny 90 dni od wymiany.",
  },
  {
    id: "bon-100",
    name: "Bon zakupowy 100 zł",
    points: 900,
    description: "Większa oszczędność przy większych zakupach.",
  },
  {
    id: "torba",
    name: "Torba wielorazowa PSS",
    points: 80,
    description: "Bawełniana torba z logo spółdzielni. Odbierz w sklepie.",
  },
  {
    id: "kubek",
    name: "Kubek termiczny PSS",
    points: 180,
    description: "Stalowy kubek 400 ml. Odbierz w sklepie.",
  },
];

export const seedOrders: Order[] = [
  {
    id: "SP-24081",
    storeId: "mokotow",
    createdAt: "2026-08-11T09:20:00",
    pickupAt: "2026-08-11T16:00:00",
    status: "odebrane",
    type: "click-collect",
    items: [
      { productId: "chleb-wiejski", qty: 1, price: 6.49 },
      { productId: "mleko", qty: 2, price: 3.29 },
      { productId: "jaja", qty: 1, price: 12.99 },
      { productId: "pomidory", qty: 1, price: 8.99 },
    ],
    total: 35.05,
  },
  {
    id: "SP-24074",
    storeId: "ochota",
    createdAt: "2026-08-13T14:05:00",
    pickupAt: "2026-08-14T17:30:00",
    status: "w-realizacji",
    type: "click-collect",
    items: [
      { productId: "kurczak", qty: 1, price: 13.99 },
      { productId: "ziemniaki", qty: 1, price: 6.99 },
      { productId: "maslo", qty: 1, price: 6.99 },
    ],
    total: 27.97,
  },
  {
    id: "SP-24061",
    storeId: "mokotow",
    createdAt: "2026-07-30T11:40:00",
    pickupAt: "2026-07-30T18:00:00",
    status: "odebrane",
    type: "dostawa",
    items: [
      { productId: "olej", qty: 1, price: 8.99 },
      { productId: "makaron", qty: 2, price: 3.49 },
      { productId: "proszek", qty: 1, price: 24.99 },
    ],
    total: 40.96,
  },
];

export const POINTS_PER_5_ZL = 1;
export const NEXT_VOUCHER_AT = 2000;