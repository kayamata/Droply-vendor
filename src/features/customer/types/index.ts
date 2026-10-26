/**
 * Customer storefront domain types.
 *
 * These describe the catalog, cart, and order shapes the customer experience
 * renders today from the demo dataset. When the real API lands, align these
 * with the backend DTOs (see @/shared/types for the response envelope).
 */

/** A sellable item inside a store's menu. */
export interface CustomerProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  /** Menu section name — matches a CustomerCategory.name. */
  category: string;
  /** "Plate", "Wrap", "Combo", ... shown as "per Plate". */
  unit?: string;
  emoji?: string;
  /** Reserved for a future media pipeline — emoji renders today. */
  image?: string;
  popular?: boolean;
  premium?: boolean;
  rating?: number;
  reviewsCount?: number;
}

export type CustomerStoreType = "MAIN DISH" | "FAST FOODS" | "DRINKS";

/** A campus storefront the customer can order from. */
export interface CustomerStore {
  id: string;
  name: string;
  address: string;
  /** Logo tile content — an emoji or a short wordmark like "4U". */
  logo: string;
  logoKind: "emoji" | "wordmark";
  /** Backdrop color for the logo tile. */
  logoBg: string;
  /** Emoji strip shown on the store banner. */
  bannerEmoji: string;
  /** CSS gradient for the store banner. */
  bannerBg: string;
  /** Dark text on the banner (light gradients such as the 4U yellow). */
  bannerTextDark?: boolean;
  openingHours: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  type: CustomerStoreType;
  menu: CustomerProduct[];
}

/** A browsing category on the categories screen. */
export interface CustomerCategory {
  id: string;
  name: string;
  emoji: string;
  /** Tile backdrop color. */
  bg: string;
  /** Tile text color. */
  textColor: string;
}

export interface DeliveryAddress {
  id: string;
  label: string;
  address: string;
  selected: boolean;
}

export interface CartItem {
  product: CustomerProduct;
  quantity: number;
  storeId: string;
}

/**
 * Customer-facing order pipeline. Intentionally close to the vendor
 * OrderStatus so a future backend can map one onto the other.
 */
export type CustomerOrderStatus =
  | "received"
  | "preparing"
  | "courier_at_store"
  | "delivering"
  | "arrived";

export interface CustomerOrder {
  id: string;
  date: string;
  status: CustomerOrderStatus;
  eta: string;
  rider: {
    name: string;
    rating: string;
  };
  deliveryAddress: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  storeName: string;
}

export interface CustomerProfile {
  name: string;
  username: string;
  ordersCount: number;
  rating: number;
  walletBalance: number;
  avatarEmoji: string;
}

/* ------------------------------ auth ------------------------------------- */

/** The signed-in customer — persisted to sessionStorage until sign-out. */
export interface CustomerSession {
  id: string;
  name: string;
  /** Email or phone the customer signed in with. */
  identifier: string;
}

export interface CustomerLoginPayload {
  identifier: string;
  password: string;
}

export interface CustomerRegisterPayload {
  name: string;
  identifier: string;
  password: string;
}

/** A featured offer card on the home screen. */
export interface CustomerOffer {
  id: string;
  storeId: string;
  storeName: string;
  /** Big headline, e.g. "₦500 OFF". */
  title: string;
  subtitle: string;
  /** Emoji or short wordmark in the round badge. */
  mark: string;
  markKind: "emoji" | "wordmark";
  /** Card surface treatment. */
  theme: "dark" | "orange" | "yellow";
}

export interface CustomerReward {
  id: string;
  title: string;
  /** Cost in loyalty points. */
  cost: number;
  description: string;
}

export interface CustomerFaq {
  question: string;
  answer: string;
}
