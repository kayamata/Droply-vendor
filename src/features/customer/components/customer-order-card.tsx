"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, RotateCcw } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import { customerActions } from "@/features/customer/api";
import type { CustomerOrder } from "@/features/customer/types";

interface CustomerOrderCardProps {
  order: CustomerOrder;
}

/** Order history card — store, status pill, item lines, total, reorder/track. */
export function CustomerOrderCard({ order }: CustomerOrderCardProps) {
  const router = useRouter();
  const delivered = order.status === "arrived";

  const handleReorder = () => {
    order.items.forEach((item) =>
      customerActions.addToCart(item.product, item.storeId)
    );
    customerActions.showToast("Order added to cart");
    router.push(ROUTES.customer.cart);
  };

  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h4 className="truncate text-base font-extrabold text-foreground">
            {order.storeName}
          </h4>
          <p className="mt-0.5 text-xs font-medium text-muted-foreground">
            ID: {order.id} • {order.date}
          </p>
        </div>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-extrabold",
            delivered
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-secondary text-primary"
          )}
        >
          {delivered ? (
            <CheckCircle2 className="size-3.5" />
          ) : (
            <Clock className="size-3.5" />
          )}
          {delivered ? "Delivered" : order.eta}
        </span>
      </div>

      <div className="border-y border-border py-3 text-[13.5px] text-foreground">
        {order.items.map((item, idx) => (
          <div key={idx} className="mb-1.5 flex justify-between last:mb-0">
            <span>
              {item.product.name} x{item.quantity}
            </span>
            <span className="font-bold">
              {formatNaira(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            Total Paid
          </span>
          <span className="text-[17px] font-black text-primary">
            {formatNaira(order.total)}
          </span>
        </div>

        {delivered ? (
          <button
            type="button"
            onClick={handleReorder}
            className="flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2.5 text-[13.5px] font-extrabold text-primary transition-colors hover:bg-droply-orange-light/80"
          >
            <RotateCcw className="size-3.5" />
            Reorder
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push(ROUTES.customer.orderConfirmation)}
            className="rounded-xl bg-foreground px-4 py-2.5 text-[13.5px] font-extrabold text-background transition-opacity hover:opacity-90"
          >
            Track Order
          </button>
        )}
      </div>
    </div>
  );
}
