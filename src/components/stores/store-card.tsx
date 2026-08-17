"use client";

import { useRouter } from "next/navigation";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import {
  distanceKm,
  isStoreOpen,
  mapsDirectionsUrl,
  storeTypeLabel,
  telHref,
  USER_LOCATION,
} from "@/lib/data/stores";
import { weekdayKey } from "@/lib/format";
import type { Store, Weekday } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StoreCard({
  store,
  selected = false,
  onSelect,
}: {
  store: Store;
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  const router = useRouter();
  const open = isStoreOpen(store);
  const km = distanceKm(USER_LOCATION, store);
  const today = store.hours[weekdayKey() as Weekday];

  return (
    <AppCard
      padding="md"
      interactive
      className={cn(selected && "border-primary ring-2 ring-primary/20")}
    >
      <button
        type="button"
        className="w-full text-left"
        onClick={() => onSelect?.(store.id)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-bold text-text-primary">{store.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-text-secondary">
              <MapPin className="size-3.5 shrink-0" />
              {store.address}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <AppBadge variant={store.type === "bar" ? "error" : "secondary"}>
              {storeTypeLabel[store.type]}
            </AppBadge>
            <AppBadge variant={open ? "success" : "outline"}>
              {open ? "Otwarte" : "Zamknięte"}
            </AppBadge>
          </div>
        </div>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <Navigation className="size-3.5" /> {km.toFixed(1)} km
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> dziś {today}
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className="size-3.5" /> {store.phone}
          </span>
        </p>
      </button>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <AppButton
          size="sm"
          variant="outline"
          onClick={() => {
            window.location.href = telHref(store.phone);
          }}
        >
          Zadzwoń
        </AppButton>
        <AppButton
          size="sm"
          variant="outline"
          onClick={() =>
            window.open(mapsDirectionsUrl(store), "_blank", "noopener,noreferrer")
          }
        >
          Nawiguj
        </AppButton>
        <AppButton
          size="sm"
          variant="secondary"
          onClick={() => router.push(`/sklepy/${store.id}`)}
        >
          Szczegóły
        </AppButton>
      </div>
    </AppCard>
  );
}
