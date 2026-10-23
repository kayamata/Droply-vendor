import type { Metadata } from "next";

import { VendorSettingsPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Settings",
};

export default function Page() {
  return <VendorSettingsPage />;
}
