"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Star,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import {
  customerActions,
  findProduct,
  getCartCount,
  useCustomerDemo,
} from "@/features/customer/api";
import {
  CustomerButton,
  CustomerEmptyState,
  CustomerShell,
} from "@/features/customer/components";

const ACCORDIONS = [
  {
    id: "nutritional",
    title: "Nutritional Facts & Ingredients",
    body: "Rich in proteins, vitamins, and energy nutrients to keep you active during NSUK campus lectures & study sessions. Freshly prepared to student hygiene standards.",
  },
  {
    id: "reviews",
    title: "Student Reviews",
    body: null, // custom render below
  },
];

/**
 * Product details — back bar, hero emoji tile, details sheet with rating,
 * description, accordions, and the sticky Add to Cart / Buy Now bar.
 */
export function CustomerProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;
  const state = useCustomerDemo();
  const [openTab, setOpenTab] = React.useState<string | null>(null);

  const cartCount = getCartCount(state);
  const found = findProduct(productId);

  if (!found) {
    return (
      <CustomerShell bottomNav={false}>
        <CustomerEmptyState
          emoji="🍽️"
          title="Product not found"
          description="This item may have sold out or been removed."
          actionLabel="Go Home"
          actionHref={ROUTES.customer.root}
        />
      </CustomerShell>
    );
  }

  const { product, store } = found;

  const handleAdd = () => {
    customerActions.addToCart(product, store.id);
    customerActions.showToast("Added to cart");
  };

  const handleBuyNow = () => {
    customerActions.addToCart(product, store.id);
    router.push(ROUTES.customer.cart);
  };

  return (
    <CustomerShell bottomNav={false} className="flex flex-col px-0 pb-36 sm:px-0">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-4.5" />
        </button>
        <h2 className="text-base font-extrabold text-foreground">
          {product.category}
        </h2>
        <Link
          href={ROUTES.customer.cart}
          aria-label={`Cart — ${cartCount} items`}
          className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-colors hover:bg-muted"
        >
          <ShoppingBag className="size-4.5" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Hero emoji tile */}
      <div className="my-5 flex justify-center">
        <div className="flex size-45 items-center justify-center rounded-[32px] border border-border bg-card text-8xl shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          {product.emoji ?? "🍛"}
        </div>
      </div>

      {/* Details sheet */}
      <div className="flex-1 rounded-t-[32px] border-t border-border bg-card px-6 py-7 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <h1 className="mb-3 text-2xl font-black leading-tight text-foreground">
          {product.name}
        </h1>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-[22px] font-black text-primary">
            {formatNaira(product.price)}
          </span>
        </div>

        {/* Rating */}
        <div className="mb-6 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "size-4",
                star <= Math.floor(product.rating ?? 4.5)
                  ? "fill-primary text-primary"
                  : "text-border"
              )}
            />
          ))}
          <span className="ml-1.5 text-[13px] font-semibold text-muted-foreground">
            {product.reviewsCount ?? 110} Student Reviews
          </span>
        </div>

        <div className="mb-6">
          <h4 className="mb-2 text-[15px] font-extrabold text-foreground">
            Details
          </h4>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-2 text-xs font-semibold text-muted-foreground">
            Sold by {store.name} • {store.deliveryTime} delivery
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col border-t border-border">
          {ACCORDIONS.map((acc) => {
            const open = openTab === acc.id;
            return (
              <div key={acc.id} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenTab(open ? null : acc.id)}
                  className="flex w-full items-center justify-between py-4 text-[15px] font-extrabold text-foreground"
                >
                  {acc.title}
                  {open ? (
                    <ChevronUp className="size-4.5" />
                  ) : (
                    <ChevronDown className="size-4.5" />
                  )}
                </button>
                {open && acc.body && (
                  <p className="pb-4 text-[13.5px] font-medium leading-relaxed text-muted-foreground">
                    {acc.body}
                  </p>
                )}
                {open && acc.id === "reviews" && (
                  <div className="pb-4 text-[13px] text-muted-foreground">
                    <p className="mb-1 font-extrabold text-foreground">
                      Adaeze K. (NSUK Student)
                    </p>
                    <p className="mb-2 italic">
                      &quot;Delicious, hot and delivered fast right to my
                      hostel gate!&quot;
                    </p>
                    <p className="mb-1 font-extrabold text-foreground">
                      Tunde O.
                    </p>
                    <p className="italic">
                      &quot;Best meal option during exam preparation
                      weeks.&quot;
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky bottom actions */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-5 pt-4 shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
        style={{ paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex w-full max-w-6xl gap-3.5">
          <CustomerButton
            variant="secondary"
            onClick={handleAdd}
            className="flex-1"
          >
            Add To Cart
          </CustomerButton>
          <CustomerButton onClick={handleBuyNow} className="flex-1">
            Buy Now
          </CustomerButton>
        </div>
      </div>
    </CustomerShell>
  );
}
