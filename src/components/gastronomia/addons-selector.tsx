"use client";

import { formatPrice } from "@/lib/format";
import type { DishAddon } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AddonsSelector({
  addons,
  selected,
  onChange,
}: {
  addons: DishAddon[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const groups = [...new Set(addons.map((addon) => addon.group))];

  if (!addons.length) return null;

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const options = addons.filter((addon) => addon.group === group);
        const isRadio = options[0]?.type === "radio";
        const title =
          group === "sos"
            ? "Sos"
            : group === "rozmiar"
              ? "Porcja"
              : "Dodatki";
        return (
          <fieldset key={group}>
            <legend className="mb-2 text-sm font-semibold">{title}</legend>
            <div className="space-y-2">
              {options.map((option) => {
                const checked = selected.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm",
                      checked
                        ? "border-primary bg-accent-light"
                        : "border-border",
                    )}
                  >
                    <span className="inline-flex items-center gap-2">
                      <input
                        type={isRadio ? "radio" : "checkbox"}
                        name={group}
                        checked={checked}
                        onChange={() => {
                          if (isRadio) {
                            const without = selected.filter(
                              (id) => !options.some((item) => item.id === id),
                            );
                            onChange([...without, option.id]);
                            return;
                          }
                          onChange(
                            checked
                              ? selected.filter((id) => id !== option.id)
                              : [...selected, option.id],
                          );
                        }}
                      />
                      {option.name}
                    </span>
                    <span className="text-text-secondary">
                      {option.price > 0
                        ? `+ ${formatPrice(option.price)}`
                        : "w cenie"}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
