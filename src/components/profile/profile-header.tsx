import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import type { AuthUser } from "@/lib/types";

export function ProfileHeader({
  user,
  onEdit,
}: {
  user: AuthUser;
  onEdit: () => void;
}) {
  return (
    <AppCard>
      <div className="flex items-center gap-3">
        <span className="grid size-14 place-items-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
          {user.name.slice(0, 1)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold">{user.name}</p>
          <p className="text-sm text-text-secondary">{user.phone}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-text-secondary">Numer karty</dt>
          <dd className="font-semibold tabular-nums">{user.loyaltyCardNumber}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-text-secondary">Telefon</dt>
          <dd className="font-semibold">{user.phone}</dd>
        </div>
      </dl>
      <AppButton variant="secondary" fullWidth className="mt-4" onClick={onEdit}>
        Edytuj dane
      </AppButton>
    </AppCard>
  );
}
