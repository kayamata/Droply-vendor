"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { formatNaira, formatTime } from "@/utils/format";
import { VendorCard } from "@/features/vendor/components/vendor-card";
import { OrderStatusPill } from "@/features/vendor/components/vendor-status-pill";
import type { VendorOrder } from "@/features/vendor/types";

interface VendorOrderCardProps {
  order: VendorOrder;
  className?: string;
}

/** Compact order row — links to the order detail page. */
export function VendorOrderCard({ order, className }: VendorOrderCardProps) {
  const itemSummary = order.items
    .map((i) => `${i.name} ×${i.quantity}`)
    .join(", ");

  return (
    <Link href={`${ROUTES.vendor.orders}/${order.id}`} className="block">
      <VendorCard
        className={cn(
          "flex items-center gap-3 p-4 transition-all duration-200",
          "hover:-translate-y-px hover:border-primary/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-droply-blue-light text-2xl">
          {order.items[0]?.emoji ?? "🍽️"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-foreground">
              #{order.id}
            </p>
            <OrderStatusPill status={order.status} />
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {order.customer} · {itemSummary}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatTime(order.placedAt)} · {order.deliveryTo}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <p className="text-sm font-bold text-foreground">
            {formatNaira(order.total)}
          </p>
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      </VendorCard>
    </Link>
  );
}
