import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Kontakt" };

export default function Page() {
  return (
    <LegalPage title="Kontakt">
      <p>PSS Społem Białystok (dane poglądowe)</p>
      <p>telefon: 85 000 00 00</p>
      <p>e-mail: kontakt@pss-spolem.bialystok.pl</p>
      <p>
        To nie jest oficjalny adres spółdzielni. Wersja produkcyjna otrzyma
        prawdziwe dane kontaktowe.
      </p>
    </LegalPage>
  );
}
