"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/utils/constants";
import { readCustomerSession } from "@/features/customer/api";

/**
 * Route guard for the customer storefront — mounted once in CustomerShell.
 * When no session exists it redirects to the storefront entry, which shows
 * the auth welcome screen. Re-checks on `pageshow` so pages restored from
 * the browser's back/forward cache still require authentication.
 */
export function useCustomerAuthGuard() {
  const router = useRouter();

  React.useEffect(() => {
    const check = () => {
      if (!readCustomerSession()) {
        router.replace(ROUTES.customer.root);
      }
    };
    check();

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) check();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [router]);
}
