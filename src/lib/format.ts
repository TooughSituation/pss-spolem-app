export function formatPrice(value: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value);
}

export function formatPoints(value: number) {
  return new Intl.NumberFormat("pl-PL").format(value);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function weekdayKey(date = new Date()) {
  const map = [
    "niedziela",
    "poniedzialek",
    "wtorek",
    "sroda",
    "czwartek",
    "piatek",
    "sobota",
  ] as const;
  return map[date.getDay()];
}

export function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 5) return "Dobranoc";
  if (hour < 12) return "Dzień dobry";
  if (hour < 18) return "Cześć";
  return "Dobry wieczór";
}