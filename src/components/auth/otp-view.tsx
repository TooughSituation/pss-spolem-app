"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { toast } from "sonner";
import { AppButton } from "@/components/design-system/app-button";
import { SpolemMark } from "@/components/brand/spolem-mark";
import { OTP_LENGTH, OTP_RESEND_SECONDS } from "@/lib/constants";
import { useAuth } from "@/lib/stores/auth";
import { cn } from "@/lib/utils";

const emptyDigits = () => Array.from({ length: OTP_LENGTH }, () => "");

export function OtpView() {
  const router = useRouter();
  const pendingPhone = useAuth((s) => s.pendingPhone);
  const login = useAuth((s) => s.login);
  const [digits, setDigits] = useState(emptyDigits);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [seconds, setSeconds] = useState(OTP_RESEND_SECONDS);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!pendingPhone) {
      router.replace("/login");
    }
  }, [pendingPhone, router]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((value) => (value <= 0 ? 0 : value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const code = digits.join("");

  const applyDigits = (next: string[]) => {
    setDigits(next);
    setError("");
  };

  const onChangeDigit = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      applyDigits(next);
      return;
    }

    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, OTP_LENGTH).split("");
      const next = emptyDigits();
      pasted.forEach((digit, i) => {
        next[i] = digit;
      });
      applyDigits(next);
      inputs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
      return;
    }

    const next = [...digits];
    next[index] = cleaned;
    applyDigits(next);
    if (index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const onKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!pendingPhone) return;
    if (code.length !== OTP_LENGTH) {
      setError("Wpisz 6-cyfrowy kod z SMS.");
      return;
    }

    setSubmitting(true);
    const ok = login(pendingPhone, code);
    if (!ok) {
      setSubmitting(false);
      setError("Nieprawidłowy kod. Spróbuj ponownie.");
      return;
    }

    toast.success("Zalogowano pomyślnie");
    router.replace("/");
    window.setTimeout(() => {
      if (window.location.pathname !== "/") {
        window.location.replace("/");
      }
    }, 500);
  };

  const resend = () => {
    if (seconds > 0) return;
    setDigits(emptyDigits());
    setError("");
    setSeconds(OTP_RESEND_SECONDS);
    inputs.current[0]?.focus();
    toast.success("Wysłaliśmy kod ponownie", {
      description: "W wersji testowej nadal obowiązuje kod 123456.",
    });
  };

  if (!pendingPhone) return null;

  return (
    <div className="flex min-h-full flex-col px-5 pb-8 pt-[max(2.5rem,env(safe-area-inset-top))]">
      <SpolemMark size="lg" />
      <h1 className="mt-10 text-2xl font-bold tracking-tight">Wpisz kod SMS</h1>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        Kod wysłaliśmy na numer{" "}
        <span className="font-semibold text-text-primary">{pendingPhone}</span>.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-1 flex-col">
        <div className="flex justify-between gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputs.current[index] = node;
              }}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={`Cyfra ${index + 1}`}
              maxLength={index === 0 ? OTP_LENGTH : 1}
              value={digit}
              onChange={(e) => onChangeDigit(index, e.target.value)}
              onKeyDown={(e) => onKeyDown(index, e)}
              className={cn(
                "h-14 w-full rounded-xl border bg-background text-center text-xl font-bold text-text-primary outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/30",
                error ? "border-error" : "border-input",
              )}
            />
          ))}
        </div>
        {error ? <p className="mt-2 text-sm text-error">{error}</p> : null}

        <AppButton
          type="submit"
          fullWidth
          size="lg"
          className="mt-8"
          loading={submitting}
        >
          Zaloguj się
        </AppButton>

        <button
          type="button"
          onClick={resend}
          disabled={seconds > 0}
          className="mt-5 text-sm font-semibold text-primary disabled:text-text-secondary"
        >
          {seconds > 0
            ? `Wyślij kod ponownie (${seconds}s)`
            : "Wyślij kod ponownie"}
        </button>

        <Link
          href="/login"
          className="mt-4 text-sm font-medium text-text-secondary"
        >
          Zmień numer telefonu
        </Link>
      </form>
    </div>
  );
}
