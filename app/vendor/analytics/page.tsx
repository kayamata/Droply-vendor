import type { Metadata } from "next";

import { VendorAnalyticsPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Analytics",
};

export default function Page() {
  return <VendorAnalyticsPage />;
}
