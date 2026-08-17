"use client";

import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { AppButton } from "@/components/design-system/app-button";
import { formatPoints } from "@/lib/format";
import { colors } from "@/lib/theme/colors";

export function PointsCard({
  name,
  points,
  cardNumber,
}: {
  name: string;
  points: number;
  cardNumber: string;
}) {
  const router = useRouter();

  return (
    <section className="px-4">
      <div className="rounded-xl bg-gradient-to-br from-primary-dark via-primary to-[#2e7ec8] p-4 text-white shadow-[0_8px_24px_rgba(0,85,164,0.28)]">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white/80">Twoje punkty</p>
            <p className="mt-1 text-4xl font-bold tabular-nums leading-none">
              {formatPoints(points)}
            </p>
            <p className="mt-1 text-sm text-white/80">pkt</p>
            <AppButton
              size="sm"
              className="mt-4 border-0 bg-white text-primary hover:bg-accent-light"
              onClick={() => router.push("/lojalnosc")}
            >
              Szczegóły
            </AppButton>
          </div>
          <div className="shrink-0 rounded-xl bg-white p-2.5 shadow-sm">
            <QRCodeSVG
              value={`PSS:${cardNumber}`}
              size={160}
              bgColor={colors.white}
              fgColor={colors.primaryDark}
              level="M"
              title={`Karta klienta ${name}`}
            />
          </div>
        </div>
        <p className="mt-3 text-sm text-white/75">
          Pokaż kod przy kasie · {cardNumber}
        </p>
      </div>
    </section>
  );
}
