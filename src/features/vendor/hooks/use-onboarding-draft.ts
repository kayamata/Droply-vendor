"use client";

import * as React from "react";

import { STORAGE_KEYS } from "@/utils/constants";
import type { VendorAccountPayload } from "@/features/vendor/types";

/**
 * Persists the step-1 registration payload between /vendor/register and
 * /vendor/onboarding so the multi-step flow survives navigation and reloads.
 * Replaced by server-side onboarding state once the backend exists.
 *
 * Backed by sessionStorage via useSyncExternalStore — no effects, no
 * hydration mismatch (the server snapshot is always null).
 */

let cachedRaw: string | null | undefined;
let cachedDraft: VendorAccountPayload | null = null;

function readDraft(): VendorAccountPayload | null {
  const raw = sessionStorage.getItem(STORAGE_KEYS.vendorOnboardingDraft);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedDraft = raw ? (JSON.parse(raw) as VendorAccountPayload) : null;
    } catch {
      cachedDraft = null;
    }
  }
  return cachedDraft;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function emit() {
  cachedRaw = undefined; // force the next read to hit storage
  listeners.forEach((listener) => listener());
}

export function useOnboardingDraft() {
  const draft = React.useSyncExternalStore(subscribe, readDraft, () => null);

  const saveDraft = React.useCallback((payload: VendorAccountPayload) => {
    try {
      sessionStorage.setItem(
        STORAGE_KEYS.vendorOnboardingDraft,
        JSON.stringify(payload)
      );
    } catch {
      // Storage unavailable — draft persists for the session via the store.
    }
    cachedDraft = payload;
    emit();
  }, []);

  const clearDraft = React.useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.vendorOnboardingDraft);
    } catch {
      // ignore
    }
    cachedDraft = null;
    cachedRaw = null;
    emit();
  }, []);

  return { draft, saveDraft, clearDraft };
}
