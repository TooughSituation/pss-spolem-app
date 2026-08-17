"use client";

import { useRouter } from "next/navigation";
import { Construction } from "lucide-react";
import { AppButton } from "@/components/design-system/app-button";
import { AppEmptyState } from "@/components/design-system/app-empty-state";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();

  return (
    <div className="px-4 pt-4">
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      <AppEmptyState
        icon={<Construction className="size-7" />}
        title="Wkrótce dostępne"
        description={description}
        action={
          <AppButton variant="secondary" onClick={() => router.push("/")}>
            Wróć do Home
          </AppButton>
        }
      />
    </div>
  );
}
