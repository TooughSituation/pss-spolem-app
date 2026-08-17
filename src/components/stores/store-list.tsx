import { StoreCard } from "@/components/stores/store-card";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { MapPin } from "lucide-react";
import type { Store } from "@/lib/types";

export function StoreList({
  stores,
  selectedId,
  onSelect,
}: {
  stores: Store[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  if (!stores.length) {
    return (
      <AppEmptyState
        icon={<MapPin className="size-7" />}
        title="Brak placówek"
        description="Zmień filtry — w tej kombinacji nic nie znaleźliśmy."
      />
    );
  }

  return (
    <ul className="space-y-2 px-4">
      {stores.map((store) => (
        <li key={store.id} id={`store-card-${store.id}`}>
          <StoreCard
            store={store}
            selected={store.id === selectedId}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}
