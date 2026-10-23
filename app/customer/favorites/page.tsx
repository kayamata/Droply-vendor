import type { Metadata } from "next";

import { CustomerFavoritesPage } from "@/features/customer/pages";

export const metadata: Metadata = {
  title: "Favorites — DROPly",
  description: "Your saved meals and stores, one tap away.",
};

export default function Page() {
  return <CustomerFavoritesPage />;
}
