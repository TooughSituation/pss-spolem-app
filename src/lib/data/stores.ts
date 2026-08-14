import type { Store, Weekday } from "@/lib/types";
import { weekdayKey } from "@/lib/format";

const standardHours: Record<Weekday, string> = {
  poniedzialek: "06:30–21:00",
  wtorek: "06:30–21:00",
  sroda: "06:30–21:00",
  czwartek: "06:30–21:00",
  piatek: "06:30–21:00",
  sobota: "07:00–20:00",
  niedziela: "08:00–18:00",
};

export const stores: Store[] = [
  {
    id: "mokotow",
    name: "PSS Społem Mokotów",
    address: "ul. Puławska 48",
    city: "Warszawa",
    district: "Mokotów",
    lat: 52.2054,
    lng: 21.0228,
    phone: "+48 22 849 11 20",
    hours: standardHours,
    features: ["Piekarnia", "Ladka mięsna", "Parking", "Click & collect"],
    hasClickCollect: true,
    hasDelivery: true,
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "srodmiescie",
    name: "PSS Społem Śródmieście",
    address: "ul. Marszałkowska 72",
    city: "Warszawa",
    district: "Śródmieście",
    lat: 52.2297,
    lng: 21.0122,
    phone: "+48 22 621 44 08",
    hours: {
      ...standardHours,
      niedziela: "09:00–16:00",
    },
    features: ["Piekarnia", "Stoisko z serem", "Click & collect"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "praga",
    name: "PSS Społem Praga",
    address: "ul. Targowa 22",
    city: "Warszawa",
    district: "Praga-Północ",
    lat: 52.2518,
    lng: 21.0364,
    phone: "+48 22 818 33 17",
    hours: standardHours,
    features: ["Ladka mięsna", "Warzywniak", "Parking"],
    hasClickCollect: true,
    hasDelivery: true,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "wola",
    name: "PSS Społem Wola",
    address: "ul. Wolska 86",
    city: "Warszawa",
    district: "Wola",
    lat: 52.2319,
    lng: 20.9614,
    phone: "+48 22 632 19 40",
    hours: standardHours,
    features: ["Piekarnia", "Chemia", "Click & collect"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ochota",
    name: "PSS Społem Ochota",
    address: "Al. Jerozolimskie 123",
    city: "Warszawa",
    district: "Ochota",
    lat: 52.2196,
    lng: 20.9801,
    phone: "+48 22 822 55 61",
    hours: standardHours,
    features: ["Piekarnia", "Ladka mięsna", "Dostawa", "Parking"],
    hasClickCollect: true,
    hasDelivery: true,
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "zoliborz",
    name: "PSS Społem Żoliborz",
    address: "ul. Słowackiego 15",
    city: "Warszawa",
    district: "Żoliborz",
    lat: 52.2688,
    lng: 20.9819,
    phone: "+48 22 839 27 14",
    hours: standardHours,
    features: ["Piekarnia", "Kawiarnia", "Click & collect"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "https://images.unsplash.com/photo-1601599561213-832382fd07ba?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ursynow",
    name: "PSS Społem Ursynów",
    address: "ul. Ciszewskiego 15",
    city: "Warszawa",
    district: "Ursynów",
    lat: 52.1482,
    lng: 21.0453,
    phone: "+48 22 644 88 02",
    hours: {
      ...standardHours,
      poniedzialek: "07:00–21:00",
    },
    features: ["Duży parking", "Ladka mięsna", "Dostawa"],
    hasClickCollect: true,
    hasDelivery: true,
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bielany",
    name: "PSS Społem Bielany",
    address: "ul. Marymoncka 34",
    city: "Warszawa",
    district: "Bielany",
    lat: 52.2776,
    lng: 20.9571,
    phone: "+48 22 834 12 90",
    hours: standardHours,
    features: ["Piekarnia", "Warzywniak", "Click & collect"],
    hasClickCollect: true,
    hasDelivery: false,
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1200&q=80",
  },
];

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

export const USER_LOCATION = { lat: 52.2297, lng: 21.0122 };

export function storesByDistance(origin = USER_LOCATION) {
  return [...stores].sort(
    (a, b) => distanceKm(origin, a) - distanceKm(origin, b),
  );
}