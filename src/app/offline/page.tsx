import Link from "next/link";
import { appButtonVariants } from "@/components/design-system/app-button";
import { SpolemMark } from "@/components/brand/spolem-mark";

export const metadata = { title: "Offline" };

export default function Page() {
  return (
    <div className="flex min-h-full flex-col items-center px-6 py-16 text-center">
      <SpolemMark size="md" />
      <h1 className="mt-8 text-xl font-bold tracking-tight">Jesteś offline</h1>
      <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-text-secondary">
        Lista zakupów i karta lojalnościowa działają lokalnie. Oferta wymaga
        połączenia.
      </p>
      <Link href="/" className={appButtonVariants({ className: "mt-6" })}>
        Wróć do domu
      </Link>
    </div>
  );
}
