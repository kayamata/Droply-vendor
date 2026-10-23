import type { Metadata } from "next";

import { VendorMenuPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Menu",
};

export default function Page() {
  return <VendorMenuPage />;
}
