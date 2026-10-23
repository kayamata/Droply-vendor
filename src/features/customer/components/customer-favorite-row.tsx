"use client";

import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import { customerActions } from "@/features/customer/api";
import type { CustomerProduct, CustomerStore } from "@/features/customer/types";

interface CustomerFavoriteRowProps {
  product: CustomerProduct;
  store: CustomerStore;
}

/** Favourites list row — thumb, name, store, price, remove + quick-add. */
export function CustomerFavoriteRow({ product, store }: CustomerFavoriteRowProps) {
  const router = useRouter();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(ROUTES.customer.product(product.id))}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(ROUTES.customer.product(product.id));
      }}
      className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
    >
      <div className="flex min-w-0 items-center gap-3.5">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-background text-[28px]">
          {product.emoji ?? "🍛"}
        </span>
        <div className="min-w-0">
          <h4 className="mb-0.5 truncate text-[15px] font-extrabold text-foreground">
            {product.name}
          </h4>
          <p className="mb-1 truncate text-xs font-medium text-muted-foreground">
            {store.name}
          </p>
          <span className="text-sm font-black text-primary">
            {formatNaira(product.price)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            customerActions.toggleFavorite(product.id);
          }}
          aria-label={`Remove ${product.name} from favorites`}
          className="p-1.5 text-red-500 transition-colors hover:text-red-600"
        >
          <Trash2 className="size-4.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            customerActions.addToCart(product, store.id);
            customerActions.showToast("Added to cart");
          }}
          aria-label={`Add ${product.name} to cart`}
          className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(232,90,29,0.3)] transition-transform hover:scale-105"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
