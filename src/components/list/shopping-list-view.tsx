"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus, Share2, ShoppingBasket, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppButton } from "@/components/design-system/app-button";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { AppInput } from "@/components/design-system/app-input";
import { getCategory } from "@/lib/data/categories";
import { formatPrice } from "@/lib/format";
import { useShoppingList } from "@/lib/stores/shopping-list";
import type { ShoppingListItem } from "@/lib/types";

export function ShoppingListView() {
  const items = useShoppingList((s) => s.items);
  const addCustom = useShoppingList((s) => s.addCustom);
  const setQty = useShoppingList((s) => s.setQty);
  const toggle = useShoppingList((s) => s.toggle);
  const remove = useShoppingList((s) => s.remove);
  const clearChecked = useShoppingList((s) => s.clearChecked);
  const router = useRouter();
  const [draft, setDraft] = useState("");

  const remaining = items.filter((item) => !item.checked);
  const done = items.filter((item) => item.checked);
  const estimate = useMemo(
    () => remaining.reduce((sum, item) => sum + (item.price ? item.price * item.qty : 0), 0),
    [remaining],
  );

  const groups = useMemo(() => {
    const map = new Map<string, ShoppingListItem[]>();
    remaining.forEach((item) => {
      const key = item.category ?? "inne";
      map.set(key, [...(map.get(key) ?? []), item]);
    });
    return [...map.entries()];
  }, [remaining]);

  const share = async () => {
    const text = [
      "Lista zakupów PSS Społem Białystok",
      "",
      ...items.map(
        (item) =>
          `${item.checked ? "☑" : "☐"} ${item.qty} ${item.unit} ${item.name}`,
      ),
      estimate ? `\nSzacunek: ${formatPrice(estimate)}` : "",
    ].join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ title: "Lista zakupów PSS Społem", text });
        return;
      }
      await navigator.clipboard.writeText(text);
      toast.success("Skopiowano listę do schowka");
    } catch {
      /* cancelled */
    }
  };

  return (
    <div className="pb-6">
      <header className="flex items-start justify-between gap-3 px-4 pt-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Lista zakupów</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {items.length
              ? `${remaining.length} do wzięcia${estimate ? ` · ok. ${formatPrice(estimate)}` : ""}`
              : "Na zakupy do Społem"}
          </p>
        </div>
        <AppButton
          variant="ghost"
          size="icon"
          onClick={share}
          disabled={!items.length}
          aria-label="Udostępnij listę"
        >
          <Share2 className="size-5" />
        </AppButton>
      </header>

      <form
        className="mt-4 flex gap-2 px-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.trim()) return;
          addCustom(draft);
          toast.success("Dopisane do listy");
          setDraft("");
        }}
      >
        <div className="flex-1">
          <AppInput
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Dopisz, np. sól, chleb, masło"
            aria-label="Nowa pozycja"
          />
        </div>
        <AppButton type="submit" size="icon" aria-label="Dodaj">
          <Plus className="size-5" />
        </AppButton>
      </form>

      {!items.length ? (
        <AppEmptyState
          icon={<ShoppingBasket className="size-7" />}
          title="Pusto w notesie zakupów"
          description="Dopisz chleb z piekarni Społem albo złap promocję z gazetki. Lista zostaje na tym telefonie."
          action={
            <div className="flex flex-col gap-2">
              <AppButton onClick={() => router.push("/promocje")}>
                Zobacz promocje
              </AppButton>
              <AppButton variant="secondary" onClick={() => router.push("/oferta")}>
                Przejrzyj ofertę
              </AppButton>
            </div>
          }
        />
      ) : (
        <div className="mt-5 space-y-5 px-4">
          {groups.map(([key, groupItems]) => (
            <section key={key}>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                {getCategory(key)?.name ?? "Inne / dopisane"}
              </h2>
              <ul className="space-y-2">
                {groupItems.map((item) => (
                  <ListRow
                    key={item.id}
                    item={item}
                    onToggle={() => toggle(item.id)}
                    onQty={(qty) => setQty(item.id, qty)}
                    onRemove={() => remove(item.id)}
                  />
                ))}
              </ul>
            </section>
          ))}

          {done.length > 0 ? (
            <section>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
                  W wózku ({done.length})
                </h2>
                <button
                  type="button"
                  className="text-sm font-semibold text-primary"
                  onClick={clearChecked}
                >
                  Wyczyść
                </button>
              </div>
              <ul className="space-y-2">
                {done.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 rounded-xl bg-accent-light/70 px-3 py-2.5"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"
                      aria-label="Cofnij oznaczenie"
                    >
                      <Check className="size-3.5" />
                    </button>
                    <p className="flex-1 truncate text-sm text-text-secondary line-through">
                      {item.qty}× {item.name}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}

function ListRow({
  item,
  onToggle,
  onQty,
  onRemove,
}: {
  item: ShoppingListItem;
  onToggle: () => void;
  onQty: (qty: number) => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex items-center gap-2 rounded-xl border border-border bg-card p-2.5 shadow-[0_2px_8px_rgba(0,51,102,0.06)]">
      <button
        type="button"
        onClick={onToggle}
        className="grid size-7 place-items-center rounded-full border-2 border-primary"
        aria-label="Oznacz jako kupione"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{item.name}</p>
        <p className="text-sm text-text-secondary">
          {item.price
            ? `${formatPrice(item.price)} / ${item.unit}`
            : "Dopisane ręcznie"}
        </p>
      </div>
      <div className="flex items-center rounded-full bg-accent-light">
        <button
          type="button"
          className="px-2.5 py-1 text-lg text-primary"
          onClick={() => onQty(item.qty - 1)}
        >
          −
        </button>
        <span className="min-w-5 text-center text-sm font-bold">{item.qty}</span>
        <button
          type="button"
          className="px-2.5 py-1 text-lg text-primary"
          onClick={() => onQty(item.qty + 1)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="p-1 text-text-secondary"
        onClick={onRemove}
        aria-label="Usuń"
      >
        <Trash2 className="size-4" />
      </button>
    </li>
  );
}
