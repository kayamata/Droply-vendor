"use client";

import * as React from "react";

import { STORAGE_KEYS } from "@/utils/constants";
import {
  DEMO_CUSTOMERS,
  DEMO_EARNINGS,
  DEMO_MONTH_REVENUE,
  DEMO_NOTIFICATIONS,
  DEMO_ORDERS,
  DEMO_PAYOUTS,
  DEMO_PRODUCTS,
  DEMO_PROMOTIONS,
  DEMO_REVIEWS,
  DEMO_TRANSACTIONS,
  DEMO_VENDOR,
  DEMO_WEEK_REVENUE,
} from "@/features/vendor/api/demo-data";
import type {
  OrderStatus,
  RevenuePoint,
  StoreProfile,
  StoreStatus,
  VendorCustomer,
  VendorNotification,
  VendorOrder,
  VendorPayout,
  VendorProduct,
  VendorPromotion,
  VendorReview,
  VendorTransaction,
} from "@/features/vendor/types";

/* -------------------------------------------------------------------------- */
/*  DEMO STORE                                                                 */
/*                                                                             */
/*  Module-level state + useSyncExternalStore so every mutation (accept an    */
/*  order, toggle a product, pause a promo...) re-renders the whole portal   */
/*  consistently. This is the seam where a real backend plugs in: each       */
/*  action below maps to a future apiClient call + React Query invalidation. */
/* -------------------------------------------------------------------------- */

export interface VendorDemoState {
  vendor: StoreProfile;
  orders: VendorOrder[];
  products: VendorProduct[];
  customers: VendorCustomer[];
  promotions: VendorPromotion[];
  transactions: VendorTransaction[];
  payouts: VendorPayout[];
  reviews: VendorReview[];
  notifications: VendorNotification[];
  earnings: typeof DEMO_EARNINGS;
  /** Transient toast message (e.g. "Product saved"). Clears itself. */
  toast: string | null;
}

function buildInitialState(): VendorDemoState {
  return {
    vendor: DEMO_VENDOR,
    orders: DEMO_ORDERS,
    products: DEMO_PRODUCTS,
    customers: DEMO_CUSTOMERS,
    promotions: DEMO_PROMOTIONS,
    transactions: DEMO_TRANSACTIONS,
    payouts: DEMO_PAYOUTS,
    reviews: DEMO_REVIEWS,
    notifications: DEMO_NOTIFICATIONS,
    earnings: DEMO_EARNINGS,
    toast: null,
  };
}

let state: VendorDemoState = buildInitialState();

/* -------------------------------------------------------------------------- */
/*  Vendor-owned products vs. demo products                                    */
/*                                                                             */
/*  Visitors without a vendor session see the seeded demo catalog (that's    */
/*  the "Demo account" in the header). Once a vendor registers or signs in,   */
/*  their product list is theirs alone — it starts empty and persists to      */
/*  localStorage so uploads survive refresh and re-login until a real        */
/*  backend replaces this layer.                                              */
/* -------------------------------------------------------------------------- */

function readSessionVendorId(): string | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.vendorSession);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { id?: string } | null;
    return parsed && typeof parsed.id === "string" ? parsed.id : null;
  } catch {
    return null;
  }
}

const productsStorageKey = (vendorId: string) =>
  `${STORAGE_KEYS.vendorProducts}.${vendorId}`;

function persistSessionProducts(products: VendorProduct[]) {
  try {
    const vendorId = readSessionVendorId();
    if (!vendorId) return; // demo account — nothing to persist
    localStorage.setItem(productsStorageKey(vendorId), JSON.stringify(products));
  } catch {
    // Storage unavailable/full — the in-memory list still works this session.
  }
}

let hydratedVendorId: string | null = null;

/** Swap the demo catalog for the signed-in vendor's own products — runs on
 *  each mount so logging in mid-session picks up the right catalog. */
function hydrateSessionProducts() {
  if (typeof window === "undefined") return;
  const vendorId = readSessionVendorId();
  if (!vendorId) {
    if (hydratedVendorId) {
      hydratedVendorId = null;
      setState((prev) => ({ ...prev, products: DEMO_PRODUCTS }));
    }
    return;
  }
  if (vendorId === hydratedVendorId) return;
  hydratedVendorId = vendorId;
  let products: VendorProduct[] = [];
  try {
    const saved = localStorage.getItem(productsStorageKey(vendorId));
    products = saved ? (JSON.parse(saved) as VendorProduct[]) : [];
  } catch {
    products = [];
  }
  setState((prev) => ({ ...prev, products }));
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  hydrateSessionProducts();
  return () => {
    listeners.delete(callback);
  };
}

function setState(updater: (prev: VendorDemoState) => VendorDemoState) {
  state = updater(state);
  listeners.forEach((listener) => listener());
}

const getSnapshot = () => state;
const getServerSnapshot = () => state; // static data — identical on SSR

export function useVendorDemo(): VendorDemoState {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------------------------- helpers ------------------------------------ */

const isToday = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

const ACTIVE_STATUSES: OrderStatus[] = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
];

