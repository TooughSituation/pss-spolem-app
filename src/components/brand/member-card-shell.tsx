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
        "relative overflow-hidden rounded-xl text-white",
        "bg-[linear-gradient(152deg,#003366_0%,#0055A4_58%,#003366_100%)]",
        "shadow-[0_10px_24px_rgba(0,51,102,0.30)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-28deg, transparent, transparent 12px, #ffffff 12px, #ffffff 13px)",
        }}
      />
      <div className="pointer-events-none absolute -right-10 -top-14 size-36 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-12 left-6 size-24 rounded-full border border-white/15" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_42%,rgba(255,255,255,0.10)_50%,transparent_58%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
