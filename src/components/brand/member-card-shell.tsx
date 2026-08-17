import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MemberCardShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-primary-dark text-white shadow-[0_8px_20px_rgba(0,51,102,0.28)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-28deg, transparent, transparent 11px, #0055A4 11px, #0055A4 12px)",
        }}
      />
      <div className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-primary/40" />
      <div className="pointer-events-none absolute -bottom-10 left-10 size-20 rounded-full border-2 border-primary/40" />
      <div className="relative">{children}</div>
    </div>
  );
}
