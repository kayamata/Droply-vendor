import Link from "next/link";
import { Store } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";

interface VendorLogoProps {
  href?: string;
  className?: string;
}

/**
 * DROPly wordmark for the vendor portal — same brand, "Vendor" context tag.
 * The consumer app ships an image logo; this keeps the same orange-forward
 * treatment with a store mark for the business side.
 */
export function VendorLogo({ href = ROUTES.vendor.root, className }: VendorLogoProps) {
  return (
    <Link
      href={href}
      aria-label="DROPly Vendor — home"
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.25)]">
        <Store className="size-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-primary">
          DROPly
        </span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Vendor
        </span>
      </span>
    </Link>
  );
}
