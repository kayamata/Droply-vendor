"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Package,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";

/** Future portal sections — routes exist as placeholders under /vendor/*. */
const SECTIONS = [
  { href: ROUTES.vendor.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.vendor.orders, label: "Orders", icon: ClipboardList },
  { href: ROUTES.vendor.menu, label: "Menu", icon: UtensilsCrossed },
  { href: ROUTES.vendor.products, label: "Products", icon: Package },
  { href: ROUTES.vendor.inventory, label: "Inventory", icon: ShoppingBag },
  { href: ROUTES.vendor.analytics, label: "Analytics", icon: BarChart3 },
  { href: ROUTES.vendor.payouts, label: "Payouts", icon: Wallet },
  { href: ROUTES.vendor.promotions, label: "Promotions", icon: Megaphone },
  { href: ROUTES.vendor.settings, label: "Settings", icon: Settings },
] as const;

/**
 * Section navigation for the vendor portal — horizontal pill scroller,
 * same pattern as the consumer app's category pills.
 */
export function VendorNavigation({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Vendor sections"
      className={cn("hidden w-full sm:block", className)}
    >
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {SECTIONS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.2)]"
                  : "border-border bg-card text-foreground hover:bg-muted"
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
