/**
 * Vendor domain types.
 *
 * These shapes describe the payloads the vendor portal collects today and the
 * profile/records the backend will eventually own. When the real API lands,
 * align these with the backend DTOs (see @/shared/types for the response
 * envelope).
 */

export type VendorCategoryValue =
  | "food"
  | "restaurant"
  | "bukka"
  | "groceries"
  | "drinks"
  | "other";

/** Step 1 of registration — the vendor's account credentials. */
export interface VendorAccountPayload {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  password: string;
  category: VendorCategoryValue | "";
}

/** Step 2 of registration — the business profile shown to customers. */
export interface VendorBusinessPayload {
  businessName: string;
  description: string;
  category: VendorCategoryValue | "";
  address: string;
  operatingHours: string;
  phone: string;
  /** Optional uploads — held client-side until a media API exists. */
  logo?: File | null;
  coverImage?: File | null;
}

export interface VendorLoginPayload {
  /** Email address or phone number. */
  identifier: string;
  password: string;
}

/** The vendor record as the portal understands it. */
export interface VendorProfile {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: VendorCategoryValue | "";
  onboarded: boolean;
}

/** A future vendor-portal section (dashboard, orders, ...). */
export interface VendorSectionMeta {
  slug: string;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Demo storefront domain — the connected dataset behind the vendor portal.   */
/* -------------------------------------------------------------------------- */

export type StoreStatus = "open" | "busy" | "closed";

export interface StoreProfile {
  businessName: string;
  ownerName: string;
  category: string;
  description: string;
  address: string;
  campus: string;
  phone: string;
  email: string;
  openingHours: string;
  rating: number;
  totalOrders: number;
  status: StoreStatus;
  joinedLabel: string;
}

export type ProductCategory =
  | "Rice"
  | "Swallow & Soups"
  | "Protein"
  | "Fast Food"
  | "Breakfast"
  | "Drinks"
  | "Snacks";

export interface VendorProduct {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  unit: string;
  sold: number;
  available: boolean;
  /** Data-URL preview of the uploaded product image. Emoji shows when absent. */
  imageUrl?: string;
}

export type OrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "completed"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  emoji: string;
  price: number;
  quantity: number;
}

export interface VendorOrder {
  id: string;
  customer: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentStatus: "paid" | "pending";
  placedAt: string; // ISO timestamp
  deliveryTo: string;
  note?: string;
}

export interface VendorCustomer {
  id: string;
  name: string;
  orders: number;
  totalSpent: number;
  lastOrderLabel: string;
  favoriteProduct: string;
}

export type PromotionStatus = "active" | "scheduled" | "paused" | "ended";

export interface VendorPromotion {
  id: string;
  name: string;
  description: string;
  discountLabel: string;
  status: PromotionStatus;
  startLabel: string;
  endLabel: string;
  usageCount: number;
}

export type TransactionKind = "order" | "fee" | "payout" | "adjustment";

export interface VendorTransaction {
  id: string;
  kind: TransactionKind;
  label: string;
  /** Positive = money in, negative = money out. */
  amount: number;
  timestampLabel: string;
}

export interface VendorPayout {
  id: string;
  amount: number;
  dateLabel: string;
  status: "completed" | "processing";
  method: string;
}

export interface VendorReview {
  id: string;
  customer: string;
  rating: number; // 1–5
  text: string;
  dateLabel: string;
  productName: string;
}

export type NotificationKind =
  | "order"
  | "review"
  | "payout"
  | "inventory"
  | "promotion"
  | "system";

export interface VendorNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  timeLabel: string;
  read: boolean;
  /** Optional route the notification links to. */
  href?: string;
}

/** One bar of the revenue chart. */
export interface RevenuePoint {
  label: string;
  value: number;
}
