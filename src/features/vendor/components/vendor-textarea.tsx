import * as React from "react";

import { cn } from "@/utils/cn";

interface VendorTextareaProps
  extends Omit<React.ComponentProps<"textarea">, "className" | "id"> {
  label: string;
  error?: string;
  hint?: string;
  id?: string;
  className?: string;
}

export function VendorTextarea({
  label,
  error,
  hint,
  id,
  className,
  ...props
}: VendorTextareaProps) {
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
      <textarea
        id={fieldId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={
          error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
        }
        className={cn(
          "min-h-28 w-full resize-y rounded-2xl border border-input bg-muted px-4 py-3.5 text-base text-foreground outline-none transition-all duration-200 sm:text-sm",
          "placeholder:text-muted-foreground",
          "focus:border-transparent focus:bg-card focus:ring-2 focus:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:focus:ring-destructive"
        )}
        {...props}
      />
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
