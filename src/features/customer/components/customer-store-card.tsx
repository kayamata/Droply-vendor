import Link from "next/link";
import { Bike, Clock, Star } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import type { CustomerStore } from "@/features/customer/types";

interface CustomerStoreCardProps {
  store: CustomerStore;
}

/**
 * Store row on the Shop By Store screen — logo tile, name, address, rating /
 * delivery time / fee, and the type pill.
 */
export function CustomerStoreCard({ store }: CustomerStoreCardProps) {
  return (
    <Link
      href={ROUTES.customer.store(store.id)}
      className="flex items-center gap-3.5 rounded-2xl border border-border bg-card p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      {/* Logo tile */}
      <span
        className="flex size-21 shrink-0 items-center justify-center rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
        style={{ backgroundColor: store.logoBg }}
      >
        {store.logoKind === "emoji" ? (
          <span className="text-4xl">{store.logo}</span>
        ) : (
          <span className="font-serif text-lg font-black italic text-primary">
            {store.logo}
          </span>
        )}
      </span>

      {/* Info */}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-extrabold text-foreground">
          {store.name}
        </span>
        <span className="mb-2 block truncate text-xs leading-snug text-muted-foreground">
          {store.address}
        </span>

        <span className="flex flex-wrap items-center gap-2.5">
          <span className="flex items-center gap-1 text-xs font-extrabold text-foreground">
            <Star className="size-3.5 fill-primary text-primary" />
            {store.rating}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <Clock className="size-3.5" />
            {store.deliveryTime}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <Bike className="size-3.5" />
            {formatNaira(store.deliveryFee)}
          </span>
        </span>

        <span className="mt-2 flex items-center gap-1.5">
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-primary">
            {store.type}
          </span>
          <span className="text-[10.5px] font-semibold text-muted-foreground">
            • {store.openingHours}
          </span>
        </span>
      </span>
    </Link>
  );
}
