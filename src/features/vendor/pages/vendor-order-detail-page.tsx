"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  CreditCard,
  MapPin,
  Phone,
  StickyNote,
  User,
} from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { formatNaira, formatTime, formatDayLabel } from "@/utils/format";
import { useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import {
  VendorButton,
  VendorCard,
  VendorConfirmDialog,
  VendorEmptyState,
  VendorHeader,
  VendorPageContainer,
  OrderStatusPill,
} from "@/features/vendor/components";
import type { OrderStatus } from "@/features/vendor/types";

/** Primary action label for each active status. */
const NEXT_ACTION: Partial<
  Record<OrderStatus, { label: string; next: OrderStatus }>
> = {
  new: { label: "Accept Order", next: "confirmed" },
  confirmed: { label: "Start Preparing", next: "preparing" },
  preparing: { label: "Mark Ready", next: "ready" },
  ready: { label: "Send for Delivery", next: "out_for_delivery" },
  out_for_delivery: { label: "Mark Completed", next: "completed" },
};

const isActive = (s: OrderStatus) => s in NEXT_ACTION;

export function VendorOrderDetailPage({ orderId }: { orderId: string }) {
  const { orders } = useVendorDemo();
  const order = orders.find((o) => o.id === orderId);
  const [confirmCancel, setConfirmCancel] = React.useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <VendorHeader backHref={ROUTES.vendor.orders} backLabel="Orders" />
      <VendorPageContainer width="wide" className="flex-1 py-6 sm:py-10">
        {!order ? (
          <VendorEmptyState
            icon={ClipboardList}
            title="Order not found"
            description="This order doesn't exist in the demo account."
            action={
              <VendorButton
                href={ROUTES.vendor.orders}
                variant="secondary"
                size="md"
                className="w-auto"
              >
                Back to orders
              </VendorButton>
            }
          />
        ) : (
          <div className="animate-fade-in mx-auto flex max-w-3xl flex-col gap-5">
            <Link
              href={ROUTES.vendor.orders}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              All orders
            </Link>

            {/* Heading */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  #{order.id}
                </h1>
                <OrderStatusPill status={order.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDayLabel(order.placedAt)} at {formatTime(order.placedAt)}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-5">
              {/* Items + totals */}
              <VendorCard className="p-5 sm:p-6 md:col-span-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Items
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {order.items.map((item) => (
                    <li key={item.productId} className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-droply-blue-light text-xl">
                        {item.emoji}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatNaira(item.price)} × {item.quantity}
                        </span>
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-col gap-1.5 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatNaira(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery fee</span>
                    <span>{formatNaira(order.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-foreground">
                    <span>Total</span>
                    <span>{formatNaira(order.total)}</span>
                  </div>
                </div>
              </VendorCard>

              {/* Customer + delivery */}
              <div className="flex flex-col gap-5 md:col-span-2">
                <VendorCard className="flex flex-col gap-3 p-5 sm:p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    Customer
                  </h2>
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <User className="size-4 text-muted-foreground" />
                    {order.customer}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-4" />
                    {order.customerPhone}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {order.deliveryTo}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="size-4" />
                    Payment:{" "}
                    <span
                      className={
                        order.paymentStatus === "paid"
                          ? "font-bold text-emerald-600"
                          : "font-bold text-amber-600"
                      }
                    >
                      {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </span>
                  </p>
                  {order.note && (
                    <p className="flex items-start gap-2 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
                      <StickyNote className="mt-0.5 size-3.5 shrink-0" />
                      {order.note}
                    </p>
                  )}
                </VendorCard>

                {/* Actions */}
                {isActive(order.status) && (
                  <VendorCard className="flex flex-col gap-2.5 p-5 sm:p-6">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Actions
                    </h2>
                    {(() => {
                      const action = NEXT_ACTION[order.status];
                      const pickup = order.deliveryTo
                        .toLowerCase()
                        .startsWith("pickup");
                      const effective =
                        order.status === "ready" && pickup
                          ? { label: "Mark Completed", next: "completed" as const }
                          : action;
                      return effective ? (
                        <VendorButton
                          size="md"
                          onClick={() =>
                            vendorDemoActions.setOrderStatus(
                              order.id,
                              effective.next
                            )
                          }
                        >
                          {effective.label}
                        </VendorButton>
                      ) : null;
                    })()}
                    <VendorButton
                      variant="secondary"
                      size="md"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => setConfirmCancel(true)}
                    >
                      Cancel Order
                    </VendorButton>
                  </VendorCard>
                )}
              </div>
            </div>
          </div>
        )}
      </VendorPageContainer>

      <VendorConfirmDialog
        open={confirmCancel}
        onOpenChange={setConfirmCancel}
        title={`Cancel order #${order?.id}?`}
        description="The customer will be notified and the order removed from your active queue."
        confirmLabel="Cancel order"
        destructive
        onConfirm={() =>
          order && vendorDemoActions.setOrderStatus(order.id, "cancelled")
        }
      />
    </div>
  );
}
