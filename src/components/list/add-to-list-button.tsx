"use client";

import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { AppButton } from "@/components/design-system/app-button";
import { useShoppingList } from "@/lib/stores/shopping-list";
import type { Product } from "@/lib/types";

export function AddToListButton({
  product,
  size = "icon",
}: {
  product: Product;
  size?: "icon" | "sm";
}) {
  const addProduct = useShoppingList((s) => s.addProduct);
  const inList = useShoppingList((s) =>
    s.items.some((item) => item.productId === product.id && !item.checked),
  );

  return (
    <AppButton
      size={size === "icon" ? "icon" : "sm"}
      variant={inList ? "secondary" : "primary"}
      className={size === "icon" ? "size-9 shrink-0" : ""}
      aria-label={inList ? "Już na liście zakupów" : "Dodaj do listy zakupów"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        addProduct(product);
        toast.success("Na liście zakupów", { description: product.name });
      }}
    >
      {inList ? <Check className="size-4" /> : <Plus className="size-4" />}
      {size === "sm" ? (inList ? "Na liście" : "Do listy") : null}
    </AppButton>
  );
}
