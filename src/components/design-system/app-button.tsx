import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const appButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-[color,background-color,transform,box-shadow] duration-150 outline-none select-none active:scale-[0.98] focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,85,164,0.28)] hover:bg-primary-dark active:bg-primary-dark",
        secondary:
          "bg-accent-light text-primary-dark hover:bg-primary/15",
        outline:
          "border border-primary bg-background text-primary hover:bg-accent-light",
        ghost: "text-primary hover:bg-accent-light",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-4",
        lg: "h-12 px-5 text-[15px]",
        icon: "size-11",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof appButtonVariants> & {
    loading?: boolean;
  };

export function AppButton({
  className,
  variant,
  size,
  fullWidth,
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(appButtonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}

export { appButtonVariants };
