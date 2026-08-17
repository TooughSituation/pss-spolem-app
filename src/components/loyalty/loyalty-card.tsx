"use client";

import { QRCodeSVG } from "qrcode.react";
import { MemberCardShell } from "@/components/brand/member-card-shell";
import { SpolemMark } from "@/components/brand/spolem-mark";
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
          <div className="flex items-start justify-between gap-3">
            <SpolemMark variant="white" size="sm" />
            <span
              className="mt-0.5 h-7 w-10 shrink-0 rounded-[4px] bg-[linear-gradient(145deg,#f6e7b2_0%,#d4b45a_45%,#f3e2a8_100%)] shadow-inner ring-1 ring-black/10"
              aria-hidden
            />
          </div>
          <div className="mt-5 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                Karta klienta
              </p>
              <p className="mt-1 truncate text-sm font-medium text-white/90">
                {name}
              </p>
              <p className="mt-3 font-mono text-[15px] tracking-[0.14em] text-white/85">
                {grouped}
              </p>
              <p className="mt-4 text-sm text-white/70">Saldo</p>
              <p className="mt-1 text-4xl font-bold tabular-nums leading-none">
                {formatPoints(points)}
              </p>
              <p className="mt-1 text-sm text-white/70">pkt</p>
            </div>
            <div className="shrink-0 rounded-lg bg-white p-2 shadow-sm">
              <QRCodeSVG
                value={`PSS:${cardNumber}`}
                size={148}
                bgColor={colors.white}
                fgColor={colors.primaryDark}
                level="M"
                title={`Karta klienta ${name}`}
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-white/65">
            PSS Społem Białystok · 1 pkt za każde 5 zł
          </p>
        </div>
      </MemberCardShell>
    </section>
  );
}
