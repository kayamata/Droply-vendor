import type { Metadata } from "next";

import { CustomerPaymentPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Payment — DROPly",
  description: "Add your card and confirm your DROPly order.",
};

export default function Page() {
  return <CustomerPaymentPage />;
}
