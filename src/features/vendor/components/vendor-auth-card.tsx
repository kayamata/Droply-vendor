import * as React from "react";

import { cn } from "@/utils/cn";
import { VendorCard } from "@/features/vendor/components/vendor-card";

interface VendorAuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/** The white access card used across vendor sign-in and registration. */
export function VendorAuthCard({
  title,
  subtitle,
  children,
  footer,
  className,
}: VendorAuthCardProps) {
  return (
    <VendorCard className={cn("w-full p-6 sm:p-8", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="mt-6">{children}</div>
      {footer && (
        <div className="mt-6 border-t border-border pt-5">{footer}</div>
      )}
    </VendorCard>
  );
}
