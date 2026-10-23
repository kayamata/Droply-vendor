"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { vendorDemoActions } from "@/features/vendor/api";
import { VendorButton } from "@/features/vendor/components/vendor-button";
import { VendorInput } from "@/features/vendor/components/vendor-input";
import { VendorSelect } from "@/features/vendor/components/vendor-select";
import { VendorTextarea } from "@/features/vendor/components/vendor-textarea";
import type { VendorPromotion } from "@/features/vendor/types";

const DISCOUNT_OPTIONS = [
  { value: "10% OFF", label: "10% OFF" },
  { value: "15% OFF", label: "15% OFF" },
  { value: "20% OFF", label: "20% OFF" },
  { value: "25% OFF", label: "25% OFF" },
  { value: "FREE ITEM", label: "Free item" },
  { value: "FREE DELIVERY", label: "Free delivery" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active now" },
  { value: "scheduled", label: "Scheduled" },
];

function PromotionDialogForm({
  promotion,
  onClose,
}: {
  promotion: VendorPromotion | null;
  onClose: () => void;
}) {
  const [name, setName] = React.useState(promotion?.name ?? "");
  const [description, setDescription] = React.useState(
    promotion?.description ?? ""
  );
  const [discountLabel, setDiscountLabel] = React.useState(
    promotion?.discountLabel ?? "10% OFF"
  );
  const [status, setStatus] = React.useState<VendorPromotion["status"]>(
    promotion?.status === "ended" ? "scheduled" : (promotion?.status ?? "active")
  );
  const [startLabel, setStartLabel] = React.useState(
    promotion?.startLabel ?? "Today"
  );
  const [endLabel, setEndLabel] = React.useState(promotion?.endLabel ?? "");
  const [error, setError] = React.useState("");

  function onSave() {
    if (!name.trim() || !endLabel.trim()) {
      setError("Promotion name and end date are required.");
      return;
    }
    vendorDemoActions.savePromotion({
      id: promotion?.id ?? `promo-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      discountLabel,
      status,
      startLabel: startLabel.trim() || "Today",
      endLabel: endLabel.trim(),
      usageCount: promotion?.usageCount ?? 0,
    });
    onClose();
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <VendorInput
          label="Promotion name"
          placeholder="e.g. Student Lunch Deal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <VendorTextarea
          label="Description"
          placeholder="What does this promo do?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <VendorSelect
            label="Discount"
            options={DISCOUNT_OPTIONS}
            value={discountLabel}
            onChange={(e) => setDiscountLabel(e.target.value)}
          />
          <VendorSelect
            label="Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as VendorPromotion["status"])
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <VendorInput
            label="Start date"
            placeholder="e.g. Sep 27"
            value={startLabel}
            onChange={(e) => setStartLabel(e.target.value)}
          />
          <VendorInput
            label="End date"
            placeholder="e.g. Oct 15"
            value={endLabel}
            onChange={(e) => setEndLabel(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>

      <div className="flex gap-2">
        <VendorButton variant="secondary" size="md" onClick={onClose}>
          Cancel
        </VendorButton>
        <VendorButton size="md" onClick={onSave}>
          {promotion ? "Save changes" : "Create promotion"}
        </VendorButton>
      </div>
    </>
  );
}

interface VendorPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion?: VendorPromotion | null;
}

export function VendorPromotionDialog({
  open,
  onOpenChange,
  promotion,
}: VendorPromotionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {promotion ? "Edit promotion" : "Create promotion"}
          </DialogTitle>
        </DialogHeader>
        {open && (
          <PromotionDialogForm
            key={promotion?.id ?? "new"}
            promotion={promotion ?? null}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
