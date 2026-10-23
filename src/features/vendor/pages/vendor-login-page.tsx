import { ROUTES } from "@/utils/constants";
import {
  VendorAuthCard,
  VendorButton,
  VendorHeader,
  VendorLoginForm,
  VendorPageContainer,
} from "@/features/vendor/components";

export function VendorLoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <VendorHeader
        backHref={ROUTES.vendor.root}
        backLabel="Vendor home"
      />
      <VendorPageContainer
        width="auth"
        className="flex flex-1 flex-col justify-center py-8 sm:py-12"
      >
        <VendorAuthCard
          title="Welcome back"
          subtitle="Sign in to manage your DROPly business."
          footer={
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have a vendor account?
              </p>
              <VendorButton href={ROUTES.vendor.register} variant="secondary">
                Become a Vendor
              </VendorButton>
            </div>
          }
        >
          <VendorLoginForm />
        </VendorAuthCard>
        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Demo build — vendor sign-in isn&apos;t connected to a backend yet.
        </p>
      </VendorPageContainer>
    </div>
  );
}
