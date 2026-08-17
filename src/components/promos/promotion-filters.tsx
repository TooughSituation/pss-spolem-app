"use client";

import { AppChip } from "@/components/design-system/app-chip";
import { categories } from "@/lib/data/categories";
import type { CategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";

export type PromoSort = "polecane" | "price-asc" | "price-desc" | "discount";

const selectClass =
  "h-9 rounded-full border border-border bg-background px-3 text-sm font-medium text-text-primary outline-none focus-visible:border-primary";

export function PromotionFilters({
  onlyDiscount,
  onOnlyDiscountChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: {
  onlyDiscount: boolean;
  onOnlyDiscountChange: (value: boolean) => void;
  category: CategoryId | "wszystkie";
  onCategoryChange: (value: CategoryId | "wszystkie") => void;
  sort: PromoSort;
  onSortChange: (value: PromoSort) => void;
}) {
  return (
    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4">
      <AppChip
        selected={onlyDiscount}
        onClick={() => onOnlyDiscountChange(!onlyDiscount)}
        className="shrink-0"
      >
        Tylko z rabatem
      </AppChip>
      <select
        className={cn(selectClass, "shrink-0")}
        value={category}
        onChange={(event) =>
          onCategoryChange(event.target.value as CategoryId | "wszystkie")
        }
        aria-label="Filtruj po kategorii"
      >
        <option value="wszystkie">Wszystkie kategorie</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className={cn(selectClass, "shrink-0")}
        value={sort}
        onChange={(event) => onSortChange(event.target.value as PromoSort)}
        aria-label="Sortowanie"
      >
        <option value="polecane">Polecane</option>
        <option value="price-asc">Cena: od najniższej</option>
        <option value="price-desc">Cena: od najwyższej</option>
        <option value="discount">Największy rabat</option>
      </select>
    </div>
  );
}
