import type { Store, StoreType, Weekday } from "@/lib/types";
import { weekdayKey } from "@/lib/format";

const shopHours: Record<Weekday, string> = {
  poniedzialek: "06:30–21:00",
  wtorek: "06:30–21:00",
  sroda: "06:30–21:00",
  czwartek: "06:30–21:00",
  piatek: "06:30–21:00",
  sobota: "07:00–20:00",
  niedziela: "08:00–18:00",
};

const barHours: Record<Weekday, string> = {
  poniedzialek: "08:00–17:00",
  wtorek: "08:00–17:00",
  sroda: "08:00–17:00",
  czwartek: "08:00–17:00",
  piatek: "08:00–17:00",
  sobota: "09:00–15:00",
  niedziela: "nieczynne",
};

export const stores: Store[] = [
  {
    id: "centrum",
    name: "PSS Społem Centrum",
    type: "store",
    address: "ul. Lipowa 32",
    city: "Białystok",
    district: "Centrum",
    lat: 53.132,
    lng: 23.157,
    phone: "+48 85 732 10 20",
    hours: shopHours,
    features: ["Piekarnia", "Ladka mięsna", "Parking"],
    hasClickCollect: true,
    hasDelivery: true,
    image:
      "/images/catalog/1534723452862-4c874018d66d.jpg",
  },
  {
    id: "sloneczny",
    name: "PSS Społem Słoneczny Stok",
    type: "store",
    address: "ul. Wrocławska 20",
    city: "Białystok",
    district: "Słoneczny Stok",
    lat: 53.1145,
    lng: 23.119,
    phone: "+48 85 651 22 18",
    hours: shopHours,
    features: ["Piekarnia", "Warzywniak", "Parking"],
    hasClickCollect: true,
    hasDelivery: true,
    image:
      "/images/catalog/1578916171728-46686eac8d58.jpg",
  },
  {
    id: "antoniuk",
    name: "PSS Społem Antoniuk",
    type: "store",
    address: "ul. Antoniukowska 17",
    city: "Białystok",
    district: "Antoniuk",
    lat: 53.147,
    lng: 23.144,
    phone: "+48 85 675 40 11",
    hours: shopHours,
    features: ["Ladka mięsna", "Chemia", "Click & collect"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "/images/catalog/1542838132-92c53300491e.jpg",
  },
  {
    id: "piasta",
    name: "PSS Społem Piasta",
    type: "store",
    address: "ul. Piastowska 11",
    city: "Białystok",
    district: "Piasta",
    lat: 53.1235,
    lng: 23.186,
    phone: "+48 85 742 33 09",
    hours: {
      ...shopHours,
      niedziela: "09:00–16:00",
    },
    features: ["Piekarnia", "Parking"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "/images/catalog/1604719312566-8912e9227c6a.jpg",
  },
  {
    id: "bacieczki",
    name: "PSS Społem Bacieczki",
    type: "store",
    address: "ul. Wierzbowa 14",
    city: "Białystok",
    district: "Bacieczki",
    lat: 53.156,
    lng: 23.104,
    phone: "+48 85 664 18 70",
    hours: shopHours,
    features: ["Duży parking", "Ladka mięsna"],
    hasClickCollect: false,
    hasDelivery: true,
    image:
      "/images/catalog/1488459716781-31db52582fe9.jpg",
  },
  {
    id: "bojary",
    name: "PSS Społem Bojary",
    type: "store",
    address: "ul. Sienkiewicza 49",
    city: "Białystok",
    district: "Bojary",
    lat: 53.1375,
    lng: 23.176,
    phone: "+48 85 732 88 41",
    hours: shopHours,
    features: ["Piekarnia", "Stoisko z serem"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "/images/catalog/1601599561213-832382fd07ba.jpg",
  },
  {
    id: "bar-lipowa",
    name: "Bar mleczny Lipowa",
    type: "bar",
    address: "ul. Lipowa 18",
    city: "Białystok",
    district: "Centrum",
    lat: 53.1328,
    lng: 23.1565,
    phone: "+48 85 732 19 05",
    hours: barHours,
    features: ["Zupa dnia", "Obiadadomowe", "Na miejscu"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "/images/catalog/1547592180-85f173990554.jpg",
  },
  {
    id: "bar-rynek",
    name: "Bar Społem Rynek",
    type: "bar",
    address: "Rynek Kościuszki 5",
    city: "Białystok",
    district: "Centrum",
    lat: 53.1322,
    lng: 23.1645,
    phone: "+48 85 742 01 30",
    hours: {
      ...barHours,
      sobota: "09:00–16:00",
    },
    features: ["Danie dnia", "Kawa", "Na wynos"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "/images/catalog/1555396273-367ea4eb4db5.jpg",
  },
  {
    id: "bar-dziesieciny",
    name: "Stołówka Dziesięciny",
    type: "bar",
    address: "ul. Hallera 8",
    city: "Białystok",
    district: "Dziesięciny",
    lat: 53.1465,
    lng: 23.127,
    phone: "+48 85 651 77 22",
    hours: barHours,
    features: ["Obiadadomowe", "Zestawy"],
    hasClickCollect: false,
    hasDelivery: false,
    image:
      "/images/catalog/1414235077428-338989a2e8c0.jpg",
  },
  {
    id: "bar-skorupy",
    name: "Bar Skorupy",
    type: "bar",
    address: "ul. Skorupska 12",
    city: "Białystok",
    district: "Skorupy",
    lat: 53.117,
    lng: 23.174,
    phone: "+48 85 664 55 08",
    hours: {
      ...barHours,
      piatek: "08:00–16:00",
    },
    features: ["Schabowy", "Kompot", "Na miejscu"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "/images/catalog/1504674900247-0877df9cc836.jpg",
  },
];

export const USER_LOCATION = { lat: 53.1325, lng: 23.1688 };

export const storeTypeLabel: Record<StoreType, string> = {
  store: "Sklep",
  bar: "Bar",
};

export function getStore(id: string) {
  return stores.find((s) => s.id === id);
}

export function isStoreOpen(store: Store, date = new Date()) {
  const key = weekdayKey(date) as Weekday;
  const range = store.hours[key];
  if (!range || range.toLowerCase().includes("nieczynne")) return false;
  const [from, to] = range.split("–");
  if (!from || !to) return false;
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= fh * 60 + fm && minutes < th * 60 + tm;
}

export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function storesByDistance(origin = USER_LOCATION) {
  return [...stores].sort(
    (a, b) => distanceKm(origin, a) - distanceKm(origin, b),
  );
}

export function filterStores(
  list: Store[],
  opts: { type?: StoreType | "all"; openNow?: boolean },
) {
  return list.filter((store) => {
    if (opts.type && opts.type !== "all" && store.type !== opts.type) {
      return false;
    }
    if (opts.openNow && !isStoreOpen(store)) return false;
    return true;
  });
}

export function mapsDirectionsUrl(store: Store) {
  return `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
