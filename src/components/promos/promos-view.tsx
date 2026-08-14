"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { getProduct } from "@/lib/data/products";
import { flyerValid, promotions } from "@/lib/data/promotions";
import { formatDate } from "@/lib/format";
import { useShoppingList } from "@/lib/stores/shopping-list";
import { ProductCard } from "@/components/product/product-card";
import { ScreenHeader } from "@/components/layout/screen-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function PromosView() {
  const addProduct = useShoppingList((s) => s.addProduct);

  return (
    <div>
      <ScreenHeader
        title="Promocje i gazetka"
        subtitle="Ważne do 20 sierpnia"
      />
      <Tabs defaultValue="promocje" className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-2 rounded-2xl">
          <TabsTrigger value="promocje">Promocje</TabsTrigger>
          <TabsTrigger value="gazetka">Gazetka</TabsTrigger>
        </TabsList>
        <TabsContent value="promocje" className="mt-4 space-y-3 pb-6">
          {promotions.map((promo) => {
            const product = promo.productId
              ? getProduct(promo.productId)
              : undefined;
            return (
              <article
                key={promo.id}
                className="overflow-hidden rounded-3xl border bg-card shadow-sm"
              >
                <div className="relative h-36">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                    sizes="430px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute left-3 top-3 bg-coop-red text-white">
                    {promo.tag}
                  </Badge>
                  {promo.discountPercent && (
                    <span className="absolute right-3 top-3 rounded-2xl bg-white px-2 py-1 text-sm font-black text-coop-red">
                      −{promo.discountPercent}%
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-extrabold leading-tight">
                      {promo.title}
                    </h3>
                    <p className="text-xs text-white/80">{promo.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5">
                  <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="size-3.5" />
                    do {formatDate(promo.validUntil)}
                  </p>
                  {product && (
                    <Button
                      size="sm"
                      onClick={() => {
                        addProduct(product);
                        toast.success("Dodano do listy zakupów");
                      }}
                    >
                      Dodaj do listy
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </TabsContent>
        <TabsContent value="gazetka" className="mt-4 pb-6">
          <Link
            href="/promocje/gazetka"
            className="relative block overflow-hidden rounded-3xl"
          >
            <div className="relative h-56">
              <Image
                src="/images/flyer.jpg"
                alt="Okładka gazetki"
                fill
                className="object-cover"
                sizes="430px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <Badge className="mb-2 bg-accent text-accent-foreground">
                14–20 sierpnia 2026
              </Badge>
              <p className="text-xl font-extrabold">Gazetka tygodnia</p>
              <p className="mt-1 text-sm text-white/80">
                Przeglądaj strony i dodawaj produkty jednym stuknięciem.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                <BookOpen className="size-4" /> Otwórz gazetkę
              </span>
            </div>
          </Link>
          <p className="mt-3 px-1 text-xs text-muted-foreground">
            Oferta ważna {flyerValid.from} – {flyerValid.to} w sklepach PSS
            uczestniczących w akcji. Ceny mogą się różnić lokalnie.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {promotions.slice(0, 4).map((promo) => {
              const product = promo.productId
                ? getProduct(promo.productId)
                : undefined;
              return product ? (
                <ProductCard key={promo.id} product={product} />
              ) : null;
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}