import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Regulamin" };

export default function Page() {
  return (
    <LegalPage title="Regulamin">
      <p>
        Niniejszy dokument jest wersją poglądową regulaminu aplikacji mobilnej
        PSS Społem Białystok. Nie stanowi oficjalnego regulaminu spółdzielni.
      </p>
      <p>
        Aplikacja na tym etapie działa na danych przykładowych i służy do
        prezentacji interfejsu: promocji, sklepów, gastronomii oraz programu
        lojalnościowego.
      </p>
      <p>
        Logowanie odbywa się kodem SMS w trybie testowym. W środowisku
        deweloperskim obowiązuje kod 123456.
      </p>
    </LegalPage>
  );
}
