"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import { getProduct } from "@/lib/data/products";
import { flyerPages, flyerValid } from "@/lib/data/promotions";
import { formatPrice } from "@/lib/format";
import { useShoppingList } from "@/lib/stores/shopping-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FlyerView() {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const addProduct = useShoppingList((s) => s.addProduct);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setPage(i);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-primary-dark text-white">
      <header className="flex items-center gap-2 px-3 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="size-9 text-white hover:bg-white/10 hover:text-white"
        >
          <Link href="/promocje" aria-label="Zamknij gazetkę">
            <ChevronLeft className="size-5" />
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold">Gazetka PSS Społem</p>
          <p className="text-[11px] text-white/70">
            {flyerValid.from} – {flyerValid.to}
          </p>
        </div>
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold">
          {page + 1} / {flyerPages.length}
        </span>
      </header>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar flex flex-1 snap-x snap-mandatory overflow-x-auto"
      >
        {flyerPages.map((p) => (
          <section
            key={p.id}
            className="flex w-full shrink-0 snap-center flex-col px-4 pb-6"
          >
            {p.id === "cover" ? (
              <div className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden rounded-[28px]">
                <Image
                  src="/images/flyer.jpg"
                  alt="Okładka gazetki"
                  fill
                  className="object-cover"
                  sizes="430px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-black/10" />
                <div className="relative p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                    Promocje tygodnia
                  </p>
                  <h2 className="mt-2 text-4xl font-black leading-none">
                    Gazetka
                    <br />
                    PSS Społem
                  </h2>
                  <p className="mt-3 text-sm text-white/80">{p.subtitle}</p>
                  <p className="mt-6 text-xs text-white/60">
                    Przesuń w lewo, żeby zobaczyć oferty
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "mb-4 rounded-3xl bg-gradient-to-r p-4",
                    p.accent,
                  )}
                >
                  <h2 className="text-2xl font-black">{p.title}</h2>
                  <p className="text-sm text-white/85">{p.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {p.productIds.map((id) => {
                    const product = getProduct(id);
                    if (!product) return null;
                    return (
                      <article
                        key={id}
                        className="overflow-hidden rounded-2xl bg-white text-foreground"
                      >
                        <div className="relative h-28">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="180px"
                          />
                        </div>
                        <div className="p-2.5">
                          <p className="line-clamp-2 min-h-9 text-[13px] font-bold leading-snug">
                            {product.name}
                          </p>
                          <div className="mt-1 flex items-end justify-between">
                            <div>
                              {product.oldPrice && (
                                <p className="text-[10px] text-muted-foreground line-through">
                                  {formatPrice(product.oldPrice)}
                                </p>
                              )}
                              <p className="text-sm font-black text-primary">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                            <Button
                              size="icon"
                              className="size-8 rounded-full"
                              onClick={() => {
                                addProduct(product);
                                toast.success("Dodano do listy", {
                                  description: product.name,
                                });
                              }}
                            >
                              <Plus className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {flyerPages.map((p, i) => (
          <span
            key={p.id}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === page ? "w-5 bg-white" : "w-1.5 bg-white/35",
            )}
          />
        ))}
      </div>
    </div>
  );
}