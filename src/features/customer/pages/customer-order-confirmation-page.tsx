"use client";

import { Clock, MapPin } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import {
  customerActions,
  useCustomerDemo,
} from "@/features/customer/api";
import type { CustomerOrderStatus } from "@/features/customer/types";
import {
  CustomerBackHeader,
  CustomerButton,
  CustomerEmptyState,
  CustomerOrderMap,
  CustomerOrderSheet,
  CustomerShell,
} from "@/features/customer/components";

const STATUS_LABELS: Record<CustomerOrderStatus, string> = {
  received: "Order Received",
  preparing: "Preparing Meal",
  courier_at_store: "Rider at Store",
  delivering: "Out for Delivery",
  arrived: "Delivered",
};

/**
 * Track Order — the stylised delivery map, ETA + destination cards, demo
 * status control, and the expandable order-summary drawer.
 */
export function CustomerOrderConfirmationPage() {
  const state = useCustomerDemo();
  const order = state.activeOrder;

  if (!order) {
    return (
      <CustomerShell bottomNav={false}>
        <CustomerBackHeader title="Track Order" backHref={ROUTES.customer.root} />
        <CustomerEmptyState
          emoji="📦"
          title="No active order"
          description="Place an order from a campus store and track it here."
          actionLabel="Browse Stores"
          actionHref={ROUTES.customer.stores}
        />
      </CustomerShell>
    );
  }

  return (
    <CustomerShell
      bottomNav={false}
      className="flex flex-col gap-4 px-0 pb-40 sm:px-0"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <CustomerBackHeader title="Track Order" backHref={ROUTES.customer.root} />
      </div>

      <CustomerOrderMap order={order} />

      {/* Delivery info cards */}
      <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-5 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <Clock className="size-5" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Estimated Delivery Time
            </p>
            <h4 className="mt-0.5 text-base font-extrabold text-foreground">
              {order.eta}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-5 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <MapPin className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Delivery Destination
            </p>
            <h4 className="mt-0.5 truncate text-[15px] font-bold text-foreground">
              {order.deliveryAddress}
            </h4>
          </div>
        </div>

        {/* Demo status control */}
        <div className="rounded-2xl border-[1.5px] border-dashed border-primary bg-secondary p-4">
          <p className="mb-1 text-xs font-extrabold text-primary">
            🔴 DEMO STATUS CONTROL
          </p>
          <p className="mb-3 text-[13.5px] font-semibold text-foreground">
            Status: <strong>{STATUS_LABELS[order.status]}</strong>
          </p>
          <CustomerButton
            size="md"
            onClick={() => customerActions.advanceOrderStatus()}
            disabled={order.status === "arrived"}
            className="w-auto px-4 shadow-none"
          >
            {order.status === "arrived"
              ? "Delivered Successfully ✓"
              : "Advance Order Status →"}
          </CustomerButton>
        </div>
      </div>

      <CustomerOrderSheet order={order} />
    </CustomerShell>
  );
}
