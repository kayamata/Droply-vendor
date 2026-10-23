import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/utils/cn";

interface VendorSelectProps
  extends Omit<React.ComponentProps<"select">, "className" | "id"> {
  label: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options: readonly { value: string; label: string }[];
  id?: string;
  className?: string;
}

export function VendorSelect({
  label,
  error,
  hint,
  placeholder,
  options,
  id,
  className,
  ...props
}: VendorSelectProps) {
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
        <select
          id={fieldId}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={
            error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
          }
          className={cn(
            "h-[52px] w-full appearance-none rounded-2xl border border-input bg-muted px-4 pr-11 text-base text-foreground outline-none transition-all duration-200 sm:text-sm",
            "focus:border-transparent focus:bg-card focus:ring-2 focus:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:border-destructive aria-invalid:focus:ring-destructive",
            !props.value && "text-muted-foreground"
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
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
