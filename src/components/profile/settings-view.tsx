"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { AppInput } from "@/components/design-system/app-input";
import { ScreenHeader } from "@/components/layout/screen-header";
import { useAuth } from "@/lib/stores/auth";

export function SettingsView() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const updateProfile = useAuth((s) => s.updateProfile);
  const [name, setName] = useState(user?.name ?? "");
  const [error, setError] = useState("");

  if (!user) return null;

  const onSave = (event: FormEvent) => {
    event.preventDefault();
    const next = name.trim();
    if (next.length < 2) {
      setError("Podaj imię (minimum 2 znaki).");
      return;
    }
    updateProfile({ name: next });
    toast.success("Zapisano dane");
    router.push("/profil");
  };

  return (
    <div>
      <ScreenHeader title="Edytuj dane" back backHref="/profil" />
      <form onSubmit={onSave} className="px-4 pt-4">
        <AppCard>
          <div className="space-y-4">
            <AppInput
              id="name"
              name="name"
              label="Imię"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              error={error}
            />
            <AppInput
              id="phone"
              label="Telefon"
              value={user.phone}
              disabled
              hint="Numer telefonu zmienisz przy kolejnym logowaniu."
            />
            <AppInput
              id="card"
              label="Numer karty"
              value={user.loyaltyCardNumber}
              disabled
            />
          </div>
        </AppCard>
        <AppButton type="submit" fullWidth className="mt-4">
          Zapisz
        </AppButton>
      </form>
    </div>
  );
}
