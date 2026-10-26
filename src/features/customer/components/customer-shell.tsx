"use client";

import * as React from "react";

import { cn } from "@/utils/cn";
import { CustomerBottomNav } from "@/features/customer/components/customer-bottom-nav";
import { CustomerNavbar } from "@/features/customer/components/customer-navbar";
import { CustomerToaster } from "@/features/customer/components/customer-toaster";
import {
  useCustomerAuthGuard,
  useOrderTicker,
} from "@/features/customer/hooks";

interface CustomerShellProps {
  children: React.ReactNode;
  /** Show the mobile bottom tab bar. Hide it on checkout/detail flows. */
  bottomNav?: boolean;
  className?: string;
}

/**
 * Shared chrome for the customer storefront — sticky navbar, centered content
 * column, mobile bottom nav, the demo order ticker, the session guard, and
 * the toast host. Auth screens don't use the shell, so every shell page is
 * gated.
 */
export function CustomerShell({
  children,
  bottomNav = true,
  className,
}: CustomerShellProps) {
  useCustomerAuthGuard();
  useOrderTicker();

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <CustomerNavbar />
      <main
        className={cn(
          "animate-fade-in mx-auto w-full max-w-6xl flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8",
          bottomNav &&
            "pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:pb-10",
          className
        )}
      >
        {children}
      </main>
      {bottomNav && <CustomerBottomNav />}
      <CustomerToaster />
    </div>
  );
}
