"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ScanLine } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import type { CategoryId } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { ScreenHeader } from "@/components/layout/screen-header";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function CatalogView() {
  const params = useSearchParams();
  const initial = (params.get("kategoria") as CategoryId | null) ?? "all";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">(
    initial === "all" || categories.some((c) => c.id === initial)
      ? (initial as CategoryId | "all")
      : "all",
  );
  const [ownOnly, setOwnOnly] = useState(category === "wlasne");
  const [promoOnly, setPromoOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !`${p.name} ${p.brand}`.toLowerCase().includes(q)) return false;
      if (category !== "all" && p.category !== category && !(category === "wlasne" && p.isOwnBrand))
        return false;
      if (ownOnly && !p.isOwnBrand) return false;
      if (promoOnly && !p.isPromo) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;
      return true;
    });
  }, [query, category, ownOnly, promoOnly, maxPrice]);

  return (
    <div>
      <ScreenHeader
        title="Oferta"
        subtitle={`${filtered.length} produktów`}
        action={
          <Button asChild variant="ghost" size="icon" className="size-9">
            <Link href="/skanuj" aria-label="Skanuj kod">
              <ScanLine className="size-5" />
            </Link>
          </Button>
        }
      />

      <div className="flex items-center gap-2 px-4 pt-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj nabiału, pieczywa…"
            className="h-11 rounded-2xl bg-card pl-9"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="size-11 rounded-2xl">
              <SlidersHorizontal className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <SheetHeader>
              <SheetTitle>Filtry</SheetTitle>
            </SheetHeader>
            <div className="space-y-5 px-4 pb-8">
              <div className="flex items-center justify-between">
                <Label htmlFor="own">Tylko marka własna PSS</Label>
                <Switch id="own" checked={ownOnly} onCheckedChange={setOwnOnly} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promo">Tylko promocje</Label>
                <Switch
                  id="promo"
                  checked={promoOnly}
                  onCheckedChange={setPromoOnly}
                />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Maksymalna cena</p>
                <div className="flex flex-wrap gap-2">
                  {[null, 5, 10, 20].map((v) => (
                    <Button
                      key={String(v)}
                      size="sm"
                      variant={maxPrice === v ? "default" : "outline"}
                      onClick={() => setMaxPrice(v)}
                    >
                      {v === null ? "Dowolna" : `do ${v} zł`}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4">
        <Chip
          active={category === "all"}
          onClick={() => setCategory("all")}
          label="Wszystko"
        />
        {categories.map((c) => (
          <Chip
            key={c.id}
            active={category === c.id}
            onClick={() => {
              setCategory(c.id);
              if (c.id === "wlasne") setOwnOnly(true);
            }}
            label={`${c.emoji} ${c.name}`}
          />
        ))}
      </div>

      {(ownOnly || promoOnly || maxPrice) && (
        <div className="mt-3 flex flex-wrap gap-1.5 px-4">
          {ownOnly && <Badge variant="secondary">Marka PSS</Badge>}
          {promoOnly && <Badge variant="secondary">Promocje</Badge>}
          {maxPrice && <Badge variant="secondary">do {maxPrice} zł</Badge>}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search className="size-7" />}
          title="Nic nie znaleźliśmy"
          description={
            query
              ? `Brak produktów dla „${query}”. Spróbuj innej frazy lub zdejmij filtry.`
              : "Zmień kategorię albo filtry, żeby zobaczyć ofertę."
          }
          action={
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setOwnOnly(false);
                setPromoOnly(false);
                setMaxPrice(null);
              }}
            >
              Wyczyść filtry
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 py-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-card text-foreground ring-1 ring-border",
      )}
    >
      {label}
    </button>
  );
}