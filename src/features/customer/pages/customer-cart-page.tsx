"use client";

import * as React from "react";

import { ROUTES } from "@/utils/constants";
import {
  getCartCount,
  getCartTotals,
  useCustomerDemo,
} from "@/features/customer/api";
import {
  CustomerBackHeader,
  CustomerButton,
  CustomerCartItem,
  CustomerEmptyState,
  CustomerPromoForm,
  CustomerShell,
  CustomerSummaryPanel,
} from "@/features/customer/components";

/**
 * Shopping cart — item list with quantity steppers and edit mode, promo
 * entry, and the fixed totals sheet with the checkout CTA.
 */
export function CustomerCartPage() {
  const state = useCustomerDemo();
  const [editing, setEditing] = React.useState(false);

  const cartCount = getCartCount(state);
  const { subtotal, deliveryFee, total } = getCartTotals(state);

  return (
    <CustomerShell bottomNav={false} className="flex flex-col gap-5 pb-64">
      <CustomerBackHeader
        title={`Shopping Cart (${cartCount})`}
        backHref={ROUTES.customer.stores}
      />

      {state.cart.length === 0 ? (
        <CustomerEmptyState
          emoji="🛒"
          title="Your cart is empty"
          description="Add delicious food or snacks from campus stores."
          actionLabel="Find Food"
          actionHref={ROUTES.customer.stores}
        />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {state.cart.map((item) => (
              <CustomerCartItem
                key={item.product.id}
                item={item}
                editing={editing}
              />
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditing((e) => !e)}
                className="text-sm font-extrabold text-primary"
              >
                {editing ? "Done Editing" : "Edit Cart"}
              </button>
            </div>
          </div>

          <CustomerPromoForm />

          <CustomerSummaryPanel
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={state.promoDiscount}
            total={total}
            action={
              <CustomerButton
                href={ROUTES.customer.checkout}
                className="w-full"
              >
                Proceed to Checkout
              </CustomerButton>
            }
          />
        </>
      )}
    </CustomerShell>
  );
}
