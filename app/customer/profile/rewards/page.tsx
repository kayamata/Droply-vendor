import type { Metadata } from "next";

import { CustomerRewardsPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Rewards — DROPly",
  description: "Earn points on every order and claim campus rewards.",
};

export default function Page() {
  return <CustomerRewardsPage />;
}
