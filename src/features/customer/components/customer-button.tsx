import * as React from "react";
import Link from "next/link";

import { cn } from "@/utils/cn";

type CustomerButtonVariant = "primary" | "secondary" | "dark";
type CustomerButtonSize = "md" | "lg";

/* Storefront button language — bold pill, orange primary with brand shadow. */
const variantClasses: Record<CustomerButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(232,90,29,0.3)] hover:bg-droply-orange-hover",
  secondary:
    "bg-muted text-foreground hover:bg-border/60",
  dark: "bg-foreground text-background hover:opacity-90",
};

const sizeClasses: Record<CustomerButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-6 text-base",
};

interface CustomerButtonProps
  extends Omit<React.ComponentProps<"button">, "className"> {
  variant?: CustomerButtonVariant;
  size?: CustomerButtonSize;
  /** Render as a link instead of a button. */
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function CustomerButton({
  variant = "primary",
  size = "lg",
  href,
  className,
  children,
  ...props
}: CustomerButtonProps) {
  const classes = cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl font-extrabold transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
