import type { Metadata } from "next";

import { CustomerProfilePage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Profile — DROPly",
  description: "Your orders, favorites, wallet and settings.",
};

export default function Page() {
  return <CustomerProfilePage />;
}
