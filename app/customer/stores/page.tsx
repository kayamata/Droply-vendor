import type { Metadata } from "next";

import { CustomerStoresPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Shop By Store — DROPly",
  description: "Campus-friendly stores delivering to your hostel.",
};

export default function Page() {
  return <CustomerStoresPage />;
}
