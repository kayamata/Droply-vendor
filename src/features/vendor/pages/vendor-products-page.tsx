"use client";

import * as React from "react";
import { Package, Pencil, Plus, Search, Trash2 } from "lucide-react";

import { cn } from "@/utils/cn";
import { formatNaira } from "@/utils/format";
import { useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import { PRODUCT_CATEGORIES } from "@/features/vendor/api/demo-data";
import {
  VendorButton,
  VendorCard,
  VendorConfirmDialog,
  VendorEmptyState,
  VendorPortalShell,
  VendorProductDialog,
  VendorProductThumb,
  StockStatusPill,
} from "@/features/vendor/components";
import { getStockStatus } from "@/features/vendor/api";
import type { VendorProduct } from "@/features/vendor/types";

export function VendorProductsPage() {
  const { products } = useVendorDemo();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<VendorProduct | null>(null);
  const [deleting, setDeleting] = React.useState<VendorProduct | null>(null);

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    const matchesCategory = category === "all" || p.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <VendorPortalShell
      title="Products"
      actions={
        <VendorButton
          size="md"
          className="w-auto"
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="size-4" />
          Add Product
        </VendorButton>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="h-12 w-full rounded-2xl border border-input bg-muted pl-11 pr-4 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-transparent focus:bg-card focus:ring-2 focus:ring-ring sm:text-sm"
          />
        </div>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {["all", ...PRODUCT_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                category === c
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.2)]"
                  : "border-border bg-card text-foreground hover:bg-muted"
              )}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <VendorCard
            key={p.id}
            className={cn("flex flex-col gap-3 p-4", !p.available && "opacity-70")}
          >
            <div className="flex items-start justify-between gap-3">
              <VendorProductThumb
                product={p}
                size="size-12"
                emojiClassName="text-3xl"
              />
              <StockStatusPill status={getStockStatus(p)} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{p.name}</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                {p.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-foreground">
                {formatNaira(p.price)}
              </span>
              <span className="text-xs text-muted-foreground">
                {p.sold} sold · {p.stock} {p.unit}
              </span>
            </div>
            <div className="flex items-center gap-2 border-t border-border pt-3">
              <button
                type="button"
                onClick={() =>
                  vendorDemoActions.setProductAvailability(p.id, !p.available)
                }
                className={cn(
                  "flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors",
                  p.available
                    ? "bg-muted text-foreground hover:bg-border"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {p.available ? "Mark unavailable" : "Mark available"}
              </button>
              <button
                type="button"
                aria-label={`Edit ${p.name}`}
                onClick={() => {
                  setEditing(p);
                  setDialogOpen(true);
                }}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Pencil className="size-4" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${p.name}`}
                onClick={() => setDeleting(p)}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </VendorCard>
        ))}
      </div>

      {products.length === 0 && (
        <div className="mt-5">
          <VendorEmptyState
            icon={Package}
            title="No products yet"
            description="Add your first product to get started."
            action={
              <VendorButton
                size="md"
                className="w-auto"
                onClick={() => {
                  setEditing(null);
                  setDialogOpen(true);
                }}
              >
                <Plus className="size-4" />
                Add Product
              </VendorButton>
            }
          />
        </div>
      )}
      {products.length > 0 && filtered.length === 0 && (
        <div className="mt-5">
          <VendorEmptyState
            icon={Package}
            title="No products match"
            description="Try a different search or category."
          />
        </div>
      )}

      <VendorProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editing}
      />
      <VendorConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Delete ${deleting?.name}?`}
        description="This removes the product from your menu. Existing orders keep their history."
        confirmLabel="Delete product"
        destructive
        onConfirm={() => {
          if (deleting) {
            vendorDemoActions.deleteProduct(deleting.id);
            vendorDemoActions.showToast("Product deleted");
          }
        }}
      />
    </VendorPortalShell>
  );
}
