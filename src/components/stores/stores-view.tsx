"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AppSkeleton } from "@/components/design-system/app-skeleton";
import { StoreFilters, type StoreTypeFilter } from "@/components/stores/store-filters";
import { StoreList } from "@/components/stores/store-list";
import {
  filterStores,
  storesByDistance,
} from "@/lib/data/stores";

const StoresMap = dynamic(
  () => import("@/components/stores/stores-map").then((m) => m.StoresMap),
  {
    ssr: false,
    loading: () => <AppSkeleton className="mx-4 h-56" />,
  },
);

export function StoresView() {
  const [type, setType] = useState<StoreTypeFilter>("all");
  const [openNow, setOpenNow] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();

  const list = useMemo(() => {
    return filterStores(storesByDistance(), { type, openNow });
  }, [openNow, type]);

  const onSelect = (id: string) => {
    setSelectedId(id);
    window.setTimeout(() => {
      document
        .getElementById(`store-card-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  return (
    <div className="pb-6">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold tracking-tight">Sklepy</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Placówki PSS Społem w Białymstoku
        </p>
      </div>

      <div className="mt-3">
        <StoreFilters
          type={type}
          onTypeChange={setType}
          openNow={openNow}
          onOpenNowChange={setOpenNow}
        />
      </div>

      <div className="mt-3">
        <StoresMap stores={list} selectedId={selectedId} onSelect={onSelect} />
      </div>
      <p className="mt-1.5 px-4 text-sm text-text-secondary">
        Niebieska pinezka — sklep · czerwona — bar · zielona — Twoja lokalizacja
        (demo)
      </p>

      <div className="mt-4">
        <StoreList stores={list} selectedId={selectedId} onSelect={onSelect} />
      </div>
    </div>
  );
}
