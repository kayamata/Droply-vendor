import type { Metadata } from "next";

import { CustomerEntryPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "DROPly — Food & groceries delivered on campus",
  description:
    "Order from campus stores, track your delivery, and earn rewards — all on DROPly.",
};

export default function Page() {
  return <CustomerEntryPage />;
}
