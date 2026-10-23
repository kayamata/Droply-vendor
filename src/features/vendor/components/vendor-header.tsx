import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { VendorLogo } from "@/features/vendor/components/vendor-logo";

interface VendorHeaderProps {
  /** Show a "Back to DROPly" link. Defaults to the type-selection screen. */
  backHref?: string | null;
  backLabel?: string;
  /** Right-side slot (e.g. Sign In button). */
  actions?: React.ReactNode;
  className?: string;
}

/** Minimal vendor chrome — white bar, DROPly mark, contextual actions. */
export function VendorHeader({
  backHref = ROUTES.home,
  backLabel = "Back to DROPly",
  actions,
  className,
}: VendorHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-card/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-card/80",
        className
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        {backHref ? (
          <Link
            href={backHref}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 hover:bg-muted sm:hidden"
            aria-label={backLabel}
          >
            <ArrowLeft className="size-4.5" />
          </Link>
        ) : null}
        <VendorLogo />
        <div className="ml-auto flex items-center gap-3">
          {backHref ? (
            <Link
              href={backHref}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="size-4" />
              {backLabel}
            </Link>
          ) : null}
          {actions}
        </div>
      </div>
    </header>
  );
}
