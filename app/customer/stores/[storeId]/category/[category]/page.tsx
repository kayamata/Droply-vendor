import type { Metadata } from "next";

import { CustomerStoreCategoryPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Category — DROPly",
  description: "Popular picks and premium specials in this category.",
};

export default function Page() {
  return <CustomerStoreCategoryPage />;
}
