"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  FileText,
  LogOut,
  Mail,
  Pencil,
  Shield,
} from "lucide-react";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { APP_VERSION } from "@/lib/constants";
import { formatPoints } from "@/lib/format";
import { useAuth } from "@/lib/stores/auth";

export function ProfileView() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  if (!user) return null;

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="px-4 pb-8 pt-4">
      <h1 className="text-xl font-bold tracking-tight">Profil</h1>

      <AppCard className="mt-4">
        <div className="flex items-center gap-3">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
            {user.name.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold">{user.name}</p>
            <p className="text-sm text-text-secondary">{user.phone}</p>
          </div>
        </div>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-text-secondary">Numer karty</dt>
            <dd className="font-semibold tabular-nums">
              {user.loyaltyCardNumber}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-text-secondary">Telefon</dt>
            <dd className="font-semibold">{user.phone}</dd>
          </div>
        </dl>
      </AppCard>

      <AppCard className="mt-3 bg-primary text-primary-foreground">
        <p className="text-sm font-medium text-white/80">Twoje punkty</p>
        <p className="mt-1 text-3xl font-bold tabular-nums">
          {formatPoints(user.pointsBalance)}
          <span className="ml-1 text-sm font-medium text-white/80">pkt</span>
        </p>
        <Link
          href="/lojalnosc"
          className="mt-3 inline-flex items-center text-sm font-semibold text-white"
        >
          Program lojalnościowy <ChevronRight className="size-4" />
        </Link>
      </AppCard>

      <div className="mt-4 space-y-2">
        <AppButton
          variant="secondary"
          fullWidth
          onClick={() => router.push("/ustawienia")}
        >
          <Pencil className="size-4" />
          Edytuj dane
        </AppButton>
        <AppButton variant="outline" fullWidth onClick={onLogout}>
          <LogOut className="size-4" />
          Wyloguj się
        </AppButton>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <ProfileLink href="/regulamin" icon={FileText} label="Regulamin" />
        <ProfileLink
          href="/polityka-prywatnosci"
          icon={Shield}
          label="Polityka prywatności"
        />
        <ProfileLink href="/kontakt" icon={Mail} label="Kontakt" />
      </div>

      <p className="mt-8 text-center text-sm text-text-secondary">
        PSS Społem Białystok · wersja {APP_VERSION}
      </p>
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
