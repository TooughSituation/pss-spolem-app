"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MapPin,
  Percent,
  UserRound,
  UtensilsCrossed,
} from "lucide-react";
import { gastroCount, useGastroCart } from "@/lib/stores/gastro-cart";
import { cn } from "@/lib/utils";

const tabs = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    match: (p: string) =>
      p === "/" ||
      p.startsWith("/oferta") ||
      p.startsWith("/skanuj") ||
      p.startsWith("/produkt") ||
      p.startsWith("/lista"),
  },
  {
    href: "/promocje",
    label: "Promocje",
    icon: Percent,
    match: (p: string) => p.startsWith("/promocje"),
  },
  {
    href: "/gastronomia",
    label: "Gastronomia",
    icon: UtensilsCrossed,
    match: (p: string) =>
      p.startsWith("/gastronomia") ||
      p.startsWith("/danie") ||
      p.startsWith("/checkout") ||
      p.startsWith("/zamowienie"),
  },
  {
    href: "/sklepy",
    label: "Sklepy",
    icon: MapPin,
    match: (p: string) => p.startsWith("/sklepy"),
  },
  {
    href: "/profil",
    label: "Profil",
    icon: UserRound,
    match: (p: string) =>
      p.startsWith("/profil") ||
      p.startsWith("/lojalnosc") ||
      p.startsWith("/ustawienia") ||
      p.startsWith("/zamow"),
  },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();
  const cartCount = useGastroCart((s) => gastroCount(s.items));

  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Nawigacja główna"
    >
      <ul className="grid h-[68px] grid-cols-5">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  "relative flex h-full flex-col items-center justify-center gap-0.5 px-1 text-center text-[11px] font-semibold leading-tight transition-colors",
                  active ? "text-primary" : "text-text-secondary",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="relative">
                  <Icon className={cn("size-5", active && "stroke-[2.4]")} />
                  {tab.href === "/gastronomia" && cartCount > 0 ? (
                    <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </span>
                {tab.label}
                {active ? (
                  <span className="absolute top-1.5 h-1 w-1 rounded-full bg-primary" />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
