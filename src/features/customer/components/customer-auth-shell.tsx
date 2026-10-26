import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { CustomerLogo } from "@/features/customer/components/customer-logo";

interface CustomerAuthShellProps {
  children: React.ReactNode;
  /** Header back link — defaults to the DROPly role picker. */
  backHref?: string;
  backLabel?: string;
  /** Wider column for multi-field forms. */
  wide?: boolean;
  className?: string;
}

/**
 * Shared chrome for the customer auth screens (welcome, sign-in, register) —
 * sticky header with a back link and a centered narrow column, mirroring the
 * vendor auth pages. No storefront navbar or bottom tabs.
 */
export function CustomerAuthShell({
  children,
  backHref = ROUTES.home,
  backLabel = "Back to DROPly",
  wide = false,
  className,
}: CustomerAuthShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-card/85">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            aria-label={backLabel}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-colors hover:bg-muted sm:hidden"
          >
            <ArrowLeft className="size-4.5" />
          </Link>
          <CustomerLogo />
          <div className="ml-auto">
            <Link
              href={backHref}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="size-4" />
              {backLabel}
            </Link>
          </div>
        </div>
      </header>

      <main
        className={cn(
          "animate-fade-in mx-auto flex w-full flex-1 flex-col justify-center px-4 py-8 sm:px-6 sm:py-12",
          wide ? "max-w-lg" : "max-w-md",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
