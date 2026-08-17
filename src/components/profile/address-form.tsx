"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AppButton } from "@/components/design-system/app-button";
import { AppInput } from "@/components/design-system/app-input";
import type { DeliveryAddress } from "@/lib/types";

export function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: DeliveryAddress;
  onSave: (value: Omit<DeliveryAddress, "id">) => void;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState(initial?.label ?? "");
  const [street, setStreet] = useState(initial?.street ?? "");
  const [postalCode, setPostalCode] = useState(initial?.postalCode ?? "");
  const [city, setCity] = useState(initial?.city ?? "Białystok");
  const [isDefault, setIsDefault] = useState(initial?.isDefault ?? false);
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (label.trim().length < 2 || street.trim().length < 3) {
      setError("Podaj nazwę i ulicę.");
      return;
    }
    if (!/^\d{2}-\d{3}$/.test(postalCode.trim())) {
      setError("Kod pocztowy w formacie 15-001.");
      return;
    }
    onSave({
      label: label.trim(),
      street: street.trim(),
      postalCode: postalCode.trim(),
      city: city.trim() || "Białystok",
      isDefault,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <AppInput
        label="Nazwa"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Dom, Praca…"
      />
      <AppInput
        label="Ulica i numer"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        placeholder="ul. Lipowa 12/4"
      />
      <AppInput
        label="Kod pocztowy"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="15-001"
      />
      <AppInput
        label="Miasto"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
        />
        Ustaw jako domyślny
      </label>
      {error ? <p className="text-sm text-error">{error}</p> : null}
      <div className="grid grid-cols-2 gap-2">
        <AppButton type="button" variant="outline" onClick={onCancel}>
          Anuluj
        </AppButton>
        <AppButton type="submit">Zapisz</AppButton>
      </div>
    </form>
  );
}
