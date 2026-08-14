"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layout/bottom-nav";
import { cn } from "@/lib/utils";

const hideNav = ["/skanuj", "/promocje/gazetka"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = !hideNav.some((p) => pathname === p);

  return (
    <div className="min-h-dvh bg-[oklch(0.2_0.03_150)] md:flex md:items-center md:justify-center md:p-6">
      <div
        className={cn(
          "relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-background md:min-h-[860px] md:max-h-[900px] md:rounded-[2rem] md:border md:shadow-2xl",
        )}
      >
        <div className={cn("flex-1 overflow-y-auto", showNav && "pb-nav")}>
          {children}
        </div>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}