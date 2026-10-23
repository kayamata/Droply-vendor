"use client";

import * as React from "react";

import {
  CUSTOMER_STORES,
  DELIVERY_ADDRESSES,
  DEMO_CUSTOMER,
  DEMO_ORDER_HISTORY,
  PROMO_CODES,
} from "@/features/customer/api/demo-data";
import type {
  CartItem,
  CustomerOrder,
  CustomerOrderStatus,
  CustomerProduct,
  CustomerStore,
  DeliveryAddress,
} from "@/features/customer/types";

/* -------------------------------------------------------------------------- */
/*  DEMO STORE                                                                 */
/*                                                                             */
/*  Module-level state + useSyncExternalStore so cart, orders, favorites and  */
/*  rewards stay consistent across every customer screen. This is the seam   */
/*  where a real backend plugs in: each action maps to a future apiClient    */
/*  call + React Query invalidation.                                          */
/* -------------------------------------------------------------------------- */

export interface CustomerDemoState {
  cart: CartItem[];
  /** The single store the cart belongs to — adding from another resets it. */
  cartStoreId: string | null;
  addresses: DeliveryAddress[];
  activeOrder: CustomerOrder | null;
  orderHistory: CustomerOrder[];
  favorites: string[];
  promoCode: string;
  promoDiscount: number;
  rewardPoints: number;
  claimedRewards: string[];
  /** Transient toast message (e.g. "Added to cart"). Clears itself. */
  toast: string | null;
}

function buildInitialState(): CustomerDemoState {
  return {
    cart: [],
    cartStoreId: null,
    addresses: DELIVERY_ADDRESSES,
    activeOrder: null,
    orderHistory: DEMO_ORDER_HISTORY,
    favorites: ["to-80", "cz-zobo"],
    promoCode: "",
    promoDiscount: 0,
    rewardPoints: 2450,
    claimedRewards: [],
    toast: null,
  };
}

let state: CustomerDemoState = buildInitialState();

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function setState(updater: (prev: CustomerDemoState) => CustomerDemoState) {
  state = updater(state);
  listeners.forEach((listener) => listener());
}

const getSnapshot = () => state;
const getServerSnapshot = () => state; // static data — identical on SSR

