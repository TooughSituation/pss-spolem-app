"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultProfile, rewards } from "@/lib/data/user";
import type { UserProfile } from "@/lib/types";

type UserState = {
  profile: UserProfile;
  hydrated: boolean;
  updateProfile: (patch: Partial<UserProfile>) => void;
  setNotification: (
    key: keyof UserProfile["notifications"],
    value: boolean,
  ) => void;
  redeem: (rewardId: string) => boolean;
};

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
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
      redeem: (rewardId) => {
        const reward = rewards.find((r) => r.id === rewardId);
        if (!reward) return false;
        if (get().profile.points < reward.points) return false;
        set({
          profile: {
            ...get().profile,
            points: get().profile.points - reward.points,
          },
        });
        return true;
      },
    }),
    {
      name: "pss-user",
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);