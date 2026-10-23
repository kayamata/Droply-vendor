import type { Metadata } from "next";

import { CustomerCheckoutPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Checkout — DROPly",
  description: "Choose your delivery address and proceed to payment.",
};

export default function Page() {
  return <CustomerCheckoutPage />;
}
