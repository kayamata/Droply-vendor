"use client";

import { AlertTriangle, Minus, Package, Plus, RotateCcw } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import {
  getStockStatus,
  useVendorDemo,
  vendorDemoActions,
} from "@/features/vendor/api";
import {
  VendorButton,
  VendorCard,
  VendorEmptyState,
  VendorPortalShell,
  VendorProductThumb,
  StockStatusPill,
} from "@/features/vendor/components";

export function VendorInventoryPage() {
  const { products } = useVendorDemo();
  const lowCount = products.filter(
    (p) => getStockStatus(p) !== "in_stock"
  ).length;

  return (
    <VendorPortalShell title="Inventory">
      <div className="flex flex-col gap-5">
        {lowCount > 0 && (
          <VendorCard className="flex items-center gap-3 border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="size-5 shrink-0 text-amber-600" />
            <p className="text-sm font-semibold text-amber-800">
              {lowCount} product{lowCount > 1 ? "s" : ""} need
              {lowCount > 1 ? "" : "s"} restocking — customers can&apos;t order
              what&apos;s out of stock.
            </p>
          </VendorCard>
        )}

        <VendorCard className="overflow-hidden">
          {/* Header row (desktop) */}
          <div className="hidden grid-cols-[1fr_140px_140px_180px] gap-4 border-b border-border bg-muted/50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground md:grid">
            <span>Product</span>
            <span>Stock</span>
            <span>Status</span>
            <span className="text-right">Adjust</span>
          </div>
          <ul className="divide-y divide-border">
            {products.map((p) => {
              const status = getStockStatus(p);
              return (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-5 md:grid md:grid-cols-[1fr_140px_140px_180px] md:gap-4"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3 md:col-auto">
                    <VendorProductThumb
                      product={p}
                      size="size-10"
                      emojiClassName="text-xl"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">
                        {p.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {p.stock}{" "}
                    <span className="font-normal text-muted-foreground">
                      {p.unit}
                    </span>
                  </p>
                  <StockStatusPill status={status} className="w-fit" />
                  <div className="flex items-center gap-1.5 md:justify-end">
                    <button
                      type="button"
                      aria-label={`Reduce ${p.name} stock`}
                      onClick={() => vendorDemoActions.restockProduct(p.id, -1)}
                      disabled={p.stock === 0}
                      className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Increase ${p.name} stock`}
                      onClick={() => vendorDemoActions.restockProduct(p.id, 1)}
                      className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
                    >
                      <Plus className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => vendorDemoActions.restockProduct(p.id, 25)}
                      className={cn(
                        "ml-1 flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors",
                        status === "in_stock"
                          ? "bg-muted text-foreground hover:bg-border"
                          : "bg-primary text-primary-foreground hover:bg-droply-orange-hover"
                      )}
                    >
                      <RotateCcw className="size-3.5" />
                      Restock +25
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </VendorCard>

        {products.length === 0 && (
          <VendorEmptyState
            icon={Package}
            title="No products to stock"
            description="Add products first — they'll appear here for stock tracking."
            action={
              <VendorButton
                href={ROUTES.vendor.products}
                size="md"
                className="w-auto"
              >
                <Plus className="size-4" />
                Add Product
              </VendorButton>
            }
          />
        )}
      </div>
    </VendorPortalShell>
  );
}
