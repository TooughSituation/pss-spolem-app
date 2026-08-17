"use client";

import { UtensilsCrossed } from "lucide-react";
import { AppEmptyState } from "@/components/design-system/app-empty-state";

export function GastronomiaView() {
  return (
    <div className="px-4 pt-4">
      <h1 className="text-xl font-bold tracking-tight">Gastronomia</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Stołówka i dania dnia PSS Społem Białystok.
      </p>
      <AppEmptyState
        icon={<UtensilsCrossed className="size-7" />}
        title="Menu w przygotowaniu"
        description="Wkrótce zamówisz tu zupę dnia, danie obiadowe i odbiór w stołówce. Ten ekran jest na razie szkicem."
      />
    </div>
  );
}
