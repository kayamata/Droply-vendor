"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Crown, Flame } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { getStoreById } from "@/features/customer/api";
import {
  CustomerBackHeader,
  CustomerEmptyState,
  CustomerProductCard,
  CustomerShell,
} from "@/features/customer/components";

const SUB_FILTERS = ["Popular", "Premium"] as const;

/**
 * Category shelf inside a store — back bar, Popular/Premium segmented tabs,
 * and the product grid (premium items get the dark gold treatment).
 */
export function CustomerStoreCategoryPage() {
  const params = useParams();
  const storeId = params.storeId as string;
  const categoryName = decodeURIComponent(params.category as string);
  const [activeFilter, setActiveFilter] =
    React.useState<(typeof SUB_FILTERS)[number]>("Popular");

  const store = getStoreById(storeId);

  if (!store) {
    return (
      <CustomerShell>
        <CustomerEmptyState
          emoji="🏪"
          title="Store not found"
          description="This store may have closed or moved off campus."
          actionLabel="Back to stores"
          actionHref={ROUTES.customer.stores}
        />
      </CustomerShell>
    );
  }

  const allItems = store.menu.filter(
    (item) => item.category.toLowerCase() === categoryName.toLowerCase()
  );
  const popularItems = allItems.filter(
    (i) => i.popular || !i.premium || i.price < 5000
  );
  const premiumItems = allItems.filter((i) => i.premium || i.price >= 4500);

  const displayed =
    activeFilter === "Popular"
      ? popularItems.length > 0
        ? popularItems
        : allItems
      : premiumItems.length > 0
        ? premiumItems
        : allItems;

  return (
    <CustomerShell className="flex flex-col gap-4">
      <CustomerBackHeader
        title={categoryName}
        backHref={ROUTES.customer.store(storeId)}
        showCart
      />

      {/* Popular / Premium tabs */}
      <div className="flex gap-2.5 px-1">
        {SUB_FILTERS.map((f) => {
          const selected = activeFilter === f;
          const isPopular = f === "Popular";
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-2xl px-3.5 py-3 text-sm font-extrabold transition-all duration-200",
                selected && "shadow-[0_4px_12px_rgba(0,0,0,0.12)]",
                selected
                  ? isPopular
                    ? "border-2 border-primary bg-primary text-white"
                    : "border-2 border-[#D4AF37] bg-[#1C1C1E] text-[#D4AF37]"
                  : "border border-border bg-card text-muted-foreground"
              )}
            >
              {isPopular ? (
                <Flame
                  className={cn(
                    "size-4",
                    selected ? "text-white" : "text-primary"
                  )}
                />
              ) : (
                <Crown className="size-4 text-[#D4AF37]" />
              )}
              {f}
            </button>
          );
        })}
      </div>

      <p className="px-1 text-xs font-semibold leading-snug text-muted-foreground">
        {activeFilter === "Popular"
          ? "🔥 Popular everyday student favorites & fast campus delivery"
          : "👑 Premium chef specialities, feast combos & deluxe portions"}
      </p>

      {displayed.length === 0 ? (
        <CustomerEmptyState
          emoji="🍽️"
          title="Nothing here yet"
          description="This category has no items right now — check another one."
          actionLabel="Back to store"
          actionHref={ROUTES.customer.store(storeId)}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {displayed.map((item) => {
            const isPremium =
              activeFilter === "Premium" || item.premium || item.price >= 5000;
            return (
              <CustomerProductCard
                key={item.id}
                product={item}
                storeId={store.id}
                storeName={store.name}
                premium={isPremium}
              />
            );
          })}
        </div>
      )}
    </CustomerShell>
  );
}
