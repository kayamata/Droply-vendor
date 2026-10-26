import type { Metadata } from "next";

import { CustomerLoginPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Sign In — DROPly",
  description: "Sign in to order food and groceries on campus.",
};

export default function Page() {
  return <CustomerLoginPage />;
}
