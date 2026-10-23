"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid2x2, Home, Moon, ShoppingBag, Sun, User } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { getCartCount, useCustomerDemo } from "@/features/customer/api";
import { useTheme } from "@/features/customer/hooks";

const TABS = [
  { href: ROUTES.customer.root, label: "Home", icon: Home },
  { href: ROUTES.customer.categories, label: "Categories", icon: Grid2x2 },
] as const;

function isActive(pathname: string, href: string) {
  if (href === ROUTES.customer.root) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Fixed bottom tab bar for phones — Home, Categories, a raised center cart
 * button with badge, theme toggle, and Profile.
 */
export function CustomerBottomNav() {
  const pathname = usePathname();
  const state = useCustomerDemo();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getCartCount(state);

  return (
    <nav
      aria-label="Storefront sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85 sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}

        {/* Center cart button */}
        <Link
          href={ROUTES.customer.cart}
          aria-label={`Cart — ${cartCount} items`}
          className="flex h-14 items-center justify-center"
        >
          <span className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(232,90,29,0.35)]">
            <ShoppingBag className="size-6" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-card text-[10.5px] font-extrabold text-primary ring-2 ring-primary">
                {cartCount}
              </span>
            )}
          </span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-muted-foreground transition-colors"
        >
          {theme === "light" ? (
            <Moon className="size-5" />
          ) : (
            <Sun className="size-5 text-amber-400" />
          )}
          Theme
        </button>

        {(() => {
          const active = isActive(pathname, ROUTES.customer.profile);
          return (
            <Link
              href={ROUTES.customer.profile}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <User className="size-5" />
              Profile
            </Link>
          );
        })()}
      </div>
    </nav>
  );
}
