"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export function ScanView() {
  const router = useRouter();
  const [found, setFound] = useState<(typeof products)[number] | null>(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      const pick =
        products.find((p) => p.barcode.endsWith("059")) ?? products[4];
      setFound(pick);
      setScanning(false);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col bg-black text-white">
      <header className="flex items-center justify-between px-4 pt-[max(0.85rem,env(safe-area-inset-top))]">
        <p className="text-sm font-bold">Skanuj kod kreskowy</p>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white"
          onClick={() => router.back()}
        >
          <X className="size-5" />
        </Button>
      </header>

      <div className="relative mx-6 mt-8 aspect-[3/4] overflow-hidden rounded-[28px] bg-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,85,164,0.28),transparent_60%)]" />
        <div className="absolute inset-10 rounded-2xl border-2 border-white/70" />
        {scanning && (
          <div className="scan-line absolute inset-x-12 h-0.5 bg-[#4d94d4] shadow-[0_0_16px_#0055A4]" />
        )}
        <p className="absolute inset-x-0 bottom-6 text-center text-xs text-white/70">
          {scanning
            ? "Nakieruj aparat na kod EAN…"
            : "Znaleziono produkt (symulacja)"}
        </p>
      </div>

      <div className="mt-auto rounded-t-3xl bg-background p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-foreground">
        {found ? (
          <>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Wynik skanowania · {found.barcode}
            </p>
            <ProductCard product={found} layout="row" />
            <Button asChild className="mt-3 h-11 w-full rounded-2xl">
              <Link href={`/oferta/${found.id}`}>Zobacz szczegóły</Link>
            </Button>
          </>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            To jest podgląd skanera — w docelowej wersji użyjemy kamery
            urządzenia.
          </p>
        )}
      </div>
    </div>
  );
}