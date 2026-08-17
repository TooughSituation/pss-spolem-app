"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppTopBar } from "@/components/design-system/app-top-bar";
import { AppSkeleton } from "@/components/design-system/app-skeleton";
import { BottomTabBar } from "@/components/design-system/bottom-tab-bar";
import { SpolemMark } from "@/components/brand/spolem-mark";
import { useAuth, useAuthHydration } from "@/lib/stores/auth";
import {
  isAuthRoute,
  isFullscreenRoute,
  isPublicRoute,
} from "@/lib/auth/routes";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useAuth((s) => s.hydrated);
  const isAuthenticated = useAuth((s) => s.isAuthenticated);

  useAuthHydration();

  const authScreen = isAuthRoute(pathname);
  const publicScreen = isPublicRoute(pathname);
  const fullscreen = isFullscreenRoute(pathname);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated && !publicScreen) {
      router.replace("/login");
      return;
    }
    if (isAuthenticated && authScreen) {
      router.replace("/");
    }
  }, [authScreen, hydrated, isAuthenticated, publicScreen, router]);

  const waitingForSession = !hydrated;
  const blockingRedirect =
    hydrated &&
    ((!isAuthenticated && !publicScreen) || (isAuthenticated && authScreen));

  const showChrome = hydrated && isAuthenticated && !authScreen && !fullscreen;
  const showNav = showChrome;

  return (
    <div className="min-h-dvh bg-primary-dark md:flex md:items-center md:justify-center md:p-6">
      <div
        className={cn(
          "relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-background md:min-h-[860px] md:max-h-[900px] md:rounded-[2rem] md:border md:shadow-2xl",
        )}
      >
        {showChrome ? <AppTopBar /> : null}
        <div
          className={cn(
            "flex-1 overflow-y-auto",
            showNav && "pb-nav",
          )}
        >
          {waitingForSession || blockingRedirect ? (
            <SplashScreen />
          ) : (
            children
          )}
        </div>
        {showNav ? <BottomTabBar /> : null}
      </div>
    </div>
  );
}

function SplashScreen() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 px-8 py-16">
      <SpolemMark />
      <div className="w-full max-w-[240px] space-y-2">
        <AppSkeleton className="h-3 w-3/4" />
        <AppSkeleton className="h-3 w-full" />
        <AppSkeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
