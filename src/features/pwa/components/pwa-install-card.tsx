"use client";

import * as React from "react";
import {
  CheckCircle2,
  Download,
  PlusSquare,
  Share,
  Smartphone,
} from "lucide-react";

import {
  VendorButton,
  VendorCard,
} from "@/features/vendor/components";

type InstallState = "android" | "ios" | "generic" | "installed";

function detectState(): InstallState {
  if (typeof window === "undefined") return "generic";

  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (standalone) return "installed";

  if (window.__droplyInstallPrompt) return "android";

  const ua = navigator.userAgent;
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";

  return "generic";
}

/**
 * "Install app" card — triggers the native install prompt on Android/desktop
 * Chrome when available, and shows Share → Add to Home Screen steps on iOS.
 */
export function PwaInstallCard() {
  const [state, setState] = React.useState<InstallState>("generic");

  React.useEffect(() => {
    // Deferred: initial render must match the server ("generic") for hydration.
    const raf = requestAnimationFrame(() => setState(detectState()));

    function onInstallable() {
      setState((s) => (s === "installed" ? s : "android"));
    }
    function onInstalled() {
      setState("installed");
      window.__droplyInstallPrompt = undefined;
    }

    window.addEventListener("droply:installable", onInstallable);
    window.addEventListener("beforeinstallprompt", onInstallable);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("droply:installable", onInstallable);
      window.removeEventListener("beforeinstallprompt", onInstallable);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    const promptEvent = window.__droplyInstallPrompt;
    if (!promptEvent) return;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      window.__droplyInstallPrompt = undefined;
      setState("installed");
    }
  }

  return (
    <VendorCard className="p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.25)]">
          <Smartphone className="size-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-foreground">
            Install DROPly
          </h2>
          <p className="text-xs text-muted-foreground">
            Add the app to your home screen for faster access and offline
            support.
          </p>
        </div>
      </div>

      {state === "installed" && (
        <p className="mt-4 flex items-center gap-1.5 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="size-4 shrink-0" />
          DROPly is installed on this device.
        </p>
      )}

      {state === "android" && (
        <VendorButton
          size="md"
          className="mt-4 w-auto"
          onClick={install}
        >
          <Download className="size-4" />
          Install app
        </VendorButton>
      )}

      {state === "ios" && (
        <ol className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2.5">
            <Share className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              Tap the <strong className="text-foreground">Share</strong> button
              in Safari&apos;s toolbar.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <PlusSquare className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              Scroll down and tap{" "}
              <strong className="text-foreground">Add to Home Screen</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              Tap <strong className="text-foreground">Add</strong> — DROPly will
              appear on your home screen.
            </span>
          </li>
        </ol>
      )}

      {state === "generic" && (
        <p className="mt-4 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
          To install, open this site in Chrome or Edge and choose{" "}
          <strong className="text-foreground">Install app</strong> from the
          browser menu — or visit on your phone and add it to your home screen.
        </p>
      )}
    </VendorCard>
  );
}
