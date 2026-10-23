"use client";

import * as React from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Store } from "lucide-react";

import { useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import { PwaInstallCard } from "@/features/pwa";
import { VENDOR_CATEGORIES } from "@/utils/constants";
import {
  VendorButton,
  VendorCard,
  VendorInput,
  VendorPortalShell,
  VendorSelect,
  VendorTextarea,
  StoreStatusPill,
} from "@/features/vendor/components";
import type { StoreStatus } from "@/features/vendor/types";

const STORE_STATUS_OPTIONS: { value: StoreStatus; label: string }[] = [
  { value: "open", label: "Open — accepting orders" },
  { value: "busy", label: "Busy — longer prep times" },
  { value: "closed", label: "Closed — not accepting orders" },
];

export function VendorSettingsPage() {
  const { vendor } = useVendorDemo();
  const [form, setForm] = React.useState(vendor);
  const [saved, setSaved] = React.useState(false);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setSaved(false);
    };

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    vendorDemoActions.updateStoreProfile({
      businessName: form.businessName,
      description: form.description,
      phone: form.phone,
      email: form.email,
      address: form.address,
      openingHours: form.openingHours,
      status: form.status,
    });
    setSaved(true);
  }

  return (
    <VendorPortalShell title="Settings">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Store profile summary */}
        <VendorCard className="h-fit p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-[0_4px_12px_rgba(232,90,29,0.25)]">
              {vendor.businessName.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-foreground">
                {vendor.businessName}
              </p>
              <p className="text-xs text-muted-foreground">
                {vendor.category} · since {vendor.joinedLabel}
              </p>
              <div className="mt-1.5">
                <StoreStatusPill status={vendor.status} />
              </div>
            </div>
          </div>
          <ul className="mt-5 flex flex-col gap-3 border-t border-border pt-5 text-sm">
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              {vendor.address}, {vendor.campus}
            </li>
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <Phone className="size-4 shrink-0" />
              {vendor.phone}
            </li>
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <Mail className="size-4 shrink-0" />
              {vendor.email}
            </li>
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <Clock className="size-4 shrink-0" />
              {vendor.openingHours}
            </li>
          </ul>
          <p className="mt-5 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
            ★ {vendor.rating} rating · {vendor.totalOrders.toLocaleString()}{" "}
            lifetime orders · {vendor.ownerName}
          </p>
        </VendorCard>

        {/* Edit form */}
        <VendorCard className="p-5 sm:p-6 lg:col-span-3">
          <h2 className="text-base font-bold text-foreground">
            Store profile
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            This is what customers see on your DROPly storefront.
          </p>
          <form onSubmit={onSave} className="mt-5 flex flex-col gap-4">
            <VendorInput
              label="Business name"
              icon={<Store />}
              value={form.businessName}
              onChange={update("businessName")}
            />
            <VendorTextarea
              label="Description"
              value={form.description}
              onChange={update("description")}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <VendorSelect
                label="Category"
                options={[
                  { value: vendor.category, label: vendor.category },
                  ...VENDOR_CATEGORIES.filter(
                    (c) => c.label !== vendor.category
                  ).map((c) => ({ value: c.label, label: c.label })),
                ]}
                value={form.category}
                onChange={update("category")}
              />
              <VendorInput
                label="Phone"
                icon={<Phone />}
                value={form.phone}
                onChange={update("phone")}
              />
            </div>
            <VendorInput
              label="Email"
              type="email"
              icon={<Mail />}
              value={form.email}
              onChange={update("email")}
            />
            <VendorInput
              label="Address"
              icon={<MapPin />}
              value={form.address}
              onChange={update("address")}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <VendorInput
                label="Opening hours"
                icon={<Clock />}
                value={form.openingHours}
                onChange={update("openingHours")}
              />
              <VendorSelect
                label="Store status"
                options={STORE_STATUS_OPTIONS}
                value={form.status}
                onChange={update("status")}
              />
            </div>

            <div className="flex items-center gap-3">
              <VendorButton type="submit" size="md" className="w-auto">
                Save changes
              </VendorButton>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                  <CheckCircle2 className="size-4" />
                  Saved
                </span>
              )}
            </div>
          </form>
        </VendorCard>
      </div>

      <div className="mt-6">
        <PwaInstallCard />
      </div>
    </VendorPortalShell>
  );
}
