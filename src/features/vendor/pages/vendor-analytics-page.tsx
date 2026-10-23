"use client";

import { CheckCircle2, ShoppingBag, TrendingUp, Users, Wallet } from "lucide-react";

import { cn } from "@/utils/cn";
import { formatNaira } from "@/utils/format";
import {
  getDashboardStats,
  getMonthRevenue,
  getTopProducts,
  getWeekRevenue,
  useVendorDemo,
} from "@/features/vendor/api";
import {
  VendorCard,
  VendorPortalShell,
  VendorProductThumb,
  VendorRevenueChart,
  VendorStatCard,
} from "@/features/vendor/components";
import type { OrderStatus } from "@/features/vendor/types";

const STATUS_LABELS: { status: OrderStatus; label: string; bar: string }[] = [
  { status: "new", label: "New", bar: "bg-primary" },
  { status: "confirmed", label: "Confirmed", bar: "bg-droply-blue-dark" },
  { status: "preparing", label: "Preparing", bar: "bg-amber-400" },
  { status: "ready", label: "Ready", bar: "bg-emerald-400" },
  { status: "out_for_delivery", label: "Out for delivery", bar: "bg-droply-blue" },
  { status: "completed", label: "Completed", bar: "bg-muted-foreground/40" },
  { status: "cancelled", label: "Cancelled", bar: "bg-destructive/60" },
];

export function VendorAnalyticsPage() {
  const state = useVendorDemo();
  const stats = getDashboardStats(state);
  const week = getWeekRevenue(state);
  const month = getMonthRevenue();
  const top = getTopProducts(state, 5);
  const topCustomers = [...state.customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);
  const maxSold = top[0]?.sold ?? 1;

  const statusCounts = STATUS_LABELS.map((s) => ({
    ...s,
    count: state.orders.filter((o) => o.status === s.status).length,
  }));
  const maxStatus = Math.max(...statusCounts.map((s) => s.count), 1);
  const completionRate = Math.round(
    (state.orders.filter((o) => o.status === "completed").length /
      state.orders.length) *
      100
  );

  return (
    <VendorPortalShell title="Analytics">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <VendorStatCard
            icon={Wallet}
            label="Total revenue"
            value={formatNaira(state.earnings.totalRevenue)}
            delta="+12.4%"
          />
          <VendorStatCard
            icon={ShoppingBag}
            label="Total orders"
            value={state.vendor.totalOrders.toLocaleString()}
            delta="+8.1%"
          />
          <VendorStatCard
            icon={TrendingUp}
            label="Avg. order value"
            value={formatNaira(stats.avgOrderValue)}
            delta="-2.1%"
            deltaPositive={false}
          />
          <VendorStatCard
            icon={CheckCircle2}
            label="Completion rate"
            value={`${completionRate}%`}
            delta="+1.3%"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <VendorCard className="p-5 sm:p-6">
            <h2 className="text-base font-bold text-foreground">
              Revenue — last 7 days
            </h2>
            <VendorRevenueChart
              points={week}
              highlightIndex={week.length - 1}
              className="mt-5"
            />
          </VendorCard>
          <VendorCard className="p-5 sm:p-6">
            <h2 className="text-base font-bold text-foreground">
              Revenue — this month
            </h2>
            <VendorRevenueChart points={month} className="mt-5" />
          </VendorCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Orders by status */}
          <VendorCard className="p-5 sm:p-6">
            <h2 className="text-base font-bold text-foreground">
              Orders by status
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {statusCounts.map((s) => (
                <li key={s.status} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs font-semibold text-muted-foreground">
                    {s.label}
                  </span>
                  <div className="h-2.5 min-w-0 flex-1 rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", s.bar)}
                      style={{
                        width: `${Math.max(3, (s.count / maxStatus) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-bold text-foreground">
                    {s.count}
                  </span>
                </li>
              ))}
            </ul>
          </VendorCard>

          {/* Top products */}
          <VendorCard className="p-5 sm:p-6">
            <h2 className="text-base font-bold text-foreground">
              Best sellers
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {top.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <VendorProductThumb
                    product={p}
                    size="size-8"
                    emojiClassName="text-lg"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-foreground">
                      {p.name}
                    </span>
                    <span className="mt-1 block h-1.5 rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${(p.sold / maxSold) * 100}%` }}
                      />
                    </span>
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {p.sold}
                  </span>
                </li>
              ))}
            </ul>
          </VendorCard>

          {/* Top customers */}
          <VendorCard className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-muted-foreground" />
              <h2 className="text-base font-bold text-foreground">
                Top customers
              </h2>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {topCustomers.map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                    {c.name.charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-foreground">
                      {c.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {c.orders} orders · loves {c.favoriteProduct}
                    </span>
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {formatNaira(c.totalSpent)}
                  </span>
                </li>
              ))}
            </ul>
          </VendorCard>
        </div>
      </div>
    </VendorPortalShell>
  );
}
