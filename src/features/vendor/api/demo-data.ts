import type {
  ProductCategory,
  RevenuePoint,
  StoreProfile,
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
/*  CENTRAL DEMO DATASET                                                       */
/*                                                                             */
/*  One interconnected fake dataset for the whole vendor portal. Dashboard     */
/*  stats, orders, products, inventory, earnings, analytics, customers,        */
/*  reviews and notifications all derive from these records so the numbers   */
/*  agree everywhere. When the real API exists this file is replaced by      */
/*  apiClient fetchers — the store (demo-store.ts) already isolates the      */
/*  swap.                                                                    */
/* -------------------------------------------------------------------------- */

/** Today at a specific local time — keeps order timestamps "today". */
function todayAt(hour: number, minute: number): string {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function daysAgoAt(days: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const DEMO_VENDOR: StoreProfile = {
  businessName: "Campus Bites",
  ownerName: "Daniel Okafor",
  category: "Food & Restaurant",
  description:
    "Home-style Nigerian meals, grills and drinks made fresh for NSUK students. Fast pickup and hostel delivery, every day.",
  address: "Shop 4, Student Union Building",
  campus: "NSUK Campus, Keffi",
  phone: "0803 456 7890",
  email: "hello@campusbites.ng",
  openingHours: "Mon – Sat · 8:00 AM – 9:00 PM",
  rating: 4.8,
  totalOrders: 1248,
  status: "open",
  joinedLabel: "June 2025",
};

export const DEMO_PRODUCTS: VendorProduct[] = [
  { id: "p-jollof", name: "Jollof Rice", emoji: "🍛", description: "Smoky party-style jollof, single portion.", price: 2500, category: "Rice", stock: 34, unit: "portions", sold: 312, available: true },
  { id: "p-fried-rice", name: "Fried Rice", emoji: "🍚", description: "Vegetable fried rice cooked fresh daily.", price: 2800, category: "Rice", stock: 26, unit: "portions", sold: 204, available: true },
  { id: "p-jollof-chicken", name: "Jollof Rice + Chicken", emoji: "🍛", description: "Jollof rice with a quarter peppered chicken.", price: 4500, category: "Rice", stock: 18, unit: "combos", sold: 287, available: true },
  { id: "p-white-rice", name: "White Rice & Stew", emoji: "🍚", description: "White rice with rich tomato stew.", price: 2200, category: "Rice", stock: 22, unit: "portions", sold: 156, available: true },
  { id: "p-egusi-fufu", name: "Egusi Soup + Fufu", emoji: "🥣", description: "Melon-seed soup with soft fufu.", price: 3000, category: "Swallow & Soups", stock: 15, unit: "plates", sold: 178, available: true },
  { id: "p-ogbono-eba", name: "Ogbono Soup + Eba", emoji: "🥘", description: "Draw soup served with yellow eba.", price: 2800, category: "Swallow & Soups", stock: 12, unit: "plates", sold: 132, available: true },
  { id: "p-pepper-soup", name: "Chicken Pepper Soup", emoji: "🍲", description: "Spicy pepper soup with chicken cuts.", price: 2500, category: "Swallow & Soups", stock: 9, unit: "bowls", sold: 96, available: true },
  { id: "p-chicken", name: "Peppered Chicken", emoji: "🍗", description: "Quarter chicken in pepper sauce.", price: 2000, category: "Protein", stock: 8, unit: "pieces", sold: 241, available: true },
  { id: "p-beef", name: "Peppered Beef", emoji: "🥩", description: "Two pieces of soft peppered beef.", price: 1500, category: "Protein", stock: 14, unit: "portions", sold: 189, available: true },
  { id: "p-shawarma", name: "Chicken Shawarma", emoji: "🌯", description: "Double-wrapped shawarma with extra sauce.", price: 3500, category: "Fast Food", stock: 0, unit: "wraps", sold: 263, available: true },
  { id: "p-burger", name: "Chicken Burger", emoji: "🍔", description: "Crispy chicken burger with fries.", price: 4000, category: "Fast Food", stock: 11, unit: "pieces", sold: 147, available: true },
  { id: "p-indomie", name: "Indomie + Egg", emoji: "🍜", description: "Stir-fried noodles with fried egg.", price: 2000, category: "Fast Food", stock: 20, unit: "packs", sold: 171, available: true },
  { id: "p-egg-bread", name: "Egg Sauce + Bread", emoji: "🍳", description: "Campus breakfast classic.", price: 1800, category: "Breakfast", stock: 16, unit: "plates", sold: 118, available: true },
  { id: "p-moimoi", name: "Moi Moi", emoji: "🫘", description: "Steamed bean pudding, comes with fish.", price: 800, category: "Breakfast", stock: 21, unit: "wraps", sold: 142, available: true },
  { id: "p-plantain", name: "Fried Plantain", emoji: "🍌", description: "Golden sweet plantain side.", price: 1000, category: "Snacks", stock: 18, unit: "portions", sold: 134, available: true },
  { id: "p-meatpie", name: "Meat Pie", emoji: "🥟", description: "Flaky pastry with minced beef filling.", price: 1200, category: "Snacks", stock: 7, unit: "pieces", sold: 128, available: true },
  { id: "p-puffpuff", name: "Puff Puff (6 pcs)", emoji: "🧆", description: "Six soft puff puff balls.", price: 1000, category: "Snacks", stock: 25, unit: "packs", sold: 167, available: true },
  { id: "p-coke", name: "Coke 50cl", emoji: "🥤", description: "Chilled Coca-Cola PET bottle.", price: 800, category: "Drinks", stock: 4, unit: "bottles", sold: 298, available: true },
  { id: "p-water", name: "Bottled Water 75cl", emoji: "💧", description: "Chilled bottled water.", price: 500, category: "Drinks", stock: 62, unit: "bottles", sold: 355, available: true },
  { id: "p-chapman", name: "Chapman", emoji: "🍹", description: "Classic Nigerian mocktail, chilled.", price: 1500, category: "Drinks", stock: 10, unit: "cups", sold: 89, available: true },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Rice",
  "Swallow & Soups",
  "Protein",
  "Fast Food",
  "Breakfast",
  "Drinks",
  "Snacks",
];

const product = (id: string) => {
  const p = DEMO_PRODUCTS.find((p) => p.id === id);
  if (!p) throw new Error(`Unknown demo product: ${id}`);
  return p;
};

const item = (id: string, quantity: number) => {
  const p = product(id);
  return { productId: p.id, name: p.name, emoji: p.emoji, price: p.price, quantity };
};

interface OrderSeed {
  id: string;
  customer: string;
  customerPhone: string;
  items: [productId: string, quantity: number][];
  status: VendorOrder["status"];
  paymentStatus: VendorOrder["paymentStatus"];
  placedAt: string;
  deliveryTo: string;
  note?: string;
}

function makeOrder(seed: OrderSeed): VendorOrder {
  const items = seed.items.map(([id, qty]) => item(id, qty));
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = 500;
  return {
    id: seed.id,
    customer: seed.customer,
    customerPhone: seed.customerPhone,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    status: seed.status,
    paymentStatus: seed.paymentStatus,
    placedAt: seed.placedAt,
    deliveryTo: seed.deliveryTo,
    note: seed.note,
  };
}

const PHONE = "0812 345 6789";

export const DEMO_ORDERS: VendorOrder[] = [
  // --- Today's live queue ---
  makeOrder({ id: "DRP-10482", customer: "Sarah A.", customerPhone: PHONE, items: [["p-jollof-chicken", 1], ["p-coke", 1]], status: "new", paymentStatus: "paid", placedAt: todayAt(12, 42), deliveryTo: "Amina Hall, Room 12", note: "Extra pepper please." }),
  makeOrder({ id: "DRP-10481", customer: "Michael O.", customerPhone: PHONE, items: [["p-shawarma", 2], ["p-coke", 1]], status: "new", paymentStatus: "paid", placedAt: todayAt(12, 15), deliveryTo: "Male Hostel B" }),
  makeOrder({ id: "DRP-10480", customer: "David K.", customerPhone: PHONE, items: [["p-indomie", 1], ["p-water", 1]], status: "new", paymentStatus: "pending", placedAt: todayAt(12, 3), deliveryTo: "Katampe Extension" }),
  makeOrder({ id: "DRP-10479", customer: "Grace E.", customerPhone: PHONE, items: [["p-egusi-fufu", 2]], status: "confirmed", paymentStatus: "paid", placedAt: todayAt(11, 48), deliveryTo: "Female Hostel C" }),
  makeOrder({ id: "DRP-10478", customer: "Joshua P.", customerPhone: PHONE, items: [["p-burger", 1], ["p-chapman", 1]], status: "preparing", paymentStatus: "paid", placedAt: todayAt(11, 32), deliveryTo: "Faculty of Science" }),
  makeOrder({ id: "DRP-10477", customer: "Amara N.", customerPhone: PHONE, items: [["p-fried-rice", 1], ["p-chicken", 1]], status: "preparing", paymentStatus: "paid", placedAt: todayAt(11, 20), deliveryTo: "Amina Hall" }),
  makeOrder({ id: "DRP-10476", customer: "Tunde B.", customerPhone: PHONE, items: [["p-ogbono-eba", 1], ["p-beef", 2]], status: "preparing", paymentStatus: "paid", placedAt: todayAt(11, 5), deliveryTo: "Male Hostel A" }),
  makeOrder({ id: "DRP-10475", customer: "Fatima S.", customerPhone: PHONE, items: [["p-white-rice", 1], ["p-moimoi", 1], ["p-water", 1]], status: "ready", paymentStatus: "paid", placedAt: todayAt(10, 51), deliveryTo: "Pickup — Shop 4" }),
  makeOrder({ id: "DRP-10474", customer: "Chidi E.", customerPhone: PHONE, items: [["p-shawarma", 1], ["p-meatpie", 1]], status: "ready", paymentStatus: "paid", placedAt: todayAt(10, 38), deliveryTo: "Male Hostel B" }),
  makeOrder({ id: "DRP-10473", customer: "Blessing O.", customerPhone: PHONE, items: [["p-jollof", 2], ["p-water", 2]], status: "out_for_delivery", paymentStatus: "paid", placedAt: todayAt(10, 15), deliveryTo: "Female Hostel A" }),
  makeOrder({ id: "DRP-10472", customer: "Sarah A.", customerPhone: PHONE, items: [["p-egg-bread", 1], ["p-coke", 1]], status: "out_for_delivery", paymentStatus: "paid", placedAt: todayAt(9, 58), deliveryTo: "Amina Hall, Room 12" }),
  makeOrder({ id: "DRP-10471", customer: "Michael O.", customerPhone: PHONE, items: [["p-pepper-soup", 1], ["p-water", 1]], status: "completed", paymentStatus: "paid", placedAt: todayAt(9, 40), deliveryTo: "Male Hostel B" }),
  makeOrder({ id: "DRP-10470", customer: "David K.", customerPhone: PHONE, items: [["p-burger", 1], ["p-puffpuff", 1]], status: "completed", paymentStatus: "paid", placedAt: todayAt(9, 22), deliveryTo: "Katampe Extension" }),
  makeOrder({ id: "DRP-10469", customer: "Grace E.", customerPhone: PHONE, items: [["p-jollof-chicken", 1], ["p-chapman", 1]], status: "completed", paymentStatus: "paid", placedAt: todayAt(9, 5), deliveryTo: "Female Hostel C" }),
  makeOrder({ id: "DRP-10468", customer: "Amara N.", customerPhone: PHONE, items: [["p-fried-rice", 2]], status: "completed", paymentStatus: "paid", placedAt: todayAt(8, 47), deliveryTo: "Amina Hall" }),
  makeOrder({ id: "DRP-10467", customer: "Joshua P.", customerPhone: PHONE, items: [["p-shawarma", 1], ["p-coke", 1]], status: "completed", paymentStatus: "paid", placedAt: todayAt(8, 30), deliveryTo: "Faculty of Science" }),
  makeOrder({ id: "DRP-10466", customer: "Tunde B.", customerPhone: PHONE, items: [["p-egusi-fufu", 1], ["p-chicken", 1]], status: "completed", paymentStatus: "paid", placedAt: todayAt(8, 12), deliveryTo: "Male Hostel A" }),
  makeOrder({ id: "DRP-10465", customer: "Fatima S.", customerPhone: PHONE, items: [["p-meatpie", 3]], status: "cancelled", paymentStatus: "pending", placedAt: todayAt(8, 0), deliveryTo: "Female Hostel A", note: "Cancelled by customer — payment not captured." }),
  // --- Earlier history (drives customer stats) ---
  makeOrder({ id: "DRP-10455", customer: "Sarah A.", customerPhone: PHONE, items: [["p-jollof", 1], ["p-plantain", 1], ["p-coke", 1]], status: "completed", paymentStatus: "paid", placedAt: daysAgoAt(1, 19, 20), deliveryTo: "Amina Hall, Room 12" }),
  makeOrder({ id: "DRP-10448", customer: "Michael O.", customerPhone: PHONE, items: [["p-burger", 2], ["p-chapman", 2]], status: "completed", paymentStatus: "paid", placedAt: daysAgoAt(1, 16, 45), deliveryTo: "Male Hostel B" }),
  makeOrder({ id: "DRP-10441", customer: "Grace E.", customerPhone: PHONE, items: [["p-egusi-fufu", 1], ["p-water", 1]], status: "completed", paymentStatus: "paid", placedAt: daysAgoAt(1, 13, 10), deliveryTo: "Female Hostel C" }),
  makeOrder({ id: "DRP-10436", customer: "Joshua P.", customerPhone: PHONE, items: [["p-jollof-chicken", 2]], status: "completed", paymentStatus: "paid", placedAt: daysAgoAt(2, 18, 30), deliveryTo: "Faculty of Science" }),
  makeOrder({ id: "DRP-10429", customer: "Amara N.", customerPhone: PHONE, items: [["p-white-rice", 1], ["p-moimoi", 2]], status: "completed", paymentStatus: "paid", placedAt: daysAgoAt(2, 12, 55), deliveryTo: "Amina Hall" }),
];

export const DEMO_CUSTOMERS: VendorCustomer[] = [
  { id: "c-sarah", name: "Sarah A.", orders: 24, totalSpent: 96400, lastOrderLabel: "Today, 12:42 PM", favoriteProduct: "Jollof Rice + Chicken" },
  { id: "c-michael", name: "Michael O.", orders: 19, totalSpent: 81200, lastOrderLabel: "Today, 12:15 PM", favoriteProduct: "Chicken Shawarma" },
  { id: "c-david", name: "David K.", orders: 17, totalSpent: 58900, lastOrderLabel: "Today, 12:03 PM", favoriteProduct: "Chicken Burger" },
  { id: "c-grace", name: "Grace E.", orders: 15, totalSpent: 64500, lastOrderLabel: "Today, 11:48 AM", favoriteProduct: "Egusi Soup + Fufu" },
  { id: "c-joshua", name: "Joshua P.", orders: 13, totalSpent: 52300, lastOrderLabel: "Today, 11:32 AM", favoriteProduct: "Jollof Rice + Chicken" },
  { id: "c-amara", name: "Amara N.", orders: 12, totalSpent: 47800, lastOrderLabel: "Today, 11:20 AM", favoriteProduct: "Fried Rice" },
  { id: "c-tunde", name: "Tunde B.", orders: 11, totalSpent: 41100, lastOrderLabel: "Today, 11:05 AM", favoriteProduct: "Ogbono Soup + Eba" },
  { id: "c-fatima", name: "Fatima S.", orders: 9, totalSpent: 33700, lastOrderLabel: "Today, 10:51 AM", favoriteProduct: "White Rice & Stew" },
];

export const DEMO_PROMOTIONS: VendorPromotion[] = [
  { id: "promo-lunch", name: "Student Lunch Deal", description: "10% off all Rice dishes between 11 AM and 3 PM.", discountLabel: "10% OFF", status: "active", startLabel: "Sep 15", endLabel: "Oct 15", usageCount: 86 },
  { id: "promo-shawarma", name: "Buy 2 Shawarma, Get Coke Free", description: "Free chilled Coke with any two shawarma wraps.", discountLabel: "FREE ITEM", status: "active", startLabel: "Sep 20", endLabel: "Oct 4", usageCount: 41 },
  { id: "promo-weekend", name: "Weekend Special", description: "15% off Swallow & Soups on Saturdays and Sundays.", discountLabel: "15% OFF", status: "scheduled", startLabel: "Sep 27", endLabel: "Oct 26", usageCount: 0 },
  { id: "promo-freshers", name: "Freshers Discount", description: "20% off first orders for new students.", discountLabel: "20% OFF", status: "ended", startLabel: "Aug 20", endLabel: "Sep 10", usageCount: 214 },
];

export const DEMO_TRANSACTIONS: VendorTransaction[] = [
  { id: "txn-10482", kind: "order", label: "Order #DRP-10482", amount: 5800, timestampLabel: "Today, 12:42 PM" },
  { id: "txn-10481", kind: "order", label: "Order #DRP-10481", amount: 8300, timestampLabel: "Today, 12:15 PM" },
  { id: "txn-fee-today", kind: "fee", label: "Platform fees — today", amount: -5860, timestampLabel: "Today" },
  { id: "txn-10473", kind: "order", label: "Order #DRP-10473", amount: 6500, timestampLabel: "Today, 10:15 AM" },
  { id: "txn-10469", kind: "order", label: "Order #DRP-10469", amount: 6500, timestampLabel: "Today, 9:05 AM" },
  { id: "txn-10455", kind: "order", label: "Order #DRP-10455", amount: 4300, timestampLabel: "Yesterday, 7:20 PM" },
  { id: "txn-payout-sep19", kind: "payout", label: "Payout to GTBank ••4521", amount: -75000, timestampLabel: "Sep 19" },
  { id: "txn-10448", kind: "order", label: "Order #DRP-10448", amount: 11000, timestampLabel: "Yesterday, 4:45 PM" },
  { id: "txn-fee-week", kind: "fee", label: "Platform fees — Sep 15–21", amount: -31200, timestampLabel: "Sep 21" },
  { id: "txn-payout-sep12", kind: "payout", label: "Payout to GTBank ••4521", amount: -88200, timestampLabel: "Sep 12" },
  { id: "txn-adj-1", kind: "adjustment", label: "Promo adjustment — Freshers Discount", amount: 4200, timestampLabel: "Sep 11" },
  { id: "txn-payout-sep05", kind: "payout", label: "Payout to GTBank ••4521", amount: -64300, timestampLabel: "Sep 5" },
];

export const DEMO_PAYOUTS: VendorPayout[] = [
  { id: "pay-sep24", amount: 42500, dateLabel: "Sep 24", status: "processing", method: "GTBank ••4521" },
  { id: "pay-sep19", amount: 75000, dateLabel: "Sep 19", status: "completed", method: "GTBank ••4521" },
  { id: "pay-sep12", amount: 88200, dateLabel: "Sep 12", status: "completed", method: "GTBank ••4521" },
  { id: "pay-sep05", amount: 64300, dateLabel: "Sep 5", status: "completed", method: "GTBank ••4521" },
  { id: "pay-aug29", amount: 71100, dateLabel: "Aug 29", status: "completed", method: "GTBank ••4521" },
];

export const DEMO_EARNINGS = {
  totalRevenue: 1284500,
  availableBalance: 186400,
  pendingPayout: 42500,
  paidOut: 1055600,
};

export const DEMO_REVIEWS: VendorReview[] = [
  { id: "rev-1", customer: "Sarah A.", rating: 5, text: "Food arrived hot and the portion was really good.", dateLabel: "Today, 1:15 PM", productName: "Jollof Rice + Chicken" },
  { id: "rev-2", customer: "Michael O.", rating: 5, text: "Fast delivery and good packaging.", dateLabel: "Today, 11:58 AM", productName: "Chicken Shawarma" },
  { id: "rev-3", customer: "Grace E.", rating: 4, text: "Really nice food, delivery took a little longer today.", dateLabel: "Yesterday", productName: "Egusi Soup + Fufu" },
  { id: "rev-4", customer: "Joshua P.", rating: 5, text: "Best jollof on campus, no debate.", dateLabel: "Yesterday", productName: "Jollof Rice + Chicken" },
  { id: "rev-5", customer: "Amara N.", rating: 5, text: "Moi moi was soft and fresh. Will order again.", dateLabel: "Sep 22", productName: "Moi Moi" },
  { id: "rev-6", customer: "Tunde B.", rating: 3, text: "Soup was good but eba was small this time.", dateLabel: "Sep 21", productName: "Ogbono Soup + Eba" },
];

export const DEMO_NOTIFICATIONS: VendorNotification[] = [
  { id: "ntf-1", kind: "order", title: "New order received", body: "#DRP-10482 — Jollof Rice + Chicken · ₦5,800", timeLabel: "12:42 PM", read: false, href: "/vendor/orders" },
  { id: "ntf-2", kind: "order", title: "Order ready for pickup", body: "#DRP-10475 is packed and waiting at Shop 4.", timeLabel: "11:30 AM", read: false, href: "/vendor/orders" },
  { id: "ntf-3", kind: "review", title: "New 5-star review", body: "Sarah A.: “Food arrived hot and the portion was really good.”", timeLabel: "1:15 PM", read: false, href: "/vendor/dashboard" },
  { id: "ntf-4", kind: "payout", title: "Payout processing", body: "₦42,500 payout to GTBank ••4521 is on the way.", timeLabel: "9:00 AM", read: true, href: "/vendor/payouts" },
  { id: "ntf-5", kind: "inventory", title: "Low stock alert", body: "Peppered Chicken is down to 8 pieces.", timeLabel: "8:45 AM", read: true, href: "/vendor/inventory" },
  { id: "ntf-6", kind: "promotion", title: "Weekend Special scheduled", body: "Your 15% OFF promo goes live on Sep 27.", timeLabel: "Yesterday", read: true, href: "/vendor/promotions" },
  { id: "ntf-7", kind: "system", title: "Weekly summary ready", body: "You earned ₦316,800 last week — up 12%.", timeLabel: "Yesterday", read: true, href: "/vendor/analytics" },
];

/** Revenue bars for the last 7 days. "Today" is filled in from live orders. */
export const DEMO_WEEK_REVENUE: RevenuePoint[] = [
  { label: "Mon", value: 61200 },
  { label: "Tue", value: 74800 },
  { label: "Wed", value: 69500 },
  { label: "Thu", value: 91300 },
  { label: "Fri", value: 84500 }, // placeholder — store replaces with live today's sum
  { label: "Sat", value: 0 },
  { label: "Sun", value: 0 },
];

export const DEMO_MONTH_REVENUE: RevenuePoint[] = [
  { label: "Week 1", value: 268400 },
  { label: "Week 2", value: 295100 },
  { label: "Week 3", value: 316800 },
  { label: "Week 4", value: 404200 },
];
