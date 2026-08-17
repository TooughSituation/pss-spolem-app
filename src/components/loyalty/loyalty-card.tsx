"use client";

import { QRCodeSVG } from "qrcode.react";
import { MemberCardShell } from "@/components/brand/member-card-shell";
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
      <MemberCardShell>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Karta klienta
              </p>
              <p className="mt-1 text-sm text-white/85">{name}</p>
            </div>
            <span className="h-7 w-10 rounded-[3px] bg-[linear-gradient(135deg,#f3e2a8,#d4b45a)] shadow-inner" />
          </div>
          <p className="mt-4 font-mono text-lg tracking-[0.14em]">{grouped}</p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-white/75">Saldo</p>
              <p className="text-4xl font-bold tabular-nums leading-none">
                {formatPoints(points)}
              </p>
              <p className="mt-1 text-sm text-white/75">pkt</p>
            </div>
            <div className="shrink-0 rounded-lg bg-white p-2">
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
          <p className="mt-3 text-sm text-white/70">
            PSS Społem Białystok · 1 pkt za każde 5 zł
          </p>
        </div>
      </MemberCardShell>
    </section>
  );
}
