import { AppSkeleton } from "@/components/design-system/app-skeleton";

export function HomeSkeleton() {
  return (
    <div className="space-y-5 px-4 pt-4">
      <AppSkeleton className="h-7 w-48" />
      <AppSkeleton className="h-48 w-full" />
      <AppSkeleton className="h-40 w-full" />
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <AppSkeleton key={i} className="h-16" />
        ))}
      </div>
      <div className="flex gap-3">
        <AppSkeleton className="h-52 w-40 shrink-0" />
        <AppSkeleton className="h-52 w-40 shrink-0" />
      </div>
    </div>
  );
}
