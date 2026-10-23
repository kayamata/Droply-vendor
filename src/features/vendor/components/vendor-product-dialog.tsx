"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { PRODUCT_CATEGORIES } from "@/features/vendor/api/demo-data";
import { vendorDemoActions } from "@/features/vendor/api";
import { VendorButton } from "@/features/vendor/components/vendor-button";
import { VendorImageField } from "@/features/vendor/components/vendor-image-field";
import { VendorInput } from "@/features/vendor/components/vendor-input";
import { VendorSelect } from "@/features/vendor/components/vendor-select";
import { VendorSwitch } from "@/features/vendor/components/vendor-switch";
import { VendorTextarea } from "@/features/vendor/components/vendor-textarea";
import { cn } from "@/utils/cn";
import type { ProductCategory, VendorProduct } from "@/features/vendor/types";

const CATEGORY_OPTIONS = PRODUCT_CATEGORIES.map((c) => ({
  value: c,
  label: c,
}));

const EMOJI_CHOICES = ["🍛", "🍚", "🥣", "🥘", "🍲", "🍗", "🥩", "🌯", "🍔", "🍜", "🍳", "🥟", "🧆", "🍌", "🥤", "🍹", "💧", "🫘"];

interface ProductFieldErrors {
  name?: string;
  price?: string;
  category?: string;
}

function ProductDialogForm({
  product,
  onClose,
}: {
  product: VendorProduct | null;
  onClose: () => void;
}) {
  const [name, setName] = React.useState(product?.name ?? "");
  const [description, setDescription] = React.useState(product?.description ?? "");
  const [price, setPrice] = React.useState(product ? String(product.price) : "");
  const [stock, setStock] = React.useState(product ? String(product.stock) : "");
  const [unit, setUnit] = React.useState(product?.unit ?? "portions");
  const [category, setCategory] = React.useState<ProductCategory | "">(
    product?.category ?? ""
  );
  const [emoji, setEmoji] = React.useState(product?.emoji ?? "🍛");
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(
    product?.imageUrl
  );
  const [available, setAvailable] = React.useState(product?.available ?? true);
  const [errors, setErrors] = React.useState<ProductFieldErrors>({});
  const [saving, setSaving] = React.useState(false);

  function onSave() {
    const priceNum = Number(price);
    const next: ProductFieldErrors = {};
    if (!name.trim()) next.name = "Enter a product name.";
    if (!category) next.category = "Choose a category.";
    if (!Number.isFinite(priceNum) || priceNum <= 0)
      next.price = "Enter a valid price.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    // Mirrors network latency so the vendor sees a saving state — swap for a
    // real mutation when the products API exists.
    setTimeout(() => {
      vendorDemoActions.saveProduct({
        id: product?.id ?? `p-${Date.now()}`,
        name: name.trim(),
        emoji,
        imageUrl,
        description: description.trim(),
        price: priceNum,
        category: category as ProductCategory,
        stock: Math.max(0, Math.round(Number(stock || "0"))),
        unit: unit.trim() || "units",
        sold: product?.sold ?? 0,
        available,
      });
      vendorDemoActions.showToast(
        product ? "Product updated" : "Product added"
      );
      onClose();
    }, 500);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <VendorImageField
          label="Product image"
          hint="Shown on your menu. JPG or PNG."
          value={imageUrl}
          onChange={setImageUrl}
        />

        <VendorInput
          label="Product name"
          placeholder="e.g. Jollof Rice"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={errors.name}
        />
        <VendorTextarea
          label="Description"
          placeholder="Short description customers will see."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <VendorInput
            label="Price (₦)"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="2500"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setErrors((prev) => ({ ...prev, price: undefined }));
            }}
            error={errors.price}
          />
          <VendorSelect
            label="Category"
            placeholder="Choose category"
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as ProductCategory);
              setErrors((prev) => ({ ...prev, category: undefined }));
            }}
            error={errors.category}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <VendorInput
            label="Stock quantity"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="20"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <VendorInput
            label="Unit"
            placeholder="portions / bottles / pieces"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-foreground">
            Icon <span className="font-normal text-muted-foreground">(shown when no image)</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {EMOJI_CHOICES.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl text-lg transition-colors",
                  emoji === e
                    ? "bg-secondary ring-2 ring-ring"
                    : "bg-muted hover:bg-secondary"
                )}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/50 px-4 py-3">
          <div>
            <p className="text-sm font-bold text-foreground">Available</p>
            <p className="text-xs text-muted-foreground">
              Customers can order this right away.
            </p>
          </div>
          <VendorSwitch
            checked={available}
            onChange={setAvailable}
            label="Toggle product availability"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <VendorButton
          variant="secondary"
          size="md"
          onClick={onClose}
          disabled={saving}
        >
          Cancel
        </VendorButton>
        <VendorButton size="md" loading={saving} onClick={onSave}>
          {saving ? "Saving…" : product ? "Save changes" : "Add product"}
        </VendorButton>
      </div>
    </>
  );
}

interface VendorProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pass a product to edit it; omit for "Add product". */
  product?: VendorProduct | null;
}

/** Add/edit product dialog — persists into the demo store on save. */
export function VendorProductDialog({
  open,
  onOpenChange,
  product,
}: VendorProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {product ? "Edit product" : "Add product"}
          </DialogTitle>
        </DialogHeader>
        {open && (
          // key remounts the form when switching between products
          <ProductDialogForm
            key={product?.id ?? "new"}
            product={product ?? null}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
