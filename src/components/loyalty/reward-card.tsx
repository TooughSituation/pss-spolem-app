"use client";

import { AppBadge } from "@/components/design-system/app-badge";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { formatPoints } from "@/lib/format";
import type { LoyaltyReward } from "@/lib/types";

export function RewardCard({
  reward,
  points,
  onExchange,
}: {
  reward: LoyaltyReward;
  points: number;
  onExchange: (id: string) => void;
}) {
  const ok = points >= reward.pointsCost;

  return (
    <AppCard interactive>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-text-primary">{reward.title}</p>
          <p className="mt-1 text-sm text-text-secondary">{reward.description}</p>
        </div>
        <AppBadge variant={ok ? "default" : "secondary"}>
          {formatPoints(reward.pointsCost)} pkt
        </AppBadge>
      </div>
      <AppButton
        size="sm"
        className="mt-3"
        disabled={!ok}
        onClick={() => onExchange(reward.id)}
      >
        Wymień
      </AppButton>
    </AppCard>
  );
}
