"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Grid2x2,
  Home,
  MapPin,
  Search,
  ShoppingBag,
  Store,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import {
  DEMO_CUSTOMER_PROFILE,
  getCartCount,
  useCustomerDemo,
} from "@/features/customer/api";
import { CustomerLogo } from "@/features/customer/components/customer-logo";
import { CustomerThemeToggle } from "@/features/customer/components/customer-theme-toggle";

const NAV_LINKS = [
  { label: "Home", href: ROUTES.customer.root, icon: Home },
  { label: "Stores", href: ROUTES.customer.stores, icon: Store },
  { label: "Categories", href: ROUTES.customer.categories, icon: Grid2x2 },
] as const;

function isActive(pathname: string, href: string) {
  if (href === ROUTES.customer.root) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Sticky storefront header — logo, location pill, and a desktop search bar
 * with nav links. On phones the bar collapses to logo + cart and a
 * persistent search row appears underneath (all nav lives in the bottom
 * tab bar, same as the vendor portal).
 */
export function CustomerNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const state = useCustomerDemo();
  const [query, setQuery] = React.useState("");

  const cartCount = getCartCount(state);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(
      q
        ? `${ROUTES.customer.stores}?search=${encodeURIComponent(q)}`
        : ROUTES.customer.stores
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:px-8">
        <CustomerLogo />

        {/* Location pill */}
        <button
          type="button"
          className="ml-1 hidden items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted md:inline-flex"
        >
          <MapPin className="size-4 text-primary" />
          <span className="max-w-44 truncate">Katampe Extension, FCT</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>

        {/* Desktop search */}
        <form onSubmit={handleSearch} className="hidden flex-1 sm:block">
          <div className="relative mx-auto w-full max-w-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search food, groceries or campus stores..."
              className="w-full rounded-full border border-border bg-muted py-2.5 pl-4 pr-11 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-transparent focus:bg-card focus:ring-2 focus:ring-ring"
            />
            <Search className="absolute right-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </form>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
          <nav className="hidden items-center gap-5 lg:flex">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 text-sm transition-colors",
                    active
                      ? "font-extrabold text-primary"
                      : "font-semibold text-foreground hover:text-primary"
                  )}
                >
                  <Icon className="size-4.5" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <CustomerThemeToggle className="hidden sm:flex" />

          <Link
            href={ROUTES.customer.cart}
            aria-label={`Cart — ${cartCount} items`}
            className="relative flex size-10.5 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10.5px] font-extrabold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href={ROUTES.customer.profile}
            className="hidden items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3.5 text-foreground transition-colors hover:bg-muted sm:flex"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-base">
              {DEMO_CUSTOMER_PROFILE.avatarEmoji}
            </span>
            <span className="text-[13px] font-bold">
              {DEMO_CUSTOMER_PROFILE.name.split(" ")[0]}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile search row — always visible below sm, no hamburger menu. */}
      <form
        onSubmit={handleSearch}
        className="mx-auto w-full max-w-6xl px-4 pb-3 sm:hidden"
      >
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food, groceries or campus stores..."
            className="w-full rounded-full border border-border bg-muted py-2.5 pl-4 pr-11 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-transparent focus:bg-card focus:ring-2 focus:ring-ring"
          />
          <Search className="absolute right-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </form>
    </header>
  );
}
