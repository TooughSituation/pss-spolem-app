"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Navigation, Phone, ShoppingBag } from "lucide-react";
import type { Store, Weekday } from "@/lib/types";
import { distanceKm, isStoreOpen, USER_LOCATION } from "@/lib/data/stores";
import { weekdayKey } from "@/lib/format";
import { useCart } from "@/lib/stores/cart";
import { useUser } from "@/lib/stores/user";
import { ScreenHeader } from "@/components/layout/screen-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export function StoreDetailView({ store }: { store: Store }) {
  const open = isStoreOpen(store);
  const km = distanceKm(USER_LOCATION, store);
  const today = weekdayKey() as Weekday;
  const setStore = useCart((s) => s.setStore);
  const setFavorite = useUser((s) => s.updateProfile);
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;

  return (
    <div>
      <ScreenHeader title={store.district} back backHref="/sklepy" />
      <div className="relative mx-4 mt-3 h-40 overflow-hidden rounded-3xl">
        <Image
          src={store.image}
          alt={store.name}
          fill
          className="object-cover"
          sizes="430px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-lg font-extrabold">{store.name}</p>
          <p className="text-xs text-white/80">
            {store.address} · {km.toFixed(1)} km
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pt-3">
        <Badge variant={open ? "default" : "secondary"}>
          {open ? "Teraz otwarte" : "Teraz zamknięte"}
        </Badge>
        {store.hasClickCollect && <Badge variant="outline">Click & collect</Badge>}
        {store.hasDelivery && <Badge variant="outline">Dostawa</Badge>}
        {store.features.map((f) => (
          <Badge key={f} variant="secondary">
            {f}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 pt-4">
        <Button asChild variant="outline" className="h-11 rounded-2xl">
          <a href={`tel:${store.phone.replace(/\s/g, "")}`}>
            <Phone className="size-4" />
            Zadzwoń
          </a>
        </Button>
        <Button asChild variant="outline" className="h-11 rounded-2xl">
          <a href={maps} target="_blank" rel="noreferrer">
            <Navigation className="size-4" />
            Nawiguj
          </a>
        </Button>
        <Button
          asChild
          className="h-11 rounded-2xl"
          onClick={() => setStore(store.id)}
        >
          <Link href="/zamow">
            <ShoppingBag className="size-4" />
            Zamów
          </Link>
        </Button>
      </div>

      <section className="px-4 pt-6">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold">
          <Clock className="size-4 text-primary" />
          Godziny otwarcia
        </h3>
        <ul className="overflow-hidden rounded-2xl border bg-card">
          {(Object.keys(labels) as Weekday[]).map((day) => (
            <li
              key={day}
              className="flex items-center justify-between border-b px-3 py-2 text-sm last:border-0"
            >
              <span className={day === today ? "font-bold text-primary" : ""}>
                {labels[day]}
              </span>
              <span className="tabular-nums text-muted-foreground">
                {store.hours[day]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="px-4 py-5">
        <p className="text-sm text-muted-foreground">Telefon: {store.phone}</p>
        <Button
          variant="ghost"
          className="mt-2 px-0 text-primary"
          onClick={() => {
            setFavorite({ favoriteStoreId: store.id });
            toast.success("Ustawiono sklep ulubiony");
          }}
        >
          Ustaw jako mój sklep
        </Button>
      </div>
    </div>
  );
}