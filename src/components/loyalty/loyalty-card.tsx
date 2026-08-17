"use client";

import { QRCodeSVG } from "qrcode.react";
import { formatPoints } from "@/lib/format";
import { colors } from "@/lib/theme/colors";

export function LoyaltyCard({
  name,
  points,
  cardNumber,
}: {
  name: string;
  points: number;
  cardNumber: string;
}) {
  const grouped = cardNumber.replace(/(\d{4})/g, "$1 ").trim();

  return (
    <section className="px-4">
      <div className="rounded-xl bg-gradient-to-br from-primary-dark via-primary to-[#2e7ec8] p-4 text-white shadow-[0_8px_24px_rgba(0,85,164,0.28)]">
        <p className="text-sm font-medium text-white/80">Karta klienta</p>
        <p className="mt-1 font-mono text-lg tracking-wide">{grouped}</p>
        <p className="mt-1 text-sm text-white/80">{name}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-white/80">Saldo</p>
            <p className="text-4xl font-bold tabular-nums leading-none">
              {formatPoints(points)}
            </p>
            <p className="mt-1 text-sm text-white/80">pkt</p>
          </div>
          <div className="rounded-xl bg-white p-2.5">
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
          Pokaż kod przy kasie · 1 pkt za każde 5 zł
        </p>
      </div>
    </section>
  );
}
