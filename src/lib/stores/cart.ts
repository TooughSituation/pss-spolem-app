"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Order } from "@/lib/types";
import { getProduct } from "@/lib/data/products";
import { seedOrders } from "@/lib/data/user";

type CartState = {
  items: CartItem[];
  storeId: string;
  fulfillment: "click-collect" | "dostawa";
  slot: string;
  orders: Order[];
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  setStore: (storeId: string) => void;
  setFulfillment: (value: "click-collect" | "dostawa") => void;
  setSlot: (slot: string) => void;
  placeOrder: () => Order | null;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      storeId: "centrum",
      fulfillment: "click-collect",
      slot: "16:00–16:30",
      orders: seedOrders,
      add: (productId, qty = 1) => {
        const existing = get().items.find((i) => i.productId === productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === productId ? { ...i, qty: i.qty + qty } : i,
            ),
          });
          return;
        }
        set({ items: [...get().items, { productId, qty }] });
      },
      setQty: (productId, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, qty } : i,
          ),
        });
      },
      remove: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
      setStore: (storeId) => set({ storeId }),
      setFulfillment: (fulfillment) => set({ fulfillment }),
      setSlot: (slot) => set({ slot }),
      placeOrder: () => {
        const { items, storeId, fulfillment, slot, orders } = get();
        if (!items.length) return null;
        const lines = items
          .map((i) => {
            const p = getProduct(i.productId);
            if (!p) return null;
            return { productId: p.id, qty: i.qty, price: p.price };
          })
          .filter(Boolean) as Order["items"];
        const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
        const now = new Date();
        const pickup = new Date(now);
        pickup.setHours(16, 0, 0, 0);
        const order: Order = {
          id: `SP-${now.getFullYear().toString().slice(2)}${String(orders.length + 82).padStart(3, "0")}`,
          storeId,
          createdAt: now.toISOString(),
          pickupAt: pickup.toISOString(),
          status: fulfillment === "dostawa" ? "w-realizacji" : "nowe",
          type: fulfillment,
          items: lines,
          total,
        };
        void slot;
        set({ orders: [order, ...orders], items: [] });
        return order;
      },
    }),
    { name: "pss-cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((s, i) => s + i.qty, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((s, i) => {
    const p = getProduct(i.productId);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
}