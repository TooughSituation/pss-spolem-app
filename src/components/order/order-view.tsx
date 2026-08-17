"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/media/safe-image";
import { toast } from "sonner";
import { getProduct } from "@/lib/data/products";
import { getStore, stores } from "@/lib/data/stores";
import { formatPrice } from "@/lib/format";
import { cartCount, cartTotal, useCart } from "@/lib/stores/cart";
import { useShoppingList } from "@/lib/stores/shopping-list";
import { ScreenHeader } from "@/components/layout/screen-header";
import { EmptyState } from "@/components/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/products";
import { ShoppingBag } from "lucide-react";

const slots = ["15:00–15:30", "16:00–16:30", "17:00–17:30", "18:00–18:30"];

export function OrderView() {
  const router = useRouter();
  const cart = useCart();
  const list = useShoppingList((s) => s.items);
  const [doneId, setDoneId] = useState<string | null>(null);
  const store = getStore(cart.storeId);
  const total = cartTotal(cart.items);
  const count = cartCount(cart.items);

  const importList = () => {
    let n = 0;
    list.forEach((item) => {
      if (item.productId) {
        cart.add(item.productId, item.qty);
        n += 1;
      }
    });
    toast.success(
      n ? `Przeniesiono ${n} pozycji z listy` : "Na liście nie ma produktów z katalogu",
    );
  };

  if (doneId) {
    const order = cart.orders.find((o) => o.id === doneId);
    return (
      <div>
        <ScreenHeader title="Zamówienie złożone" />
        <div className="px-6 py-10 text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-3xl bg-secondary text-3xl">
            ✓
          </div>
          <h2 className="text-xl font-extrabold">Dziękujemy!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Numer zamówienia <span className="font-bold text-foreground">{doneId}</span>
            . {cart.fulfillment === "dostawa" ? "Kurier" : "Odbiór"} w{" "}
            {store?.name}.
          </p>
          {order && (
            <p className="mt-1 text-sm font-semibold">{formatPrice(order.total)}</p>
          )}
          <Button className="mt-6 h-11 rounded-2xl" onClick={() => router.push("/profil")}>
            Historia zamówień
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader
        title="Zamów online"
        subtitle="Click & collect albo dostawa"
        back
        backHref="/"
      />

      <section className="px-4 pt-4">
        <h3 className="mb-2 text-sm font-extrabold">Sklep</h3>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {stores
            .filter((s) => s.hasClickCollect)
            .map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => cart.setStore(s.id)}
                className={`w-40 shrink-0 rounded-2xl border p-3 text-left ${
                  cart.storeId === s.id
                    ? "border-primary bg-secondary"
                    : "bg-card"
                }`}
              >
                <p className="text-sm font-bold">{s.district}</p>
                <p className="text-[11px] text-muted-foreground">{s.address}</p>
                {s.hasDelivery && (
                  <Badge className="mt-2" variant="secondary">
                    Dostawa
                  </Badge>
                )}
              </button>
            ))}
        </div>
      </section>

      <section className="px-4 pt-5">
        <h3 className="mb-2 text-sm font-extrabold">Sposób realizacji</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={cart.fulfillment === "click-collect" ? "default" : "outline"}
            className="h-11 rounded-2xl"
            onClick={() => cart.setFulfillment("click-collect")}
          >
            Odbiór w sklepie
          </Button>
          <Button
            variant={cart.fulfillment === "dostawa" ? "default" : "outline"}
            className="h-11 rounded-2xl"
            disabled={!store?.hasDelivery}
            onClick={() => cart.setFulfillment("dostawa")}
          >
            Dostawa
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {slots.map((slot) => (
            <Button
              key={slot}
              size="sm"
              variant={cart.slot === slot ? "default" : "outline"}
              onClick={() => cart.setSlot(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>
      </section>

      <section className="px-4 pt-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-extrabold">Koszyk ({count})</h3>
          <button
            type="button"
            className="text-xs font-semibold text-primary"
            onClick={importList}
          >
            Dodaj z listy zakupów
          </button>
        </div>
        {!cart.items.length ? (
          <EmptyState
            icon={<ShoppingBag className="size-7" />}
            title="Koszyk jest pusty"
            description="Dodaj produkty z oferty albo przenieś pozycje z listy zakupów."
            action={
              <Button onClick={() => router.push("/oferta")}>Oferta</Button>
            }
          />
        ) : (
          <ul className="space-y-2">
            {cart.items.map((item) => {
              const p = getProduct(item.productId);
              if (!p) return null;
              return (
                <li
                  key={item.productId}
                  className="flex items-center gap-3 rounded-2xl border bg-card p-2"
                >
                  <div className="relative size-14 overflow-hidden rounded-xl">
                    <SafeImage src={p.image} alt="" fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                  <div className="flex items-center rounded-full bg-muted">
                    <button
                      type="button"
                      className="px-2 py-1"
                      onClick={() => cart.setQty(item.productId, item.qty - 1)}
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-bold">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      className="px-2 py-1"
                      onClick={() => cart.setQty(item.productId, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="px-4 pt-4">
        <h3 className="mb-2 text-sm font-extrabold">Szybko dodaj</h3>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {products
            .filter((p) => p.isPromo || p.isOwnBrand)
            .slice(0, 8)
            .map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  cart.add(p.id);
                  toast.success(p.name);
                }}
                className="w-28 shrink-0 rounded-2xl border bg-card p-2 text-left"
              >
                <div className="relative mb-1.5 h-16 overflow-hidden rounded-xl">
                  <SafeImage src={p.image} alt="" fill className="object-cover" sizes="112px" />
                </div>
                <p className="line-clamp-2 text-[11px] font-semibold leading-tight">
                  {p.name}
                </p>
                <p className="text-[11px] font-bold text-primary">
                  {formatPrice(p.price)}
                </p>
              </button>
            ))}
        </div>
      </section>

      <div className="sticky bottom-0 mt-6 border-t bg-background/95 px-4 py-3 backdrop-blur">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Do zapłaty</span>
          <span className="text-lg font-black">{formatPrice(total)}</span>
        </div>
        <Button
          className="h-12 w-full rounded-2xl text-base"
          disabled={!cart.items.length}
          onClick={() => {
            const order = cart.placeOrder();
            if (order) {
              setDoneId(order.id);
              toast.success("Zamówienie przyjęte");
            }
          }}
        >
          Potwierdź {cart.fulfillment === "dostawa" ? "dostawę" : "odbiór"}
        </Button>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          To jest mockup — zamówienie zapisuje się tylko lokalnie w przeglądarce.
        </p>
      </div>
    </div>
  );
}