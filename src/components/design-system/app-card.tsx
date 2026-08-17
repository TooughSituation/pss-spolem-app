import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function AppCard({
  className,
  padding = "md",
  ...props
}: ComponentProps<"div"> & {
  padding?: "none" | "sm" | "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-[0_4px_16px_rgba(0,85,164,0.06)]",
        padding === "sm" && "p-3",
        padding === "md" && "p-4",
        padding === "lg" && "p-5",
        className,
      )}
      {...props}
    />
  );
}
