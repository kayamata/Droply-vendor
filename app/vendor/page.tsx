import type { Metadata } from "next";

import { VendorWelcomePage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Vendor Portal — Grow your business with DROPly",
  description:
    "Reach more customers on campus, manage your orders, and grow your business — all from one place.",
};

export default function Page() {
  return <VendorWelcomePage />;
}
