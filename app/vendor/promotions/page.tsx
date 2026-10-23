import type { Metadata } from "next";

import { VendorPromotionsPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Promotions",
};

export default function Page() {
  return <VendorPromotionsPage />;
}
