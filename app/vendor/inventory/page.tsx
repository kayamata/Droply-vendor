import type { Metadata } from "next";

import { VendorInventoryPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Inventory",
};

export default function Page() {
  return <VendorInventoryPage />;
}
