"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import {
  CUSTOMER_OFFERS,
  DEMO_CUSTOMER_PROFILE,
  getRecommended,
} from "@/features/customer/api";
import {
  CustomerHeroBanner,
  CustomerOfferCard,
  CustomerProductCard,
  CustomerShell,
} from "@/features/customer/components";

/**
 * Storefront home — hero banner, featured offers rail, and the recommended
 * products grid.
 */
export function CustomerHomePage() {
  const recommended = getRecommended(12);

  return (
    <CustomerShell className="flex flex-col gap-7">
      <CustomerHeroBanner
        firstName={DEMO_CUSTOMER_PROFILE.name.split(" ")[0]}
      />

      {/* Featured Offers */}
      <section>
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-xl font-black text-foreground">
            Featured Offers
          </h2>
          <Link
            href={ROUTES.customer.stores}
            className="text-[13px] font-extrabold text-primary"
          >
            View all stores →
          </Link>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-3.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {CUSTOMER_OFFERS.map((offer) => (
            <CustomerOfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section>
        <div className="mb-3.5 flex items-center gap-2 px-1">
          <TrendingUp className="size-5 text-primary" />
          <h2 className="text-xl font-black text-foreground">
            Recommended Food &amp; Groceries
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {recommended.map(({ product, store }) => (
            <CustomerProductCard
              key={product.id}
              product={product}
              storeId={store.id}
              storeName={store.name}
            />
          ))}
        </div>
      </section>
    </CustomerShell>
  );
}
