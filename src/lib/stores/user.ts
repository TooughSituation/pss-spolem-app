"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultAddresses } from "@/lib/data/addresses";
import { defaultProfile, rewards } from "@/lib/data/user";
import { useAuth } from "@/lib/stores/auth";
import type { DeliveryAddress, UserProfile } from "@/lib/types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

type UserState = {
  profile: UserProfile;
  addresses: DeliveryAddress[];
  hydrated: boolean;
  updateProfile: (patch: Partial<UserProfile>) => void;
  setNotification: (
    key: keyof UserProfile["notifications"],
    value: boolean,
  ) => void;
  addAddress: (input: Omit<DeliveryAddress, "id">) => string;
  updateAddress: (id: string, patch: Partial<DeliveryAddress>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  redeem: (rewardId: string) => boolean;
};

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      addresses: defaultAddresses,
      hydrated: false,
      updateProfile: (patch) =>
        set({ profile: { ...get().profile, ...patch } }),
      setNotification: (key, value) =>
        set({
          profile: {
            ...get().profile,
            notifications: { ...get().profile.notifications, [key]: value },
          },
        }),
      addAddress: (input) => {
        const id = uid();
        const makeDefault = input.isDefault || get().addresses.length === 0;
        set({
          addresses: [
            ...get().addresses.map((item) =>
              makeDefault ? { ...item, isDefault: false } : item,
            ),
            { ...input, id, isDefault: makeDefault },
          ],
        });
        return id;
      },
      updateAddress: (id, patch) =>
        set({
          addresses: get().addresses.map((item) =>
            item.id === id ? { ...item, ...patch, id: item.id } : item,
          ),
        }),
      removeAddress: (id) => {
        const next = get().addresses.filter((item) => item.id !== id);
        if (next.length && !next.some((item) => item.isDefault)) {
          next[0] = { ...next[0], isDefault: true };
        }
        set({ addresses: next });
      },
      setDefaultAddress: (id) =>
        set({
          addresses: get().addresses.map((item) => ({
            ...item,
            isDefault: item.id === id,
          })),
        }),
      redeem: (rewardId) => {
        const reward = rewards.find((r) => r.id === rewardId);
        if (!reward) return false;
        const authUser = useAuth.getState().user;
        const currentPoints =
          authUser?.pointsBalance ?? get().profile.points;
        if (currentPoints < reward.points) return false;
        if (authUser) {
          useAuth.getState().updateProfile({
            pointsBalance: authUser.pointsBalance - reward.points,
          });
        }
        set({
          profile: {
            ...get().profile,
            points: currentPoints - reward.points,
          },
        });
        return true;
      },
    }),
    {
      name: "pss-user",
      version: 2,
      migrate: (persisted) => {
        const state = persisted as Partial<UserState>;
        return {
          profile: state.profile ?? defaultProfile,
          addresses:
            state.addresses?.map((item) => ({
              ...item,
              postalCode: item.postalCode || "15-001",
              isDefault: item.isDefault ?? false,
            })) ?? defaultAddresses,
        };
      },
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
