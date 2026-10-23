"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface CustomerFaqItemProps {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

/** Single accordion row on the FAQ screen. */
export function CustomerFaqItem({
  question,
  answer,
  open,
  onToggle,
}: CustomerFaqItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
      className="cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-between gap-3">
        <h4 className="flex-1 text-[15.5px] font-extrabold text-foreground">
          {question}
        </h4>
        {open ? (
          <ChevronUp className="size-4.5 shrink-0 text-primary" />
        ) : (
          <ChevronDown className="size-4.5 shrink-0 text-muted-foreground" />
        )}
      </div>
      {open && (
        <p className="mt-3 border-t border-border pt-3 text-[13.5px] font-medium leading-relaxed text-muted-foreground">
          {answer}
        </p>
      )}
    </div>
  );
}
