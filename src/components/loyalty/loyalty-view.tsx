"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { loyaltyHistory, NEXT_VOUCHER_AT, rewards } from "@/lib/data/user";
import { formatDate, formatPoints } from "@/lib/format";
import { useUser } from "@/lib/stores/user";
import { ScreenHeader } from "@/components/layout/screen-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LoyaltyView() {
  const profile = useUser((s) => s.profile);
  const redeem = useUser((s) => s.redeem);
  const grouped = profile.cardNumber.replace(/(\d{4})/g, "$1 ").trim();

  return (
    <div>
      <ScreenHeader title="Program lojalnościowy" back backHref="/profil" />
      <div className="px-4 pt-3">
        <div className="relative overflow-hidden rounded-3xl text-white shadow-xl">
          <Image
            src="/images/card.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="430px"
          />
          <div className="relative bg-emerald-950/45 p-5 backdrop-blur-[2px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                  Społem znaczy razem
                </p>
                <p className="mt-6 font-mono text-lg tracking-[0.18em]">
                  {grouped}
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {profile.firstName} {profile.lastName}
                </p>
              </div>
              <div className="rounded-xl bg-white p-2">
                <QRCodeSVG
                  value={`PSS:${profile.cardNumber}`}
                  size={88}
                  bgColor="#ffffff"
                  fgColor="#0b3d24"
                />
              </div>
            </div>
            <p className="mt-4 text-[11px] text-white/75">
              Pokaż kod przy kasie — 1 pkt za każde wydane 5 zł
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border bg-card p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Twoje punkty</p>
              <p className="text-3xl font-black tabular-nums">
                {formatPoints(profile.points)}
              </p>
            </div>
            <Badge>do bonu 50 zł</Badge>
          </div>
          <Progress
            value={(profile.points / NEXT_VOUCHER_AT) * 100}
            className="mt-3 h-2"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Brakuje {formatPoints(NEXT_VOUCHER_AT - profile.points)} pkt
          </p>
        </div>
      </div>

      <Tabs defaultValue="nagrody" className="px-4 pt-5 pb-6">
        <TabsList className="grid w-full grid-cols-2 rounded-2xl">
          <TabsTrigger value="nagrody">Nagrody</TabsTrigger>
          <TabsTrigger value="historia">Historia</TabsTrigger>
        </TabsList>
        <TabsContent value="nagrody" className="mt-3 space-y-2">
          {rewards.map((r) => {
            const ok = profile.points >= r.points;
            return (
              <div
                key={r.id}
                className="rounded-2xl border bg-card p-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{r.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {r.description}
                    </p>
                  </div>
                  <Badge variant={ok ? "default" : "secondary"}>
                    {r.points} pkt
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className="mt-3"
                  disabled={!ok}
                  onClick={() => {
                    const done = redeem(r.id);
                    toast[done ? "success" : "error"](
                      done
                        ? "Nagroda zarezerwowana — odbierz w sklepie"
                        : "Za mało punktów",
                    );
                  }}
                >
                  Wymień punkty
                </Button>
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value="historia" className="mt-3 space-y-2">
          {loyaltyHistory.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-2xl border bg-card px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-semibold">{t.label}</p>
                <p className="text-[11px] text-muted-foreground">
                  {formatDate(t.date)}
                  {t.storeName ? ` · ${t.storeName}` : ""}
                </p>
              </div>
              <p
                className={
                  t.points > 0
                    ? "font-bold text-primary"
                    : "font-bold text-coop-red"
                }
              >
                {t.points > 0 ? "+" : ""}
                {t.points}
              </p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}