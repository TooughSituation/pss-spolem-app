"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ExchangeModal } from "@/components/loyalty/exchange-modal";
import { LoyaltyCard } from "@/components/loyalty/loyalty-card";
import { PointsHistory } from "@/components/loyalty/points-history";
import { RewardCard } from "@/components/loyalty/reward-card";
import { VoucherCard } from "@/components/loyalty/voucher-card";
import { AppButton } from "@/components/design-system/app-button";
import { AppChip } from "@/components/design-system/app-chip";
import { ScreenHeader } from "@/components/layout/screen-header";
import { loyaltyRewards } from "@/lib/data/loyalty";
import { useAuth } from "@/lib/stores/auth";
import { useLoyalty } from "@/lib/stores/loyalty";
import type { LoyaltyReward, LoyaltyTxType } from "@/lib/types";

type Panel = "nagrody" | "historia" | "ebony";

export function LoyaltyView() {
  const user = useAuth((s) => s.user);
  const transactions = useLoyalty((s) => s.transactions);
  const vouchers = useLoyalty((s) => s.vouchers);
  const redeem = useLoyalty((s) => s.redeem);
  const [panel, setPanel] = useState<Panel>("nagrody");
  const [filter, setFilter] = useState<"all" | LoyaltyTxType>("all");
  const [pending, setPending] = useState<LoyaltyReward | null>(null);

  if (!user) return null;

  const confirm = () => {
    if (!pending) return;
    const result = redeem(pending.id);
    toast[result.ok ? "success" : "error"](result.message);
    if (result.ok) setPanel("ebony");
    setPending(null);
  };

  return (
    <div className="pb-8">
      <ScreenHeader title="Lojalność" back backHref="/profil" />
      <div className="pt-3">
        <LoyaltyCard
          name={user.name}
          points={user.pointsBalance}
          cardNumber={user.loyaltyCardNumber}
        />
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-4">
        <AppChip
          selected={panel === "nagrody"}
          onClick={() => setPanel("nagrody")}
        >
          Nagrody
        </AppChip>
        <AppChip
          selected={panel === "historia"}
          onClick={() => setPanel("historia")}
        >
          Historia punktów
        </AppChip>
        <AppChip selected={panel === "ebony"} onClick={() => setPanel("ebony")}>
          Moje e-bony ({vouchers.length})
        </AppChip>
      </div>

      <div className="mt-4 px-4">
        {panel === "nagrody" ? (
          <section className="space-y-3">
            <h2 className="text-base font-bold">Dostępne nagrody / e-bony</h2>
            {loyaltyRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                points={user.pointsBalance}
                onExchange={(id) => {
                  const next = loyaltyRewards.find((item) => item.id === id);
                  if (next) setPending(next);
                }}
              />
            ))}
          </section>
        ) : null}

        {panel === "historia" ? (
          <div>
            <h2 className="mb-3 text-base font-bold">Historia punktów</h2>
            <PointsHistory
              transactions={transactions}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
        ) : null}

        {panel === "ebony" ? (
          <section className="space-y-3">
            <h2 className="text-base font-bold">Moje e-bony</h2>
            {vouchers.length === 0 ? (
              <p className="text-sm text-text-secondary">
                Nie masz jeszcze e-bonów. Wymień punkty w zakładce Nagrody.
              </p>
            ) : (
              vouchers.map((voucher) => (
                <VoucherCard key={voucher.id} voucher={voucher} />
              ))
            )}
          </section>
        ) : null}
      </div>

      {panel !== "historia" ? (
        <div className="mt-5 px-4">
          <AppButton
            variant="secondary"
            fullWidth
            onClick={() => setPanel("historia")}
          >
            Historia punktów
          </AppButton>
        </div>
      ) : null}

      {pending ? (
        <ExchangeModal
          reward={pending}
          points={user.pointsBalance}
          onConfirm={confirm}
          onClose={() => setPending(null)}
        />
      ) : null}
    </div>
  );
}
