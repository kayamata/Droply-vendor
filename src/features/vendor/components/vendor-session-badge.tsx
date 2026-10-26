"use client";

import { useVendorSession } from "@/features/vendor/api";

/**
 * Signed-in indicator next to the portal section heading — shows the active
 * vendor's business name instead of a static "demo" label.
 */
export function VendorSessionBadge() {
  const session = useVendorSession();
  if (!session) return null;

  return (
    <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">
      {session.businessName}
    </span>
  );
}
