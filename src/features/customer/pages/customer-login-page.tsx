"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/utils/constants";
import { useCustomerSession } from "@/features/customer/api";
import { CustomerAuthCard } from "@/features/customer/components/customer-auth-card";
import { CustomerAuthShell } from "@/features/customer/components/customer-auth-shell";
import { CustomerButton } from "@/features/customer/components/customer-button";
import { CustomerLoginForm } from "@/features/customer/components/customer-login-form";

/** Customer sign-in — back link to the storefront welcome, form, footer CTA. */
export function CustomerLoginPage() {
  const router = useRouter();
  const session = useCustomerSession();

  React.useEffect(() => {
    if (session) router.replace(ROUTES.customer.root);
  }, [session, router]);

  return (
    <CustomerAuthShell
      backHref={ROUTES.customer.root}
      backLabel="Back"
    >
      <CustomerAuthCard
        title="Welcome back"
        subtitle="Sign in to keep ordering on DROPly."
        footer={
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              New to DROPly?
            </p>
            <CustomerButton href={ROUTES.customer.register} variant="secondary">
              Create Account
            </CustomerButton>
          </div>
        }
      >
        <CustomerLoginForm />
      </CustomerAuthCard>
      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        Demo build — customer sign-in isn&apos;t connected to a backend yet.
      </p>
    </CustomerAuthShell>
  );
}
