import * as React from "react";

import { cn } from "@/utils/cn";

/**
 * DROPly card — white surface, hairline border, soft shadow, generous radius.
 * Matches the consumer storefront's card treatment.
 */
export function VendorCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    />
  );
}
