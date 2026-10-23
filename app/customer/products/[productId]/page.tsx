import type { Metadata } from "next";

import { CustomerProductPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Product — DROPly",
  description: "Item details, reviews and quick add to cart.",
};

export default function Page() {
  return <CustomerProductPage />;
}
