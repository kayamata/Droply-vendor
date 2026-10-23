import type {
  CustomerCategory,
  CustomerFaq,
  CustomerOffer,
  CustomerOrder,
  CustomerProfile,
  CustomerReward,
  CustomerStore,
  DeliveryAddress,
} from "@/features/customer/types";

/* -------------------------------------------------------------------------- */
/*  DEMO CATALOG                                                               */
/*                                                                             */
/*  The storefront dataset the customer experience renders today. Each store  */
/*  carries its own visual metadata (logo tile, banner treatment) so pages   */
/*  stay data-driven instead of keyed on hardcoded ids. When the real API    */
/*  lands this file is replaced by fetchers + React Query hooks.             */
/* -------------------------------------------------------------------------- */

export const DEMO_CUSTOMER: CustomerProfile = {
  name: "Amara Nwosu",
  username: "amara",
  ordersCount: 56,
  rating: 4.8,
  walletBalance: 12450,
  avatarEmoji: "👩‍🎓",
};

export const DELIVERY_ADDRESSES: DeliveryAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    address: "36 green way, Katampe Extension",
    selected: true,
  },
  {
    id: "addr-2",
    label: "Office",
    address: "15 Bangui Street, Wuse 2, FCT Abuja",
    selected: false,
  },
  {
    id: "addr-3",
    label: "NSUK Hostel",
    address: "Block A, Room 12, NSUK Campus, Keffi",
    selected: false,
  },
];

export const CUSTOMER_CATEGORIES: CustomerCategory[] = [
  { id: "cat-rice",     name: "Rice & Meals",           emoji: "🍛", bg: "#FFF3E0", textColor: "#E85A1D" },
  { id: "cat-swallow",  name: "Swallow & Soups",        emoji: "🍲", bg: "#FCECEB", textColor: "#1C1C1E" },
  { id: "cat-protein",  name: "Grills & Protein",       emoji: "🥩", bg: "#EBF7F2", textColor: "#1C1C1E" },
  { id: "cat-grocery",  name: "Groceries & Provisions", emoji: "🛒", bg: "#E2F0F9", textColor: "#E85A1D" },
  { id: "cat-fastfood", name: "Burgers & Shawarma",     emoji: "🌯", bg: "#F9F1E2", textColor: "#1C1C1E" },
  { id: "cat-drinks",   name: "Drinks & Beverages",     emoji: "🥤", bg: "#F3ECFC", textColor: "#1C1C1E" },
  { id: "cat-chops",    name: "Special Chops",          emoji: "🍢", bg: "#FFF8E7", textColor: "#1C1C1E" },
  { id: "cat-fries",    name: "Chips & Fries",          emoji: "🍟", bg: "#FDECEA", textColor: "#E85A1D" },
];

const ORANGE_BANNER = "linear-gradient(135deg, #E85A1D 0%, #B83D0D 100%)";

