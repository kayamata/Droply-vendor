"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Clock, ImagePlus, MapPin, Phone, Store } from "lucide-react";

import { ROUTES, VENDOR_CATEGORIES } from "@/utils/constants";
import { useVendorOnboardingSubmit } from "@/features/vendor/api";
import { useOnboardingDraft } from "@/features/vendor/hooks";
import { VendorButton } from "@/features/vendor/components/vendor-button";
import {
  VendorHoursDialog,
  type DayHours,
} from "@/features/vendor/components/vendor-hours-dialog";
import { VendorInput } from "@/features/vendor/components/vendor-input";
import { VendorSelect } from "@/features/vendor/components/vendor-select";
import { VendorTextarea } from "@/features/vendor/components/vendor-textarea";
import { cn } from "@/utils/cn";
import type { VendorBusinessPayload } from "@/features/vendor/types";

type FieldErrors = Partial<
  Record<keyof Omit<VendorBusinessPayload, "logo" | "coverImage">, string>
>;

function FileField({
  label,
  file,
  onChange,
  hint,
}: {
  label: string;
  file: File | null | undefined;
  onChange: (file: File | null) => void;
  hint: string;
}) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <label
        htmlFor={id}
        className={cn(
          "flex h-[52px] cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-input bg-muted px-4 text-sm transition-all duration-200",
          "hover:border-primary/50 hover:bg-card",
          "focus-within:ring-2 focus-within:ring-ring"
        )}
      >
        <ImagePlus className="size-4.5 shrink-0 text-muted-foreground" />
        <span className="truncate text-muted-foreground">
          {file ? file.name : hint}
        </span>
        <input
          id={id}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

export function VendorBusinessForm() {
  const router = useRouter();
  const submit = useVendorOnboardingSubmit();
  const { draft, clearDraft } = useOnboardingDraft();
  const [form, setForm] = React.useState<VendorBusinessPayload>({
    businessName: "",
    description: "",
    category: "",
    address: "",
    operatingHours: "",
    phone: "",
    logo: null,
    coverImage: null,
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [hoursOpen, setHoursOpen] = React.useState(false);
  const [weekHours, setWeekHours] = React.useState<DayHours[] | undefined>();

  // Fields the step-1 draft can prefill fall back to the draft until edited.
  const effective: Pick<
    VendorBusinessPayload,
    "businessName" | "phone" | "category"
  > = {
    businessName: form.businessName || draft?.businessName || "",
    phone: form.phone || draft?.phone || "",
    category: form.category || draft?.category || "",
  };

  const update =
    (field: keyof VendorBusinessPayload) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!effective.businessName.trim())
      next.businessName = "Enter your business name.";
    if (!effective.category) next.category = "Choose a business category.";
    if (!form.address.trim())
      next.address = "Tell customers where to find you.";
    if (!form.operatingHours.trim())
      next.operatingHours = "Set your weekly opening hours.";
    if (!effective.phone.trim()) next.phone = "Enter a business phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    submit.mutate(
      { ...form, ...effective },
      {
        onSuccess: () => {
          clearDraft();
          router.push(ROUTES.vendor.dashboard);
        },
      }
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <VendorInput
        label="Business Name"
        placeholder="e.g. Mama Cass Bukka"
        icon={<Store />}
        value={effective.businessName}
        onChange={update("businessName")}
        error={errors.businessName}
      />
      <VendorTextarea
        label="Business Description"
        placeholder="Tell customers what makes your food or products special."
        value={form.description}
        onChange={update("description")}
        error={errors.description}
        hint="Shown on your storefront. A sentence or two is plenty."
      />
      <VendorSelect
        label="Business Category"
        placeholder="What do you sell?"
        options={VENDOR_CATEGORIES}
        value={effective.category}
        onChange={update("category") as (e: React.ChangeEvent<HTMLSelectElement>) => void}
        error={errors.category}
      />
      <VendorInput
        label="Business Address / Location"
        placeholder="e.g. Behind Faculty of Science, NSUK"
        icon={<MapPin />}
        value={form.address}
        onChange={update("address")}
        error={errors.address}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-foreground">
            Operating Hours
          </span>
          <button
            type="button"
            onClick={() => setHoursOpen(true)}
            className={cn(
              "flex h-[52px] w-full items-center gap-3 rounded-2xl border border-input bg-muted px-4 text-left text-base outline-none transition-all duration-200 sm:text-sm",
              "hover:border-primary/50 focus:border-transparent focus:bg-card focus:ring-2 focus:ring-ring",
              errors.operatingHours && "border-destructive",
              form.operatingHours ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <Clock className="size-4.5 shrink-0 text-muted-foreground" />
            <span className="truncate">
              {form.operatingHours || "Set your weekly hours"}
            </span>
          </button>
          {errors.operatingHours && (
            <p className="text-xs font-medium text-destructive">
              {errors.operatingHours}
            </p>
          )}
        </div>
        <VendorInput
          label="Business Phone Number"
          type="tel"
          inputMode="tel"
          placeholder="0801 234 5678"
          icon={<Phone />}
          value={effective.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FileField
          label="Business Logo (optional)"
          hint="Upload a logo"
          file={form.logo}
          onChange={(logo) => setForm((f) => ({ ...f, logo }))}
        />
        <FileField
          label="Cover Image (optional)"
          hint="Upload a cover photo"
          file={form.coverImage}
          onChange={(coverImage) => setForm((f) => ({ ...f, coverImage }))}
        />
      </div>

      <VendorButton type="submit" loading={submit.isPending} className="mt-1">
        {submit.isPending ? "Saving…" : "Continue"}
      </VendorButton>

      <VendorHoursDialog
        open={hoursOpen}
        onOpenChange={setHoursOpen}
        initial={weekHours}
        onSave={(days, label) => {
          setWeekHours(days);
          setForm((f) => ({ ...f, operatingHours: label }));
          setErrors((prev) => ({ ...prev, operatingHours: undefined }));
        }}
      />
    </form>
  );
}
