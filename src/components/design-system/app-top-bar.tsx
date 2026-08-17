"use client";

import { useRouter } from "next/navigation";
import { Bell, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";
import { SpolemMark } from "@/components/brand/spolem-mark";
import { useShoppingList } from "@/lib/stores/shopping-list";

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
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-primary"
        aria-hidden
      />
      <SpolemMark />
      <div className="flex items-center">
        <button
          type="button"
          className="relative grid size-11 place-items-center rounded-xl text-primary hover:bg-accent-light"
          aria-label="Lista zakupów"
          onClick={() => router.push("/lista")}
        >
          <ShoppingBasket className="size-5" />
          {listCount > 0 ? (
            <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
              {listCount}
            </span>
          ) : null}
        </button>
        {showNotifications ? (
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl text-primary hover:bg-accent-light"
            aria-label="Powiadomienia"
            onClick={() =>
              toast("Cisza w skrzynce", {
                description:
                  "Gdy wyjdzie nowa gazetka Społem, damy znać właśnie tutaj.",
              })
            }
          >
            <Bell className="size-5" />
          </button>
        ) : null}
      </div>
    </header>
  );
}
