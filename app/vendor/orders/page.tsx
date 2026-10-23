import type { Metadata } from "next";

import { VendorOrdersPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Orders",
};

export default function Page() {
  return <VendorOrdersPage />;
}
