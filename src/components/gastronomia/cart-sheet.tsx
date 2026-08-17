"use client";

import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AppButton } from "@/components/design-system/app-button";
import { getDish } from "@/lib/data/dishes";
import { formatPrice } from "@/lib/format";
import {
  gastroCount,
  gastroTotal,
  useGastroCart,
} from "@/lib/stores/gastro-cart";

export function CartSheet() {
  const router = useRouter();
  const items = useGastroCart((s) => s.items);
  const open = useGastroCart((s) => s.sheetOpen);
  const setOpen = useGastroCart((s) => s.setSheetOpen);
  const setQty = useGastroCart((s) => s.setQty);
  const remove = useGastroCart((s) => s.remove);
  const count = gastroCount(items);
  const total = gastroTotal(items);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-primary-dark/40"
        aria-label="Zamknij koszyk"
        onClick={() => setOpen(false)}
      />
      <div
        className="absolute inset-x-0 bottom-0 mx-auto max-w-[430px] rounded-t-2xl bg-background px-4 pb-6 pt-3 shadow-2xl"
        style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold">Koszyk ({count})</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Zamknij">
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-text-secondary">
            Koszyk jest pusty.
          </p>
        ) : (
          <ul className="max-h-[46vh] space-y-3 overflow-y-auto">
            {items.map((item) => {
              const dish = getDish(item.dishId);
              const extras = dish?.addons
                .filter((addon) => item.addonIds.includes(addon.id))
                .map((addon) => addon.name)
                .join(", ");
              return (
                <li key={item.lineId} className="rounded-xl border border-border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">{dish?.name ?? item.dishId}</p>
                      {extras ? (
                        <p className="mt-0.5 text-sm text-text-secondary">{extras}</p>
                      ) : null}
                      {item.notes ? (
                        <p className="mt-0.5 text-sm text-text-secondary">
                          Uwagi: {item.notes}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm font-bold text-primary">
                        {formatPrice(item.unitPrice * item.qty)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.lineId)}
                      aria-label="Usuń"
                    >
                      <Trash2 className="size-4 text-error" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <AppButton
                      size="sm"
                      variant="outline"
                      onClick={() => setQty(item.lineId, item.qty - 1)}
                    >
                      <Minus className="size-3.5" />
                    </AppButton>
                    <span className="w-6 text-center text-sm font-bold">
                      {item.qty}
                    </span>
                    <AppButton
                      size="sm"
                      variant="outline"
                      onClick={() => setQty(item.lineId, item.qty + 1)}
                    >
                      <Plus className="size-3.5" />
                    </AppButton>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {items.length > 0 ? (
          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span>Suma</span>
              <span className="text-base font-bold">{formatPrice(total)}</span>
            </div>
            <AppButton
              fullWidth
              onClick={() => {
                setOpen(false);
                router.push("/checkout");
              }}
            >
              Przejdź do zamówienia
            </AppButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function GastroCartBar() {
  const items = useGastroCart((s) => s.items);
  const setOpen = useGastroCart((s) => s.setSheetOpen);
  const count = gastroCount(items);
  const total = gastroTotal(items);

  if (!count) return null;

  return (
    <div className="sticky bottom-0 z-30 px-4 pb-2">
      <AppButton fullWidth onClick={() => setOpen(true)}>
        <ShoppingBag className="size-4" />
        Koszyk · {count} · {formatPrice(total)}
      </AppButton>
    </div>
  );
}
