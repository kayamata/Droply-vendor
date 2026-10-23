"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/utils/cn";
import {
  CUSTOMER_STORES,
  DEMO_CUSTOMER_PROFILE,
} from "@/features/customer/api";
import {
  CustomerEmptyState,
  CustomerPageBanner,
  CustomerShell,
  CustomerStoreCard,
} from "@/features/customer/components";

const FILTERS = ["All", "Main Dish", "Fast Foods", "Drinks"] as const;

function StoresContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] =
    React.useState<(typeof FILTERS)[number]>("All");
  const searchQuery = searchParams.get("search") ?? "";

  const filtered = CUSTOMER_STORES.filter((store) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = q
      ? store.name.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q)
      : true;
    if (!matchesSearch) return false;
    if (activeFilter === "All") return true;
    return store.type.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <CustomerShell className="flex flex-col gap-5">
      <CustomerPageBanner
        greeting={`Hey, ${DEMO_CUSTOMER_PROFILE.name.split(" ")[0]}`}
        title="Shop By Store"
        subtitle={`${filtered.length} campus-friendly stores available`}
      />

      {/* Filter pills */}
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {FILTERS.map((f) => {
          const active = activeFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2.5 text-[13.5px] font-extrabold transition-all duration-200",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.2)]"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Store list */}
      {filtered.length === 0 ? (
        <CustomerEmptyState
          emoji="🏪"
          title="No stores found"
          description="Try a different search or filter — more campus stores are opening soon."
          actionLabel="Clear Search"
          actionHref="/customer/stores"
        />
      ) : (
        <div className="flex flex-col gap-3.5">
          {filtered.map((store) => (
            <CustomerStoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </CustomerShell>
  );
}

/**
 * Shop By Store — greeting banner, type filter pills, and the store card
 * list. Reads `?search=` from the navbar search box.
 */
export function CustomerStoresPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Loading stores...</p>
        </div>
      }
    >
      <StoresContent />
    </React.Suspense>
  );
}
