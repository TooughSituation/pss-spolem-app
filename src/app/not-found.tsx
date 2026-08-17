import Link from "next/link";
import { appButtonVariants } from "@/components/design-system/app-button";
import { SpolemMark } from "@/components/brand/spolem-mark";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center px-6 py-16 text-center">
      <SpolemMark size="md" />
      <p className="mt-8 text-5xl font-bold text-primary">404</p>
      <h1 className="mt-3 text-xl font-bold tracking-tight">
        Nie znaleźliśmy tej strony
      </h1>
      <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-text-secondary">
        Sprawdź adres albo wróć do ekranu głównego PSS Społem Białystok.
      </p>
      <Link href="/" className={appButtonVariants({ className: "mt-6" })}>
        Do domu
      </Link>
    </div>
  );
}
