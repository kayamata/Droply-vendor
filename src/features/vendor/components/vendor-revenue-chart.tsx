import { cn } from "@/utils/cn";
import { formatNaira } from "@/utils/format";
import type { RevenuePoint } from "@/features/vendor/types";

interface VendorRevenueChartProps {
  points: RevenuePoint[];
  /** Index of the "current" bar — rendered in solid orange. Defaults to last. */
  highlightIndex?: number;
  className?: string;
}

/** Minimal bar chart in the DROPly idiom — rounded bars, orange highlight. */
export function VendorRevenueChart({
  points,
  highlightIndex,
  className,
}: VendorRevenueChartProps) {
  const max = Math.max(...points.map((p) => p.value), 1);
  const highlight = highlightIndex ?? points.length - 1;

  return (
    <div className={cn("flex items-end gap-2 sm:gap-3", className)}>
      {points.map((point, i) => {
        const height = Math.max(4, Math.round((point.value / max) * 100));
        const active = i === highlight;
        return (
          <div
            key={`${point.label}-${i}`}
            className="group flex min-w-0 flex-1 flex-col items-center gap-2"
          >
            <span className="text-[10px] font-bold text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-xs">
              {formatNaira(point.value)}
            </span>
            <div className="flex h-32 w-full items-end sm:h-40">
              <div
                className={cn(
                  "w-full rounded-t-lg transition-all duration-300",
                  active
                    ? "bg-primary shadow-[0_4px_12px_rgba(232,90,29,0.25)]"
                    : "bg-droply-blue group-hover:bg-droply-blue-dark"
                )}
                style={{ height: `${height}%` }}
                title={`${point.label}: ${formatNaira(point.value)}`}
              />
            </div>
            <span
              className={cn(
                "text-[10px] font-semibold sm:text-xs",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {point.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
