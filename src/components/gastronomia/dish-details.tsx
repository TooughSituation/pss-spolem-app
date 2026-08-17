"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SafeImage } from "@/components/media/safe-image";
import { AddonsSelector } from "@/components/gastronomia/addons-selector";
import { CartSheet } from "@/components/gastronomia/cart-sheet";
import { AppButton } from "@/components/design-system/app-button";
import { AppInput } from "@/components/design-system/app-input";
import { ScreenHeader } from "@/components/layout/screen-header";
import { dishUnitPrice } from "@/lib/data/dishes";
import { getGastroCategory } from "@/lib/data/gastro-categories";
import { formatPrice } from "@/lib/format";
import { useGastroCart } from "@/lib/stores/gastro-cart";
import type { Dish } from "@/lib/types";

function defaultAddons(dish: Dish) {
  const groups = [...new Set(dish.addons.filter((a) => a.type === "radio").map((a) => a.group))];
  return groups
    .map((group) => dish.addons.find((addon) => addon.group === group)?.id)
    .filter((id): id is string => Boolean(id));
}

export function DishDetails({ dish }: { dish: Dish }) {
  const add = useGastroCart((s) => s.add);
  const openSheet = useGastroCart((s) => s.setSheetOpen);
  const [addonIds, setAddonIds] = useState(() => defaultAddons(dish));
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);
  const category = getGastroCategory(dish.categoryId);
  const unit = useMemo(() => dishUnitPrice(dish, addonIds), [addonIds, dish]);

  return (
    <div className="pb-28">
      <ScreenHeader title={dish.name} back backHref="/gastronomia" />
      <div className="relative mx-4 mt-3 h-44 overflow-hidden rounded-xl bg-accent-light">
        <SafeImage
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover"
          sizes="430px"
          priority
        />
      </div>
      <div className="px-4 pt-4">
        <p className="text-sm font-medium text-primary">{category?.name}</p>
        <h1 className="mt-1 text-xl font-bold">{dish.name}</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {dish.description}
        </p>
        <p className="mt-3 text-2xl font-bold text-primary">
          {formatPrice(unit)}
        </p>

        <div className="mt-5">
          <AddonsSelector
            addons={dish.addons}
            selected={addonIds}
            onChange={setAddonIds}
          />
        </div>

        <div className="mt-5">
          <AppInput
            id="notes"
            label="Uwagi"
            placeholder="np. bez cebuli"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm font-semibold">Ilość</p>
          <div className="flex items-center gap-2">
            <AppButton
              size="sm"
              variant="outline"
              onClick={() => setQty((value) => Math.max(1, value - 1))}
            >
              −
            </AppButton>
            <span className="w-8 text-center font-bold tabular-nums">{qty}</span>
            <AppButton
              size="sm"
              variant="outline"
              onClick={() => setQty((value) => value + 1)}
            >
              +
            </AppButton>
          </div>
        </div>

        <AppButton
          fullWidth
          size="lg"
          className="mt-6"
          onClick={() => {
            const ok = add(dish.id, addonIds, notes, qty);
            if (!ok) {
              toast.error("Nie udało się dodać dania");
              return;
            }
            toast.success("Dodano do koszyka");
            openSheet(true);
          }}
        >
          Dodaj do koszyka · {formatPrice(unit * qty)}
        </AppButton>
      </div>
      <CartSheet />
    </div>
  );
}
