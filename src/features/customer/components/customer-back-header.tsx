"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { getCartCount, useCustomerDemo } from "@/features/customer/api";

interface CustomerBackHeaderProps {
  title: string;
  /** Where the back button goes. Omit to use router.back(). */
  backHref?: string;
  /** Show the cart icon with item-count badge on the right. */
  showCart?: boolean;
  className?: string;
}

/**
 * Sub-page top bar — round back button, centered title, optional cart link.
 * The storefront's inner-screen header.
 */
export function CustomerBackHeader({
  title,
  backHref,
  showCart = false,
  className,
}: CustomerBackHeaderProps) {
  const router = useRouter();
  const state = useCustomerDemo();
  const cartCount = getCartCount(state);

  const back = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-3.5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      <button
        type="button"
        onClick={back}
        aria-label="Go back"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
      >
        <ArrowLeft className="size-4.5" />
      </button>

      <h2 className="min-w-0 flex-1 truncate text-center text-base font-extrabold tracking-tight text-foreground">
        {title}
      </h2>

      {showCart ? (
        <Link
          href={ROUTES.customer.cart}
          aria-label={`Cart — ${cartCount} items`}
          className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
        >
          <ShoppingBag className="size-4.5" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Link>
      ) : (
        <span className="size-10 shrink-0" aria-hidden="true" />
      )}
    </div>
  );
}
