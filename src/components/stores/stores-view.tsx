"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import {
  distanceKm,
  isStoreOpen,
  storesByDistance,
  USER_LOCATION,
} from "@/lib/data/stores";
import { weekdayKey } from "@/lib/format";
import type { Weekday } from "@/lib/types";
import { StoreMap } from "@/components/stores/store-map";
import { ScreenHeader } from "@/components/layout/screen-header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function StoresView() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState("mokotow");
  const list = useMemo(() => {
    return storesByDistance().filter((s) =>
      `${s.name} ${s.district} ${s.address}`.toLowerCase().includes(q.toLowerCase()),
    );
  }, [q]);

  return (
    <div>
      <ScreenHeader title="Sklepy PSS" subtitle="Warszawa i okolice" />
      <div className="space-y-3 px-4 pt-3">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Szukaj po dzielnicy lub ulicy"
          className="h-11 rounded-2xl bg-card"
        />
        <StoreMap selectedId={selected} onSelect={setSelected} />
      </div>
      <ul className="space-y-2 px-4 py-4">
        {list.map((store) => {
          const open = isStoreOpen(store);
          const km = distanceKm(USER_LOCATION, store);
          const today = store.hours[weekdayKey() as Weekday];
          return (
            <li key={store.id}>
              <Link
                href={`/sklepy/${store.id}`}
                onClick={() => setSelected(store.id)}
                className="block rounded-3xl border bg-card p-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold">{store.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {store.address}, {store.district}
                    </p>
                  </div>
                  <Badge variant={open ? "default" : "secondary"}>
                    {open ? "Otwarte" : "Zamknięte"}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Navigation className="size-3" /> {km.toFixed(1)} km
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" /> dziś {today}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Phone className="size-3" /> {store.phone}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}