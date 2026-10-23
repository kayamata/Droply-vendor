import type { Metadata } from "next";

import { VendorDashboardPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Dashboard",
};

export default function Page() {
  return <VendorDashboardPage />;
}
