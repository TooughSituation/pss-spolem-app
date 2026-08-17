"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { AppButton } from "@/components/design-system/app-button";
import { AppInput } from "@/components/design-system/app-input";
import { SpolemMark } from "@/components/brand/spolem-mark";
import { useAuth } from "@/lib/stores/auth";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function normalizePhone(value: string) {
  const digits = digitsOnly(value);
  if (digits.startsWith("48") && digits.length >= 11) {
    return `+48 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`.trim();
  }
  if (digits.length === 9) {
    return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }
  return value.trim();
}

export function LoginView() {
  const router = useRouter();
  const startLogin = useAuth((s) => s.startLogin);
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const sendTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (sendTimer.current) window.clearTimeout(sendTimer.current);
    };
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const digits = digitsOnly(phone);
    const national =
      digits.startsWith("48") && digits.length >= 11 ? digits.slice(-9) : digits;

    if (national.length !== 9) {
      setError("Podaj 9-cyfrowy numer telefonu.");
      return;
    }

    setError("");
    setSending(true);
    const formatted = normalizePhone(phone);
    startLogin(formatted, card);
    if (sendTimer.current) window.clearTimeout(sendTimer.current);
    sendTimer.current = window.setTimeout(() => {
      toast.success("Wysłaliśmy kod SMS", {
        description: "W wersji testowej użyj kodu 123456.",
      });
      router.push("/otp");
    }, 450);
  };

  return (
    <div className="flex min-h-full flex-col px-5 pb-8 pt-[max(2rem,env(safe-area-inset-top))]">
      <SpolemMark />
      <h1 className="mt-8 text-2xl font-bold tracking-tight">Zaloguj się</h1>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        Podaj numer telefonu, a wyślemy kod SMS. Numer karty klienta jest
        opcjonalny.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-1 flex-col">
        <div className="space-y-4">
          <AppInput
            id="phone"
            name="phone"
            label="Numer telefonu"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="512 345 678"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />
          <AppInput
            id="card"
            name="card"
            label="Numer karty klienta (opcjonalnie)"
            inputMode="numeric"
            placeholder="1234567890"
            value={card}
            onChange={(e) => setCard(e.target.value)}
          />
        </div>

        <AppButton
          type="submit"
          fullWidth
          size="lg"
          className="mt-8"
          loading={sending}
        >
          Wyślij kod SMS
        </AppButton>

        <p className="mt-6 text-sm leading-relaxed text-text-secondary">
          Logując się, akceptujesz{" "}
          <Link href="/regulamin" className="font-semibold text-primary">
            Regulamin
          </Link>{" "}
          oraz{" "}
          <Link
            href="/polityka-prywatnosci"
            className="font-semibold text-primary"
          >
            Politykę prywatności
          </Link>{" "}
          PSS Społem Białystok.
        </p>
      </form>
    </div>
  );
}
