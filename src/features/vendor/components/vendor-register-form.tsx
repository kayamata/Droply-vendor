"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Phone, Store, User } from "lucide-react";

import { ROUTES, VENDOR_CATEGORIES } from "@/utils/constants";
import { useVendorRegister } from "@/features/vendor/api";
import { useOnboardingDraft } from "@/features/vendor/hooks";
import { VendorButton } from "@/features/vendor/components/vendor-button";
import { VendorInput } from "@/features/vendor/components/vendor-input";
import { VendorSelect } from "@/features/vendor/components/vendor-select";
import type { VendorAccountPayload } from "@/features/vendor/types";

type FieldErrors = Partial<Record<keyof VendorAccountPayload, string>>;

export function VendorRegisterForm() {
  const router = useRouter();
  const register = useVendorRegister();
  const { saveDraft } = useOnboardingDraft();
  const [form, setForm] = React.useState<VendorAccountPayload>({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    password: "",
    category: "",
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});

  const update =
    (field: keyof VendorAccountPayload) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.businessName.trim())
      next.businessName = "Enter your business name.";
    if (!form.ownerName.trim())
      next.ownerName = "Enter the owner or contact name.";
    if (!form.phone.trim()) next.phone = "Enter a phone number.";
    else if (!/^[\d\s+()-]{7,}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (!form.email.trim()) next.email = "Enter an email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (form.password.length < 6)
      next.password = "Password must be at least 6 characters.";
    if (!form.category) next.category = "Choose a business category.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    saveDraft(form);
    register.mutate(form, {
      onSuccess: () => router.push(ROUTES.vendor.onboarding),
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <VendorInput
        label="Business Name"
        placeholder="e.g. Mama Cass Bukka"
        icon={<Store />}
        autoComplete="organization"
        value={form.businessName}
        onChange={update("businessName")}
        error={errors.businessName}
      />
      <VendorInput
        label="Owner / Contact Name"
        placeholder="Your full name"
        icon={<User />}
        autoComplete="name"
        value={form.ownerName}
        onChange={update("ownerName")}
        error={errors.ownerName}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <VendorInput
          label="Phone Number"
          type="tel"
          inputMode="tel"
          placeholder="0801 234 5678"
          icon={<Phone />}
          autoComplete="tel"
          value={form.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
        <VendorInput
          label="Email Address"
          type="email"
          inputMode="email"
          placeholder="you@business.com"
          icon={<Mail />}
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
        />
      </div>
      <VendorInput
        label="Password"
        type="password"
        placeholder="At least 6 characters"
        icon={<Lock />}
        autoComplete="new-password"
        value={form.password}
        onChange={update("password")}
        error={errors.password}
      />
      <VendorSelect
        label="Business Category"
        placeholder="What do you sell?"
        options={VENDOR_CATEGORIES}
        value={form.category}
        onChange={update("category") as (e: React.ChangeEvent<HTMLSelectElement>) => void}
        error={errors.category}
      />

      <VendorButton type="submit" loading={register.isPending} className="mt-1">
        {register.isPending ? "Creating account…" : "Continue"}
      </VendorButton>
    </form>
  );
}
