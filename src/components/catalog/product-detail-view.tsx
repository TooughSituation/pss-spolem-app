"use client";

import { ShoppingBasket, ShoppingCart } from "lucide-react";
import { SafeImage } from "@/components/media/safe-image";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { discountPercent, productPricing } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { useShoppingList } from "@/lib/stores/shopping-list";
import { useCart } from "@/lib/stores/cart";
import { ProductCard } from "@/components/product/product-card";
import { ScreenHeader } from "@/components/layout/screen-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProductDetailView({ product }: { product: Product }) {
  const addToList = useShoppingList((s) => s.addProduct);
  const addToCart = useCart((s) => s.add);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const category = getCategory(product.category);
  const { price, promoPrice } = productPricing(product);
  const discount = discountPercent(product);

  return (
    <div>
      <ScreenHeader title={product.name} back />
      <div className="relative mx-4 mt-3 aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="430px"
          priority
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {product.isOwnBrand && (
            <Badge className="bg-primary">Marka własna PSS</Badge>
          )}
          {product.isPromo && (
            <Badge className="bg-error text-white">
              {discount != null ? `−${discount}%` : "Promocja"}
            </Badge>
          )}
          {product.badge ? (
            <Badge className="bg-primary text-primary-foreground">
              {product.badge}
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="px-4 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.brand} · {category?.name}
        </p>
        <h2 className="mt-1 text-xl font-extrabold leading-tight">{product.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{product.weight}</p>

        <div className="mt-3 flex items-end gap-2">
          <p className="text-3xl font-black tabular-nums text-primary">
            {formatPrice(promoPrice ?? price)}
          </p>
          {promoPrice != null ? (
            <p className="mb-1 text-sm text-muted-foreground line-through">
              {formatPrice(price)}
            </p>
          ) : null}
          <p className="mb-1 text-sm text-muted-foreground">/ {product.unit}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        {product.origin && (
          <p className="mt-2 text-sm">
            <span className="font-semibold">Pochodzenie: </span>
            {product.origin}
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Kod kreskowy: {product.barcode}
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <Button
            className="h-11 rounded-2xl"
            onClick={() => {
              addToList(product);
              toast.success("Dodano do listy zakupów");
            }}
          >
            <ShoppingBasket className="size-4" />
            Dodaj do listy zakupów
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-2xl"
            onClick={() => {
              addToCart(product.id);
              toast.success("Dodano do zamówienia");
            }}
          >
            <ShoppingCart className="size-4" />
            Zamów
          </Button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8 px-4 pb-6">
          <h3 className="mb-3 text-base font-extrabold">Podobne produkty</h3>
          <div className="grid grid-cols-2 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}