"use client";

import { AppChip } from "@/components/design-system/app-chip";
import { ALL_PROMOTION_GROUP_ID } from "@/lib/data/promotion-groups";
import type { PromotionGroup } from "@/lib/types";

export function PromotionChips({
  groups,
  activeId,
  onChange,
}: {
  groups: PromotionGroup[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      className="no-scrollbar flex gap-2 overflow-x-auto px-4"
      role="tablist"
      aria-label="Grupy promocji"
    >
      <AppChip
        selected={activeId === ALL_PROMOTION_GROUP_ID}
        onClick={() => onChange(ALL_PROMOTION_GROUP_ID)}
        className="shrink-0"
      >
        Wszystkie
      </AppChip>
      {groups.map((group) => (
        <AppChip
          key={group.id}
          selected={activeId === group.id}
          onClick={() => onChange(group.id)}
          className="shrink-0"
        >
          {group.name}
        </AppChip>
      ))}
    </div>
  );
}
