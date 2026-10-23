import type { Metadata } from "next";

import { CustomerNotificationsPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Notifications — DROPly",
  description: "Manage push, order and promo notifications.",
};

export default function Page() {
  return <CustomerNotificationsPage />;
}
