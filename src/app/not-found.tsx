import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="px-6 py-16 text-center">
      <p className="text-5xl font-black text-primary">404</p>
      <h1 className="mt-2 text-xl font-extrabold">Nie znaleźliśmy tej strony</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sprawdź adres albo wróć do ekranu głównego PSS Społem.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Do domu</Link>
      </Button>
    </div>
  );
}