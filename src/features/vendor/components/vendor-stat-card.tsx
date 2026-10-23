import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/utils/cn";
import { VendorCard } from "@/features/vendor/components/vendor-card";

interface VendorStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  /** e.g. "+18.4% from yesterday" — shown as a small trend chip. */
  delta?: string;
  deltaPositive?: boolean;
  className?: string;
}

export function VendorStatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaPositive = true,
  className,
}: VendorStatCardProps) {
  return (
    <VendorCard className={cn("flex flex-col gap-3 p-4 sm:p-5", className)}>
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <Icon className="size-5" />
        </span>
        {delta && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
              deltaPositive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {deltaPositive ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {delta}
          </span>
        )}
      </div>
      <div>
        <p className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {value}
        </p>
        <p className="mt-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
          {label}
        </p>
      </div>
    </VendorCard>
  );
}
