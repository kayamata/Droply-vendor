import * as React from "react";

import { cn } from "@/utils/cn";

interface CustomerAuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/** The white access card used across customer sign-in and registration. */
export function CustomerAuthCard({
  title,
  subtitle,
  children,
  footer,
  className,
}: CustomerAuthCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:p-8",
        className
      )}
    >
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
    </div>
  );
}
