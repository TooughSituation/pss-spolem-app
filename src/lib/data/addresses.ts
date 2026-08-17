import type { DeliveryAddress } from "@/lib/types";

export const defaultAddresses: DeliveryAddress[] = [
  {
    id: "dom",
    label: "Dom",
    street: "ul. Lipowa 12/4",
    city: "Białystok",
    postalCode: "15-424",
    isDefault: true,
  },
  {
    id: "praca",
    label: "Praca",
    street: "ul. Sienkiewicza 49",
    city: "Białystok",
    postalCode: "15-002",
    isDefault: false,
  },
];
