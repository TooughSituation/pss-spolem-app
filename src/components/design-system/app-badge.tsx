import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const appBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-accent-light text-primary-dark",
        success: "bg-success/15 text-success",
        error: "bg-error/15 text-error",
        warning: "bg-warning/20 text-primary-dark",
        outline: "border border-border text-text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function AppBadge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof appBadgeVariants>) {
  return (
    <span
      className={cn(appBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { appBadgeVariants };
