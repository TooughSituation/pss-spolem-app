"use client";

import { useMemo, useState } from "react";
import { Check, Plus, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/format";
import { useShoppingList } from "@/lib/stores/shopping-list";
import { ScreenHeader } from "@/components/layout/screen-header";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ShoppingListView() {
  const items = useShoppingList((s) => s.items);
  const addCustom = useShoppingList((s) => s.addCustom);
  const setQty = useShoppingList((s) => s.setQty);
  const toggle = useShoppingList((s) => s.toggle);
  const remove = useShoppingList((s) => s.remove);
  const clearChecked = useShoppingList((s) => s.clearChecked);
  const [draft, setDraft] = useState("");

  const remaining = items.filter((i) => !i.checked);
  const done = items.filter((i) => i.checked);
  const estimate = useMemo(
    () =>
      remaining.reduce(
        (s, i) => s + (i.price ? i.price * i.qty : 0),
        0,
      ),
    [remaining],
  );

  const share = async () => {
    const text = [
      "Lista zakupów PSS Społem",
      "",
      ...items.map(
        (i) => `${i.checked ? "☑" : "☐"} ${i.qty} ${i.unit} ${i.name}`,
      ),
    ].join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ title: "Lista zakupów PSS Społem", text });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success("Skopiowano listę do schowka");
      }
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <div>
      <ScreenHeader
        title="Lista zakupów"
        subtitle={
          items.length
            ? `${remaining.length} do wzięcia · ok. ${formatPrice(estimate)}`
            : "Pusta lista"
        }
        action={
          <Button
            variant="ghost"
            size="icon"
            className="size-9"
            onClick={share}
            disabled={!items.length}
            aria-label="Udostępnij listę"
          >
            <Share2 className="size-4" />
          </Button>
        }
      />

      <form
        className="flex gap-2 px-4 pt-3"
        onSubmit={(e) => {
          e.preventDefault();
          addCustom(draft);
          if (draft.trim()) toast.success("Dodano pozycję");
          setDraft("");
        }}
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Dodaj ręcznie, np. sól"
          className="h-11 rounded-2xl bg-card"
        />
        <Button type="submit" className="h-11 rounded-2xl px-4">
          <Plus className="size-4" />
        </Button>
      </form>

      {!items.length ? (
        <EmptyState
          icon={<Check className="size-7" />}
          title="Lista jest pusta"
          description="Dodaj produkty z katalogu, gazetki albo wpisz je ręcznie. Lista zapisuje się na tym urządzeniu."
          action={
            <Button asChild>
              <Link href="/oferta">Przeglądaj ofertę</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-5 px-4 py-4">
          <ul className="space-y-2">
            {remaining.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 rounded-2xl border bg-card p-2.5 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="grid size-7 place-items-center rounded-full border"
                  aria-label="Oznacz jako kupione"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  {item.price ? (
                    <p className="text-[11px] text-muted-foreground">
                      {formatPrice(item.price)} / {item.unit}
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">
                      Dodane ręcznie
                    </p>
                  )}
                </div>
                <div className="flex items-center rounded-full bg-muted">
                  <button
                    type="button"
                    className="px-2.5 py-1 text-lg"
                    onClick={() => setQty(item.id, item.qty - 1)}
                  >
                    −
                  </button>
                  <span className="min-w-5 text-center text-sm font-bold">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    className="px-2.5 py-1 text-lg"
                    onClick={() => setQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="p-1 text-muted-foreground"
                  onClick={() => remove(item.id)}
                  aria-label="Usuń"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          {done.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Kupione ({done.length})
                </p>
                <button
                  type="button"
                  className="text-xs font-semibold text-primary"
                  onClick={clearChecked}
                >
                  Wyczyść
                </button>
              </div>
              <ul className="space-y-2">
                {done.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 rounded-2xl bg-muted/60 p-2.5"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"
                    >
                      <Check className="size-3.5" />
                    </button>
                    <p
                      className={cn(
                        "flex-1 truncate text-sm text-muted-foreground line-through",
                      )}
                    >
                      {item.qty}× {item.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}