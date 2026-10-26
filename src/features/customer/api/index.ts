/* Demo storefront state — the connected catalog + cart/order mutations every
   customer screen uses. Replace with real apiClient calls when the backend
   exists (same seam as @/features/vendor/api). */
export {
  useCustomerDemo,
  customerActions,
  getStoreById,
  findProduct,
  getCartStore,
  getCartCount,
  getCartTotals,
  getActiveAddress,
  getRecommended,
  getFavoriteItems,
  getActiveOrders,
  getPastOrders,
  DEMO_CUSTOMER_PROFILE,
} from "./demo-store";
export type { CustomerDemoState } from "./demo-store";

export {
  DEMO_CUSTOMER,
  DELIVERY_ADDRESSES,
  CUSTOMER_CATEGORIES,
  CUSTOMER_STORES,
  CUSTOMER_OFFERS,
  PROMO_CODES,
  CUSTOMER_REWARDS,
  CUSTOMER_FAQS,
} from "./demo-data";

/* Mocked customer auth — sign-in/register mutations, the reactive session
   hook, and signOut. Swap fetchers for apiClient calls when the backend
   exists (same seam as the vendor auth layer). */
export {
  useCustomerLogin,
  useCustomerRegister,
  useCustomerSession,
  readCustomerSession,
  customerAuthActions,
} from "./customer-auth";
