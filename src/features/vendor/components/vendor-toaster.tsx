"use client";

import { CheckCircle2 } from "lucide-react";

import { useVendorDemo } from "@/features/vendor/api";

/** Transient bottom-center confirmation — "Product saved", "Product deleted". */
export function VendorToaster() {
  const { toast } = useVendorDemo();
  if (!toast) return null;
  return (
    <div
      role="status"
      className="animate-fade-in fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background shadow-[0_8px_24px_rgba(0,0,0,0.2)] sm:bottom-6"
    >
      <CheckCircle2 className="size-4.5 text-emerald-400" />
      {toast}
    </div>
  );
}
