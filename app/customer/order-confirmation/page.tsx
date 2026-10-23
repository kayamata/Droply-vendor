import type { Metadata } from "next";

import { CustomerOrderConfirmationPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Track Order — DROPly",
  description: "Follow your delivery in real time.",
};

export default function Page() {
  return <CustomerOrderConfirmationPage />;
}
