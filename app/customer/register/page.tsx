import type { Metadata } from "next";

import { CustomerRegisterPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Create Account — DROPly",
  description: "Join DROPly to order from campus stores.",
};

export default function Page() {
  return <CustomerRegisterPage />;
}
