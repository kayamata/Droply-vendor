"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { formatNaira } from "@/utils/format";
import { customerActions } from "@/features/customer/api";
import type { CartItem } from "@/features/customer/types";

interface CustomerCartItemProps {
  item: CartItem;
  /** Edit mode shows the trash button next to the stepper. */
  editing?: boolean;
}

/** One line in the shopping cart — emoji thumb, name, price, qty stepper. */
export function CustomerCartItem({ item, editing = false }: CustomerCartItemProps) {
  const { product, quantity } = item;

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div className="flex min-w-0 items-center gap-3.5">
        <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-background text-[28px]">
          {product.emoji ?? "🍛"}
        </span>
        <span className="min-w-0">
          <span className="mb-1 block truncate text-[15px] font-extrabold text-foreground">
            {product.name}
          </span>
          <span className="block text-sm font-extrabold text-primary">
            {formatNaira(product.price)}
          </span>
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        {editing && (
          <button
            type="button"
            onClick={() => customerActions.removeFromCart(product.id)}
            aria-label={`Remove ${product.name}`}
            className="mr-1 text-red-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="size-4.5" />
          </button>
        )}
        <button
          type="button"
          onClick={() => customerActions.updateQuantity(product.id, -1)}
          aria-label="Decrease quantity"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
        >
          <Minus className="size-3.5" />
        </button>
        <span className="min-w-5 text-center text-[15px] font-extrabold text-foreground">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => customerActions.updateQuantity(product.id, 1)}
          aria-label="Increase quantity"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
