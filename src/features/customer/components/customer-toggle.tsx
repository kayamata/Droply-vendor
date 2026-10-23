"use client";

import { cn } from "@/utils/cn";

interface CustomerToggleProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

/** Settings row with an iOS-style switch — notification preferences. */
export function CustomerToggle({
  title,
  description,
  enabled,
  onToggle,
}: CustomerToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div className="min-w-0 flex-1">
        <h4 className="mb-1 text-[15.5px] font-extrabold text-foreground">
          {title}
        </h4>
        <p className="text-[12.5px] font-medium leading-snug text-muted-foreground">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        onClick={onToggle}
        className={cn(
          "flex h-7 w-12.5 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200",
          enabled ? "bg-primary" : "bg-border"
        )}
      >
        <span
          className={cn(
            "size-6 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform duration-200",
            enabled && "translate-x-[22px]"
          )}
        />
      </button>
    </div>
  );
}
