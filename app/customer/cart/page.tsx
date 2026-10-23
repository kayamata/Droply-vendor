import type { Metadata } from "next";

import { CustomerCartPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Shopping Cart — DROPly",
  description: "Review your items and apply a promo code before checkout.",
};

export default function Page() {
  return <CustomerCartPage />;
}
