import Image from "next/image";
import Link from "next/link";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppCard } from "@/components/design-system/app-card";
import { productBadge, productPricing } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCardHorizontal({ product }: { product: Product }) {
  const { price, promoPrice } = productPricing(product);
  const badge = productBadge(product);

  return (
    <Link
      href={`/oferta/${product.id}`}
      className="w-[156px] shrink-0 snap-start"
    >
      <AppCard padding="none" className="h-full overflow-hidden">
        <div className="relative aspect-[4/3] bg-accent-light">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="156px"
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
        <div className="flex flex-col p-2.5">
          <p className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug">
            {product.name}
          </p>
          <ProductPrice price={price} promoPrice={promoPrice} />
        </div>
      </AppCard>
    </Link>
  );
}

export function ProductPrice({
  price,
  promoPrice,
}: {
  price: number;
  promoPrice?: number;
}) {
  if (promoPrice != null) {
    return (
      <div className="mt-1.5">
        <p className="text-xs text-text-secondary line-through">
          {formatPrice(price)}
        </p>
        <p className="text-sm font-bold tabular-nums text-error">
          {formatPrice(promoPrice)}
        </p>
      </div>
    );
  }

  return (
    <p className="mt-1.5 text-sm font-bold tabular-nums text-text-primary">
      {formatPrice(price)}
    </p>
  );
}
