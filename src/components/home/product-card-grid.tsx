import Image from "next/image";
import Link from "next/link";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppCard } from "@/components/design-system/app-card";
import { ProductPrice } from "@/components/home/product-card-horizontal";
import { AddToListButton } from "@/components/list/add-to-list-button";
import { productBadge, productPricing } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export function ProductCardGrid({ product }: { product: Product }) {
  const { price, promoPrice } = productPricing(product);
  const badge = productBadge(product);

  return (
    <Link href={`/oferta/${product.id}`} className="min-w-0">
      <AppCard
        padding="none"
        interactive
        className="flex h-full flex-col overflow-hidden"
      >
        <div className="relative aspect-[4/3] bg-accent-light">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 430px) 50vw, 200px"
          />
          {badge ? (
            <AppBadge
              variant={promoPrice ? "error" : "secondary"}
              className="absolute left-2 top-2"
            >
              {badge}
            </AppBadge>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-3">
          <p className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-text-primary">
            {product.name}
          </p>
          <div className="mt-auto flex items-end justify-between gap-2 pt-1">
            <ProductPrice price={price} promoPrice={promoPrice} />
            <AddToListButton product={product} />
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
