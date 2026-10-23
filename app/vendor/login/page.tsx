import type { Metadata } from "next";

import { VendorLoginPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Sign In",
  description: "Sign in to manage your DROPly business.",
};

export default function Page() {
  return <VendorLoginPage />;
}
