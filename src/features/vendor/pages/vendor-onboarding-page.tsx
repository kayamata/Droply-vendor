import Link from "next/link";

import { ROUTES } from "@/utils/constants";
import {
  VendorAuthCard,
  VendorAuthGuard,
  VendorBusinessForm,
  VendorHeader,
  VendorPageContainer,
} from "@/features/vendor/components";

export function VendorOnboardingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <VendorAuthGuard />
      <VendorHeader
        backHref={ROUTES.vendor.register}
        backLabel="Back"
      />
      <VendorPageContainer
        width="auth"
        className="flex flex-1 flex-col justify-center py-8 sm:max-w-lg sm:py-12"
      >
        <div className="mb-6 flex flex-col gap-2 text-center">
          <span className="mx-auto rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
            Step 2 of 2 — Your business
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Tell us about your business
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            This is what customers will see on your DROPly storefront.
          </p>
        </div>

        <VendorAuthCard title="Business information">
          <VendorBusinessForm />
        </VendorAuthCard>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Wrong details?{" "}
          <Link
            href={ROUTES.vendor.register}
            className="font-semibold text-primary transition-colors hover:text-droply-orange-hover"
          >
            Go back to step 1
          </Link>
        </p>
      </VendorPageContainer>
    </div>
  );
}
