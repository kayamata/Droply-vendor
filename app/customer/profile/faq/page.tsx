import type { Metadata } from "next";

import { CustomerFaqPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "FAQ — DROPly",
  description: "Answers about delivery, payment and campus coverage.",
};

export default function Page() {
  return <CustomerFaqPage />;
}
