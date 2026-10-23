import type { Metadata } from "next";

import { VendorPayoutsPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Payouts",
};

export default function Page() {
  return <VendorPayoutsPage />;
}
