import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-8 py-14 text-center",
        className,
      )}
    >
      <div className="mb-4 grid size-16 place-items-center rounded-3xl bg-secondary text-primary">
        {icon}
      </div>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-1.5 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}