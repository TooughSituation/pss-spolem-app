"use client";

import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/media/safe-image";
import { Clock, MapPin, Navigation, Phone, UtensilsCrossed } from "lucide-react";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { ScreenHeader } from "@/components/layout/screen-header";
import {
  distanceKm,
  isStoreOpen,
  mapsDirectionsUrl,
  storeTypeLabel,
  telHref,
  USER_LOCATION,
} from "@/lib/data/stores";
import { weekdayKey } from "@/lib/format";
import { useUser } from "@/lib/stores/user";
import type { Store, Weekday } from "@/lib/types";
import { toast } from "sonner";

const labels: Record<Weekday, string> = {
  poniedzialek: "Poniedziałek",
  wtorek: "Wtorek",
  sroda: "Środa",
  czwartek: "Czwartek",
  piatek: "Piątek",
  sobota: "Sobota",
  niedziela: "Niedziela",
};

export function StoreDetails({ store }: { store: Store }) {
  const router = useRouter();
  const open = isStoreOpen(store);
  const km = distanceKm(USER_LOCATION, store);
  const today = weekdayKey() as Weekday;
  const setFavorite = useUser((s) => s.updateProfile);

  return (
    <div className="pb-6">
      <ScreenHeader title={store.district} back backHref="/sklepy" />
      <div className="relative mx-4 mt-3 h-40 overflow-hidden rounded-xl">
        <SafeImage
          src={store.image}
          alt={store.name}
          fill
          className="object-cover"
          sizes="430px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-lg font-bold">{store.name}</p>
          <p className="flex items-center gap-1 text-sm text-white/85">
            <MapPin className="size-3.5" />
            {store.address} · {km.toFixed(1)} km
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 px-4">
        <AppBadge variant={store.type === "bar" ? "error" : "secondary"}>
          {storeTypeLabel[store.type]}
        </AppBadge>
        <AppBadge variant={open ? "success" : "outline"}>
          {open ? "Teraz otwarte" : "Teraz zamknięte"}
        </AppBadge>
        {store.features.map((feature) => (
          <AppBadge key={feature} variant="outline">
            {feature}
          </AppBadge>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 px-4">
        <AppButton
          variant="outline"
          onClick={() => {
            window.location.href = telHref(store.phone);
          }}
        >
          <Phone className="size-4" />
          Zadzwoń
        </AppButton>
        <AppButton
          variant="outline"
          onClick={() =>
            window.open(mapsDirectionsUrl(store), "_blank", "noopener,noreferrer")
          }
        >
          <Navigation className="size-4" />
          Nawiguj
        </AppButton>
      </div>

      {store.type === "bar" ? (
        <div className="px-4 pt-2">
          <AppButton
            fullWidth
            variant="secondary"
            onClick={() => router.push("/gastronomia")}
          >
            <UtensilsCrossed className="size-4" />
            Zamów z tego baru
          </AppButton>
        </div>
      ) : null}

      <section className="px-4 pt-5">
        <h2 className="mb-2 flex items-center gap-2 text-base font-bold">
          <Clock className="size-4 text-primary" />
          Godziny otwarcia
        </h2>
        <AppCard padding="none">
          <ul>
            {(Object.keys(labels) as Weekday[]).map((day) => (
              <li
                key={day}
                className="flex items-center justify-between border-b border-border px-3 py-2.5 text-sm last:border-0"
              >
                <span className={day === today ? "font-bold text-primary" : ""}>
                  {labels[day]}
                </span>
                <span className="tabular-nums text-text-secondary">
                  {store.hours[day]}
                </span>
              </li>
            ))}
          </ul>
        </AppCard>
      </section>

      <div className="px-4 pt-4">
        <p className="text-sm text-text-secondary">Telefon: {store.phone}</p>
        <AppButton
          variant="ghost"
          className="mt-1 px-0"
          onClick={() => {
            setFavorite({ favoriteStoreId: store.id });
            toast.success("Ustawiono ulubioną placówkę");
          }}
        >
          Ustaw jako mój sklep
        </AppButton>
      </div>
    </div>
  );
}
