"use client";

import * as React from "react";

declare global {
  interface Window {
    /** Captured beforeinstallprompt event, stashed for later use. */
    __droplyInstallPrompt?: Event & {
      prompt: () => Promise<void>;
      userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
    };
  }
}

const INSTALL_PROMPT_EVENT = "droply:installable";

/**
 * Registers the service worker (production only) and captures the
 * `beforeinstallprompt` event so install UI anywhere in the app can trigger it.
 */
export function PwaProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    function onInstallPrompt(e: Event) {
      e.preventDefault();
      window.__droplyInstallPrompt = e as NonNullable<
        Window["__droplyInstallPrompt"]
      >;
      window.dispatchEvent(new Event(INSTALL_PROMPT_EVENT));
    }

    window.addEventListener("beforeinstallprompt", onInstallPrompt);

    if (
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failure is non-fatal — the app still works online.
      });
    }

    return () =>
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
  }, []);

  return <>{children}</>;
}

export { INSTALL_PROMPT_EVENT };
