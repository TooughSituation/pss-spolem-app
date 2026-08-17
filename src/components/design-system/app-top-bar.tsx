"use client";

import { Bell } from "lucide-react";
import { toast } from "sonner";
import { SpolemMark } from "@/components/brand/spolem-mark";

export function AppTopBar({
  showNotifications = true,
}: {
  showNotifications?: boolean;
}) {
  return (
    <header
      className="z-30 flex shrink-0 items-center justify-between border-b border-border bg-background px-4 pb-2.5"
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <SpolemMark />
      {showNotifications ? (
        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl text-primary hover:bg-accent-light"
          aria-label="Powiadomienia"
          onClick={() =>
            toast("Brak nowych powiadomień", {
              description: "Damy znać, gdy pojawi się nowa gazetka lub promocja.",
            })
          }
        >
          <Bell className="size-5" />
        </button>
      ) : (
        <span className="size-11" />
      )}
    </header>
  );
}
