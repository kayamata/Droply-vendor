import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { STORAGE_KEYS } from "@/utils/constants";
import type {
  CustomerLoginPayload,
  CustomerRegisterPayload,
  CustomerSession,
} from "@/features/customer/types";

/* -------------------------------------------------------------------------- */
/*  MOCK DATA LAYER                                                            */
/*                                                                             */
/*  There is no customer backend yet, so these fetchers simulate network       */
/*  latency and persist the session to sessionStorage instead of calling       */
/*  apiClient — the same seam the vendor auth uses. When the real API          */
/*  exists, swap each fetcher body for an apiClient call and move session      */
/*  persistence to NextAuth (see app/api/auth/[...nextauth]).                  */
/* -------------------------------------------------------------------------- */

const MOCK_LATENCY_MS = 900;

function simulateNetwork(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
}

/* ---------------------------- session store -------------------------------- */

const sessionListeners = new Set<() => void>();

function notifySession() {
  sessionListeners.forEach((listener) => listener());
}

function subscribeSession(callback: () => void) {
  sessionListeners.add(callback);
  return () => {
    sessionListeners.delete(callback);
  };
}

/* useSyncExternalStore requires a stable snapshot — cache by the raw string
   so unchanged sessions return the same object reference. */
let cachedRaw: string | null = null;
let cachedSession: CustomerSession | null = null;

export function readCustomerSession(): CustomerSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.customerSession);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedSession = raw
        ? (JSON.parse(raw) as CustomerSession)
        : null;
    }
    return cachedSession;
  } catch {
    return null;
  }
}

const getServerSessionSnapshot = (): CustomerSession | null => null;

/** Reactive read of the signed-in customer — null when logged out. */
export function useCustomerSession(): CustomerSession | null {
  return React.useSyncExternalStore(
    subscribeSession,
    readCustomerSession,
    getServerSessionSnapshot
  );
}

function persistCustomerSession(session: CustomerSession) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    STORAGE_KEYS.customerSession,
    JSON.stringify(session)
  );
  notifySession();
}

/* ------------------------------ fetchers ---------------------------------- */

async function customerLogin(
  payload: CustomerLoginPayload
): Promise<CustomerSession> {
  await simulateNetwork();
  // TODO(backend): POST /auth/customer/login and return the real session.
  const session: CustomerSession = {
    id: `cust-${Date.now()}`,
    name: payload.identifier.includes("@")
      ? payload.identifier.split("@")[0]
      : payload.identifier,
    identifier: payload.identifier.trim(),
  };
  persistCustomerSession(session);
  return session;
}

async function customerRegister(
  payload: CustomerRegisterPayload
): Promise<CustomerSession> {
  await simulateNetwork();
  // TODO(backend): POST /auth/customer/register and return the session.
  const session: CustomerSession = {
    id: `cust-${Date.now()}`,
    name: payload.name.trim(),
    identifier: payload.identifier.trim(),
  };
  persistCustomerSession(session);
  return session;
}

/* ---------------------------- public surface ------------------------------- */

export function useCustomerLogin() {
  return useMutation({ mutationFn: customerLogin });
}

export function useCustomerRegister() {
  return useMutation({ mutationFn: customerRegister });
}

export const customerAuthActions = {
  /** End the session — clears stored credentials and notifies the guard. */
  signOut() {
    sessionStorage.removeItem(STORAGE_KEYS.customerSession);
    notifySession();
  },
};
