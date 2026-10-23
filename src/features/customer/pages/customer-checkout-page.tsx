"use client";

import { Plus } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { customerActions, useCustomerDemo } from "@/features/customer/api";
import {
  CustomerAddressCard,
  CustomerBackHeader,
  CustomerButton,
  CustomerShell,
} from "@/features/customer/components";

/**
 * Checkout step 1 — pick the delivery address, then proceed to payment.
 */
export function CustomerCheckoutPage() {
  const state = useCustomerDemo();

  return (
    <CustomerShell bottomNav={false} className="flex flex-col gap-6 pb-32">
      <CustomerBackHeader title="Checkout" backHref={ROUTES.customer.cart} />

      <section>
        <h3 className="mb-5 px-1 text-xl font-black text-foreground">
          Delivery Address
        </h3>
        <div className="flex flex-col gap-4">
          {state.addresses.map((addr) => (
            <CustomerAddressCard key={addr.id} address={addr} />
          ))}

          {/* Add new address */}
          <button
            type="button"
            onClick={() =>
              customerActions.showToast("Address book is coming soon")
            }
            className="flex h-17.5 items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-dashed border-border bg-card text-[15px] font-bold text-foreground transition-colors hover:bg-muted"
          >
            <span className="flex size-7 items-center justify-center rounded-full border-[1.5px] border-foreground">
              <Plus className="size-4" />
            </span>
            Add New Address
          </button>
        </div>
      </section>

      {/* Bottom CTA */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-5 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        style={{
          paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom))",
        }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <CustomerButton href={ROUTES.customer.payment} className="w-full">
            Proceed to Payment
          </CustomerButton>
        </div>
      </div>
    </CustomerShell>
  );
}
