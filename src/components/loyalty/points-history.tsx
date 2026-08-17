"use client";

import { AppChip } from "@/components/design-system/app-chip";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { formatDate, formatPoints } from "@/lib/format";
import type { LoyaltyTransaction, LoyaltyTxType } from "@/lib/types";
import { Receipt } from "lucide-react";

export function PointsHistory({
  transactions,
  filter,
  onFilterChange,
}: {
  transactions: LoyaltyTransaction[];
  filter: "all" | LoyaltyTxType;
  onFilterChange: (value: "all" | LoyaltyTxType) => void;
}) {
  const list = transactions.filter((tx) => {
    if (filter === "all") return true;
    return tx.type === filter;
  });

  return (
    <section>
      <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
        <AppChip
          selected={filter === "all"}
          onClick={() => onFilterChange("all")}
        >
          Wszystkie
        </AppChip>
        <AppChip
          selected={filter === "earn"}
          onClick={() => onFilterChange("earn")}
        >
          Naliczenia
        </AppChip>
        <AppChip
          selected={filter === "spend"}
          onClick={() => onFilterChange("spend")}
        >
          Wykorzystania
        </AppChip>
      </div>

      {list.length === 0 ? (
        <AppEmptyState
          icon={<Receipt className="size-7" />}
          title="Brak operacji"
          description="Tu pojawią się naliczenia z kas Społem i wymiany na e-bony."
          className="py-10"
        />
      ) : (
        <ul className="space-y-2">
          {list.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-semibold">{tx.description}</p>
                <p className="text-sm text-text-secondary">
                  {formatDate(tx.date)}
                </p>
              </div>
              <p
                className={
                  tx.points > 0
                    ? "font-bold text-success"
                    : "font-bold text-error"
                }
              >
                {tx.points > 0 ? "+" : ""}
                {formatPoints(tx.points)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
