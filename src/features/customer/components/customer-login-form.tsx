"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { useCustomerLogin } from "@/features/customer/api";
import { CustomerButton } from "@/features/customer/components/customer-button";
import { CustomerInput } from "@/features/customer/components/customer-input";
import type { CustomerLoginPayload } from "@/features/customer/types";

interface FieldErrors {
  identifier?: string;
  password?: string;
}

/** Customer sign-in — identifier (email or phone) + password. */
export function CustomerLoginForm() {
  const router = useRouter();
  const login = useCustomerLogin();
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, setForm] = React.useState<CustomerLoginPayload>({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});

  const update =
    (field: keyof CustomerLoginPayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.identifier.trim()) {
      next.identifier = "Enter your email or phone number.";
    } else if (
      form.identifier.includes("@") &&
      !/^\S+@\S+\.\S+$/.test(form.identifier.trim())
    ) {
      next.identifier = "Enter a valid email address.";
    }
    if (!form.password) {
      next.password = "Enter your password.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    login.mutate(form, {
      onSuccess: () => router.replace(ROUTES.customer.root),
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <CustomerInput
        label="Email or Phone Number"
        type="text"
        inputMode="email"
        autoComplete="username"
        placeholder="you@nsuk.edu.ng or 0801 234 5678"
        icon={<Mail />}
        value={form.identifier}
        onChange={update("identifier")}
        error={errors.identifier}
      />
      <div className="relative">
        <CustomerInput
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Your password"
          icon={<Lock />}
          value={form.password}
          onChange={update("password")}
          error={errors.password}
          className="[&_input]:pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-[38px] text-muted-foreground transition-colors hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="size-4.5" />
          ) : (
            <Eye className="size-4.5" />
          )}
        </button>
      </div>

      <CustomerButton type="submit" disabled={login.isPending}>
        {login.isPending ? "Signing in…" : "Sign In"}
      </CustomerButton>
    </form>
  );
}
