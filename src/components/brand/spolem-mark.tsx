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
      <span
        className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-sm font-bold tracking-tight text-primary-foreground shadow-sm"
        aria-hidden
      >
        PSS
      </span>
      {!compact && (
        <div className="leading-tight">
          <p className="text-[15px] font-bold tracking-tight text-primary">
            PSS Społem
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-secondary">
            Białystok
          </p>
        </div>
      )}
    </div>
  );
}
