import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Offline" };

export default function Page() {
  return (
    <div className="px-6 py-16 text-center">
      <p className="text-4xl">📡</p>
      <h1 className="mt-3 text-xl font-extrabold">Jesteś offline</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Lista zakupów i karta lojalnościowa działają lokalnie. Oferta wymaga
        połączenia.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Wróć do domu</Link>
      </Button>
    </div>
  );
}