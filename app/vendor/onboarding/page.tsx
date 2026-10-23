import type { Metadata } from "next";

import { VendorOnboardingPage } from "@/features/vendor/pages";

export const metadata: Metadata = {
  title: "Set Up Your Business",
  description: "Tell us about your business to finish vendor onboarding.",
};

export default function Page() {
  return <VendorOnboardingPage />;
}
