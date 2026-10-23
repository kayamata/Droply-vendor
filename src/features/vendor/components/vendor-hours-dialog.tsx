"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { cn } from "@/utils/cn";
import { VendorButton } from "@/features/vendor/components/vendor-button";
import { VendorSwitch } from "@/features/vendor/components/vendor-switch";

export interface DayHours {
  day: string;
  closed: boolean;
  open: string;
  close: string;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** Hourly options, 5 AM – 11 PM, in 12-hour display format. */
const TIME_OPTIONS = (() => {
  const options: string[] = [];
  for (let h = 5; h <= 23; h++) {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    options.push(`${hour12}:00 ${h < 12 ? "AM" : "PM"}`);
  }
  return options;
})();

export function defaultWeekHours(): DayHours[] {
  return DAYS.map((day) => ({
    day,
    closed: day === "Sun",
    open: "8:00 AM",
    close: "9:00 PM",
  }));
}

/** "Mon–Sat · 8:00 AM – 9:00 PM · Sun · Closed" — compact display string. */
export function formatWeekHours(days: DayHours[]): string {
  const groups: { start: number; end: number; text: string }[] = [];
  days.forEach((d, i) => {
    const text = d.closed ? "Closed" : `${d.open} – ${d.close}`;
    const last = groups[groups.length - 1];
    if (last && last.text === text && last.end === i - 1) {
      last.end = i;
    } else {
      groups.push({ start: i, end: i, text });
    }
  });
  return groups
    .map((g) => {
      const range =
        g.start === g.end ? days[g.start].day : `${days[g.start].day}–${days[g.end].day}`;
      return `${range} · ${g.text}`;
    })
    .join(" · ");
}

interface VendorHoursDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Previously saved schedule — reopened with these values. */
  initial?: DayHours[];
  onSave: (days: DayHours[], label: string) => void;
}

/** Weekly opening-hours picker — per-day open/close times + "Closed" toggle. */
export function VendorHoursDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: VendorHoursDialogProps) {
  const [days, setDays] = React.useState<DayHours[]>(
    () => initial ?? defaultWeekHours()
  );

  const update = (day: string, patch: Partial<DayHours>) =>
    setDays((prev) =>
      prev.map((d) => (d.day === day ? { ...d, ...patch } : d))
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Operating hours
          </DialogTitle>
        </DialogHeader>
        <p className="-mt-2 text-xs text-muted-foreground">
          Set when customers can order from you each day.
        </p>

        <ul className="flex flex-col gap-2">
          {days.map((d) => (
            <li
              key={d.day}
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-border bg-muted/50 px-3.5 py-3",
                d.closed && "opacity-70"
              )}
            >
              <span className="w-10 shrink-0 text-sm font-bold text-foreground">
                {d.day}
              </span>
              {d.closed ? (
                <span className="min-w-0 flex-1 text-sm font-semibold text-muted-foreground">
                  Closed
                </span>
              ) : (
                <span className="flex min-w-0 flex-1 items-center gap-1.5">
                  <select
                    aria-label={`${d.day} opening time`}
                    value={d.open}
                    onChange={(e) => update(d.day, { open: e.target.value })}
                    className="h-10 min-w-0 flex-1 rounded-xl border border-input bg-card px-2 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    to
                  </span>
                  <select
                    aria-label={`${d.day} closing time`}
                    value={d.close}
                    onChange={(e) => update(d.day, { close: e.target.value })}
                    className="h-10 min-w-0 flex-1 rounded-xl border border-input bg-card px-2 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </span>
              )}
              <VendorSwitch
                checked={d.closed}
                onChange={(closed) => update(d.day, { closed })}
                label={`Mark ${d.day} as closed`}
              />
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <VendorButton
            variant="secondary"
            size="md"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </VendorButton>
          <VendorButton
            size="md"
            onClick={() => {
              onSave(days, formatWeekHours(days));
              onOpenChange(false);
            }}
          >
            Save hours
          </VendorButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
