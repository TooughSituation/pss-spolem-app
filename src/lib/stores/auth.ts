"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  AUTH_HYDRATION_TIMEOUT_MS,
  AUTH_STORAGE_KEY,
  MOCK_OTP_CODE,
} from "@/lib/constants";
import type { AuthUser } from "@/lib/types";

export const mockUserTemplate: Omit<AuthUser, "phone"> = {
  id: "1",
  name: "Anna",
  loyaltyCardNumber: "1234567890",
  pointsBalance: 1250,
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  pendingPhone: string | null;
  pendingLoyaltyCard: string | null;
  startLogin: (phone: string, loyaltyCardNumber?: string) => void;
  login: (phone: string, code: string) => boolean;
  logout: () => void;
  updateProfile: (patch: Partial<AuthUser>) => void;
};

function clientStorage() {
  if (typeof window === "undefined") {
    throw new Error("ssr");
  }
  return window.localStorage;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hydrated: false,
      pendingPhone: null,
      pendingLoyaltyCard: null,
      startLogin: (phone, loyaltyCardNumber) =>
        set({
          pendingPhone: phone,
          pendingLoyaltyCard: loyaltyCardNumber?.trim() || null,
        }),
      login: (phone, code) => {
        if (code !== MOCK_OTP_CODE) return false;
        const card =
          get().pendingLoyaltyCard || mockUserTemplate.loyaltyCardNumber;
        set({
          user: {
            ...mockUserTemplate,
            phone,
            loyaltyCardNumber: card,
          },
          isAuthenticated: true,
          pendingPhone: null,
          pendingLoyaltyCard: null,
        });
        return true;
      },
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          pendingPhone: null,
          pendingLoyaltyCard: null,
        }),
      updateProfile: (patch) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...patch } });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(clientStorage),
      skipHydration: true,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pendingPhone: state.pendingPhone,
        pendingLoyaltyCard: state.pendingLoyaltyCard,
      }),
    },
  ),
);

function markHydrated() {
  useAuth.setState({ hydrated: true });
}

export function useAuthReady() {
  const hydrated = useAuth((s) => s.hydrated);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const persistApi = useAuth.persist;
    if (!persistApi) {
      markHydrated();
      return;
    }

    const unsub = persistApi.onFinishHydration(markHydrated);

    try {
      const result = persistApi.rehydrate();
      if (result && typeof result.then === "function") {
        Promise.resolve(result).catch(() => markHydrated());
      }
    } catch {
      markHydrated();
    }

    if (persistApi.hasHydrated()) markHydrated();

    const timeout = window.setTimeout(() => {
      markHydrated();
      setTimedOut(true);
    }, AUTH_HYDRATION_TIMEOUT_MS);

    return () => {
      unsub?.();
      window.clearTimeout(timeout);
    };
  }, []);

  return hydrated || timedOut;
}