const nowLabel = () =>
  `Today, ${new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;

function pushNotification(
  list: VendorNotification[],
  n: Omit<VendorNotification, "id" | "timeLabel" | "read">
): VendorNotification[] {
  return [
    {
      ...n,
      id: `ntf-${Date.now()}`,
      timeLabel: "Just now",
      read: false,
    },
    ...list,
  ];
}

function pushTransaction(
  list: VendorTransaction[],
  t: Omit<VendorTransaction, "id" | "timestampLabel">
): VendorTransaction[] {
  return [
    {
      ...t,
      id: `txn-${Date.now()}`,
      timestampLabel: nowLabel(),
    },
    ...list,
  ];
}

const nextOrderStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  new: "confirmed",
  confirmed: "preparing",
  preparing: "ready",
  ready: "out_for_delivery",
  out_for_delivery: "completed",
};

let toastTimer: ReturnType<typeof setTimeout> | undefined;

/* ---------------------------- actions ------------------------------------ */

export const vendorDemoActions = {
  /** Advance an order along the pipeline or cancel it. Completing an order
   *  decrements stock, bumps sold counts and posts the earning. */
  setOrderStatus(orderId: string, status: OrderStatus) {
    setState((prev) => {
      const order = prev.orders.find((o) => o.id === orderId);
      if (!order || order.status === status) return prev;

      let products = prev.products;
      let transactions = prev.transactions;
      let earnings = prev.earnings;
      let notifications = prev.notifications;

      if (status === "completed" && order.status !== "completed") {
        // Stock out the purchased items.
        products = prev.products.map((p) => {
          const line = order.items.find((i) => i.productId === p.id);
          return line
            ? {
                ...p,
                stock: Math.max(0, p.stock - line.quantity),
                sold: p.sold + line.quantity,
              }
            : p;
        });
        if (order.paymentStatus === "paid") {
          transactions = pushTransaction(transactions, {
            kind: "order",
            label: `Order #${order.id}`,
            amount: order.total,
          });
          earnings = {
            ...earnings,
            totalRevenue: earnings.totalRevenue + order.total,
            availableBalance: earnings.availableBalance + order.total,
          };
        }
        notifications = pushNotification(notifications, {
          kind: "order",
          title: "Order completed",
          body: `#${order.id} — ${order.customer} · delivered.`,
          href: "/vendor/orders",
        });
      }

      if (status === "new" || status === "confirmed" || status === "preparing" || status === "ready" || status === "out_for_delivery") {
        notifications = pushNotification(notifications, {
          kind: "order",
          title: "Order updated",
          body: `#${order.id} → ${status.replace(/_/g, " ")}.`,
          href: "/vendor/orders",
        });
      }

      return {
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === orderId ? { ...o, status } : o
        ),
        products,
        transactions,
        earnings,
        notifications,
      };
    });
  },

  advanceOrder(orderId: string) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;
    const next = nextOrderStatus[order.status];
    if (next) vendorDemoActions.setOrderStatus(orderId, next);
  },

  /** Simulate the customer app pinging a fresh order into the queue. */
  simulateNewOrder() {
    setState((prev) => {
      const menu = prev.products.filter((p) => p.available && p.stock > 0);
      if (menu.length === 0) return prev;
      const seed = Date.now();
      const pick = menu[seed % menu.length];
      const names = ["Ngozi I.", "Emeka O.", "Hauwa M.", "Seun A.", "Kelechi N."];
      const hostels = ["Amina Hall", "Male Hostel B", "Female Hostel C", "Katampe Extension"];
      const id = `DRP-${10483 + (seed % 97)}`;
      const total = pick.price + 500;
      const order: VendorOrder = {
        id,
        customer: names[seed % names.length],
        customerPhone: "0812 345 6789",
        items: [
          {
            productId: pick.id,
            name: pick.name,
            emoji: pick.emoji,
            price: pick.price,
            quantity: 1,
          },
        ],
        subtotal: pick.price,
        deliveryFee: 500,
        total,
        status: "new",
        paymentStatus: "paid",
        placedAt: new Date().toISOString(),
        deliveryTo: hostels[seed % hostels.length],
      };
      return {
        ...prev,
        orders: [order, ...prev.orders],
        transactions: pushTransaction(prev.transactions, {
          kind: "order",
          label: `Order #${id}`,
          amount: total,
        }),
        notifications: pushNotification(prev.notifications, {
          kind: "order",
          title: "New order received",
          body: `#${id} — ${pick.name} · ₦${total.toLocaleString("en-NG")}`,
          href: "/vendor/orders",
        }),
      };
    });
  },

  setProductAvailability(productId: string, available: boolean) {
    setState((prev) => {
      const products = prev.products.map((p) =>
        p.id === productId ? { ...p, available } : p
      );
      persistSessionProducts(products);
      return { ...prev, products };
    });
  },

  saveProduct(product: VendorProduct) {
    setState((prev) => {
      const exists = prev.products.some((p) => p.id === product.id);
      const products = exists
        ? prev.products.map((p) => (p.id === product.id ? product : p))
        : [product, ...prev.products];
      persistSessionProducts(products);
      return { ...prev, products };
    });
  },

  deleteProduct(productId: string) {
    setState((prev) => {
      const products = prev.products.filter((p) => p.id !== productId);
      persistSessionProducts(products);
      return { ...prev, products };
    });
  },

  restockProduct(productId: string, amount: number) {
    setState((prev) => {
      const products = prev.products.map((p) =>
        p.id === productId
          ? { ...p, stock: Math.max(0, p.stock + amount) }
          : p
      );
      persistSessionProducts(products);
      return { ...prev, products };
    });
  },

  savePromotion(promo: VendorPromotion) {
    setState((prev) => {
      const exists = prev.promotions.some((p) => p.id === promo.id);
      return {
        ...prev,
        promotions: exists
          ? prev.promotions.map((p) => (p.id === promo.id ? promo : p))
          : [promo, ...prev.promotions],
      };
    });
  },

  setPromotionStatus(promoId: string, status: VendorPromotion["status"]) {
    setState((prev) => ({
      ...prev,
      promotions: prev.promotions.map((p) =>
        p.id === promoId ? { ...p, status } : p
      ),
    }));
  },

  deletePromotion(promoId: string) {
    setState((prev) => ({
      ...prev,
      promotions: prev.promotions.filter((p) => p.id !== promoId),
    }));
  },

  /** Demo payout flow — moves available balance into a processing payout. */
  requestPayout(amount: number) {
    setState((prev) => {
      const safe = Math.min(Math.max(0, amount), prev.earnings.availableBalance);
      if (safe <= 0) return prev;
      const payout: VendorPayout = {
        id: `pay-${Date.now()}`,
        amount: safe,
        dateLabel: "Today",
        status: "processing",
        method: "GTBank ••4521",
      };
      return {
        ...prev,
        earnings: {
          ...prev.earnings,
          availableBalance: prev.earnings.availableBalance - safe,
          pendingPayout: prev.earnings.pendingPayout + safe,
        },
        payouts: [payout, ...prev.payouts],
        transactions: pushTransaction(prev.transactions, {
          kind: "payout",
          label: `Payout to ${payout.method}`,
          amount: -safe,
        }),
        notifications: pushNotification(prev.notifications, {
          kind: "payout",
          title: "Payout requested",
          body: `₦${safe.toLocaleString("en-NG")} to ${payout.method} is processing.`,
          href: "/vendor/payouts",
        }),
      };
    });
  },

  markNotificationRead(id: string) {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllNotificationsRead() {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  /** Brief bottom-center toast for save/delete confirmations. */
  showToast(message: string) {
    setState((prev) => ({ ...prev, toast: message }));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
      () => setState((prev) => ({ ...prev, toast: null })),
      2800
    );
  },

  setStoreStatus(status: StoreStatus) {
    setState((prev) => ({ ...prev, vendor: { ...prev.vendor, status } }));
  },

  updateStoreProfile(patch: Partial<StoreProfile>) {
    setState((prev) => ({ ...prev, vendor: { ...prev.vendor, ...patch } }));
  },
};

