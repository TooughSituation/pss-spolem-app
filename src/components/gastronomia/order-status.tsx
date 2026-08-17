"use client";

import { useRouter } from "next/navigation";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { ScreenHeader } from "@/components/layout/screen-header";
import { getDish } from "@/lib/data/dishes";
import { formatDateTime, formatPrice } from "@/lib/format";
import {
  deriveGastroStatus,
  useGastroCart,
} from "@/lib/stores/gastro-cart";
import type { GastroOrderStatus } from "@/lib/types";
import { PackageSearch } from "lucide-react";

const steps: { id: GastroOrderStatus; label: string }[] = [
  { id: "przyjete", label: "Przyjęte" },
  { id: "przygotowywane", label: "Przygotowywane" },
  { id: "w-drodze", label: "W drodze" },
  { id: "dostarczone", label: "Dostarczone" },
];

const paymentLabel = {
  blik: "BLIK",
  karta: "Karta",
  "przy-odbiorze": "Przy odbiorze",
};

export function OrderStatus({ id }: { id: string }) {
  const router = useRouter();
  const order = useGastroCart((s) => s.orders.find((item) => item.id === id));

  if (!order) {
    return (
      <div>
        <ScreenHeader title="Zamówienie" back backHref="/gastronomia" />
        <AppEmptyState
          icon={<PackageSearch className="size-7" />}
          title="Nie znaleziono zamówienia"
          description="To zamówienie jest tylko na tym urządzeniu. Złóż nowe z menu."
          action={
            <AppButton onClick={() => router.push("/gastronomia")}>
              Menu
            </AppButton>
          }
        />
      </div>
    );
  }

  const status = deriveGastroStatus(order.createdAt);
  const currentIndex = steps.findIndex((step) => step.id === status);

  return (
    <div className="px-4 pb-8">
      <ScreenHeader title={order.id} back backHref="/gastronomia" />
      <AppCard className="mt-3">
        <div className="flex items-center justify-between">
          <p className="font-bold">{order.id}</p>
          <AppBadge>{steps[currentIndex]?.label}</AppBadge>
        </div>
        <p className="mt-2 text-sm text-text-secondary">
          Orientacyjna dostawa:{" "}
          <span className="font-semibold text-text-primary">
            {formatDateTime(order.eta)}
          </span>
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          Slot {order.slot} · {paymentLabel[order.payment]}
        </p>
        <p className="mt-1 text-sm text-text-secondary">{order.addressLabel}</p>
      </AppCard>

      <ol className="mt-5 space-y-2">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={`rounded-xl border px-3 py-2.5 text-sm ${
              index <= currentIndex
                ? "border-primary bg-accent-light font-semibold text-primary"
                : "border-border text-text-secondary"
            }`}
          >
            {index + 1}. {step.label}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-sm text-text-secondary">
        Status zmienia się automatycznie po czasie (mock, bez śledzenia na żywo).
      </p>

      <AppCard className="mt-5">
        <h2 className="mb-2 text-sm font-bold">Pozycje</h2>
        <ul className="space-y-1 text-sm">
          {order.items.map((item) => (
            <li key={item.lineId} className="flex justify-between">
              <span>
                {getDish(item.dishId)?.name} × {item.qty}
              </span>
              <span>{formatPrice(item.unitPrice * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between border-t border-border pt-2 font-bold">
          <span>Suma</span>
          <span>{formatPrice(order.total)}</span>
        </p>
      </AppCard>

      <AppButton
        fullWidth
        className="mt-5"
        variant="secondary"
        onClick={() => router.push("/gastronomia")}
      >
        Zamów ponownie
      </AppButton>
    </div>
  );
}
