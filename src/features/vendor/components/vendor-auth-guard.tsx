"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/utils/constants";
import { readVendorSession } from "@/features/vendor/api";

/**
 * Route guard for the vendor portal — render once inside VendorPortalShell
 * (and any portal page not using the shell). When no vendor session exists
 * it redirects to vendor sign-in. Re-checks on `pageshow` so pages restored
 * from the browser's back/forward cache still require authentication.
 */
export function VendorAuthGuard() {
  const router = useRouter();

  React.useEffect(() => {
    const check = () => {
      if (!readVendorSession()) {
        router.replace(ROUTES.vendor.login);
      }
    };
    check();

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) check();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [router]);

  return null;
}
