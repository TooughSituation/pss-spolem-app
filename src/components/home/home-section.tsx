import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BannerSlide } from "@/components/home/banner-carousel";
import { CategoryShortcuts } from "@/components/home/category-shortcuts";
import { ProductCardGrid } from "@/components/home/product-card-grid";
import { ProductCardHorizontal } from "@/components/home/product-card-horizontal";
import { AppEmptyState } from "@/components/design-system/app-empty-state";
import { getBanner } from "@/lib/data/banners";
import { getProduct } from "@/lib/data/products";
import type { HomeSection as HomeSectionData, Product } from "@/lib/types";

export function HomeSection({ section }: { section: HomeSectionData }) {
  if (section.type === "category-shortcuts") {
    return <CategoryShortcuts ids={section.items} />;
  }

  if (section.type === "banner") {
    const banner = getBanner(section.items[0] ?? "");
    if (!banner) return null;
    return (
      <div className="px-4">
        <div className="overflow-hidden rounded-xl">
          <BannerSlide banner={banner} />
        </div>
      </div>
    );
  }

  const products = section.items
    .map((id) => getProduct(id))
    .filter((item): item is Product => Boolean(item));

  if (!products.length) {
    return (
      <section>
        {section.title ? <SectionHead title={section.title} href={section.href} /> : null}
        <AppEmptyState
          title="Brak produktów"
          description="Ta sekcja nie ma teraz pozycji do pokazania."
          className="py-8"
        />
      </section>
    );
  }

  if (section.type === "grid-products") {
    return (
      <section>
        {section.title ? <SectionHead title={section.title} href={section.href} /> : null}
        <div className="grid grid-cols-2 gap-3 px-4">
          {products.map((product) => (
            <ProductCardGrid key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      {section.title ? <SectionHead title={section.title} href={section.href} /> : null}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
        {products.map((product) => (
          <ProductCardHorizontal key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function SectionHead({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between px-4">
      <h2 className="text-base font-bold tracking-tight">{title}</h2>
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center text-sm font-semibold text-primary"
        >
          Zobacz wszystkie <ChevronRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