/* ---------------------------- selectors ---------------------------------- */

function todaysOrders(orders: VendorOrder[]) {
  return orders.filter((o) => isToday(o.placedAt));
}

function todaysRevenue(orders: VendorOrder[]) {
  return todaysOrders(orders)
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
}

/** Stats for the dashboard cards — all derived from the live order list. */
export function getDashboardStats(s: VendorDemoState) {
  const today = todaysOrders(s.orders);
  const active = today.filter((o) => ACTIVE_STATUSES.includes(o.status));
  const completed = today.filter((o) => o.status === "completed");
  const revenue = todaysRevenue(s.orders);
  const paidCount = today.length - today.filter((o) => o.status === "cancelled").length;
  return {
    todayOrders: today.length,
    todayRevenue: revenue,
    pendingOrders: active.length,
    completedOrders: completed.length,
    totalCustomers: 862,
    avgOrderValue: paidCount > 0 ? Math.round(revenue / paidCount) : 0,
  };
}

/** Last 7 days of revenue — today's bar reflects the live order sum. */
export function getWeekRevenue(s: VendorDemoState): RevenuePoint[] {
  const points: RevenuePoint[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const label = d.toLocaleDateString("en-US", { weekday: "short" });
    points.push({
      label,
      value: i === 0 ? todaysRevenue(s.orders) : (DEMO_WEEK_REVENUE[(d.getDay() + 6) % 7]?.value ?? 48000),
    });
  }
  return points;
}

export function getMonthRevenue(): RevenuePoint[] {
  return DEMO_MONTH_REVENUE;
}

export function getStockStatus(p: VendorProduct): "in_stock" | "low" | "out" {
  if (p.stock === 0) return "out";
  if (p.stock <= 10) return "low";
  return "in_stock";
}

export function getTopProducts(s: VendorDemoState, count = 5) {
  return [...s.products].sort((a, b) => b.sold - a.sold).slice(0, count);
}

export function getUnreadCount(s: VendorDemoState) {
  return s.notifications.filter((n) => !n.read).length;
}
