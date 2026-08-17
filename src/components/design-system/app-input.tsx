import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function AppInput({
  id,
  label,
  hint,
  error,
  className,
  ...props
}: AppInputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-12 w-full rounded-xl border bg-background px-3.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/70 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-error" : "border-input",
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${inputId}-hint`}
          className="mt-1.5 text-sm text-text-secondary"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
