"use client";

import * as React from "react";
import { ClipboardList, Search, Zap } from "lucide-react";

import { cn } from "@/utils/cn";
import { useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import {
  VendorButton,
  VendorEmptyState,
  VendorOrderCard,
  VendorPortalShell,
} from "@/features/vendor/components";
import type { OrderStatus } from "@/features/vendor/types";

const FILTERS: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "ready", label: "Ready" },
  { value: "out_for_delivery", label: "Out for delivery" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function VendorOrdersPage() {
  const { orders } = useVendorDemo();
  const [filter, setFilter] = React.useState<OrderStatus | "all">("all");
  const [query, setQuery] = React.useState("");

  const filtered = orders.filter((o) => {
    const matchesStatus = filter === "all" || o.status === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.items.some((i) => i.name.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  return (
    <VendorPortalShell
      title="Orders"
      actions={
        <VendorButton
          variant="secondary"
          size="md"
          className="w-auto"
          onClick={() => vendorDemoActions.simulateNewOrder()}
        >
          <Zap className="size-4" />
          Simulate new order
        </VendorButton>
      }
    >
      {/* Search + status filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders, customers or items…"
            className="h-12 w-full rounded-2xl border border-input bg-muted pl-11 pr-4 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-transparent focus:bg-card focus:ring-2 focus:ring-ring sm:text-sm"
          />
        </div>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                filter === f.value
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.2)]"
                  : "border-border bg-card text-foreground hover:bg-muted"
              )}
            >
              {f.label}
              <span className="ml-1.5 text-[11px] opacity-70">
                {f.value === "all"
                  ? orders.length
                  : orders.filter((o) => o.status === f.value).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Order list */}
      <div className="mt-5 flex flex-col gap-3">
        {filtered.map((order) => (
          <VendorOrderCard key={order.id} order={order} />
        ))}
        {filtered.length === 0 && (
          <VendorEmptyState
            icon={ClipboardList}
            title="No orders match"
            description="Try a different status filter or search term."
          />
        )}
      </div>
    </VendorPortalShell>
  );
}
