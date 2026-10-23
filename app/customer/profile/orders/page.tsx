import type { Metadata } from "next";

import { CustomerOrdersPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Orders — DROPly",
  description: "Track active orders and reorder past favorites.",
};

export default function Page() {
  return <CustomerOrdersPage />;
}
