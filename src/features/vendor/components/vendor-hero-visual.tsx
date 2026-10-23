import { BadgeCheck, Bike, ShoppingBag, Star } from "lucide-react";

import { cn } from "@/utils/cn";

/**
 * A quiet illustration of what vendors get — a mock incoming order card on
 * the consumer app's light-blue tile backdrop, with floating stat chips.
 * Emoji + lucide, same imagery language as the storefront.
 */
export function VendorHeroVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl bg-droply-blue-light p-5 sm:p-7",
        className
      )}
      aria-hidden="true"
    >
      {/* Emoji tile strip — same treatment as consumer category tiles */}
      <div className="flex items-center gap-3 text-3xl sm:text-4xl">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:size-16">
          🍛
        </span>
        <span className="flex size-14 items-center justify-center rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:size-16">
          🌯
        </span>
        <span className="flex size-14 items-center justify-center rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:size-16">
          🥤
        </span>
        <span className="flex size-14 items-center justify-center rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:size-16">
          🛒
        </span>
      </div>

      {/* Mock incoming order card */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <ShoppingBag className="size-4" />
            New order
          </div>
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-secondary-foreground">
            <BadgeCheck className="size-3.5" />
            Paid
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-droply-blue-light text-2xl">
            🍛
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">
              Jollof Rice + Chicken ×2
            </p>
            <p className="text-xs text-muted-foreground">
              Katampe Extension · 12 min ago
            </p>
          </div>
          <p className="shrink-0 text-sm font-bold text-foreground">₦10,800</p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="flex h-10 flex-1 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            Accept order
          </span>
          <span className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-semibold text-muted-foreground">
            <Bike className="size-4" />
            ~25 min
          </span>
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute -right-2 -top-3 flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:-right-4">
        <Star className="size-3.5 fill-primary text-primary" />
        4.9 rating
      </div>
      <div className="absolute -bottom-3 left-5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        🏪 <span className="text-primary">128 orders</span> this week
      </div>
    </div>
  );
}
