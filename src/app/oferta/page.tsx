import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata = { title: "Oferta" };

export default function Page() {
  return (
    <Suspense>
      <CatalogView />
    </Suspense>
  );
}