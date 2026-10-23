import * as React from "react";

import { cn } from "@/utils/cn";

interface CustomerPageBannerProps {
  greeting: string;
  title: string;
  subtitle?: string;
  /** "orange" for the primary storefront look, "muted" for the grey variant. */
  tone?: "orange" | "muted";
  className?: string;
}

/**
 * Rounded greeting banner at the top of browse screens — "Hey, Amara /
 * Shop By Store / N campus-friendly stores available".
 */
export function CustomerPageBanner({
  greeting,
  title,
  subtitle,
  tone = "orange",
  className,
}: CustomerPageBannerProps) {
  return (
    <div
      className={cn(
        "rounded-3xl px-5 py-6 sm:px-7",
        tone === "orange"
          ? "bg-primary text-primary-foreground [background-image:radial-gradient(circle,rgba(255,255,255,0.08)_10%,transparent_10.01%)] [background-size:12px_12px]"
          : "bg-[#5A6065] text-white",
        className
      )}
    >
      <p className="text-base font-semibold opacity-90">{greeting}</p>
      <h1 className="mt-0.5 text-2xl font-black tracking-tight sm:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-xs font-medium opacity-85">{subtitle}</p>
      )}
    </div>
  );
}
