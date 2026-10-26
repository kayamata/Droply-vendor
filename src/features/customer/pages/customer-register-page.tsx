"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/utils/constants";
import { useCustomerSession } from "@/features/customer/api";
import { CustomerAuthCard } from "@/features/customer/components/customer-auth-card";
import { CustomerAuthShell } from "@/features/customer/components/customer-auth-shell";
import { CustomerRegisterForm } from "@/features/customer/components/customer-register-form";

/** Customer sign-up — name, identifier, password. Creates the session. */
export function CustomerRegisterPage() {
  const router = useRouter();
  const session = useCustomerSession();

  React.useEffect(() => {
    if (session) router.replace(ROUTES.customer.root);
  }, [session, router]);

  return (
    <CustomerAuthShell
      backHref={ROUTES.customer.root}
      backLabel="Back"
      wide
    >
      <div className="mb-6 flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Create your account
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Order food and groceries from campus stores in minutes.
        </p>
      </div>

      <CustomerAuthCard title="Customer details">
        <CustomerRegisterForm />
      </CustomerAuthCard>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={ROUTES.customer.login}
          className="font-semibold text-primary transition-colors hover:text-droply-orange-hover"
        >
          Sign in
        </Link>
      </p>
    </CustomerAuthShell>
  );
}
