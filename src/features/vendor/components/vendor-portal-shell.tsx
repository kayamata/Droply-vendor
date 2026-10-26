import * as React from "react";

import { VendorAuthGuard } from "@/features/vendor/components/vendor-auth-guard";
import { VendorBottomNav } from "@/features/vendor/components/vendor-bottom-nav";
import { VendorHeader } from "@/features/vendor/components/vendor-header";
import { VendorNavigation } from "@/features/vendor/components/vendor-navigation";
import { VendorNotificationBell } from "@/features/vendor/components/vendor-notification-bell";
import { VendorPageContainer } from "@/features/vendor/components/vendor-page-container";
import { VendorSessionBadge } from "@/features/vendor/components/vendor-session-badge";
import { VendorStoreStatus } from "@/features/vendor/components/vendor-store-status";
import { VendorToaster } from "@/features/vendor/components/vendor-toaster";

interface VendorPortalShellProps {
  title: string;
  /** Right-side slot next to the section heading (e.g. "Add product"). */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Shared chrome for the vendor portal sections — header with store status +
 * notifications, the pill navigation, and a consistent section heading.
 */
export function VendorPortalShell({
  title,
  actions,
  children,
}: VendorPortalShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <VendorAuthGuard />
      <VendorHeader
        backHref={null}
        actions={
          <>
            <VendorStoreStatus />
            <VendorNotificationBell />
          </>
        }
      />
      <VendorPageContainer
        width="wide"
        className="flex-1 py-6 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:py-8 sm:pb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            <VendorSessionBadge />
          </div>
          {actions}
        </div>
        <VendorNavigation className="mt-5" />
        <div className="mt-6">{children}</div>
      </VendorPageContainer>
      <VendorBottomNav />
      <VendorToaster />
    </div>
  );
}
