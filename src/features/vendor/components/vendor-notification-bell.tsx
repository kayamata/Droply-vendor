"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ClipboardList,
  CreditCard,
  Megaphone,
  Package,
  Star,
  Info,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { getUnreadCount, useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import type { NotificationKind } from "@/features/vendor/types";

const kindIcon: Record<NotificationKind, typeof Bell> = {
  order: ClipboardList,
  review: Star,
  payout: CreditCard,
  inventory: Package,
  promotion: Megaphone,
  system: Info,
};

/** Header bell with unread badge + dropdown of demo notifications. */
export function VendorNotificationBell() {
  const router = useRouter();
  const state = useVendorDemo();
  const { notifications } = state;
  const unread = getUnreadCount(state);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
        className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 hover:bg-muted"
      >
        <Bell className="size-4.5" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* click-outside layer */}
          <button
            type="button"
            aria-label="Close notifications"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-bold text-foreground">Notifications</p>
              {unread > 0 && (
                <button
                  type="button"
                  onClick={() => vendorDemoActions.markAllNotificationsRead()}
                  className="text-xs font-semibold text-primary transition-colors hover:text-droply-orange-hover"
                >
                  Mark all read
                </button>
              )}
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = kindIcon[n.kind];
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => {
                        vendorDemoActions.markNotificationRead(n.id);
                        setOpen(false);
                        if (n.href) router.push(n.href);
                      }}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted",
                        !n.read && "bg-secondary/60"
                      )}
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-droply-blue-light text-droply-blue-dark">
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-bold text-foreground">
                            {n.title}
                          </span>
                          {!n.read && (
                            <span className="size-2 shrink-0 rounded-full bg-primary" />
                          )}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {n.body}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-muted-foreground">
                          {n.timeLabel}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
