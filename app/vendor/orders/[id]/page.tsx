import type { Metadata } from "next";

import { VendorOrderDetailPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Order Details",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VendorOrderDetailPage orderId={id} />;
}
