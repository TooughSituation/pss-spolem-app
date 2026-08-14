"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScreenHeader({
  title,
  subtitle,
  back,
  backHref,
  action,
  transparent = false,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  backHref?: string;
  action?: React.ReactNode;
  transparent?: boolean;
}) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center gap-2 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]",
        transparent
          ? "bg-transparent"
          : "border-b bg-background/90 backdrop-blur-xl",
      )}
    >
      {back &&
        (backHref ? (
          <Button asChild variant="ghost" size="icon" className="size-9">
            <Link href={backHref} aria-label="Wstecz">
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="size-9"
            onClick={() => router.back()}
            aria-label="Wstecz"
          >
            <ChevronLeft className="size-5" />
          </Button>
        ))}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-extrabold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </header>
  );
}