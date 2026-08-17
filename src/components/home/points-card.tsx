"use client";

import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { AppButton } from "@/components/design-system/app-button";
import { MemberCardShell } from "@/components/brand/member-card-shell";
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
  const grouped = cardNumber.replace(/(\d{4})/g, "$1 ").trim();

  return (
    <section className="px-4">
      <MemberCardShell>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                PSS Społem · Białystok
              </p>
              <p className="mt-1 text-sm text-white/85">{name}</p>
            </div>
            <span className="h-7 w-10 rounded-[3px] bg-[linear-gradient(135deg,#f3e2a8,#d4b45a)] shadow-inner" />
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-white/75">Saldo punktów</p>
              <p className="mt-1 text-4xl font-bold tabular-nums leading-none">
                {formatPoints(points)}
              </p>
              <p className="mt-2 font-mono text-sm tracking-wide text-white/80">
                {grouped}
              </p>
              <AppButton
                size="sm"
                className="mt-4 border-0 bg-white text-primary hover:bg-accent-light"
                onClick={() => router.push("/lojalnosc")}
              >
                Szczegóły karty
              </AppButton>
            </div>
            <div className="shrink-0 rounded-lg bg-white p-2">
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
          <p className="mt-3 text-sm text-white/70">
            Pokaż przy kasie · 1 pkt za każde 5 zł
          </p>
        </div>
      </MemberCardShell>
    </section>
  );
}
