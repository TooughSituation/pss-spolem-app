"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Moon,
  Package,
  Settings,
  Store,
  Sun,
} from "lucide-react";
import { formatDate } from "@/lib/format";
import { getStore } from "@/lib/data/stores";
import { useCart } from "@/lib/stores/cart";
import { useUser } from "@/lib/stores/user";
import { ScreenHeader } from "@/components/layout/screen-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const statusLabel = {
  nowe: "Nowe",
  "w-realizacji": "W realizacji",
  "do-odbioru": "Do odbioru",
  odebrane: "Odebrane",
  anulowane: "Anulowane",
} as const;

export function ProfileView() {
  const profile = useUser((s) => s.profile);
  const setNotification = useUser((s) => s.setNotification);
  const orders = useCart((s) => s.orders);
  const { theme, setTheme } = useTheme();
  const store = getStore(profile.favoriteStoreId);

  return (
    <div>
      <ScreenHeader title="Profil" />
      <div className="flex items-center gap-3 px-4 pt-4">
        <Avatar className="size-16">
          <AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">
            {profile.firstName[0]}
            {profile.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-extrabold">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <p className="text-xs text-muted-foreground">
            Z nami od {formatDate(profile.memberSince)}
          </p>
        </div>
      </div>

      <Link
        href="/lojalnosc"
        className="mx-4 mt-4 flex items-center justify-between rounded-3xl bg-gradient-to-r from-emerald-800 to-green-600 p-4 text-white"
      >
        <div className="flex items-center gap-3">
          <CreditCard className="size-6" />
          <div>
            <p className="text-sm font-bold">Karta lojalnościowa</p>
            <p className="text-xs text-white/80">{profile.points} punktów</p>
          </div>
        </div>
        <ChevronRight className="size-5" />
      </Link>

      <section className="px-4 pt-6">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold">
          <Package className="size-4 text-primary" /> Historia zamówień
        </h3>
        <div className="space-y-2">
          {orders.map((order) => {
            const s = getStore(order.storeId);
            return (
              <div
                key={order.id}
                className="rounded-2xl border bg-card p-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold">{order.id}</p>
                  <Badge variant="secondary">{statusLabel[order.status]}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s?.name} · {order.type === "dostawa" ? "Dostawa" : "Odbiór"} ·{" "}
                  {order.items.length} poz.
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {order.total.toFixed(2).replace(".", ",")} zł
                </p>
              </div>
            );
          })}
        </div>
        <Button asChild variant="outline" className="mt-3 w-full rounded-2xl">
          <Link href="/zamow">Nowe zamówienie</Link>
        </Button>
      </section>

      <section className="px-4 pt-6">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold">
          <Store className="size-4 text-primary" /> Preferencje
        </h3>
        <div className="rounded-2xl border bg-card p-3">
          <p className="text-xs text-muted-foreground">Mój sklep</p>
          <p className="font-semibold">{store?.name ?? "Nie wybrano"}</p>
          <p className="text-xs text-muted-foreground">{store?.address}</p>
        </div>
      </section>

      <section className="px-4 pt-6">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold">
          <Bell className="size-4 text-primary" /> Powiadomienia
        </h3>
        <div className="space-y-3 rounded-2xl border bg-card p-3">
          {(
            [
              ["promotions", "Promocje tygodnia"],
              ["flyer", "Nowa gazetka"],
              ["loyalty", "Punkty i nagrody"],
              ["orders", "Status zamówienia"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={key}>{label}</Label>
              <Switch
                id={key}
                checked={profile.notifications[key]}
                onCheckedChange={(v) => setNotification(key, v)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold">
          <Settings className="size-4 text-primary" /> Wygląd
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "light", label: "Jasny", icon: Sun },
            { id: "dark", label: "Ciemny", icon: Moon },
            { id: "system", label: "System", icon: Settings },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={`flex flex-col items-center gap-1 rounded-2xl border py-3 text-xs font-semibold ${
                theme === opt.id
                  ? "border-primary bg-secondary text-primary"
                  : "bg-card"
              }`}
            >
              <opt.icon className="size-4" />
              {opt.label}
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Mockup PWA PSS Społem · dane przykładowe · nie jest to oficjalna
          aplikacja spółdzielni
        </p>
      </section>
    </div>
  );
}