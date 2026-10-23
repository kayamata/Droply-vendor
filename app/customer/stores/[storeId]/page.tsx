import type { Metadata } from "next";

import { CustomerStorePage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Store — DROPly",
  description: "Browse this store's menu categories and order for delivery.",
};

export default function Page() {
  return <CustomerStorePage />;
}
