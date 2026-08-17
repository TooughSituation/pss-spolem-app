"use client";

import { useRouter } from "next/navigation";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppCard } from "@/components/design-system/app-card";
import { getDish } from "@/lib/data/dishes";
import { formatDateTime, formatPrice } from "@/lib/format";
import { deriveGastroStatus } from "@/lib/stores/gastro-cart";
import type { GastroOrder } from "@/lib/types";

const statusLabel = {
  przyjete: "Przyjęte",
  przygotowywane: "Przygotowywane",
  "w-drodze": "W drodze",
  dostarczone: "Dostarczone",
};

export function OrderHistoryCard({ order }: { order: GastroOrder }) {
  const router = useRouter();
  const status = deriveGastroStatus(order.createdAt);
  const summary = order.items
    .map((item) => `${getDish(item.dishId)?.name ?? item.dishId} × ${item.qty}`)
    .join(", ");

  return (
    <button
      type="button"
      className="w-full text-left"
      onClick={() => router.push(`/zamowienie/${order.id}`)}
    >
      <AppCard>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-bold">{order.id}</p>
            <p className="mt-0.5 text-sm text-text-secondary">
              {formatDateTime(order.createdAt)}
            </p>
          </div>
          <AppBadge variant={status === "dostarczone" ? "success" : "secondary"}>
            {statusLabel[status]}
          </AppBadge>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{summary}</p>
        <p className="mt-2 text-sm font-bold">{formatPrice(order.total)}</p>
      </AppCard>
    </button>
  );
}
