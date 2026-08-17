import Image from "next/image";
import { cn } from "@/lib/utils";

const LOCKUP = {
  color: "/logo/pss-spolem.png",
  white: "/logo/pss-spolem-white.png",
  navy: "/logo/pss-spolem-navy.png",
} as const;

const MARK = {
  color: "/logo/pss-mark.png",
  white: "/logo/pss-mark-white.png",
  navy: "/logo/pss-mark.png",
} as const;

const HEIGHT = {
  sm: 22,
  md: 28,
  lg: 40,
  xl: 52,
} as const;

const LOCKUP_RATIO = 796 / 196;
const MARK_RATIO = 238 / 172;

export function SpolemMark({
  className,
  compact = false,
  variant = "color",
  size = "md",
  showCity = false,
}: {
  className?: string;
  compact?: boolean;
  variant?: keyof typeof LOCKUP;
  size?: keyof typeof HEIGHT;
  showCity?: boolean;
}) {
  const height = HEIGHT[size];

  if (compact) {
    return (
      <Image
        src={MARK[variant]}
        alt="PSS Społem"
        width={Math.round(height * MARK_RATIO)}
        height={height}
        className={cn("object-contain", className)}
        priority
      />
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={LOCKUP[variant]}
        alt="PSS Społem Białystok"
        width={Math.round(height * LOCKUP_RATIO)}
        height={height}
        className="object-contain"
        priority
      />
      {showCity ? (
        <span
          className={cn(
            "text-[11px] font-medium uppercase tracking-[0.16em]",
            variant === "white" ? "text-white/70" : "text-text-secondary",
          )}
        >
          Białystok
        </span>
      ) : null}
    </div>
  );
}
