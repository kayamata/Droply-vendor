"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Crown, Flame, Plus } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import { customerActions } from "@/features/customer/api";
import type { CustomerProduct } from "@/features/customer/types";

interface CustomerProductCardProps {
  product: CustomerProduct;
  storeId: string;
  storeName: string;
  /** Dark gold-bordered treatment used on the Premium shelf. */
  premium?: boolean;
}

/**
 * Grid product card — emoji tile, store tag, name, unit, price row with the
 * round "+" add-to-cart button. `premium` renders the dark/gold treatment.
 */
export function CustomerProductCard({
  product,
  storeId,
  storeName,
  premium = false,
}: CustomerProductCardProps) {
  const router = useRouter();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    customerActions.addToCart(product, storeId);
    customerActions.showToast("Added to cart");
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(ROUTES.customer.product(product.id))}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(ROUTES.customer.product(product.id));
      }}
      className={cn(
        "flex min-h-56 cursor-pointer flex-col rounded-2xl p-3.5 transition-all duration-200 hover:-translate-y-0.5",
        premium
          ? "border-[1.5px] border-[#D4AF37] bg-[#1C1C1E] shadow-[0_6px_18px_rgba(0,0,0,0.25)]"
          : "border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
      )}
    >
      {/* Badge row */}
      <div className="mb-2 flex items-center justify-between gap-1">
        {premium ? (
          <span className="inline-flex items-center gap-1 rounded-lg bg-[#D4AF37] px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-[#1C1C1E]">
            <Crown className="size-2.5" /> Premium
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide text-primary">
            <Flame className="size-2.5" /> Popular
          </span>
        )}
        {product.unit && (
          <span
            className={cn(
              "text-[10.5px] font-semibold",
              premium ? "text-[#C8B89A]" : "text-muted-foreground"
            )}
          >
            {product.unit}
          </span>
        )}
      </div>

      {/* Emoji tile */}
      <div
        className={cn(
          "mb-2.5 flex h-22.5 shrink-0 items-center justify-center rounded-xl text-[44px]",
          premium ? "bg-white/[0.06]" : "bg-droply-blue-light"
        )}
      >
        {product.emoji ?? "🍛"}
      </div>

      <span
        className={cn(
          "mb-0.5 block text-[9.5px] font-extrabold uppercase tracking-wide",
          premium ? "text-[#D4AF37]" : "text-primary"
        )}
      >
        {storeName}
      </span>

      <h4
        className={cn(
          "mb-1 line-clamp-2 text-[13.5px] font-extrabold leading-snug",
          premium ? "text-white" : "text-foreground"
        )}
      >
        {product.name}
      </h4>

      <p
        className={cn(
          "mb-2.5 text-[11px] font-medium",
          premium ? "text-[#C8B89A]" : "text-muted-foreground"
        )}
      >
        {product.unit ? `per ${product.unit}` : "per portion"}
      </p>

      {/* Price + add */}
      <div
        className={cn(
          "mt-auto flex items-center justify-between gap-1 rounded-2xl px-2.5 py-1.5",
          premium
            ? "border border-[#D4AF37]/30 bg-white/[0.05]"
            : "border border-border bg-background"
        )}
      >
        <span
          className={cn(
            "text-sm font-black",
            premium ? "text-[#E2C06E]" : "text-primary"
          )}
        >
          {formatNaira(product.price)}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.18)] transition-transform hover:scale-105",
            premium
              ? "bg-[#D4AF37] text-[#1C1C1E]"
              : "bg-primary text-primary-foreground"
          )}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
