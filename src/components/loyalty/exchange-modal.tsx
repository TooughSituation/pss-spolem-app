"use client";

import { AppButton } from "@/components/design-system/app-button";
import { formatPoints } from "@/lib/format";
import type { LoyaltyReward } from "@/lib/types";

export function ExchangeModal({
  reward,
  points,
  onConfirm,
  onClose,
}: {
  reward: LoyaltyReward;
  points: number;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const left = points - reward.pointsCost;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-primary-dark/40"
        aria-label="Zamknij"
        onClick={onClose}
      />
      <div className="absolute inset-x-4 top-1/2 mx-auto max-w-[380px] -translate-y-1/2 rounded-xl bg-background p-4 shadow-2xl">
        <h2 className="text-base font-bold">Wymienić punkty?</h2>
        <p className="mt-2 text-sm text-text-secondary">
          {reward.title} kosztuje{" "}
          <span className="font-semibold text-text-primary">
            {formatPoints(reward.pointsCost)} pkt
          </span>
          . Zostanie Ci {formatPoints(left)} pkt. E-bon trafi do „Moje e-bony”.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <AppButton variant="outline" onClick={onClose}>
            Anuluj
          </AppButton>
          <AppButton onClick={onConfirm}>Potwierdź</AppButton>
        </div>
      </div>
    </div>
  );
}
