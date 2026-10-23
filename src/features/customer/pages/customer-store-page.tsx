"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  MapPin,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

import { ROUTES } from "@/utils/constants";
import {
  CUSTOMER_CATEGORIES,
  getCartCount,
  getStoreById,
  useCustomerDemo,
} from "@/features/customer/api";
import {
  CustomerEmptyState,
  CustomerShell,
} from "@/features/customer/components";

const FALLBACK_GFX = { emoji: "🍱", bg: "#FFF3E0", textColor: "#E85A1D" };

/**
 * Store details — back bar with cart, gradient banner, delivery info panel,
 * and the menu-category tiles that drill into the item grid.
 */
export function CustomerStorePage() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId as string;
  const state = useCustomerDemo();
  const cartCount = getCartCount(state);

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

  const menuCategories = Array.from(
    new Set(store.menu.map((item) => item.category))
  );

  return (
    <CustomerShell className="flex flex-col gap-4">
      {/* Top bar — back, store name, type pill, cart */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-3.5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <button
            type="button"
            onClick={() => router.push(ROUTES.customer.stores)}
            aria-label="Back to stores"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-4.5" />
          </button>
          <h2 className="truncate text-lg font-black text-foreground">
            {store.name}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-lg bg-secondary px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary">
            {store.type}
          </span>
          <Link
            href={ROUTES.customer.cart}
            aria-label={`Cart — ${cartCount} items`}
            className="relative flex items-center text-foreground"
          >
            <ShoppingBag className="size-5.5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Cover banner */}
      <div
        className="relative flex items-center justify-between overflow-hidden rounded-3xl px-5 py-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:px-7"
        style={{ background: store.bannerBg }}
      >
        <div className="z-[1] max-w-[70%]">
          <div className="mb-1.5 flex items-center gap-1.5">
            <Sparkles className="size-3.5" />
            <span className="rounded-lg bg-white/25 px-2 py-0.5 text-[10px] font-extrabold text-white">
              Verified Store
            </span>
          </div>
          <h1
            className="mb-1.5 text-xl font-black leading-tight sm:text-2xl"
            style={{ color: store.bannerTextDark ? "#3D2F00" : "white" }}
          >
            {store.name}
          </h1>
          <p
            className="text-xs leading-snug opacity-90"
            style={{ color: store.bannerTextDark ? "#5C4700" : "white" }}
          >
            Fresh food &amp; groceries delivered to your hostel or location
          </p>
        </div>

        <div className="z-[1] select-none text-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
          {store.bannerEmoji}
        </div>

        <div className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded-2xl bg-white/95 px-2.5 py-1 text-xs font-black text-[#1C1C1E] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <Star className="size-3.5 fill-primary text-primary" />
          {store.rating}
        </div>
      </div>

      {/* Delivery info panel */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between gap-2 text-xs">
          <div>
            <p className="mb-0.5 text-[10px] font-bold tracking-wider text-muted-foreground">
              DELIVERY TO
            </p>
            <div className="flex items-center text-[12.5px] font-bold text-foreground">
              <MapPin className="mr-1 size-3.5 shrink-0 text-primary" />
              NSUK Campus &amp; Katampe Ext.
            </div>
          </div>
          <div className="text-right">
            <p className="mb-0.5 text-[10px] font-bold tracking-wider text-muted-foreground">
              DELIVERY TIME
            </p>
            <div className="flex items-center justify-end text-[12.5px] font-bold text-foreground">
              <Clock className="mr-1 size-3.5 shrink-0 text-primary" />
              {store.deliveryTime}
            </div>
          </div>
        </div>

        <div className="mt-3.5 flex justify-between border-t border-border pt-2.5 text-xs">
          <div>
            <p className="text-[10px] text-muted-foreground">Opening Hours</p>
            <p className="mt-0.5 font-extrabold text-primary">
              {store.openingHours}
            </p>
          </div>
          <div className="max-w-[55%] text-right">
            <p className="text-[10px] text-muted-foreground">Address</p>
            <p className="mt-0.5 text-[11.5px] font-semibold text-foreground">
              {store.address}
            </p>
          </div>
        </div>
      </div>

      {/* Menu categories */}
      <section className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-black tracking-tight text-foreground">
            Menu Categories
          </h3>
          <span className="text-xs font-semibold text-muted-foreground">
            {menuCategories.length} categories
          </span>
        </div>

        {menuCategories.map((catName) => {
          const gfx =
            CUSTOMER_CATEGORIES.find((c) => c.name === catName) ?? FALLBACK_GFX;
          const count = store.menu.filter((i) => i.category === catName).length;

          return (
            <button
              key={catName}
              type="button"
              onClick={() =>
                router.push(ROUTES.customer.storeCategory(store.id, catName))
              }
              style={{ backgroundColor: gfx.bg }}
              className="flex h-27.5 items-center justify-between overflow-hidden rounded-2xl px-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.05] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="z-[1] max-w-[70%]">
                <span
                  className="mb-0.5 block text-xl font-black leading-tight tracking-tight"
                  style={{ color: gfx.textColor }}
                >
                  {catName}
                </span>
                <span
                  className="flex items-center gap-1 text-xs font-bold"
                  style={{ color: gfx.textColor, opacity: 0.85 }}
                >
                  {count} {count === 1 ? "item" : "items"} available
                  <ChevronRight className="size-3.5" />
                </span>
              </span>
              <span className="z-[1] rotate-[-5deg] select-none text-[56px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                {gfx.emoji}
              </span>
            </button>
          );
        })}
      </section>
    </CustomerShell>
  );
}
