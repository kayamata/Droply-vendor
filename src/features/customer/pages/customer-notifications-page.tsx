"use client";

import * as React from "react";

import { ROUTES } from "@/utils/constants";
import {
  CustomerBackHeader,
  CustomerShell,
  CustomerToggle,
} from "@/features/customer/components";

const NOTIFICATION_SETTINGS = [
  {
    key: "push",
    title: "Push Notifications",
    description: "Receive real-time push alerts on your phone",
  },
  {
    key: "orderUpdates",
    title: "Order Tracking Updates",
    description: "Get notified when your meal is prepared or out for delivery",
  },
  {
    key: "promos",
    title: "Promotions & Discounts",
    description: "Special discount codes and campus store offers",
  },
  {
    key: "sms",
    title: "SMS Text Alerts",
    description: "Receive text message notifications on delivery status",
  },
] as const;

type SettingKey = (typeof NOTIFICATION_SETTINGS)[number]["key"];

/**
 * Notification Settings — toggle rows for push, order updates, promos, SMS.
 */
export function CustomerNotificationsPage() {
  const [settings, setSettings] = React.useState<Record<SettingKey, boolean>>({
    push: true,
    orderUpdates: true,
    promos: true,
    sms: false,
  });

  return (
    <CustomerShell className="flex flex-col gap-5">
      <CustomerBackHeader
        title="Notification Settings"
        backHref={ROUTES.customer.profile}
      />

      <div className="flex flex-col gap-4">
        {NOTIFICATION_SETTINGS.map((item) => (
          <CustomerToggle
            key={item.key}
            title={item.title}
            description={item.description}
            enabled={settings[item.key]}
            onToggle={() =>
              setSettings((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
            }
          />
        ))}
      </div>
    </CustomerShell>
  );
}