export const CUSTOMER_STORES: CustomerStore[] = [
  // 1. MAMA CASS & CAMPUS BUKKA (MAIN DISH)
  {
    id: "mama-cass-bukka",
    name: "Mama Cass & Campus Bukka",
    address: "NSUK Main Gate Commercial Hub, Keffi",
    logo: "🍛",
    logoKind: "emoji",
    logoBg: "#FCECEB",
    bannerEmoji: "🍛🍲🥩",
    bannerBg: ORANGE_BANNER,
    openingHours: "8am – 9pm",
    rating: 4.9,
    deliveryTime: "25 Min",
    deliveryFee: 300,
    type: "MAIN DISH",
    menu: [
      { id: "to-80",  name: "Jollof Rice",                     price: 3000,  description: "Party jollof rice — smoky, perfectly seasoned.",                                    category: "Rice & Meals",      rating: 9.4, popular: true,  unit: "Plate", emoji: "🍛" },
      { id: "to-87",  name: "Jollof Rice + Chicken",           price: 5400,  description: "Perfectly seasoned party jollof rice served with fried chicken.",                    category: "Rice & Meals",      rating: 9.2, premium: true,  unit: "Combo", emoji: "🍛" },
      { id: "to-81",  name: "Fried Rice",                      price: 3500,  description: "Nigerian vegetable fried rice, rich and flavourful.",                                category: "Rice & Meals",      rating: 9.1, popular: true,  unit: "Plate", emoji: "🍚" },
      { id: "to-120", name: "Chinese Fried Rice",              price: 5000,  description: "Basmati rice sautéed with shrimps and Chinese seasonings.",                          category: "Rice & Meals",      rating: 9.0, premium: true,  unit: "Plate", emoji: "🍱" },
      { id: "to-82",  name: "Basmati White Rice",              price: 5000,  description: "Premium basmati white rice — light & fragrant.",                                     category: "Rice & Meals",      rating: 8.9, premium: true,  unit: "Plate", emoji: "🍚" },
      { id: "to-83",  name: "Coconut Basmati Rice",            price: 5000,  description: "Fragrant coconut-infused basmati rice.",                                              category: "Rice & Meals",      rating: 9.0, premium: true,  unit: "Plate", emoji: "🥥" },
      { id: "to-121", name: "Seafood Sauce with Basmati Rice", price: 9200,  description: "Calamari, prawns & shrimps sauce served over basmati rice.",                         category: "Rice & Meals",      rating: 9.6, premium: true,  unit: "Plate", emoji: "🦐" },
      { id: "to-85",  name: "White Rice and Stew",             price: 4000,  description: "Plain white rice served with rich tomato stew.",                                     category: "Rice & Meals",      rating: 8.6, popular: true,  unit: "Plate", emoji: "🍚" },

      // NIGERIAN SOUPS
      { id: "to-30",  name: "Ogbono Soup",                     price: 3000,  description: "Classic Nigerian ogbono draw soup — rich and hearty.",                              category: "Swallow & Soups",   rating: 9.0, popular: true,  unit: "Bowl",  emoji: "🥣" },
      { id: "to-31",  name: "Egusi Soup",                      price: 3000,  description: "Rich melon seed soup cooked with stockfish, dry fish and assorted meat.",             category: "Swallow & Soups",   rating: 9.3, popular: true,  unit: "Bowl",  emoji: "🥘" },
      { id: "to-32",  name: "Okro Soup",                       price: 3000,  description: "Fresh okro soup cooked with assorted proteins and palm oil.",                         category: "Swallow & Soups",   rating: 8.8, popular: true,  unit: "Bowl",  emoji: "🫙" },
      { id: "to-33",  name: "Afang Soup",                      price: 3500,  description: "Traditional Afang soup from Cross River — rich leafy green soup.",                   category: "Swallow & Soups",   rating: 9.1, popular: true,  unit: "Bowl",  emoji: "🥬" },
      { id: "to-35",  name: "Vegetable Soup",                  price: 3000,  description: "Fresh ugu (pumpkin leaf) vegetable soup with fish and meat.",                        category: "Swallow & Soups",   rating: 8.8, popular: true,  unit: "Bowl",  emoji: "🥦" },
      { id: "to-36",  name: "Fisherman Soup",                  price: 16000, description: "Premium fisherman soup bursting with seafood flavour.",                               category: "Swallow & Soups",   rating: 9.5, premium: true,  unit: "Pot",   emoji: "🐟" },
      { id: "to-37",  name: "Seafood Okro",                    price: 16000, description: "Premium seafood okro soup — shrimps, calamari & fresh fish.",                        category: "Swallow & Soups",   rating: 9.6, premium: true,  unit: "Pot",   emoji: "🦑" },

      // SWALLOW
      { id: "to-60",  name: "Semo (per wrap)",                 price: 600,   description: "Smooth semovita wrap — served with soup of choice.",                                 category: "Swallow & Soups",   rating: 8.6, popular: true,  unit: "Wrap",  emoji: "⚪" },
      { id: "to-61",  name: "Eba/Garri (per wrap)",            price: 600,   description: "Cassava garri swallow — served with soup of choice.",                                 category: "Swallow & Soups",   rating: 8.6, popular: true,  unit: "Wrap",  emoji: "🟡" },
      { id: "to-63",  name: "Plantain Flour (per wrap)",       price: 1000,  description: "Smooth plantain flour swallow.",                                                      category: "Swallow & Soups",   rating: 8.5, popular: true,  unit: "Wrap",  emoji: "🌿" },
      { id: "to-64",  name: "Poundo Yam (per wrap)",           price: 1000,  description: "Smooth poundo yam swallow — pairs perfectly with egusi or okro.",                    category: "Swallow & Soups",   rating: 8.8, popular: true,  unit: "Wrap",  emoji: "⚪" },

      // PROTEIN
      { id: "to-50",  name: "Beef (per piece)",                price: 1500,  description: "Fried or grilled seasoned beef — tender and peppery.",                                category: "Grills & Protein",  rating: 8.7, popular: true,  unit: "Piece", emoji: "🥩" },
      { id: "to-51",  name: "Goat Meat (per piece)",           price: 1500,  description: "Tender well-seasoned goat meat, fried or grilled.",                                   category: "Grills & Protein",  rating: 8.8, popular: true,  unit: "Piece", emoji: "🍖" },
      { id: "to-52",  name: "Chicken (1/8 portion)",           price: 2600,  description: "Fried or grilled chicken — 1/8 cut, crispy & juicy.",                                category: "Grills & Protein",  rating: 8.7, popular: true,  unit: "Piece", emoji: "🍗" },
      { id: "to-53",  name: "Chicken (1/4 portion)",           price: 5000,  description: "Fried or grilled chicken — quarter piece, generous portion.",                        category: "Grills & Protein",  rating: 9.3, premium: true,  unit: "Piece", emoji: "🍗" },
      { id: "to-54",  name: "Grilled Catfish",                 price: 5000,  description: "Fresh catfish — perfectly grilled or fried with pepper sauce.",                      category: "Grills & Protein",  rating: 9.0, premium: true,  unit: "Piece", emoji: "🐟" },
      { id: "to-55",  name: "Grilled Croaker Fish",            price: 6000,  description: "Premium croaker fish — grilled or fried.",                                            category: "Grills & Protein",  rating: 9.1, premium: true,  unit: "Piece", emoji: "🐠" },
      { id: "to-56",  name: "Jumbo Snail (per lobe)",          price: 7500,  description: "Giant seasoned snail — a Nigerian delicacy.",                                          category: "Grills & Protein",  rating: 9.5, premium: true,  unit: "Lobe",  emoji: "🐌" },

      // CHIPS & FRIES
      { id: "to-1",   name: "Fried Yam Chips",                 price: 3000,  description: "Crispy fried yam chips served with tomato stew.",                                    category: "Chips & Fries",     rating: 8.7, popular: true,  unit: "Plate", emoji: "🟡" },
      { id: "to-2",   name: "Sweet Potatoes (Large)",          price: 2500,  description: "Large-size sweet potato chips served with stew.",                                     category: "Chips & Fries",     rating: 8.6, popular: true,  unit: "Plate", emoji: "🍠" },
      { id: "to-3",   name: "Sweet Potatoes (Regular)",        price: 1300,  description: "Regular-size sweet potato chips.",                                                    category: "Chips & Fries",     rating: 8.5, popular: true,  unit: "Plate", emoji: "🍠" },
      { id: "to-4",   name: "French Fries (Large)",            price: 2500,  description: "Crispy golden french fries served with ketchup.",                                     category: "Chips & Fries",     rating: 9.2, popular: true,  unit: "Plate", emoji: "🍟" },
      { id: "to-5",   name: "French Fries (Regular)",          price: 1300,  description: "Golden regular-size french fries with ketchup.",                                      category: "Chips & Fries",     rating: 8.6, popular: true,  unit: "Plate", emoji: "🍟" },
      { id: "to-6",   name: "Fried Plantain (Dodo)",           price: 2000,  description: "Sweet fried ripe plantain slices served with stew.",                                 category: "Chips & Fries",     rating: 8.7, popular: true,  unit: "Plate", emoji: "🍌" },
      { id: "to-7",   name: "Chef's Chips & Chicken",          price: 7200,  description: "Special crispy fries & soulfully spiced fried ¼ chicken.",                           category: "Chips & Fries",     rating: 9.5, premium: true,  unit: "Combo", emoji: "🍟" },
      { id: "to-8",   name: "Yam Porridge (Asaro)",            price: 4000,  description: "Rich & hearty Nigerian yam porridge cooked with palm oil and crayfish.",             category: "Chips & Fries",     rating: 8.8, popular: true,  unit: "Plate", emoji: "🍠" },
    ],
  },

  // 2. 4U SUPERMARKET & PROVISIONS (MAIN DISH / PROVISIONS)
  {
    id: "4u-supermarket",
    name: "4U Supermarket & Provisions",
    address: "2 Kumasi Crescent, Wuse 2 & Campus Branch",
    logo: "4U",
    logoKind: "wordmark",
    logoBg: "#FEE89E",
    bannerEmoji: "🛒🌾🥛",
    bannerBg: "linear-gradient(135deg, #FEE89E 0%, #FDD56A 100%)",
    bannerTextDark: true,
    openingHours: "8am – 10pm",
    rating: 4.7,
    deliveryTime: "30 Min",
    deliveryFee: 250,
    type: "MAIN DISH",
    menu: [
      { id: "4u-semo",      name: "Golden Penny Semovita 1kg",           price: 1800,  description: "Enriched wheat semolina — the go-to campus swallow base.",                category: "Groceries & Provisions", popular: true,  unit: "Pack",   emoji: "🌾" },
      { id: "4u-indomie",   name: "Indomie Onion Chicken Pack (40 pcs)", price: 12500, description: "Full carton of student-favourite Indomie noodles 120g each.",             category: "Groceries & Provisions", premium: true,  unit: "Carton", emoji: "📦" },
      { id: "4u-peak-milk", name: "Peak Full Cream Milk Powder 400g",    price: 3800,  description: "Rich creamy milk powder for breakfast and cereal.",                        category: "Groceries & Provisions", popular: true,  unit: "Tin",    emoji: "🥛" },
      { id: "4u-milo",      name: "Nestle Milo Chocolate Powder 400g",   price: 3200,  description: "Energy cocoa malt drink powder loved by students.",                        category: "Groceries & Provisions", popular: true,  unit: "Tin",    emoji: "☕" },
      { id: "4u-eggs",      name: "Fresh Farm Eggs (Crate of 30)",       price: 4800,  description: "Directly sourced fresh farm eggs.",                                          category: "Groceries & Provisions", popular: true,  unit: "Crate",  emoji: "🥚" },
      { id: "4u-rice-5kg",  name: "Mama Gold Parboiled Rice 5kg",        price: 14500, description: "Long-grain stone-free Nigerian parboiled rice.",                             category: "Groceries & Provisions", premium: true,  unit: "Bag",    emoji: "🌾" },
      { id: "4u-groundnut", name: "Roasted Groundnut 500g",              price: 900,   description: "Freshly roasted peanuts — perfect campus snack.",                            category: "Groceries & Provisions", popular: true,  unit: "Pack",   emoji: "🥜" },
      { id: "4u-tomatoes",  name: "Fresh Tomatoes (Medium Basket)",      price: 3500,  description: "Fresh plum tomatoes for stews and sauces.",                                  category: "Groceries & Provisions", popular: true,  unit: "Basket", emoji: "🍅" },
    ],
  },

  // 3. MARS CAFE & FAST FOOD (FAST FOODS)
  {
    id: "mars-cafe",
    name: "Mars Cafe & Fast Food",
    address: "1 Asokoro Street, Wuye & Student Center",
    logo: "MC",
    logoKind: "wordmark",
    logoBg: "#9CD6E2",
    bannerEmoji: "🌯🍔🥤",
    bannerBg: "linear-gradient(135deg, #9CD6E2 0%, #6EB4C4 100%)",
    openingHours: "9am – 10pm",
    rating: 4.8,
    deliveryTime: "20 Min",
    deliveryFee: 200,
    type: "FAST FOODS",
    menu: [
      { id: "mc-burger-plain",   name: "Chicken/Beef Burger (no fries)",      price: 3000, description: "Beef/chicken patty with lettuce, cheese, tomatoes, steamed onions & cucumber.", category: "Burgers & Shawarma", popular: true,  unit: "Wrap",  emoji: "🍔" },
      { id: "mc-burger-reg",     name: "Burger with Fries (Regular)",          price: 4300, description: "Juicy burger with regular-size crispy french fries.",                          category: "Burgers & Shawarma", popular: true,  unit: "Combo", emoji: "🍔" },
      { id: "mc-burger-large",   name: "Burger with Fries (Large)",            price: 5500, description: "Juicy burger with large-size crispy french fries.",                            category: "Burgers & Shawarma", premium: true,  unit: "Combo", emoji: "🍔" },
      { id: "mc-shawarma-reg",   name: "Regular Shawarma (Beef/Chicken/Goat)", price: 3700, description: "Regular-sized shawarma wrap — your choice of filling.",                        category: "Burgers & Shawarma", popular: true,  unit: "Wrap",  emoji: "🌯" },
      { id: "mc-shawarma-jumbo", name: "Jumbo Shawarma (Beef/Chicken/Goat)",   price: 4800, description: "Jumbo shawarma — extra filling, loaded with veggies and sauce.",               category: "Burgers & Shawarma", premium: true,  unit: "Wrap",  emoji: "🌯" },
      { id: "mc-extra-sausage",  name: "Extra Sausage",                        price: 800,  description: "Add an extra sausage to any order.",                                           category: "Burgers & Shawarma", popular: true,  unit: "Piece", emoji: "🌭" },
    ],
  },

  // 4. CHICKEN REPUBLIC EXPRESS (FAST FOODS)
  {
    id: "chicken-republic",
    name: "Chicken Republic Express",
    address: "NSUK Main Gate Commercial Plaza, Keffi",
    logo: "🍗",
    logoKind: "emoji",
    logoBg: "#FDECEA",
    bannerEmoji: "🍗🍔🥤",
    bannerBg: ORANGE_BANNER,
    openingHours: "8am – 10pm",
    rating: 4.8,
    deliveryTime: "15 Min",
    deliveryFee: 200,
    type: "FAST FOODS",
    menu: [
      { id: "cr-refuel",  name: "Express Refuel Combo (Rice + Chicken)", price: 3800, description: "Jollof/Fried rice served with crispy fried chicken quarter & chilled Coke.", category: "Burgers & Shawarma", popular: true,  unit: "Combo", emoji: "🍗" },
      { id: "cr-wings",   name: "Zesty Spicy Wings (6 Pcs)",            price: 3500, description: "Crispy fried chicken wings tossed in fiery chilli pepper sauce.",             category: "Burgers & Shawarma", popular: true,  unit: "Pack",  emoji: "🍗" },
      { id: "cr-burger",  name: "Chief Citizen Chicken Burger",         price: 4500, description: "Double crispy chicken breast fillet burger with cheese & mayo sauce.",        category: "Burgers & Shawarma", premium: true,  unit: "Combo", emoji: "🍔" },
      { id: "cr-pie",     name: "Spicy Beef Meat Pie (2 Pcs)",          price: 1600, description: "Golden baked buttery pastry packed with spiced minced beef.",                 category: "Burgers & Shawarma", popular: true,  unit: "Pack",  emoji: "🥧" },
    ],
  },

  // 5. KEFFI SUYA & PEPPER GRILL (MAIN DISH)
  {
    id: "keffi-suya-spot",
    name: "Keffi Suya & Pepper Grill Spot",
    address: "University Road, NSUK Campus, Keffi",
    logo: "🥩",
    logoKind: "emoji",
    logoBg: "#EBF7F2",
    bannerEmoji: "🥩🍖🌶️",
    bannerBg: ORANGE_BANNER,
    openingHours: "4pm – 11pm",
    rating: 4.9,
    deliveryTime: "20 Min",
    deliveryFee: 250,
    type: "MAIN DISH",
    menu: [
      { id: "ks-beef-suya", name: "Special Hausa Beef Suya (Large)",  price: 3000, description: "Authentic Hausa Yaji spiced grilled beef suya with sliced onions & cabbage.",  category: "Grills & Protein", popular: true,  unit: "Wrap",  emoji: "🥩" },
      { id: "ks-catfish",   name: "Grilled Peppered Catfish (Whole)", price: 6500, description: "Whole charcoal grilled catfish drenched in spicy scotch bonnet pepper sauce.",  category: "Grills & Protein", premium: true,  unit: "Whole", emoji: "🐟" },
      { id: "ks-asun",      name: "Spicy Asun Goat Meat Platter",    price: 4500, description: "Pan roasted tender goat meat tossed with scotch bonnet pepper & onions.",      category: "Grills & Protein", popular: true,  unit: "Plate", emoji: "🍖" },
      { id: "ks-kilishi",   name: "Abuja Special Beef Kilishi",      price: 2500, description: "Sun-dried seasoned beef jerky infused with groundnut suya spice blend.",       category: "Grills & Protein", popular: true,  unit: "Pack",  emoji: "🥩" },
    ],
  },

  // 6. CHILLZ LOUNGE & DRINKS BAR (DRINKS)
  {
    id: "chillz-lounge",
    name: "Chillz Lounge & Fresh Juice Bar",
    address: "Faculty of Arts Complex, NSUK Campus",
    logo: "🍹",
    logoKind: "emoji",
    logoBg: "#F3ECFC",
    bannerEmoji: "🍹🥤🍸",
    bannerBg: ORANGE_BANNER,
    openingHours: "9am – 10pm",
    rating: 4.7,
    deliveryTime: "15 Min",
    deliveryFee: 150,
    type: "DRINKS",
    menu: [
      { id: "cz-zobo",        name: "Ice Cold Pineapple Zobo (500ml)",   price: 1000, description: "Organic hibiscus tea freshly brewed with pineapple, ginger & cloves.", category: "Drinks & Beverages", popular: true,  unit: "Bottle", emoji: "🍷" },
      { id: "cz-juice-blend", name: "Fresh Watermelon & Orange Juice",  price: 2800, description: "100% natural cold pressed fresh fruit juice blend.",                  category: "Drinks & Beverages", popular: true,  unit: "Cup",    emoji: "🍹" },
      { id: "cz-iced-coffee", name: "Cold Brewed Iced Vanilla Coffee",  price: 2200, description: "Chilled espresso coffee with sweet vanilla syrup and creamy milk.",    category: "Drinks & Beverages", popular: true,  unit: "Cup",    emoji: "☕" },
      { id: "cz-mojito",      name: "Virgin Mint Mojito Mocktail",      price: 3000, description: "Refreshing fizzy mocktail infused with fresh lime juice & mint leaves.", category: "Drinks & Beverages", premium: true, unit: "Glass",  emoji: "🍸" },
    ],
  },
];

