"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  MapPin,
  ScanLine,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import { categories } from "@/lib/data/categories";
import { ownBrandProducts, promoProducts } from "@/lib/data/products";
import { flyerValid } from "@/lib/data/promotions";
import { isStoreOpen, storesByDistance } from "@/lib/data/stores";
import { NEXT_VOUCHER_AT } from "@/lib/data/user";
import { greetingForNow } from "@/lib/format";
import { useUser } from "@/lib/stores/user";
import { ProductCard } from "@/components/product/product-card";
import { SpolemMark } from "@/components/brand/spolem-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function HomeView() {
  const profile = useUser((s) => s.profile);
  const nearest = storesByDistance().slice(0, 3);
  const promos = promoProducts();
  const own = ownBrandProducts().slice(0, 6);

  return (
    <div>
      <header className="flex items-center justify-between px-4 pb-2 pt-[max(0.85rem,env(safe-area-inset-top))]">
        <SpolemMark />
        <Button asChild variant="ghost" size="icon" className="size-10">
          <Link href="/profil" aria-label="Powiadomienia">
            <Bell className="size-5" />
          </Link>
        </Button>
      </header>

      <div className="px-4 pb-3">
        <p className="text-sm text-muted-foreground">{greetingForNow()},</p>
        <h2 className="text-2xl font-extrabold tracking-tight">
          {profile.firstName}
        </h2>
      </div>

      <div className="px-4">
        <Link
          href="/lojalnosc"
          className="block overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-700 to-lime-600 p-4 text-white shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Społem znaczy razem
              </p>
              <p className="mt-2 text-3xl font-black tabular-nums">
                {profile.points}
                <span className="ml-1 text-sm font-semibold text-white/80">
                  pkt
                </span>
              </p>
              <p className="mt-1 text-xs text-white/80">
                Brakuje {NEXT_VOUCHER_AT - profile.points} pkt do bonu 50 zł
              </p>
            </div>
            <Sparkles className="size-6 text-amber-200" />
          </div>
          <Progress
            value={(profile.points / NEXT_VOUCHER_AT) * 100}
            className="mt-3 h-1.5 bg-white/20 *:bg-amber-300"
          />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 px-4">
        {[
          { href: "/skanuj", label: "Skanuj", icon: ScanLine, tone: "bg-primary text-primary-foreground" },
          { href: "/promocje/gazetka", label: "Gazetka", icon: Sparkles, tone: "bg-accent text-accent-foreground" },
          { href: "/oferta", label: "Oferta", icon: ShoppingBag, tone: "bg-secondary text-secondary-foreground" },
          { href: "/zamow", label: "Zamów", icon: Store, tone: "bg-[var(--coop-red)] text-white" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className={`grid size-14 place-items-center rounded-2xl shadow-sm ${item.tone}`}
            >
              <item.icon className="size-5" />
            </span>
            <span className="text-[11px] font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>

      <section className="mt-6">
        <SectionHead title="Promocje tygodnia" href="/promocje" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
          {promos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-[168px] shrink-0"
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-6 px-4">
        <Link
          href="/promocje/gazetka"
          className="relative block overflow-hidden rounded-3xl"
        >
          <div className="relative h-40">
            <Image
              src="/images/flyer.jpg"
              alt="Gazetka tygodnia PSS Społem"
              fill
              className="object-cover"
              sizes="430px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-900/55 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <Badge className="mb-2 w-fit bg-accent text-accent-foreground">
              14–20 sierpnia
            </Badge>
            <p className="text-lg font-extrabold">Aktualna gazetka</p>
            <p className="text-xs text-white/80">
              Przeglądaj oferty i dodawaj do listy · do {flyerValid.to}
            </p>
          </div>
        </Link>
      </section>

      <section className="mt-6">
        <SectionHead title="Kategorie" href="/oferta" />
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/oferta?kategoria=${c.id}`}
              className={`flex w-[108px] shrink-0 flex-col rounded-2xl bg-gradient-to-br ${c.tint} p-3 dark:from-card dark:to-muted`}
            >
              <span className="text-2xl">{c.emoji}</span>
              <span className="mt-2 text-[12px] font-bold leading-tight">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionHead title="Marka własna PSS" href="/oferta?kategoria=wlasne" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
          {own.map((p) => (
            <div key={p.id} className="w-[168px] shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 px-4 pb-6">
        <SectionHead title="Najbliższe sklepy" href="/sklepy" />
        <div className="space-y-2">
          {nearest.map((store) => {
            const open = isStoreOpen(store);
            return (
              <Link
                key={store.id}
                href={`/sklepy/${store.id}`}
                className="flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-sm"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary">
                  <MapPin className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{store.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {store.address}
                  </p>
                </div>
                <Badge variant={open ? "default" : "secondary"}>
                  {open ? "Otwarte" : "Zamknięte"}
                </Badge>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-3 flex items-center justify-between px-4">
      <h3 className="text-base font-extrabold">{title}</h3>
      <Link
        href={href}
        className="inline-flex items-center text-xs font-semibold text-primary"
      >
        Zobacz wszystkie <ChevronRight className="size-3.5" />
      </Link>
    </div>
  );
}