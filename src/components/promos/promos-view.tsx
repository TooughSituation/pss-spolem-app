"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, SearchX } from "lucide-react";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { PromotionChips } from "@/components/promos/promotion-chips";
import {
  PromotionFilters,
  type PromoSort,
} from "@/components/promos/promotion-filters";
import { PromotionProductCard } from "@/components/promos/promotion-product-card";
import { SearchBar } from "@/components/promos/search-bar";
import {
  ALL_PROMOTION_GROUP_ID,
  getActivePromotionGroups,
  getProductsInGroup,
} from "@/lib/data/promotion-groups";
import { flyerValid } from "@/lib/data/promotions";
import { discountPercent, productPricing } from "@/lib/data/products";
import type { CategoryId, Product } from "@/lib/types";

function sellingPrice(product: Product) {
  const { price, promoPrice } = productPricing(product);
  return promoPrice ?? price;
}

export function PromosView() {
  const groups = useMemo(() => getActivePromotionGroups(), []);
  const [groupId, setGroupId] = useState(ALL_PROMOTION_GROUP_ID);
  const [query, setQuery] = useState("");
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [category, setCategory] = useState<CategoryId | "wszystkie">(
    "wszystkie",
  );
  const [sort, setSort] = useState<PromoSort>("polecane");

  const products = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = getProductsInGroup(groupId).filter((product) => {
      if (onlyDiscount && discountPercent(product) == null) return false;
      if (category !== "wszystkie" && product.category !== category) return false;
      if (needle && !product.name.toLowerCase().includes(needle)) return false;
      return true;
    });

    if (sort === "price-asc") {
      return [...list].sort((a, b) => sellingPrice(a) - sellingPrice(b));
    }
    if (sort === "price-desc") {
      return [...list].sort((a, b) => sellingPrice(b) - sellingPrice(a));
    }
    if (sort === "discount") {
      return [...list].sort(
        (a, b) => (discountPercent(b) ?? -1) - (discountPercent(a) ?? -1),
      );
    }
    return list;
  }, [category, groupId, onlyDiscount, query, sort]);

  return (
    <div className="pb-6">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold tracking-tight">Promocje</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Oferta ważna do {flyerValid.to.replaceAll("-", ".")}
        </p>
      </div>

      <Link
        href="/promocje/gazetka"
        className="mx-4 mt-3 flex items-center justify-between rounded-xl bg-accent-light px-3 py-2.5 text-sm font-semibold text-primary"
      >
        <span className="inline-flex items-center gap-2">
          <BookOpen className="size-4" />
          Otwórz gazetkę tygodnia
        </span>
        <span aria-hidden>→</span>
      </Link>

      <div className="mt-4">
        <SearchBar value={query} onChange={setQuery} />
      </div>
      <div className="mt-3">
        <PromotionChips
          groups={groups}
          activeId={groupId}
          onChange={setGroupId}
        />
      </div>
      <div className="mt-3">
        <PromotionFilters
          onlyDiscount={onlyDiscount}
          onOnlyDiscountChange={setOnlyDiscount}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
        />
      </div>

      {products.length === 0 ? (
        <AppEmptyState
          icon={<SearchX className="size-7" />}
          title="Brak wyników"
          description="Zmień grupę, wyszukiwanie albo filtry — w tej kombinacji nic nie znaleźliśmy."
        />
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 px-4">
          {products.map((product) => (
            <PromotionProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