/** Featured offers carousel on the home screen. */
export const CUSTOMER_OFFERS: CustomerOffer[] = [
  {
    id: "offer-mama-cass",
    storeId: "mama-cass-bukka",
    storeName: "Mama Cass Bukka",
    title: "₦500 OFF",
    subtitle: "On Jollof Rice orders",
    mark: "🍛",
    markKind: "emoji",
    theme: "dark",
  },
  {
    id: "offer-mars-cafe",
    storeId: "mars-cafe",
    storeName: "Mars Cafe",
    title: "Free Delivery",
    subtitle: "On orders above ₦3,000",
    mark: "🌯",
    markKind: "emoji",
    theme: "orange",
  },
  {
    id: "offer-4u",
    storeId: "4u-supermarket",
    storeName: "4U Supermarket",
    title: "10% OFF",
    subtitle: "On all groceries today",
    mark: "4U",
    markKind: "wordmark",
    theme: "yellow",
  },
];

/** Valid promo codes → flat naira discount. */
export const PROMO_CODES: Record<string, number> = {
  NSUKFRESH: 150,
  DROPLY50: 150,
};

export const CUSTOMER_REWARDS: CustomerReward[] = [
  { id: "r1", title: "₦500 Off Delivery",             cost: 500,  description: "Valid for all campus food orders above ₦1,500" },
  { id: "r2", title: "Free Green Tea Pack",           cost: 800,  description: "Redeem at Mars Cafe during lecture hours" },
  { id: "r3", title: "₦1,000 Grocery Pack Voucher",   cost: 1500, description: "Valid at 4U Supermarket campus branch" },
];

