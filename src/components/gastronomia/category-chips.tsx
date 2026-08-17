"use client";

import { AppChip } from "@/components/design-system/app-chip";
import { gastroCategories } from "@/lib/data/gastro-categories";
import type { GastroCategoryId } from "@/lib/types";

export function CategoryChips({
  activeId,
  onChange,
}: {
  activeId: GastroCategoryId;
  onChange: (id: GastroCategoryId) => void;
}) {
  return (
    <div
      className="no-scrollbar flex gap-2 overflow-x-auto px-4"
      role="tablist"
      aria-label="Kategorie dań"
    >
      {gastroCategories.map((category) => (
        <AppChip
          key={category.id}
          selected={activeId === category.id}
          onClick={() => onChange(category.id)}
          className="shrink-0"
        >
          {category.emoji} {category.name}
        </AppChip>
      ))}
    </div>
  );
}
