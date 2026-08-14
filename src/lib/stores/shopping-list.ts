"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ShoppingListItem } from "@/lib/types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

type ShoppingListState = {
  items: ShoppingListItem[];
  addProduct: (product: Product, qty?: number) => void;
  addCustom: (name: string, qty?: number, unit?: string) => void;
  setQty: (id: string, qty: number) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clearChecked: () => void;
  clearAll: () => void;
};

export const useShoppingList = create<ShoppingListState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "seed-1",
          productId: "chleb-wiejski",
          name: "Chleb wiejski na zakwasie",
          qty: 1,
          unit: "szt.",
          checked: false,
          price: 6.49,
        },
        {
          id: "seed-2",
          productId: "mleko",
          name: "Mleko świeże 3,2%",
          qty: 2,
          unit: "szt.",
          checked: false,
          price: 3.29,
        },
        {
          id: "seed-3",
          name: "Pasta do zębów",
          qty: 1,
          unit: "szt.",
          checked: true,
        },
      ],
      addProduct: (product, qty = 1) => {
        const existing = get().items.find((i) => i.productId === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === existing.id ? { ...i, qty: i.qty + qty } : i,
            ),
          });
          return;
        }
        set({
          items: [
            {
              id: uid(),
              productId: product.id,
              name: product.name,
              qty,
              unit: product.unit,
              checked: false,
              price: product.price,
            },
            ...get().items,
          ],
        });
      },
      addCustom: (name, qty = 1, unit = "szt.") => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set({
          items: [
            {
              id: uid(),
              name: trimmed,
              qty,
              unit,
              checked: false,
            },
            ...get().items,
          ],
        });
      },
      setQty: (id, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },
      toggle: (id) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, checked: !i.checked } : i,
          ),
        }),
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clearChecked: () =>
        set({ items: get().items.filter((i) => !i.checked) }),
      clearAll: () => set({ items: [] }),
    }),
    { name: "pss-shopping-list" },
  ),
);