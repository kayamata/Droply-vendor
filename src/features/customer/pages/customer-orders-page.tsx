"use client";

import * as React from "react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import {
  getActiveOrders,
  getPastOrders,
  useCustomerDemo,
} from "@/features/customer/api";
import {
  CustomerBackHeader,
  CustomerEmptyState,
  CustomerOrderCard,
  CustomerShell,
} from "@/features/customer/components";

const TABS = ["active", "past"] as const;

/**
 * Order history — Active / Past segmented tabs over the orders list.
 * Active cards offer tracking; delivered ones offer reorder.
 */
export function CustomerOrdersPage() {
  const state = useCustomerDemo();
  const [activeTab, setActiveTab] = React.useState<(typeof TABS)[number]>(
    "past"
  );

  const activeOrders = getActiveOrders(state);
  const pastOrders = getPastOrders(state);
  const displayed = activeTab === "active" ? activeOrders : pastOrders;

  return (
    <CustomerShell className="flex flex-col gap-5">
      <CustomerBackHeader
        title="Orders History"
        backHref={ROUTES.customer.profile}
      />

      {/* Tabs */}
      <div className="flex gap-3">
        {TABS.map((tab) => {
          const selected = activeTab === tab;
          const count =
            tab === "active" ? activeOrders.length : pastOrders.length;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-2xl border px-3.5 py-3.5 text-sm font-extrabold capitalize shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground"
              )}
            >
              {tab === "past" ? "Past Orders" : "Active"} ({count})
            </button>
          );
        })}
      </div>

      {displayed.length === 0 ? (
        <CustomerEmptyState
          emoji="📦"
          title={`No ${activeTab} orders`}
          description={
            activeTab === "active"
              ? "Orders you're tracking will show up here."
              : "Delivered orders will show up here."
          }
          actionLabel="Browse Stores"
          actionHref={ROUTES.customer.stores}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {displayed.map((order) => (
            <CustomerOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </CustomerShell>
  );
}
