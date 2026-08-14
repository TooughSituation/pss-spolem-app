"use client";

import { stores, USER_LOCATION } from "@/lib/data/stores";
import { cn } from "@/lib/utils";

const BOUNDS = {
  minLat: 52.13,
  maxLat: 52.3,
  minLng: 20.93,
  maxLng: 21.07,
};

function pos(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  return { x: Math.min(94, Math.max(6, x)), y: Math.min(92, Math.max(8, y)) };
}

export function StoreMap({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const me = pos(USER_LOCATION.lat, USER_LOCATION.lng);

  return (
    <div className="relative h-56 overflow-hidden rounded-3xl border bg-[oklch(0.9_0.03_145)] dark:bg-[oklch(0.24_0.03_150)]">
      <svg viewBox="0 0 400 224" className="absolute inset-0 h-full w-full">
        <rect width="400" height="224" className="fill-[oklch(0.9_0.03_145)] dark:fill-[oklch(0.24_0.03_150)]" />
        <path
          d="M250 0 C240 50 255 90 248 140 C242 180 260 210 270 224 L400 224 L400 0 Z"
          className="fill-[oklch(0.86_0.03_230)] dark:fill-[oklch(0.28_0.03_230)]"
        />
        <path
          d="M20 40 H380 M0 90 H400 M40 150 H360 M80 200 H300"
          className="stroke-[oklch(0.82_0.02_100)] dark:stroke-[oklch(0.32_0.02_150)]"
          strokeWidth="6"
        />
        <path
          d="M90 0 V224 M180 0 V224 M270 10 V210"
          className="stroke-[oklch(0.84_0.02_100)] dark:stroke-[oklch(0.34_0.02_150)]"
          strokeWidth="5"
        />
        <ellipse
          cx="120"
          cy="70"
          rx="38"
          ry="22"
          className="fill-[oklch(0.82_0.06_145)] dark:fill-[oklch(0.3_0.05_145)]"
        />
        <ellipse
          cx="310"
          cy="160"
          rx="30"
          ry="18"
          className="fill-[oklch(0.82_0.06_145)] dark:fill-[oklch(0.3_0.05_145)]"
        />
      </svg>
      <span
        className="absolute z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 ring-4 ring-sky-500/30"
        style={{ left: `${me.x}%`, top: `${me.y}%` }}
        title="Twoja lokalizacja (demo)"
      />
      {stores.map((store) => {
        const { x, y } = pos(store.lat, store.lng);
        const active = store.id === selectedId;
        return (
          <button
            key={store.id}
            type="button"
            onClick={() => onSelect(store.id)}
            className="absolute z-20 -translate-x-1/2 -translate-y-full"
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={store.name}
          >
            {active && (
              <span className="pulse-pin absolute left-1/2 top-2 size-5 -translate-x-1/2 rounded-full bg-primary" />
            )}
            <span
              className={cn(
                "block h-7 w-5 origin-bottom rounded-full rounded-b-none border-2 border-white shadow",
                active ? "scale-110 bg-coop-red" : "bg-primary",
              )}
              style={{ clipPath: "polygon(50% 100%, 0 35%, 0 20%, 20% 0, 80% 0, 100% 20%, 100% 35%)" }}
            />
          </button>
        );
      })}
      <p className="absolute bottom-2 left-3 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
        Warszawa · lokalizacja demo
      </p>
    </div>
  );
}