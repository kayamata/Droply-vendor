"use client";

import * as React from "react";
import { CalendarDays, Megaphone, Pencil, Plus, Trash2 } from "lucide-react";

import { useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import {
  VendorButton,
  VendorCard,
  VendorConfirmDialog,
  VendorEmptyState,
  VendorPortalShell,
  VendorPromotionDialog,
  PromoStatusPill,
} from "@/features/vendor/components";
import type { VendorPromotion } from "@/features/vendor/types";

export function VendorPromotionsPage() {
  const { promotions } = useVendorDemo();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<VendorPromotion | null>(null);
  const [deleting, setDeleting] = React.useState<VendorPromotion | null>(null);

  return (
    <VendorPortalShell
      title="Promotions"
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
          Create Promotion
        </VendorButton>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {promotions.map((promo) => (
          <VendorCard key={promo.id} className="flex flex-col gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-foreground">
                    {promo.name}
                  </p>
                  <PromoStatusPill status={promo.status} />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {promo.description}
                </p>
              </div>
              <span className="shrink-0 rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-bold text-secondary-foreground">
                {promo.discountLabel}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {promo.startLabel} – {promo.endLabel}
              </span>
              <span className="font-semibold text-foreground">
                {promo.usageCount} uses
              </span>
            </div>

            <div className="flex items-center gap-2">
              {promo.status === "active" && (
                <button
                  type="button"
                  onClick={() =>
                    vendorDemoActions.setPromotionStatus(promo.id, "paused")
                  }
                  className="flex-1 rounded-lg bg-muted px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-border"
                >
                  Pause
                </button>
              )}
              {(promo.status === "paused" || promo.status === "scheduled") && (
                <button
                  type="button"
                  onClick={() =>
                    vendorDemoActions.setPromotionStatus(promo.id, "active")
                  }
                  className="flex-1 rounded-lg bg-secondary px-3 py-2 text-xs font-bold text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  Activate
                </button>
              )}
              {promo.status === "ended" && (
                <span className="flex-1 rounded-lg bg-muted px-3 py-2 text-center text-xs font-bold text-muted-foreground">
                  Ended
                </span>
              )}
              <button
                type="button"
                aria-label={`Edit ${promo.name}`}
                onClick={() => {
                  setEditing(promo);
                  setDialogOpen(true);
                }}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Pencil className="size-4" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${promo.name}`}
                onClick={() => setDeleting(promo)}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </VendorCard>
        ))}
      </div>

      {promotions.length === 0 && (
        <VendorEmptyState
          icon={Megaphone}
          title="No promotions yet"
          description="Create a discount to bring more students to your store."
        />
      )}

      <VendorPromotionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        promotion={editing}
      />
      <VendorConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Delete "${deleting?.name}"?`}
        description="Customers will stop seeing this promotion immediately."
        confirmLabel="Delete promotion"
        destructive
        onConfirm={() =>
          deleting && vendorDemoActions.deletePromotion(deleting.id)
        }
      />
    </VendorPortalShell>
  );
}
