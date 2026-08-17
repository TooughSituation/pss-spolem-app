import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function AppChip({
  selected = false,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-3 text-sm font-medium transition-colors duration-150 active:scale-[0.98]",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-text-secondary hover:border-primary hover:text-primary",
        className,
      )}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </button>
  );
}

export function AppTag({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-primary-dark",
        className,
      )}
      {...props}
    />
  );
}
