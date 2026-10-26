import Link from "next/link";
import { BarChart3, ClipboardList, Store } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import {
  VendorAuthCard,
  VendorAuthRedirect,
  VendorButton,
  VendorHeader,
  VendorHeroVisual,
} from "@/features/vendor/components";

const perks = [
  { icon: Store, label: "Your own storefront" },
  { icon: ClipboardList, label: "Simple order management" },
  { icon: BarChart3, label: "Sales at a glance" },
];

export function VendorWelcomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <VendorAuthRedirect />
      <VendorHeader
        backHref={ROUTES.home}
        backLabel="Back to DROPly"
        actions={
          <VendorButton
            href={ROUTES.vendor.login}
            variant="secondary"
            size="md"
            className="hidden w-auto sm:inline-flex"
          >
            Sign In
          </VendorButton>
        }
      />

      <main className="animate-fade-in mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        {/* Left — vendor intro */}
        <div className="flex flex-col">
          <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
            For campus businesses
          </span>
          {/* Desktop headline */}
          <h1 className="mt-5 hidden text-4xl font-bold leading-[1.08] tracking-tight text-foreground lg:block xl:text-5xl">
            Your business. More customers. One DROPly.
          </h1>
          {/* Mobile headline */}
          <h1 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:hidden">
            Grow your business with DROPly
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            <span className="hidden lg:inline">
              Put your business in front of students on campus and manage
              everything from one simple platform.
            </span>
            <span className="lg:hidden">
              Reach more customers on campus, manage your orders, and grow your
              business — all from one place.
            </span>
          </p>

          <VendorHeroVisual className="mt-8 lg:mt-10" />

          <ul className="mt-8 hidden flex-wrap gap-x-6 gap-y-2 lg:flex">
            {perks.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"
              >
                <Icon className="size-4.5 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — vendor access card */}
        <div className="mt-10 flex flex-col lg:mt-0">
          <VendorAuthCard
            title="Welcome, Vendor"
            subtitle="Manage your DROPly business"
            className="shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            footer={
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <p>
                  Already selling on DROPly?{" "}
                  <Link
                    href={ROUTES.vendor.login}
                    className="font-semibold text-primary transition-colors hover:text-droply-orange-hover"
                  >
                    Sign in to your vendor account
                  </Link>
                </p>
                <p>
                  New to DROPly?{" "}
                  <Link
                    href={ROUTES.vendor.register}
                    className="font-semibold text-primary transition-colors hover:text-droply-orange-hover"
                  >
                    Register your business
                  </Link>
                </p>
              </div>
            }
          >
            <div className="flex flex-col gap-3">
              <VendorButton href={ROUTES.vendor.login}>Sign In</VendorButton>
              <VendorButton href={ROUTES.vendor.register} variant="secondary">
                Become a Vendor
              </VendorButton>
            </div>
          </VendorAuthCard>

          <Link
            href={ROUTES.home}
            className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            ← Back to DROPly
          </Link>
        </div>
      </main>
    </div>
  );
}
