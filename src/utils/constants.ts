/**
 * App-wide route paths and constants.
 *
 * The vendor portal is mounted under /vendor so the entire experience can be
 * lifted onto a subdomain (e.g. vendor.droply.com) later without rebuilding
 * the UI — only the route base changes.
 */
export const ROUTES = {
  home: "/",
  customer: {
    root: "/customer",
    login: "/customer/login",
    register: "/customer/register",
    categories: "/customer/categories",
    stores: "/customer/stores",
    store: (storeId: string) => `/customer/stores/${storeId}`,
    storeCategory: (storeId: string, category: string) =>
      `/customer/stores/${storeId}/category/${encodeURIComponent(category)}`,
    product: (productId: string) => `/customer/products/${productId}`,
    cart: "/customer/cart",
    checkout: "/customer/checkout",
    payment: "/customer/checkout/payment",
    orderConfirmation: "/customer/order-confirmation",
    favorites: "/customer/favorites",
    profile: "/customer/profile",
    orders: "/customer/profile/orders",
    rewards: "/customer/profile/rewards",
    notifications: "/customer/profile/notifications",
    faq: "/customer/profile/faq",
  },
  vendor: {
    root: "/vendor",
    login: "/vendor/login",
    register: "/vendor/register",
    onboarding: "/vendor/onboarding",
    dashboard: "/vendor/dashboard",
    orders: "/vendor/orders",
    menu: "/vendor/menu",
    products: "/vendor/products",
    inventory: "/vendor/inventory",
    analytics: "/vendor/analytics",
    payouts: "/vendor/payouts",
    promotions: "/vendor/promotions",
    settings: "/vendor/settings",
  },
} as const;

/** Business categories offered during vendor registration. */
export const VENDOR_CATEGORIES = [
  { value: "food", label: "Food" },
  { value: "restaurant", label: "Restaurant" },
  { value: "bukka", label: "Bukka" },
  { value: "groceries", label: "Groceries" },
  { value: "drinks", label: "Drinks" },
  { value: "other", label: "Other" },
] as const;

/** sessionStorage keys used by the mocked auth flows (no backend yet). */
export const STORAGE_KEYS = {
  customerSession: "droply.customer.session",
  vendorOnboardingDraft: "droply.vendor.onboarding-draft",
  vendorSession: "droply.vendor.session",
  /** localStorage prefix for a vendor's products — suffixed with the vendor id. */
  vendorProducts: "droply.vendor.products",
} as const;
