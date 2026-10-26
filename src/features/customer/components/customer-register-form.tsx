"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { useCustomerRegister } from "@/features/customer/api";
import { CustomerButton } from "@/features/customer/components/customer-button";
import { CustomerInput } from "@/features/customer/components/customer-input";
import type { CustomerRegisterPayload } from "@/features/customer/types";

interface FieldErrors {
  name?: string;
  identifier?: string;
  password?: string;
}

/** Customer sign-up — name, email or phone, and a password. */
export function CustomerRegisterForm() {
  const router = useRouter();
  const register = useCustomerRegister();
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, setForm] = React.useState<CustomerRegisterPayload>({
    name: "",
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});

  const update =
    (field: keyof CustomerRegisterPayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.name.trim()) {
      next.name = "Enter your full name.";
    }
    if (!form.identifier.trim()) {
      next.identifier = "Enter your email or phone number.";
    } else if (
      form.identifier.includes("@") &&
      !/^\S+@\S+\.\S+$/.test(form.identifier.trim())
    ) {
      next.identifier = "Enter a valid email address.";
    }
    if (!form.password) {
      next.password = "Choose a password.";
    } else if (form.password.length < 6) {
      next.password = "Use at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    register.mutate(form, {
      onSuccess: () => router.replace(ROUTES.customer.root),
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <CustomerInput
        label="Full Name"
        type="text"
        autoComplete="name"
        placeholder="Amara Nwosu"
        icon={<User />}
        value={form.name}
        onChange={update("name")}
        error={errors.name}
      />
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
          autoComplete="new-password"
          placeholder="At least 6 characters"
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

      <CustomerButton type="submit" disabled={register.isPending}>
        {register.isPending ? "Creating account…" : "Create Account"}
      </CustomerButton>
    </form>
  );
}
