import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppEmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-8 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 grid size-16 place-items-center rounded-xl border border-primary/15 bg-accent-light text-primary">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-bold text-text-primary">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
