"use client";

import * as React from "react";
import { ChevronDown, Store } from "lucide-react";

import { cn } from "@/utils/cn";
import { useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import { StoreStatusPill } from "@/features/vendor/components/vendor-status-pill";
import type { StoreStatus } from "@/features/vendor/types";

const STATUSES: { value: StoreStatus; label: string; hint: string }[] = [
  { value: "open", label: "Open", hint: "Accepting orders" },
  { value: "busy", label: "Busy", hint: "Longer prep times" },
  { value: "closed", label: "Closed", hint: "Not accepting orders" },
];

/** Store open/busy/closed switcher shown in the portal header. */
export function VendorStoreStatus() {
  const { vendor } = useVendorDemo();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Store status: ${vendor.status}. Change status`}
        className="flex items-center gap-1 rounded-full border border-border bg-card py-1 pl-1 pr-2 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 hover:bg-muted"
      >
        <StoreStatusPill status={vendor.status} />
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close status menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
            <p className="border-b border-border px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Store status
            </p>
            <ul className="p-1.5">
              {STATUSES.map((s) => (
                <li key={s.value}>
                  <button
                    type="button"
                    onClick={() => {
                      vendorDemoActions.setStoreStatus(s.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted",
                      vendor.status === s.value && "bg-secondary"
                    )}
                  >
                    <Store className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-foreground">
                        {s.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {s.hint}
                      </span>
                    </span>
                    {vendor.status === s.value && (
                      <span className="size-2 rounded-full bg-primary" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
