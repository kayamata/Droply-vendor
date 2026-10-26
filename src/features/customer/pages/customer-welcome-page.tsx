"use client";

import { Bike, ShoppingBag, Star } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { CustomerAuthShell } from "@/features/customer/components/customer-auth-shell";
import { CustomerButton } from "@/features/customer/components/customer-button";

const perks = [
  { icon: ShoppingBag, label: "Campus stores & groceries" },
  { icon: Bike, label: "Delivery to your hostel" },
  { icon: Star, label: "Rewards on every order" },
];

/**
 * Customer welcome screen — shown at /customer when signed out.
 * Offers Sign In and Create Account; the storefront itself stays behind
 * the session guard.
 */
export function CustomerWelcomePage() {
  return (
    <CustomerAuthShell backLabel="Back to DROPly">
      {/* Hero */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="flex h-24 w-full items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#E85A1D_0%,#B83D0D_100%)] text-5xl shadow-[0_8px_24px_rgba(232,90,29,0.3)]">
          🍛🌯🥤
        </div>
        <h1 className="mt-6 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Hungry on campus?
        </h1>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Sign in to order from campus stores and get food delivered to your
          hostel.
        </p>
      </div>

      {/* Perks */}
      <ul className="mb-8 flex flex-col gap-2.5">
        {perks.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon className="size-4.5" />
            </span>
            {label}
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <CustomerButton href={ROUTES.customer.login}>
          Sign In
        </CustomerButton>
        <CustomerButton href={ROUTES.customer.register} variant="secondary">
          Create Account
        </CustomerButton>
      </div>
    </CustomerAuthShell>
  );
}
