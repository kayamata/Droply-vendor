import * as React from "react";

import { cn } from "@/utils/cn";

/* Shared field styling — mirrors the customer app's pill inputs
   (32px radius, #f6f7f9 fill, orange focus ring). */
const fieldClasses = cn(
  "w-full rounded-2xl border border-input bg-muted px-4 text-base text-foreground outline-none transition-all duration-200 sm:text-sm",
  "placeholder:text-muted-foreground",
  "focus:border-transparent focus:bg-card focus:ring-2 focus:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:focus:ring-destructive"
);

interface VendorInputProps
  extends Omit<React.ComponentProps<"input">, "className" | "id"> {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  id?: string;
  className?: string;
}

export function VendorInput({
  label,
  error,
  hint,
  icon,
  id,
  className,
  ...props
}: VendorInputProps) {
  const autoId = React.useId();
  const fieldId = id ?? autoId;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={fieldId}
        className="text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4.5">
            {icon}
          </span>
        )}
        <input
          id={fieldId}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={
            error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
          }
          className={cn(fieldClasses, "h-[52px]", icon && "pl-11")}
          {...props}
        />
      </div>
      {error ? (
        <p id={`${fieldId}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
