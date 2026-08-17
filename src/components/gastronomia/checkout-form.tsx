"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { AppChip } from "@/components/design-system/app-chip";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { AppInput } from "@/components/design-system/app-input";
import { ScreenHeader } from "@/components/layout/screen-header";
import { deliverySlots, getDish } from "@/lib/data/dishes";
import { formatPrice } from "@/lib/format";
import {
  gastroTotal,
  useGastroCart,
} from "@/lib/stores/gastro-cart";
import type { GastroPayment } from "@/lib/types";
import { ShoppingBag } from "lucide-react";

const payments: { id: GastroPayment; label: string; hint: string }[] = [
  { id: "blik", label: "BLIK", hint: "Symulacja — bez prawdziwej płatności" },
  { id: "karta", label: "Karta", hint: "Symulacja online" },
  { id: "przy-odbiorze", label: "Przy odbiorze", hint: "Gotówka lub karta u kuriera" },
];

export function CheckoutForm() {
  const router = useRouter();
  const items = useGastroCart((s) => s.items);
  const addresses = useGastroCart((s) => s.addresses);
  const addressId = useGastroCart((s) => s.addressId);
  const slot = useGastroCart((s) => s.slot);
  const payment = useGastroCart((s) => s.payment);
  const setAddress = useGastroCart((s) => s.setAddress);
  const addAddress = useGastroCart((s) => s.addAddress);
  const setSlot = useGastroCart((s) => s.setSlot);
  const setPayment = useGastroCart((s) => s.setPayment);
  const placeOrder = useGastroCart((s) => s.placeOrder);
  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [adding, setAdding] = useState(false);
  const total = gastroTotal(items);

  if (!items.length) {
    return (
      <div>
        <ScreenHeader title="Zamówienie" back backHref="/gastronomia" />
        <AppEmptyState
          icon={<ShoppingBag className="size-7" />}
          title="Koszyk jest pusty"
          description="Dodaj dania z menu, a potem wróć do kasy."
          action={
            <AppButton onClick={() => router.push("/gastronomia")}>
              Wróć do menu
            </AppButton>
          }
        />
      </div>
    );
  }

  return (
    <div className="pb-8">
      <ScreenHeader title="Zamówienie" back backHref="/gastronomia" />
      <div className="px-4">

      <section className="pt-3">
        <h2 className="mb-2 text-base font-bold">1. Podsumowanie</h2>
        <AppCard>
          <ul className="space-y-2 text-sm">
            {items.map((item) => {
              const dish = getDish(item.dishId);
              return (
                <li key={item.lineId} className="flex justify-between gap-3">
                  <span>
                    {dish?.name} × {item.qty}
                    {item.notes ? ` (${item.notes})` : ""}
                  </span>
                  <span className="shrink-0 font-semibold">
                    {formatPrice(item.unitPrice * item.qty)}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 flex justify-between border-t border-border pt-2 font-bold">
            <span>Suma</span>
            <span>{formatPrice(total)}</span>
          </p>
        </AppCard>
      </section>

      <section className="pt-5">
        <h2 className="mb-2 text-base font-bold">2. Adres dostawy</h2>
        <div className="flex flex-wrap gap-2">
          {addresses.map((address) => (
            <AppChip
              key={address.id}
              selected={addressId === address.id}
              onClick={() => setAddress(address.id)}
            >
              {address.label}
            </AppChip>
          ))}
          <AppChip selected={adding} onClick={() => setAdding((v) => !v)}>
            Dodaj nowy
          </AppChip>
        </div>
        {addresses.find((a) => a.id === addressId) ? (
          <p className="mt-2 text-sm text-text-secondary">
            {addresses.find((a) => a.id === addressId)?.street},{" "}
            {addresses.find((a) => a.id === addressId)?.city}
          </p>
        ) : null}
        {adding ? (
          <div className="mt-3 space-y-2">
            <AppInput
              label="Nazwa"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="np. Mieszkanie mamy"
            />
            <AppInput
              label="Ulica"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="ul. Lipowa 1"
            />
            <AppButton
              variant="secondary"
              onClick={() => {
                if (label.trim().length < 2 || street.trim().length < 3) {
                  toast.error("Uzupełnij nazwę i ulicę");
                  return;
                }
                addAddress({
                  label: label.trim(),
                  street: street.trim(),
                  city: "Białystok",
                });
                setLabel("");
                setStreet("");
                setAdding(false);
                toast.success("Dodano adres");
              }}
            >
              Zapisz adres
            </AppButton>
          </div>
        ) : null}
      </section>

      <section className="pt-5">
        <h2 className="mb-2 text-base font-bold">3. Czas dostawy</h2>
        <div className="flex flex-wrap gap-2">
          {deliverySlots.map((item) => (
            <AppChip
              key={item}
              selected={slot === item}
              onClick={() => setSlot(item)}
            >
              {item}
            </AppChip>
          ))}
        </div>
      </section>

      <section className="pt-5">
        <h2 className="mb-2 text-base font-bold">4. Płatność</h2>
        <div className="space-y-2">
          {payments.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPayment(item.id)}
              className={`w-full rounded-xl border px-3 py-3 text-left ${
                payment === item.id
                  ? "border-primary bg-accent-light"
                  : "border-border"
              }`}
            >
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-sm text-text-secondary">{item.hint}</p>
            </button>
          ))}
        </div>
      </section>

      <AppButton
        fullWidth
        size="lg"
        className="mt-6"
        onClick={() => {
          const order = placeOrder();
          if (!order) {
            toast.error("Nie udało się złożyć zamówienia");
            return;
          }
          toast.success("Zamówienie przyjęte");
          router.replace(`/zamowienie/${order.id}`);
        }}
      >
        Potwierdź zamówienie · {formatPrice(total)}
      </AppButton>
      <p className="mt-2 text-center text-sm text-text-secondary">
        To wersja testowa — bez prawdziwej płatności.
      </p>
      </div>
    </div>
  );
}
