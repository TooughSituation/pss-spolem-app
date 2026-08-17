"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Bell, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";
import { SpolemMark } from "@/components/brand/spolem-mark";
import { useShoppingList } from "@/lib/stores/shopping-list";
import { cn } from "@/lib/utils";

export function AppTopBar({
  showNotifications = true,
}: {
  showNotifications?: boolean;
}) {
  const router = useRouter();
  const listCount = useShoppingList(
    (s) => s.items.filter((item) => !item.checked).length,
  );

  return (
    <header
      className="relative z-30 flex shrink-0 items-center justify-between bg-background px-4 pb-2.5"
      style={{ paddingTop: "max(0.625rem, env(safe-area-inset-top))" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-primary"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border"
        aria-hidden
      />
      <SpolemMark size="md" />
      <div className="flex items-center gap-0.5">
        <TopBarIcon
          label="Lista zakupów"
          onClick={() => router.push("/lista")}
        >
          <ShoppingBasket className="size-5" />
          {listCount > 0 ? (
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
              {listCount > 99 ? "99+" : listCount}
            </span>
          ) : null}
        </TopBarIcon>
        {showNotifications ? (
          <TopBarIcon
            label="Powiadomienia"
            onClick={() =>
              toast("Cisza w skrzynce", {
                description:
                  "Gdy wyjdzie nowa gazetka Społem, damy znać właśnie tutaj.",
              })
            }
          >
            <Bell className="size-5" />
          </TopBarIcon>
        ) : null}
      </div>
    </header>
  );
}

function TopBarIcon({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        "relative grid size-11 place-items-center rounded-xl text-primary",
        "transition-colors duration-150 hover:bg-accent-light active:scale-[0.96]",
      )}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
