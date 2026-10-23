"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  MoreHorizontal,
  Package,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";

const TABS = [
  { href: ROUTES.vendor.dashboard, label: "Home", icon: LayoutDashboard },
  { href: ROUTES.vendor.orders, label: "Orders", icon: ClipboardList },
  { href: ROUTES.vendor.menu, label: "Menu", icon: UtensilsCrossed },
  { href: ROUTES.vendor.products, label: "Products", icon: Package },
] as const;

const MORE_SECTIONS = [
  { href: ROUTES.vendor.inventory, label: "Inventory", icon: ShoppingBag },
  { href: ROUTES.vendor.analytics, label: "Analytics", icon: BarChart3 },
  { href: ROUTES.vendor.payouts, label: "Payouts", icon: Wallet },
  { href: ROUTES.vendor.promotions, label: "Promotions", icon: Megaphone },
  { href: ROUTES.vendor.settings, label: "Settings", icon: Settings },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Fixed bottom tab bar for phones — replaces the pill scroller below `sm`.
 * "More" opens a sheet covering the remaining portal sections.
 */
export function VendorBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = React.useState(false);
  const moreActive = MORE_SECTIONS.some((s) => isActive(pathname, s.href));

  return (
    <>
      <nav
        aria-label="Vendor sections"
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
          <button
            type="button"
            aria-label="More sections"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen(true)}
            className={cn(
              "flex h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors",
              moreActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <MoreHorizontal className="size-5" />
            More
          </button>
        </div>
      </nav>

      {moreOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="animate-in fade-in fixed inset-0 z-50 cursor-default bg-black/40 duration-200 sm:hidden"
            onClick={() => setMoreOpen(false)}
          />
          <div
            role="dialog"
            aria-label="More sections"
            className="animate-in slide-in-from-bottom fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-border bg-card p-4 pb-8 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] duration-300 sm:hidden"
            style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
            <p className="px-2 pb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              More
            </p>
            <ul className="flex flex-col">
              {MORE_SECTIONS.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors",
                        active
                          ? "bg-secondary text-foreground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-5",
                          active ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
