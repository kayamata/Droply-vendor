import type { Metadata } from "next";

import { VendorRegisterPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Become a Vendor",
  description:
    "Create your vendor account and start reaching customers on campus.",
};

export default function Page() {
  return <VendorRegisterPage />;
}
