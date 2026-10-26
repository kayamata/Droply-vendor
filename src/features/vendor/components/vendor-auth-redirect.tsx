"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/utils/constants";
import { useVendorSession } from "@/features/vendor/api";

/**
 * Inverse of VendorAuthGuard — used on the vendor landing and auth screens.
 * When a session already exists, the vendor goes straight to the dashboard
 * instead of re-authenticating.
 */
export function VendorAuthRedirect() {
  const router = useRouter();
  const session = useVendorSession();

  React.useEffect(() => {
    if (session) {
      router.replace(ROUTES.vendor.dashboard);
    }
  }, [session, router]);

  return null;
}
