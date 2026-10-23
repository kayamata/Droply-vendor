import { ShoppingBag, Store } from "lucide-react";

import { CUSTOMER_APP_URL, ROUTES } from "@/utils/constants";
import { AccountTypeCard } from "@/features/auth/components";

/**
 * Entry point: "How will you be using DROPly?"
 * Customers continue to the storefront; vendors enter the portal.
 */
export function AccountTypePage() {
  return (
    <div className="animate-fade-in flex min-h-dvh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:max-w-lg sm:px-6">
        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.25)]">
            <ShoppingBag className="size-7" />
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome to DROPly
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            How will you be using DROPly?
          </p>
        </div>

        {/* Account type options */}
        <div className="mt-9 flex flex-col gap-4">
          <AccountTypeCard
            href={CUSTOMER_APP_URL}
            external
            icon={ShoppingBag}
            title="Customer"
            description="Order food & groceries on campus"
          />
          <AccountTypeCard
            href={ROUTES.vendor.root}
            icon={Store}
            title="Vendor"
            description="Sell your products and grow your business"
          />
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
          Food, groceries and essentials delivered to your hostel — powered by
          campus vendors like you.
        </p>
      </main>
    </div>
  );
}
