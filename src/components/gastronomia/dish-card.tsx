"use client";

import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/media/safe-image";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppButton } from "@/components/design-system/app-button";
import { AppCard } from "@/components/design-system/app-card";
import { formatPrice } from "@/lib/format";
import type { Dish } from "@/lib/types";

export function DishCard({
  dish,
  onAdd,
}: {
  dish: Dish;
  onAdd?: (dish: Dish) => void;
}) {
  const router = useRouter();

  return (
    <AppCard padding="none" interactive className="overflow-hidden">
      <button
        type="button"
        className="flex w-full gap-3 p-3 text-left"
        onClick={() => router.push(`/danie/${dish.id}`)}
      >
        <div className="relative size-[88px] shrink-0 overflow-hidden rounded-lg bg-accent-light">
          <SafeImage
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="88px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold leading-snug text-text-primary">
              {dish.name}
            </p>
            {dish.isDaily ? (
              <AppBadge variant="error" className="shrink-0">
                Danie dnia
              </AppBadge>
            ) : null}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
            {dish.description}
          </p>
          <p className="mt-2 text-sm font-bold text-primary">
            {formatPrice(dish.price)}
          </p>
        </div>
      </button>
      <div className="px-3 pb-3">
        <AppButton
          size="sm"
          fullWidth
          onClick={() => {
            if (onAdd) onAdd(dish);
            else router.push(`/danie/${dish.id}`);
          }}
        >
          Dodaj
        </AppButton>
      </div>
    </AppCard>
  );
}
