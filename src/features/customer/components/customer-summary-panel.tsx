import * as React from "react";

import { cn } from "@/utils/cn";
import { formatNaira } from "@/utils/format";

interface CustomerSummaryPanelProps {
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  total: number;
  /** The bottom CTA — "Proceed to Checkout", "Make Payment", etc. */
  action: React.ReactNode;
  className?: string;
}

/**
 * Fixed bottom sheet with the order totals breakdown and a CTA slot —
 * shared by the cart and payment screens.
 */
export function CustomerSummaryPanel({
  subtotal,
  deliveryFee,
  discount = 0,
  total,
  action,
  className,
}: CustomerSummaryPanelProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-border bg-card px-5 pb-7 pt-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]",
        className
      )}
      style={{ paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-5 flex flex-col gap-3">
          <div className="flex justify-between text-sm font-semibold text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-extrabold text-foreground">
              {formatNaira(subtotal)}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm font-semibold text-primary">
              <span>Promo Discount</span>
              <span className="font-extrabold">-{formatNaira(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-semibold text-muted-foreground">
            <span>Delivery</span>
            <span className="font-extrabold text-foreground">
              {formatNaira(deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base font-extrabold text-foreground">
            <span>Total</span>
            <span className="text-xl font-black text-primary">
              {formatNaira(total)}
            </span>
          </div>
        </div>
        {action}
      </div>
    </div>
  );
}
