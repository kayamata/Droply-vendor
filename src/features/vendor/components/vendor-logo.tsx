import Link from "next/link";

import { DroplyLogo } from "@/shared/components/brand";
import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";

interface VendorLogoProps {
  href?: string;
  className?: string;
}

/**
 * DROPly wordmark for the vendor portal — the official logo with a small
 * "Vendor" context tag. The logo artwork swaps automatically with theme.
 */
export function VendorLogo({ href = ROUTES.vendor.root, className }: VendorLogoProps) {
  return (
    <Link
      href={href}
      aria-label="DROPly Vendor — home"
      className={cn(
        "flex shrink-0 items-end gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
    >
      <DroplyLogo className="h-8" />
      <span className="pb-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        Vendor
      </span>
    </Link>
  );
}
