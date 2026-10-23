"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import {
  customerActions,
  getCartTotals,
  useCustomerDemo,
} from "@/features/customer/api";
import { CustomerButton } from "@/features/customer/components/customer-button";
import { CustomerSummaryPanel } from "@/features/customer/components/customer-summary-panel";

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base font-semibold text-foreground outline-none placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring sm:text-sm";

const labelClasses =
  "mb-2 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground";

/**
 * Card-entry form on the payment screen — prefilled demo card, invoice
 * summary sheet, "Make Payment" creates the order and routes to tracking.
 */
export function CustomerPaymentForm() {
  const router = useRouter();
  const state = useCustomerDemo();

  const [cardHolder, setCardHolder] = React.useState("Amara Nwosu");
  const [cardNumber, setCardNumber] = React.useState("0987 0986 5543 09809");
  const [expDate, setExpDate] = React.useState("10/28");
  const [cvc, setCvc] = React.useState("346");

  const isCartEmpty = state.cart.length === 0;
  const { subtotal, deliveryFee, total } = isCartEmpty
    ? { subtotal: 3500, deliveryFee: 200, total: 3700 }
    : getCartTotals(state);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardHolder || !cardNumber || !expDate || !cvc) {
      customerActions.showToast("Please fill all card details");
      return;
    }
    customerActions.createOrder();
    router.push(ROUTES.customer.orderConfirmation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="mb-5 flex items-center gap-2.5">
          <CreditCard className="size-5 text-primary" />
          <h3 className="text-base font-extrabold text-foreground">
            Credit / Debit Card
          </h3>
        </div>

        <div className="flex flex-col gap-4.5">
          <div>
            <label htmlFor="card-holder" className={labelClasses}>
              Card Holder Name
            </label>
            <input
              id="card-holder"
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="card-number" className={labelClasses}>
              Card Number
            </label>
            <input
              id="card-number"
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="card-exp" className={labelClasses}>
                Exp Date
              </label>
              <input
                id="card-exp"
                type="text"
                placeholder="MM/YY"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="card-cvc" className={labelClasses}>
                CVC
              </label>
              <input
                id="card-cvc"
                type="password"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>
        </div>
      </div>

      <CustomerSummaryPanel
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={state.promoDiscount}
        total={total}
        action={
          <CustomerButton type="submit" className="w-full">
            Make Payment
          </CustomerButton>
        }
      />
    </form>
  );
}
