import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { STORAGE_KEYS } from "@/utils/constants";
import type {
  VendorAccountPayload,
  VendorBusinessPayload,
  VendorLoginPayload,
  VendorProfile,
} from "@/features/vendor/types";

/* -------------------------------------------------------------------------- */
/*  MOCK DATA LAYER                                                            */
/*                                                                             */
/*  There is no vendor backend yet, so these fetchers simulate network         */
/*  latency and persist to sessionStorage instead of calling apiClient.        */
/*                                                                             */
/*  When the real API exists, replace each fetcher body with an apiClient      */
/*  call, e.g.:                                                                */
/*    const { data } = await apiClient.post("/auth/vendor/login", payload);    */
/*  and move session persistence to NextAuth (see app/api/auth/[...nextauth]). */
/* -------------------------------------------------------------------------- */

const MOCK_LATENCY_MS = 900;

function simulateNetwork(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
}

function persistMockSession(vendor: VendorProfile) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEYS.vendorSession, JSON.stringify(vendor));
  notifyVendorSession();
}

/* ---------------------------- session store -------------------------------- */

const sessionListeners = new Set<() => void>();

function notifyVendorSession() {
  sessionListeners.forEach((listener) => listener());
}

function subscribeVendorSession(callback: () => void) {
  sessionListeners.add(callback);
  return () => {
    sessionListeners.delete(callback);
  };
}

/* useSyncExternalStore requires a stable snapshot — cache by the raw string
   so unchanged sessions return the same object reference. */
let cachedRaw: string | null = null;
let cachedSession: VendorProfile | null = null;

export function readVendorSession(): VendorProfile | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.vendorSession);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedSession = raw ? (JSON.parse(raw) as VendorProfile) : null;
    }
    return cachedSession;
  } catch {
    return null;
  }
}

const getServerSessionSnapshot = (): VendorProfile | null => null;

/** Reactive read of the signed-in vendor — null when logged out. */
export function useVendorSession(): VendorProfile | null {
  return React.useSyncExternalStore(
    subscribeVendorSession,
    readVendorSession,
    getServerSessionSnapshot
  );
}

export const vendorAuthActions = {
  /** End the vendor session and drop any in-progress onboarding draft. */
  signOut() {
    sessionStorage.removeItem(STORAGE_KEYS.vendorSession);
    sessionStorage.removeItem(STORAGE_KEYS.vendorOnboardingDraft);
    notifyVendorSession();
  },
};

// --- Raw fetchers (private — swap internals for apiClient when ready) ---

async function vendorLogin(payload: VendorLoginPayload): Promise<VendorProfile> {
  await simulateNetwork();
  // TODO(backend): POST /auth/vendor/login and return the real vendor profile.
  const vendor: VendorProfile = {
    id: "demo-vendor",
    businessName: "Your Business",
    ownerName: "Vendor",
    email: payload.identifier.includes("@") ? payload.identifier : "",
    phone: payload.identifier.includes("@") ? "" : payload.identifier,
    category: "",
    onboarded: true,
  };
  persistMockSession(vendor);
  return vendor;
}

async function vendorRegisterAccount(
  payload: VendorAccountPayload
): Promise<VendorProfile> {
  await simulateNetwork();
  // TODO(backend): POST /auth/vendor/register and return the created vendor.
  const vendor: VendorProfile = {
    id: "demo-vendor",
    businessName: payload.businessName,
    ownerName: payload.ownerName,
    email: payload.email,
    phone: payload.phone,
    category: payload.category,
    onboarded: false,
  };
  persistMockSession(vendor);
  return vendor;
}

async function vendorSubmitBusiness(
  payload: VendorBusinessPayload
): Promise<VendorProfile> {
  await simulateNetwork();
  // TODO(backend): POST /vendor/profile (multipart for logo/coverImage).
  const vendor: VendorProfile = {
    id: "demo-vendor",
    businessName: payload.businessName,
    ownerName: "Vendor",
    email: "",
    phone: payload.phone,
    category: payload.category,
    onboarded: true,
  };
  persistMockSession(vendor);
  return vendor;
}

// --- React Query hooks (the public surface of this layer) ---

export function useVendorLogin() {
  return useMutation({ mutationFn: vendorLogin });
}

export function useVendorRegister() {
  return useMutation({ mutationFn: vendorRegisterAccount });
}

export function useVendorOnboardingSubmit() {
  return useMutation({ mutationFn: vendorSubmitBusiness });
}

/* Demo storefront state — the connected dataset + mutations every page uses.
   Replace with real apiClient calls when the backend exists. */
export {
  useVendorDemo,
  vendorDemoActions,
  getDashboardStats,
  getWeekRevenue,
  getMonthRevenue,
  getStockStatus,
  getTopProducts,
  getUnreadCount,
} from "./demo-store";
export type { VendorDemoState } from "./demo-store";
