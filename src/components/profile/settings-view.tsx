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
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [error, setError] = useState("");

  if (!user) return null;

  const onSave = (event: FormEvent) => {
    event.preventDefault();
    const nextName = name.trim();
    const nextPhone = phone.trim();
    if (nextName.length < 2) {
      setError("Podaj imię (minimum 2 znaki).");
      return;
    }
    if (nextPhone.replace(/\D/g, "").length < 9) {
      setError("Podaj numer telefonu.");
      return;
    }
    updateProfile({ name: nextName, phone: nextPhone });
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
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError("");
              }}
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
