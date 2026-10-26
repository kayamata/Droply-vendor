"use client";

import { useCustomerSession } from "@/features/customer/api";
import { CustomerHomePage } from "@/features/customer/pages/customer-home-page";
import { CustomerWelcomePage } from "@/features/customer/pages/customer-welcome-page";

/**
 * Storefront entry — renders the dashboard when a customer session exists
 * and the auth welcome screen when it doesn't. Deep links into the rest of
 * /customer are gated separately by the shell guard.
 */
export function CustomerEntryPage() {
  const session = useCustomerSession();
  return session ? <CustomerHomePage /> : <CustomerWelcomePage />;
}
