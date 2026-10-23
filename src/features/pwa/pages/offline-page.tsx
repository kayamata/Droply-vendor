"use client";

import { RefreshCw, Store, WifiOff } from "lucide-react";

/**
 * Offline fallback served by the service worker when the network is
 * unavailable and the requested page isn't in the cache.
 */
export function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.25)]">
        <Store className="size-8" />
      </span>
      <p className="mt-4 text-lg font-bold tracking-tight text-primary">
        DROPly
      </p>

      <div className="mt-8 flex flex-col items-center">
        <WifiOff className="size-8 text-muted-foreground" />
        <h1 className="mt-3 text-xl font-bold text-foreground">
          You&apos;re offline
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          DROPly needs an internet connection for this page. Check your
          connection and try again — your data is safe.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <RefreshCw className="size-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
