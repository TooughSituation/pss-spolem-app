"use client";

import { seedTransactions, seedVouchers } from "@/lib/data/loyalty";
import { defaultAddresses } from "@/lib/data/addresses";
import { seedGastroOrders } from "@/lib/data/gastro-orders";
import { defaultProfile } from "@/lib/data/user";
import { useAuth } from "@/lib/stores/auth";
import { useGastroCart } from "@/lib/stores/gastro-cart";
import { useLoyalty } from "@/lib/stores/loyalty";
import { useUser } from "@/lib/stores/user";

const STORAGE_KEYS = [
  "pss-auth",
  "pss-loyalty",
  "pss-user",
  "pss-shopping-list",
  "pss-cart",
  "pss-gastro-cart",
];

export function resetAccount() {
  useAuth.getState().logout();
  useLoyalty.setState({
    transactions: seedTransactions,
    vouchers: seedVouchers,
  });
  useUser.setState({
    profile: defaultProfile,
    addresses: defaultAddresses,
  });
  useGastroCart.setState({
    items: [],
    orders: seedGastroOrders,
    addressId: "dom",
    slot: "12:00–12:30",
    payment: "przy-odbiorze",
    sheetOpen: false,
  });
  if (typeof window !== "undefined") {
    STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
  }
}
