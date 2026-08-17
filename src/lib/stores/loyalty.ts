"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getLoyaltyReward,
  seedTransactions,
  seedVouchers,
} from "@/lib/data/loyalty";
import { useAuth } from "@/lib/stores/auth";
import type { LoyaltyTransaction, LoyaltyVoucher } from "@/lib/types";

function uid() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function voucherCode(rewardId: string) {
  return `EB-${rewardId.slice(0, 4).toUpperCase()}-${uid()}`;
}

function plusDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

type LoyaltyState = {
  transactions: LoyaltyTransaction[];
  vouchers: LoyaltyVoucher[];
  redeem: (rewardId: string) => { ok: boolean; message: string };
};

export const useLoyalty = create<LoyaltyState>()(
  persist(
    (set, get) => ({
      transactions: seedTransactions,
      vouchers: seedVouchers,
      redeem: (rewardId) => {
        const reward = getLoyaltyReward(rewardId);
        if (!reward) return { ok: false, message: "Nie znaleziono nagrody." };

        const user = useAuth.getState().user;
        const points = user?.pointsBalance ?? 0;
        if (points < reward.pointsCost) {
          return { ok: false, message: "Za mało punktów na tę nagrodę." };
        }

        const voucher: LoyaltyVoucher = {
          id: `v-${uid()}`,
          rewardId: reward.id,
          title: reward.title,
          pointsCost: reward.pointsCost,
          code: voucherCode(reward.id),
          status: "aktywny",
          expiresAt: plusDays(90),
        };
        const tx: LoyaltyTransaction = {
          id: `tx-${uid()}`,
          date: new Date().toISOString().slice(0, 10),
          description: `Wymiana: ${reward.title}`,
          points: -reward.pointsCost,
          type: "spend",
        };

        useAuth.getState().updateProfile({
          pointsBalance: points - reward.pointsCost,
        });
        set({
          vouchers: [voucher, ...get().vouchers],
          transactions: [tx, ...get().transactions],
        });
        return {
          ok: true,
          message: `Wymieniono na „${reward.title}”. Kod: ${voucher.code}`,
        };
      },
    }),
    { name: "pss-loyalty" },
  ),
);
