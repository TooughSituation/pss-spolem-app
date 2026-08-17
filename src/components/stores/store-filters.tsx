"use client";

import { AppChip } from "@/components/design-system/app-chip";
import type { StoreType } from "@/lib/types";

export type StoreTypeFilter = StoreType | "all";

export function StoreFilters({
  type,
  onTypeChange,
  openNow,
  onOpenNowChange,
}: {
  type: StoreTypeFilter;
  onTypeChange: (value: StoreTypeFilter) => void;
  openNow: boolean;
  onOpenNowChange: (value: boolean) => void;
}) {
  return (
    <div
      className="no-scrollbar flex gap-2 overflow-x-auto px-4"
      aria-label="Filtry placówek"
    >
      <AppChip selected={type === "all"} onClick={() => onTypeChange("all")}>
        Wszystkie
      </AppChip>
      <AppChip
        selected={type === "store"}
        onClick={() => onTypeChange("store")}
      >
        Sklepy
      </AppChip>
      <AppChip selected={type === "bar"} onClick={() => onTypeChange("bar")}>
        Bary
      </AppChip>
      <AppChip selected={openNow} onClick={() => onOpenNowChange(!openNow)}>
        Otwarte teraz
      </AppChip>
    </div>
  );
}