export function useCustomerDemo(): CustomerDemoState {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------------------------- helpers ------------------------------------ */

const nextOrderStatus: Record<CustomerOrderStatus, CustomerOrderStatus> = {
  received: "preparing",
  preparing: "courier_at_store",
  courier_at_store: "delivering",
  delivering: "arrived",
  arrived: "arrived",
};

const nextOrderEta: Partial<Record<CustomerOrderStatus, string>> = {
  preparing: "20 Min",
  courier_at_store: "15 Min",
  delivering: "10 Min",
  arrived: "Arrived",
};

let toastTimer: ReturnType<typeof setTimeout> | undefined;

/* ---------------------------- actions ------------------------------------ */

export const customerActions = {
  /** Add one unit — switching stores clears the cart (one store per order). */
  addToCart(product: CustomerProduct, storeId: string) {
    setState((prev) => {
      if (prev.cartStoreId && prev.cartStoreId !== storeId) {
        return { ...prev, cart: [{ product, quantity: 1, storeId }], cartStoreId: storeId };
      }
      const existing = prev.cart.find((i) => i.product.id === product.id);
      const cart = existing
        ? prev.cart.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev.cart, { product, quantity: 1, storeId }];
      return { ...prev, cart, cartStoreId: prev.cartStoreId ?? storeId };
    });
  },

  removeFromCart(productId: string) {
    setState((prev) => {
      const cart = prev.cart.filter((i) => i.product.id !== productId);
      return { ...prev, cart, cartStoreId: cart.length === 0 ? null : prev.cartStoreId };
    });
  },

  updateQuantity(productId: string, change: number) {
    setState((prev) => {
      const cart = prev.cart
        .map((i) =>
          i.product.id === productId ? { ...i, quantity: i.quantity + change } : i
        )
        .filter((i) => i.quantity > 0);
      return { ...prev, cart, cartStoreId: cart.length === 0 ? null : prev.cartStoreId };
    });
  },

  clearCart() {
    setState((prev) => ({
      ...prev,
      cart: [],
      cartStoreId: null,
      promoCode: "",
      promoDiscount: 0,
    }));
  },

  selectAddress(addressId: string) {
    setState((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({ ...a, selected: a.id === addressId })),
    }));
  },

  /** Apply a promo code; returns whether it was accepted. */
  applyPromo(code: string): boolean {
    const discount = PROMO_CODES[code.trim().toUpperCase()];
    if (!discount) return false;
    setState((prev) => ({
      ...prev,
      promoCode: code.trim().toUpperCase(),
      promoDiscount: discount,
    }));
    return true;
  },

  /** Turn the cart into a tracked order and seed it into history. */
  createOrder() {
    setState((prev) => {
      if (prev.cart.length === 0) return prev;
      const store = prev.cartStoreId
        ? CUSTOMER_STORES.find((s) => s.id === prev.cartStoreId)
        : undefined;
      const { subtotal, deliveryFee, total } = getCartTotals(prev);
      const order: CustomerOrder = {
        id: `#${Math.floor(100000 + Math.random() * 900000)}`,
        date: "Today",
        status: "received",
        eta: store?.deliveryTime ?? "25 Min",
        rider: { name: "Rakibul Hassan", rating: "4.9" },
        deliveryAddress:
          prev.addresses.find((a) => a.selected)?.address ??
          "36 green way, Katampe Extension",
        items: [...prev.cart],
        subtotal,
        deliveryFee,
        total,
        storeName: store?.name ?? "DROPly Store",
      };
      return {
        ...prev,
        activeOrder: order,
        orderHistory: [order, ...prev.orderHistory],
        cart: [],
        cartStoreId: null,
        promoCode: "",
        promoDiscount: 0,
      };
    });
  },

  /** Demo: advance the active order one step along the delivery pipeline. */
  advanceOrderStatus() {
    setState((prev) => {
      if (!prev.activeOrder) return prev;
      const next = nextOrderStatus[prev.activeOrder.status];
      const updated: CustomerOrder = {
        ...prev.activeOrder,
        status: next,
        eta: nextOrderEta[next] ?? prev.activeOrder.eta,
      };
      return {
        ...prev,
        activeOrder: updated,
        orderHistory: prev.orderHistory.map((o) =>
          o.id === updated.id ? updated : o
        ),
      };
    });
  },

  toggleFavorite(productId: string) {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(productId)
        ? prev.favorites.filter((id) => id !== productId)
        : [...prev.favorites, productId],
    }));
  },

  /** Spend loyalty points on a reward; returns whether it succeeded. */
  claimReward(rewardId: string, cost: number): boolean {
    if (state.rewardPoints < cost || state.claimedRewards.includes(rewardId)) {
      return false;
    }
    setState((prev) => ({
      ...prev,
      rewardPoints: prev.rewardPoints - cost,
      claimedRewards: [...prev.claimedRewards, rewardId],
    }));
    return true;
  },

  /** Brief bottom-center toast for cart/claim confirmations. */
  showToast(message: string) {
    setState((prev) => ({ ...prev, toast: message }));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
      () => setState((prev) => ({ ...prev, toast: null })),
      2400
    );
  },
};

/* ---------------------------- selectors ---------------------------------- */

export const DEMO_CUSTOMER_PROFILE = DEMO_CUSTOMER;

export function getStoreById(storeId: string): CustomerStore | undefined {
  return CUSTOMER_STORES.find((s) => s.id === storeId);
}

export function findProduct(productId: string):
  | { product: CustomerProduct; store: CustomerStore }
  | undefined {
  for (const store of CUSTOMER_STORES) {
    const product = store.menu.find((p) => p.id === productId);
    if (product) return { product, store };
  }
  return undefined;
}

export function getCartStore(s: CustomerDemoState): CustomerStore | undefined {
  return s.cartStoreId ? getStoreById(s.cartStoreId) : undefined;
}

export function getCartCount(s: CustomerDemoState): number {
  return s.cart.reduce((sum, i) => sum + i.quantity, 0);
}

export function getCartTotals(s: CustomerDemoState) {
  const subtotal = s.cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const deliveryFee = getCartStore(s)?.deliveryFee ?? 0;
  const total = Math.max(0, subtotal + deliveryFee - s.promoDiscount);
  return { subtotal, deliveryFee, total };
}

export function getActiveAddress(s: CustomerDemoState) {
  return s.addresses.find((a) => a.selected);
}

/** Recommended picks for the home grid — first N items across all stores. */
export function getRecommended(count = 12) {
  return CUSTOMER_STORES.flatMap((store) =>
    store.menu.map((product) => ({ product, store }))
  ).slice(0, count);
}

export function getFavoriteItems(s: CustomerDemoState) {
  return s.favorites
    .map(findProduct)
    .filter((x): x is { product: CustomerProduct; store: CustomerStore } =>
      Boolean(x)
    );
}

export function getActiveOrders(s: CustomerDemoState) {
  return s.orderHistory.filter((o) => o.status !== "arrived");
}

export function getPastOrders(s: CustomerDemoState) {
  return s.orderHistory.filter((o) => o.status === "arrived");
}
