import type { ReactNode } from "react";
import Link from "next/link";
import { SpolemMark } from "@/components/brand/spolem-mark";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="px-5 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <SpolemMark size="sm" />
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{title}</h1>
      <div className="mt-5 space-y-3 text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
      <Link
        href="/"
        className="mt-8 inline-block text-sm font-semibold text-primary"
      >
        Wróć do aplikacji
      </Link>
    </article>
  );
}
