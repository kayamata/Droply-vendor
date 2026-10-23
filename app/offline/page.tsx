import type { Metadata } from "next";
import { OfflinePage } from "@/features/pwa/pages";

export const metadata: Metadata = {
  title: "Offline",
};

export default function Page() {
  return <OfflinePage />;
}
