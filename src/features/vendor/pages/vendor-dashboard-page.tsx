"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  CreditCard,
  Package,
  Plus,
  Star,
  Users,
  Wallet,
} from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import {
  getDashboardStats,
  getTopProducts,
  getWeekRevenue,
  useVendorDemo,
} from "@/features/vendor/api";
import {
  VendorButton,
  VendorCard,
  VendorOrderCard,
  VendorPortalShell,
  VendorProductDialog,
  VendorProductThumb,
  VendorRevenueChart,
  VendorStatCard,
} from "@/features/vendor/components";

export function VendorDashboardPage() {
  const state = useVendorDemo();
  const [productDialogOpen, setProductDialogOpen] = React.useState(false);
  const stats = getDashboardStats(state);
  const weekRevenue = getWeekRevenue(state);
  const topProducts = getTopProducts(state, 4);
  const liveOrders = state.orders
    .filter((o) =>
      ["new", "confirmed", "preparing", "ready", "out_for_delivery"].includes(
        o.status
      )
    )
    .slice(0, 5);
  const recentReviews = state.reviews.slice(0, 3);

  return (
    <VendorPortalShell
      title={`${state.vendor.businessName}`}
      actions={
        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-muted-foreground sm:block">
            {state.vendor.campus} · ★ {state.vendor.rating}
          </p>
          <VendorButton
            size="md"
            className="w-auto"
            onClick={() => setProductDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Product
          </VendorButton>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Store closed notice */}
        {state.vendor.status === "closed" && (
          <VendorCard className="border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            Your store is currently closed — customers can see your menu but
            can&apos;t place orders. Reopen from the status pill in the header.
          </VendorCard>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <VendorStatCard
            icon={ClipboardList}
            label="Today's Orders"
            value={String(stats.todayOrders)}
            delta="+18.4%"
          />
          <VendorStatCard
            icon={Wallet}
            label="Today's Revenue"
            value={formatNaira(stats.todayRevenue)}
            delta="+9.7%"
          />
          <VendorStatCard
            icon={Clock}
            label="Pending Orders"
            value={String(stats.pendingOrders)}
          />
          <VendorStatCard
            icon={Package}
            label="Completed Today"
            value={String(stats.completedOrders)}
          />
          <VendorStatCard
            icon={Users}
            label="Total Customers"
            value="862"
            delta="+6.2%"
          />
          <VendorStatCard
            icon={CreditCard}
            label="Avg. Order Value"
            value={formatNaira(stats.avgOrderValue)}
            delta="-2.1%"
            deltaPositive={false}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Revenue chart */}
          <VendorCard className="p-5 sm:p-6 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Revenue this week
                </h2>
                <p className="text-xs text-muted-foreground">
                  Last 7 days · today updates live
                </p>
              </div>
              <p className="text-lg font-bold text-primary">
                {formatNaira(weekRevenue.reduce((s, p) => s + p.value, 0))}
              </p>
            </div>
            <VendorRevenueChart
              points={weekRevenue}
              highlightIndex={weekRevenue.length - 1}
              className="mt-5"
            />
          </VendorCard>

          {/* Top products */}
          <VendorCard className="p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">
                Top products
              </h2>
              <Link
                href={ROUTES.vendor.menu}
                className="text-xs font-semibold text-primary transition-colors hover:text-droply-orange-hover"
              >
                View menu
              </Link>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {topProducts.map((p, i) => (
                <li key={p.id} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <VendorProductThumb
                    product={p}
                    size="size-9"
                    emojiClassName="text-xl"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {p.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {p.sold} sold
                    </span>
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {formatNaira(p.price)}
                  </span>
                </li>
              ))}
            </ul>
          </VendorCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Live order queue */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">
                Live order queue
              </h2>
              <Link
                href={ROUTES.vendor.orders}
                className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-droply-orange-hover"
              >
                View all orders
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            {liveOrders.map((order) => (
              <VendorOrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Recent reviews */}
          <VendorCard className="h-fit p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">
                Recent reviews
              </h2>
              <span className="flex items-center gap-1 text-xs font-bold text-foreground">
                <Star className="size-3.5 fill-primary text-primary" />
                {state.vendor.rating}
              </span>
            </div>
            <ul className="mt-4 flex flex-col gap-4">
              {recentReviews.map((r) => (
                <li key={r.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="flex text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < r.rating
                              ? "size-3.5 fill-primary text-primary"
                              : "size-3.5 text-border"
                          }
                        />
                      ))}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      {r.customer}
                    </span>
                    <span className="ml-auto text-[11px] text-muted-foreground">
                      {r.dateLabel}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {r.text}
                  </p>
                </li>
              ))}
            </ul>
          </VendorCard>
        </div>
      </div>
      <VendorProductDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
      />
    </VendorPortalShell>
  );
}
