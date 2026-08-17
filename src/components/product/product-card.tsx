"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useShoppingList } from "@/lib/stores/shopping-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  layout = "grid",
}: {
  product: Product;
  layout?: "grid" | "row";
}) {
  const addProduct = useShoppingList((s) => s.addProduct);
  const inList = useShoppingList((s) =>
    s.items.some((i) => i.productId === product.id),
  );

  const add = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addProduct(product);
    toast.success("Dodano do listy zakupów", { description: product.name });
  };

  if (layout === "row") {
    return (
      <Link
        href={`/oferta/${product.id}`}
        className="flex gap-3 rounded-2xl border bg-card p-2.5 shadow-sm transition hover:shadow-md"
      >
        <div className="relative size-[76px] shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="76px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold leading-tight">
                {product.name}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {product.brand} · {product.weight}
              </p>
            </div>
            {product.isOwnBrand && (
              <Badge className="h-5 shrink-0 bg-primary/15 text-[10px] text-primary">
                PSS
              </Badge>
            )}
          </div>
          <div className="mt-2 flex items-end justify-between">
            <Price product={product} />
            <AddBtn inList={inList} onClick={add} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/oferta/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 430px) 50vw, 200px"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isPromo && product.oldPrice && (
            <Badge className="bg-error text-white">
              −{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </Badge>
          )}
          {product.isOwnBrand && (
            <Badge className="bg-primary text-primary-foreground">
              Marka PSS
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-2.5">
        <p className="line-clamp-2 min-h-9 text-[13px] font-semibold leading-snug">
          {product.name}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{product.weight}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <Price product={product} />
          <AddBtn inList={inList} onClick={add} />
        </div>
      </div>
    </Link>
  );
}

function Price({ product }: { product: Product }) {
  return (
    <div>
      {product.oldPrice && (
        <p className="text-[11px] text-muted-foreground line-through">
          {formatPrice(product.oldPrice)}
        </p>
      )}
      <p
        className={cn(
          "text-sm font-extrabold tabular-nums",
          product.isPromo && "text-error",
        )}
      >
        {formatPrice(product.price)}
      </p>
    </div>
  );
}

function AddBtn({
  inList,
  onClick,
}: {
  inList: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <Button
      size="icon"
      variant={inList ? "secondary" : "default"}
      className="size-8 rounded-full"
      onClick={onClick}
      aria-label={inList ? "Już na liście" : "Dodaj do listy"}
    >
      {inList ? <Check className="size-4" /> : <Plus className="size-4" />}
    </Button>
  );
}