"use client";

import { Search, X } from "lucide-react";
import { AppInput } from "@/components/design-system/app-input";

export function SearchBar({
  value,
  onChange,
  placeholder = "Szukaj w promocjach",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative px-4">
      <Search
        className="pointer-events-none absolute left-7 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
        aria-hidden
      />
      <AppInput
        id="promo-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10"
        aria-label="Wyszukaj produkt"
      />
      {value ? (
        <button
          type="button"
          className="absolute right-7 top-1/2 -translate-y-1/2 text-text-secondary"
          onClick={() => onChange("")}
          aria-label="Wyczyść wyszukiwanie"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