export const CUSTOMER_FAQS: CustomerFaq[] = [
  {
    question: "How fast is campus hostel delivery?",
    answer: "Most food and grocery deliveries arrive within 15 to 30 minutes depending on the location of the campus store.",
  },
  {
    question: "What payment methods are supported on DROPly?",
    answer: "You can pay using debit/credit cards, in-app wallet balance, or cash on delivery at your hostel block.",
  },
  {
    question: "How do I contact my delivery rider?",
    answer: "Once an order is placed, go to the Track Order screen where you can chat or call your rider directly.",
  },
  {
    question: "Can I cancel an order after placing it?",
    answer: "Orders can be cancelled free of charge within 2 minutes of placing before the restaurant starts preparing your meal.",
  },
];

/** Seeded delivered order so the history screen is never empty. */
export const DEMO_ORDER_HISTORY: CustomerOrder[] = [
  {
    id: "#765433",
    date: "Aug 24, 2026",
    status: "arrived",
    eta: "Delivered",
    rider: { name: "Rakibul Hassan", rating: "4.9" },
    deliveryAddress: "36 green way, Katampe Extension",
    items: [
      { product: CUSTOMER_STORES[0].menu[0], quantity: 2, storeId: "mama-cass-bukka" },
      { product: CUSTOMER_STORES[0].menu[1], quantity: 1, storeId: "mama-cass-bukka" },
    ],
    subtotal: 11400,
    deliveryFee: 300,
    total: 11700,
    storeName: "Mama Cass & Campus Bukka",
  },
];
