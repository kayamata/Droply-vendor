import type { Metadata } from "next";

import { VendorProductsPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Products",
};

export default function Page() {
  return <VendorProductsPage />;
}
