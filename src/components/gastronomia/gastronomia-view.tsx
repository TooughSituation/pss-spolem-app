"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CartSheet, GastroCartBar } from "@/components/gastronomia/cart-sheet";
import { CategoryChips } from "@/components/gastronomia/category-chips";
import { DailyDishes } from "@/components/gastronomia/daily-dishes";
import { DishCard } from "@/components/gastronomia/dish-card";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { dailyDishes, dishesByCategory } from "@/lib/data/dishes";
import { getGastroCategory } from "@/lib/data/gastro-categories";
import { useGastroCart } from "@/lib/stores/gastro-cart";
import type { Dish, GastroCategoryId } from "@/lib/types";
import { UtensilsCrossed } from "lucide-react";

export function GastronomiaView() {
  const router = useRouter();
  const add = useGastroCart((s) => s.add);
  const openSheet = useGastroCart((s) => s.setSheetOpen);
  const [categoryId, setCategoryId] = useState<GastroCategoryId>("dania-glowne");
  const category = getGastroCategory(categoryId);
  const list = dishesByCategory(categoryId);
  const daily = dailyDishes();

  const addSimple = (dish: Dish) => {
    if (dish.addons.length) {
      router.push(`/danie/${dish.id}`);
      return;
    }
    add(dish.id, [], "", 1);
    toast.success("Dodano do koszyka");
    openSheet(true);
  };

  return (
    <div className="pb-4">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold tracking-tight">Gastronomia</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Stołówka i bary PSS Społem Białystok
        </p>
      </div>

      <div className="mt-4">
        <DailyDishes dishes={daily} onAdd={addSimple} />
      </div>

      <div className="mt-5">
        <CategoryChips activeId={categoryId} onChange={setCategoryId} />
      </div>

      <section className="mt-4 px-4">
        <h2 className="mb-3 text-base font-bold">{category?.name}</h2>
        {list.length === 0 ? (
          <AppEmptyState
            icon={<UtensilsCrossed className="size-7" />}
            title="Brak dań"
            description="W tej kategorii nie ma teraz pozycji."
          />
        ) : (
          <div className="space-y-3">
            {list.map((dish) => (
              <DishCard key={dish.id} dish={dish} onAdd={addSimple} />
            ))}
          </div>
        )}
      </section>

      <GastroCartBar />
      <CartSheet />
    </div>
  );
}
