import type { Metadata } from "next";

import { CustomerCategoriesPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Shop By Category — DROPly",
  description: "Browse food, groceries and essentials by category.",
};

export default function Page() {
  return <CustomerCategoriesPage />;
}
