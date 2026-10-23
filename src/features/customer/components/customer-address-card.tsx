"use client";

import { Check, MapPin } from "lucide-react";

import { cn } from "@/utils/cn";
import { customerActions } from "@/features/customer/api";
import type { DeliveryAddress } from "@/features/customer/types";

interface CustomerAddressCardProps {
  address: DeliveryAddress;
}

/** Selectable delivery-address card on the checkout screen. */
export function CustomerAddressCard({ address }: CustomerAddressCardProps) {
  return (
    <button
      type="button"
      onClick={() => customerActions.selectAddress(address.id)}
      aria-pressed={address.selected}
      className={cn(
        "relative w-full rounded-2xl bg-card p-5 text-left transition-all duration-200",
        address.selected
          ? "border-2 border-primary shadow-[0_4px_16px_rgba(232,90,29,0.15)]"
          : "border border-border shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
      )}
    >
      {address.selected && (
        <span className="absolute right-5 top-5 flex size-6.5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-4" strokeWidth={3} />
        </span>
      )}

      <span className="mb-1.5 flex items-center gap-2">
        <MapPin className="size-4 text-primary" />
        <span className="text-base font-extrabold text-foreground">
          {address.label}
        </span>
      </span>

      <span className="block max-w-[80%] text-[13.5px] font-medium leading-snug text-muted-foreground">
        {address.address}
      </span>
    </button>
  );
}
