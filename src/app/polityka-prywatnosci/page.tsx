import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Polityka prywatności" };

export default function Page() {
  return (
    <LegalPage title="Polityka prywatności">
      <p>
        To poglądowa polityka prywatności aplikacji PSS Społem Białystok. Dane
        nie są wysyłane na serwer — sesja i profil zapisują się wyłącznie w
        przeglądarce (localStorage).
      </p>
      <p>
        W wersji produkcyjnej administrator danych poinformuje o celach
        przetwarzania, podstawie prawnej oraz prawach osoby, której dane
        dotyczą.
      </p>
    </LegalPage>
  );
}
