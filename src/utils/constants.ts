/**
 * App-wide route paths and constants.
 *
 * The vendor portal is mounted under /vendor so the entire experience can be
 * lifted onto a subdomain (e.g. vendor.droply.com) later without rebuilding
 * the UI — only the route base changes.
 */
export const ROUTES = {
  home: "/",
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

/**
 * The customer-facing DROPly storefront.
 * The customer experience is being merged into this app under /customer —
 * once those routes ship, point the account-type card at ROUTES.customer.root
 * instead of this external URL.
 */
export const CUSTOMER_APP_URL = "https://nsuk-taupe.vercel.app";

/** Business categories offered during vendor registration. */
export const VENDOR_CATEGORIES = [
  { value: "food", label: "Food" },
  { value: "restaurant", label: "Restaurant" },
  { value: "bukka", label: "Bukka" },
  { value: "groceries", label: "Groceries" },
  { value: "drinks", label: "Drinks" },
  { value: "other", label: "Other" },
] as const;

/** sessionStorage keys used by the mocked vendor onboarding/auth flow. */
export const STORAGE_KEYS = {
  vendorOnboardingDraft: "droply.vendor.onboarding-draft",
  vendorSession: "droply.vendor.session",
  /** localStorage prefix for a vendor's products — suffixed with the vendor id. */
  vendorProducts: "droply.vendor.products",
} as const;
