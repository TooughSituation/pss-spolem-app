import { cn } from "@/lib/utils";

export function SpolemMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path
            d="M12 3c2.8 3.2 4.2 6 4.2 8.4A4.2 4.2 0 0 1 12 15.6 4.2 4.2 0 0 1 7.8 11.4C7.8 9 9.2 6.2 12 3Z"
            fill="currentColor"
          />
          <path
            d="M12 15.6V21"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="18.2" cy="7.2" r="1.35" fill="#C8102E" />
        </svg>
      </span>
      {!compact && (
        <div className="leading-tight">
          <p className="text-[15px] font-extrabold tracking-tight">PSS Społem</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Znaczy razem
          </p>
        </div>
      )}
    </div>
  );
}