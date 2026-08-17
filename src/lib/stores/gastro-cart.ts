"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dishUnitPrice, getDish } from "@/lib/data/dishes";
import { seedGastroOrders } from "@/lib/data/gastro-orders";
import { useUser } from "@/lib/stores/user";
import type {
  GastroCartItem,
  GastroOrder,
  GastroOrderStatus,
  GastroPayment,
} from "@/lib/types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function sameLine(a: GastroCartItem, dishId: string, addonIds: string[], notes: string) {
  const left = [...a.addonIds].sort().join(",");
  const right = [...addonIds].sort().join(",");
  return a.dishId === dishId && left === right && a.notes.trim() === notes.trim();
}

export function deriveGastroStatus(createdAt: string): GastroOrderStatus {
  const minutes = (Date.now() - new Date(createdAt).getTime()) / 60000;
  if (minutes >= 20) return "dostarczone";
  if (minutes >= 8) return "w-drodze";
  if (minutes >= 2) return "przygotowywane";
  return "przyjete";
}

type GastroCartState = {
  items: GastroCartItem[];
  addressId: string;
  slot: string;
  payment: GastroPayment;
  orders: GastroOrder[];
  sheetOpen: boolean;
  add: (dishId: string, addonIds: string[], notes: string, qty?: number) => boolean;
  setQty: (lineId: string, qty: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  setAddress: (id: string) => void;
  setSlot: (slot: string) => void;
  setPayment: (payment: GastroPayment) => void;
  setSheetOpen: (open: boolean) => void;
  placeOrder: () => GastroOrder | null;
};

export const useGastroCart = create<GastroCartState>()(
  persist(
    (set, get) => ({
      items: [],
      addressId: "dom",
      slot: "12:00–12:30",
      payment: "przy-odbiorze",
      orders: seedGastroOrders,
      sheetOpen: false,
      add: (dishId, addonIds, notes, qty = 1) => {
        const dish = getDish(dishId);
        if (!dish) return false;
        const unitPrice = dishUnitPrice(dish, addonIds);
        const existing = get().items.find((item) =>
          sameLine(item, dishId, addonIds, notes),
        );
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.lineId === existing.lineId
                ? { ...item, qty: item.qty + qty }
                : item,
            ),
          });
          return true;
        }
        set({
          items: [
            ...get().items,
            {
              lineId: uid(),
              dishId,
              qty,
              addonIds,
              notes: notes.trim(),
              unitPrice,
            },
          ],
        });
        return true;
      },
      setQty: (lineId, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((item) => item.lineId !== lineId) });
          return;
        }
        set({
          items: get().items.map((item) =>
            item.lineId === lineId ? { ...item, qty } : item,
          ),
        });
      },
      remove: (lineId) =>
        set({ items: get().items.filter((item) => item.lineId !== lineId) }),
      clear: () => set({ items: [] }),
      setAddress: (addressId) => set({ addressId }),
      setSlot: (slot) => set({ slot }),
      setPayment: (payment) => set({ payment }),
      setSheetOpen: (sheetOpen) => set({ sheetOpen }),
      placeOrder: () => {
        const { items, addressId, slot, payment, orders } = get();
        if (!items.length) return null;
        const addresses = useUser.getState().addresses;
        const address =
          addresses.find((item) => item.id === addressId) ??
          addresses.find((item) => item.isDefault) ??
          addresses[0];
        if (!address) return null;
        const total = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
        const now = new Date();
        const [end] = slot.split("–").slice(-1);
        const [hh, mm] = (end || "13:00").split(":").map(Number);
        const eta = new Date(now);
        eta.setHours(hh || 13, mm || 0, 0, 0);
        if (eta <= now) eta.setDate(eta.getDate() + 1);
        const order: GastroOrder = {
          id: `GS-${now.getFullYear().toString().slice(2)}${String(orders.length + 21).padStart(3, "0")}`,
          createdAt: now.toISOString(),
          eta: eta.toISOString(),
          status: "przyjete",
          items,
          total,
          addressId: address.id,
          addressLabel: `${address.label}, ${address.street}, ${address.postalCode} ${address.city}`,
          slot,
          payment,
        };
        set({ orders: [order, ...orders], items: [], sheetOpen: false });
        return order;
      },
    }),
    {
      name: "pss-gastro-cart",
      version: 2,
      migrate: (persisted) => {
        const state = persisted as Partial<GastroCartState>;
        return {
          items: state.items ?? [],
          addressId: state.addressId ?? "dom",
          slot: state.slot ?? "12:00–12:30",
          payment: state.payment ?? "przy-odbiorze",
          orders:
            state.orders && state.orders.length > 0
              ? state.orders
              : seedGastroOrders,
        };
      },
      partialize: (state) => ({
        items: state.items,
        addressId: state.addressId,
        slot: state.slot,
        payment: state.payment,
        orders: state.orders,
      }),
    },
  ),
);

export function gastroCount(items: GastroCartItem[]) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function gastroTotal(items: GastroCartItem[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}
