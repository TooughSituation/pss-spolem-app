import Image from "next/image";
import Link from "next/link";
import { AppBadge } from "@/components/design-system/app-badge";
import { AppCard } from "@/components/design-system/app-card";
import { discountPercent, productBadge, productPricing } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function PromotionProductCard({ product }: { product: Product }) {
  const { price, promoPrice } = productPricing(product);
  const discount = discountPercent(product);
  const badge = productBadge(product);

  return (
    <Link href={`/oferta/${product.id}`} className="min-w-0">
      <AppCard padding="none" className="flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[4/3] bg-accent-light">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 430px) 50vw, 200px"
          />
          {discount != null ? (
            <AppBadge variant="error" className="absolute right-2 top-2">
              −{discount}%
            </AppBadge>
          ) : null}
          {badge ? (
            <AppBadge
              variant="secondary"
              className="absolute left-2 top-2 max-w-[70%] truncate"
            >
              {badge}
            </AppBadge>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-2.5">
          <p className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug">
            {product.name}
          </p>
          <div className="mt-auto pt-1.5">
            {promoPrice != null ? (
              <>
                <p className="text-xs text-text-secondary line-through">
                  {formatPrice(price)}
                </p>
                <p className="text-sm font-bold tabular-nums text-error">
                  {formatPrice(promoPrice)}
                </p>
              </>
            ) : (
              <p className="text-sm font-bold tabular-nums text-text-primary">
                {formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
