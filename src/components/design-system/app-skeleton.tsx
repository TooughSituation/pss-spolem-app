import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function AppSkeleton({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-accent-light", className)}
      {...props}
    />
  );
}
