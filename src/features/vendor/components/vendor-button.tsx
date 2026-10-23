import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/shared/components/ui";

type VendorButtonVariant = "primary" | "secondary" | "ghost";
type VendorButtonSize = "md" | "lg" | "xl";

/* DROPly button language: bold, 16px radius, orange with a soft brand shadow. */
const variantClasses: Record<VendorButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.2)] hover:bg-droply-orange-hover hover:-translate-y-px active:translate-y-0",
  secondary:
    "border border-border bg-card text-foreground hover:bg-muted",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
};

const sizeClasses: Record<VendorButtonSize, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-[52px] px-6 text-base",
  xl: "h-14 px-8 text-base",
};

function vendorButtonClasses(
  variant: VendorButtonVariant,
  size: VendorButtonSize,
  className?: string
) {
  return cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

interface VendorButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "className" | "variant" | "size"> {
  variant?: VendorButtonVariant;
  size?: VendorButtonSize;
  /** Render as a link instead of a button. */
  href?: string;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function VendorButton({
  variant = "primary",
  size = "lg",
  href,
  loading = false,
  className,
  children,
  disabled,
  ...props
}: VendorButtonProps) {
  const classes = vendorButtonClasses(variant, size, className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled || loading}>
        {children}
      </Link>
    );
  }

  return (
    <Button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {children}
    </Button>
  );
}
