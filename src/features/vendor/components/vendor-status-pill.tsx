import { cn } from "@/utils/cn";
import type { OrderStatus, PromotionStatus } from "@/features/vendor/types";

const orderStyles: Record<OrderStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-primary/10 text-primary" },
  confirmed: { label: "Confirmed", className: "bg-droply-blue-light text-droply-blue-dark" },
  preparing: { label: "Preparing", className: "bg-amber-100 text-amber-700" },
  ready: { label: "Ready for pickup", className: "bg-emerald-100 text-emerald-700" },
  out_for_delivery: { label: "Out for delivery", className: "bg-droply-blue-light text-droply-blue-dark" },
  completed: { label: "Completed", className: "bg-muted text-muted-foreground" },
  cancelled: { label: "Cancelled", className: "bg-destructive/10 text-destructive" },
};

const promoStyles: Record<PromotionStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700" },
  scheduled: { label: "Scheduled", className: "bg-droply-blue-light text-droply-blue-dark" },
  paused: { label: "Paused", className: "bg-amber-100 text-amber-700" },
  ended: { label: "Ended", className: "bg-muted text-muted-foreground" },
};

const stockStyles = {
  in_stock: { label: "In Stock", className: "bg-emerald-100 text-emerald-700" },
  low: { label: "Low Stock", className: "bg-amber-100 text-amber-700" },
  out: { label: "Out of Stock", className: "bg-destructive/10 text-destructive" },
};

const storeStyles = {
  open: { label: "Open", className: "bg-emerald-100 text-emerald-700" },
  busy: { label: "Busy", className: "bg-amber-100 text-amber-700" },
  closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
};

export function OrderStatusPill({ status, className }: { status: OrderStatus; className?: string }) {
  const s = orderStyles[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap", s.className, className)}>
      {s.label}
    </span>
  );
}

export function PromoStatusPill({ status, className }: { status: PromotionStatus; className?: string }) {
  const s = promoStyles[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap", s.className, className)}>
      {s.label}
    </span>
  );
}

export function StockStatusPill({ status, className }: { status: keyof typeof stockStyles; className?: string }) {
  const s = stockStyles[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap", s.className, className)}>
      {s.label}
    </span>
  );
}

export function StoreStatusPill({ status, className }: { status: keyof typeof storeStyles; className?: string }) {
  const s = storeStyles[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap", s.className, className)}>
      <span className={cn("size-1.5 rounded-full bg-current", status === "open" && "animate-pulse")} />
      {s.label}
    </span>
  );
}
