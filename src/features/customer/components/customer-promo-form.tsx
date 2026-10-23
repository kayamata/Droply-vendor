"use client";

import * as React from "react";
import { Tag } from "lucide-react";

import { customerActions, useCustomerDemo } from "@/features/customer/api";
import { formatNaira } from "@/utils/format";

/**
 * Promo-code entry on the cart screen — input + Apply, with success /
 * invalid feedback and the active-code indicator.
 */
export function CustomerPromoForm() {
  const { promoCode, promoDiscount } = useCustomerDemo();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [justApplied, setJustApplied] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setJustApplied(false);
    if (!value.trim()) return;
    const ok = customerActions.applyPromo(value);
    if (ok) {
      setJustApplied(true);
      setValue("");
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter Promo Code (e.g. NSUKFRESH)"
            className="w-full rounded-xl border border-border bg-card py-3 pl-9 pr-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring sm:text-sm"
          />
          <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-foreground px-4.5 text-sm font-extrabold text-background transition-opacity hover:opacity-90"
        >
          Apply
        </button>
      </form>

      {justApplied && (
        <p className="mt-1.5 text-[12.5px] font-extrabold text-emerald-600">
          🎉 Promo applied! Saved {formatNaira(promoDiscount)}
        </p>
      )}
      {promoCode && !justApplied && (
        <p className="mt-1.5 text-[12.5px] font-extrabold text-emerald-600">
          ✓ Code {promoCode} active (saved {formatNaira(promoDiscount)})
        </p>
      )}
      {error && (
        <p className="mt-1.5 text-[12.5px] font-extrabold text-red-500">
          ⚠️ Invalid promo code. Try &quot;NSUKFRESH&quot;.
        </p>
      )}
    </div>
  );
}
