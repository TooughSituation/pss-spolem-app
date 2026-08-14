"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Percent,
  ShoppingBasket,
  Store,
  UserRound,
} from "lucide-react";
import { useShoppingList } from "@/lib/stores/shopping-list";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" || p.startsWith("/oferta") || p.startsWith("/skanuj") },
  { href: "/promocje", label: "Promocje", icon: Percent, match: (p: string) => p.startsWith("/promocje") },
  { href: "/lista", label: "Lista", icon: ShoppingBasket, match: (p: string) => p.startsWith("/lista") },
  { href: "/sklepy", label: "Sklepy", icon: Store, match: (p: string) => p.startsWith("/sklepy") },
  { href: "/profil", label: "Profil", icon: UserRound, match: (p: string) => p.startsWith("/profil") || p.startsWith("/lojalnosc") || p.startsWith("/zamow") },
];

export function BottomNav() {
  const pathname = usePathname();
  const listCount = useShoppingList((s) => s.items.filter((i) => !i.checked).length);

  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid h-[64px] grid-cols-5">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  "relative flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span className="relative">
                  <Icon
                    className={cn("size-5", active && "stroke-[2.4]")}
                  />
                  {tab.href === "/lista" && listCount > 0 && (
                    <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-coop-red px-1 text-[9px] font-bold text-white">
                      {listCount}
                    </span>
                  )}
                </span>
                {tab.label}
                {active && (
                  <span className="absolute top-1 h-1 w-1 rounded-full bg-primary" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}