import { AppBadge } from "@/components/design-system/app-badge";
import { AppCard } from "@/components/design-system/app-card";
import { formatDate } from "@/lib/format";
import type { LoyaltyVoucher } from "@/lib/types";

export function VoucherCard({ voucher }: { voucher: LoyaltyVoucher }) {
  const active = voucher.status === "aktywny";

  return (
    <AppCard className={active ? "" : "opacity-70"}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold">{voucher.title}</p>
          <p className="mt-1 font-mono text-sm tracking-wide text-primary">
            {voucher.code}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Ważny do {formatDate(voucher.expiresAt)}
          </p>
        </div>
        <AppBadge variant={active ? "success" : "outline"}>
          {active ? "Aktywny" : "Wykorzystany"}
        </AppBadge>
      </div>
      {active ? (
        <p className="mt-2 text-sm text-text-secondary">
          Pokaż kod przy kasie, aby zrealizować e-bon.
        </p>
      ) : null}
    </AppCard>
  );
}
