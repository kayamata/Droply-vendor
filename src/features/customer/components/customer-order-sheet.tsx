"use client";

import * as React from "react";
import Link from "next/link";

import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import type { CustomerOrder } from "@/features/customer/types";

interface CustomerOrderSheetProps {
  order: CustomerOrder;
}

/**
 * Bottom drawer on the track-order screen — drag handle toggles the
 * expandable line-item summary.
 */
export function CustomerOrderSheet({ order }: CustomerOrderSheetProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-border bg-card px-5 pt-4 shadow-[0_-8px_24px_rgba(0,0,0,0.15)]"
      style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Drag handle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle order summary"
          className="mx-auto mb-4 block h-1 w-11 rounded-full bg-primary"
        />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-foreground">
              Order Summary
            </h3>
            <p className="mt-0.5 text-xs font-semibold text-muted-foreground">
              ID: {order.id}
            </p>
          </div>
          <Link
            href={ROUTES.customer.orders}
            className="text-sm font-extrabold text-primary"
          >
            View All Orders
          </Link>
        </div>

        {open && (
          <div className="mt-4 flex max-h-40 flex-col gap-2.5 overflow-y-auto">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between text-[13.5px] text-foreground"
              >
                <span>
                  {item.product.name} x{item.quantity}
                </span>
                <span className="font-extrabold">
                  {formatNaira(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="flex justify-between border-t border-border pt-2.5 text-[15px] font-extrabold text-foreground">
              <span>Total Paid</span>
              <span className="text-primary">{formatNaira(order.total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
