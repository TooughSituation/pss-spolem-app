"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AddressForm } from "@/components/profile/address-form";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { useUser } from "@/lib/stores/user";
import { useGastroCart } from "@/lib/stores/gastro-cart";
import type { DeliveryAddress } from "@/lib/types";
import { MapPin } from "lucide-react";

export function AddressList() {
  const addresses = useUser((s) => s.addresses);
  const addAddress = useUser((s) => s.addAddress);
  const updateAddress = useUser((s) => s.updateAddress);
  const removeAddress = useUser((s) => s.removeAddress);
  const setDefaultAddress = useUser((s) => s.setDefaultAddress);
  const setCheckoutAddress = useGastroCart((s) => s.setAddress);
  const [editing, setEditing] = useState<DeliveryAddress | "new" | null>(null);

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-bold">Adresy dostawy</h2>
        <AppButton size="sm" variant="secondary" onClick={() => setEditing("new")}>
          Dodaj
        </AppButton>
      </div>

      {editing === "new" ? (
        <AppCard className="mb-3">
          <AddressForm
            onCancel={() => setEditing(null)}
            onSave={(value) => {
              const id = addAddress(value);
              if (value.isDefault) setCheckoutAddress(id);
              toast.success("Dodano adres");
              setEditing(null);
            }}
          />
        </AppCard>
      ) : null}

      {addresses.length === 0 && editing !== "new" ? (
        <AppEmptyState
          icon={<MapPin className="size-7" />}
          title="Brak adresów"
          description="Dodaj adres, żeby szybciej zamawiać z gastronomii."
          className="py-8"
        />
      ) : (
        <div className="space-y-2">
          {addresses.map((address) =>
            editing !== "new" && editing?.id === address.id ? (
              <AppCard key={address.id}>
                <AddressForm
                  initial={address}
                  onCancel={() => setEditing(null)}
                  onSave={(value) => {
                    updateAddress(address.id, value);
                    if (value.isDefault) {
                      setDefaultAddress(address.id);
                      setCheckoutAddress(address.id);
                    }
                    toast.success("Zapisano adres");
                    setEditing(null);
                  }}
                />
              </AppCard>
            ) : (
              <AppCard key={address.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{address.label}</p>
                    <p className="text-sm text-text-secondary">
                      {address.street}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {address.postalCode} {address.city}
                    </p>
                  </div>
                  {address.isDefault ? (
                    <AppBadge>Domyślny</AppBadge>
                  ) : null}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {!address.isDefault ? (
                    <AppButton
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setDefaultAddress(address.id);
                        setCheckoutAddress(address.id);
                        toast.success("Ustawiono adres domyślny");
                      }}
                    >
                      Domyślny
                    </AppButton>
                  ) : null}
                  <AppButton
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(address)}
                  >
                    Edytuj
                  </AppButton>
                  <AppButton
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      removeAddress(address.id);
                      toast.success("Usunięto adres");
                    }}
                  >
                    Usuń
                  </AppButton>
                </div>
              </AppCard>
            ),
          )}
        </div>
      )}
    </section>
  );
}
