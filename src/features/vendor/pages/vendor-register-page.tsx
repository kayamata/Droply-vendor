import Link from "next/link";

import { ROUTES } from "@/utils/constants";
import {
  VendorAuthCard,
  VendorHeader,
  VendorPageContainer,
  VendorRegisterForm,
} from "@/features/vendor/components";

export function VendorRegisterPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <VendorHeader
        backHref={ROUTES.vendor.root}
        backLabel="Vendor home"
      />
      <VendorPageContainer
        width="auth"
        className="flex flex-1 flex-col justify-center py-8 sm:max-w-lg sm:py-12"
      >
        <div className="mb-6 flex flex-col gap-2 text-center">
          <span className="mx-auto rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
            Step 1 of 2 — Your account
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Start selling with DROPly
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Create your vendor account and start reaching customers on campus.
          </p>
        </div>

        <VendorAuthCard title="Vendor details">
          <VendorRegisterForm />
        </VendorAuthCard>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have a vendor account?{" "}
          <Link
            href={ROUTES.vendor.login}
            className="font-semibold text-primary transition-colors hover:text-droply-orange-hover"
          >
            Sign In
          </Link>
        </p>
      </VendorPageContainer>
    </div>
  );
}
