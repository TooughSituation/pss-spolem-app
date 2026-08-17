"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  FileText,
  LogOut,
  Mail,
  Shield,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { AddressList } from "@/components/profile/address-list";
import { OrderHistoryCard } from "@/components/profile/order-history-card";
import { ProfileHeader } from "@/components/profile/profile-header";
import { SettingsSection } from "@/components/profile/settings-section";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { APP_VERSION } from "@/lib/constants";
import { formatPoints } from "@/lib/format";
import { resetAccount } from "@/lib/reset-account";
import { useAuth } from "@/lib/stores/auth";
import { useGastroCart } from "@/lib/stores/gastro-cart";
import { ShoppingBag } from "lucide-react";

export function ProfileView() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const orders = useGastroCart((s) => s.orders);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!user) return null;

  return (
    <div className="space-y-5 px-4 pb-10 pt-4">
      <h1 className="text-xl font-bold tracking-tight">Profil</h1>

      <ProfileHeader
        user={user}
        onEdit={() => router.push("/ustawienia")}
      />

      <AppCard className="border-0 bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(0,85,164,0.28)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
          Twoje punkty
        </p>
        <p className="mt-1.5 text-3xl font-bold tabular-nums">
          {formatPoints(user.pointsBalance)}
          <span className="ml-1 text-sm font-medium text-white/80">pkt</span>
        </p>
        <Link
          href="/lojalnosc"
          className="mt-3 inline-flex items-center text-sm font-semibold text-white"
        >
          Program lojalnościowy i e-bony <ChevronRight className="size-4" />
        </Link>
      </AppCard>

      <AddressList />

      <section>
        <h2 className="mb-2 text-base font-bold">Historia zamówień</h2>
        {orders.length === 0 ? (
          <AppEmptyState
            icon={<ShoppingBag className="size-7" />}
            title="Jeszcze nic z baru"
            description="Zamów obiad ze stołówki Społem — historia pojawi się tutaj."
            className="py-8"
          />
        ) : (
          <div className="space-y-2">
            {orders.map((order) => (
              <OrderHistoryCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>

      <SettingsSection />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <ProfileLink href="/regulamin" icon={FileText} label="Regulamin" />
        <ProfileLink
          href="/polityka-prywatnosci"
          icon={Shield}
          label="Polityka prywatności"
        />
        <ProfileLink href="/kontakt" icon={Mail} label="Kontakt" />
      </div>

      <div className="space-y-2">
        <AppButton
          variant="outline"
          fullWidth
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          <LogOut className="size-4" />
          Wyloguj się
        </AppButton>
        <AppButton
          variant="outline"
          fullWidth
          className="border-error text-error hover:bg-error/10"
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 className="size-4" />
          Usuń konto
        </AppButton>
      </div>

      <p className="text-center text-sm text-text-secondary">
        PSS Społem Białystok · wersja {APP_VERSION}
      </p>

      {confirmDelete ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-primary-dark/40"
            aria-label="Zamknij"
            onClick={() => setConfirmDelete(false)}
          />
          <div className="absolute inset-x-4 top-1/2 mx-auto max-w-[380px] -translate-y-1/2 rounded-xl bg-background p-4 shadow-2xl">
            <h2 className="text-base font-bold">Usunąć konto?</h2>
            <p className="mt-2 text-sm text-text-secondary">
              To wyczyści sesję, punkty, e-bony, adresy i koszyki zapisane na
              tym urządzeniu. Tej operacji nie da się cofnąć.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <AppButton
                variant="outline"
                onClick={() => setConfirmDelete(false)}
              >
                Anuluj
              </AppButton>
              <AppButton
                onClick={() => {
                  resetAccount();
                  toast.success("Konto usunięte na tym urządzeniu");
                  router.replace("/login");
                }}
              >
                Usuń
              </AppButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProfileLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof FileText;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between border-b border-border px-4 py-3.5 last:border-b-0"
    >
      <span className="inline-flex items-center gap-2.5 text-sm font-medium">
        <Icon className="size-4 text-primary" />
        {label}
      </span>
      <ChevronRight className="size-4 text-text-secondary" />
    </Link>
  );
}
