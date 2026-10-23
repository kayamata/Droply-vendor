"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, UtensilsCrossed } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import { useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import { PRODUCT_CATEGORIES } from "@/features/vendor/api/demo-data";
import {
  VendorButton,
  VendorCard,
  VendorEmptyState,
  VendorPortalShell,
  VendorProductDialog,
  VendorProductThumb,
  VendorSwitch,
} from "@/features/vendor/components";

export function VendorMenuPage() {
  const { products } = useVendorDemo();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <VendorPortalShell
      title="Menu"
      actions={
        <div className="flex items-center gap-4">
          <VendorButton
            size="md"
            className="w-auto"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Product
          </VendorButton>
          <Link
            href={ROUTES.vendor.products}
            className="hidden text-sm font-semibold text-primary transition-colors hover:text-droply-orange-hover sm:block"
          >
            Manage products →
          </Link>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {PRODUCT_CATEGORIES.map((category) => {
          const items = products.filter((p) => p.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                {category}
                <span className="ml-2 font-medium normal-case">
                  ({items.length})
                </span>
              </h2>
              <VendorCard className="divide-y divide-border overflow-hidden">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className={cn(
                      "flex items-center gap-3 p-4 transition-colors",
                      !p.available && "opacity-60"
                    )}
                  >
                    <VendorProductThumb product={p} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-foreground">
                        {p.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {formatNaira(p.price)} · {p.sold} sold · {p.stock}{" "}
                        {p.unit} left
                      </p>
                    </div>
                    <span
                      className={cn(
                        "hidden text-xs font-bold sm:block",
                        p.available ? "text-emerald-600" : "text-muted-foreground"
                      )}
                    >
                      {p.available ? "Available" : "Unavailable"}
                    </span>
                    <VendorSwitch
                      checked={p.available}
                      onChange={(v) =>
                        vendorDemoActions.setProductAvailability(p.id, v)
                      }
                      label={`Toggle ${p.name} availability`}
                    />
                  </div>
                ))}
              </VendorCard>
            </section>
          );
        })}
        {products.length === 0 && (
          <VendorEmptyState
            icon={UtensilsCrossed}
            title="No products yet"
            description="Add your first product to get started."
            action={
              <VendorButton
                size="md"
                className="w-auto"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="size-4" />
                Add Product
              </VendorButton>
            }
          />
        )}
      </div>

      <VendorProductDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </VendorPortalShell>
  );
}
