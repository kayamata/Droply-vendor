"use client";

import { ROUTES } from "@/utils/constants";
import {
  CustomerBackHeader,
  CustomerPaymentForm,
  CustomerShell,
} from "@/features/customer/components";

/**
 * Checkout step 2 — card entry with the invoice summary sheet.
 */
export function CustomerPaymentPage() {
  return (
    <CustomerShell bottomNav={false} className="flex flex-col gap-6 pb-60">
      <CustomerBackHeader
        title="Add Card & Payment"
        backHref={ROUTES.customer.checkout}
      />
      <CustomerPaymentForm />
    </CustomerShell>
  );
}
