"use client";

import { useRouter } from "next/navigation";
import {
  Award,
  Bell,
  Briefcase,
  ChevronRight,
  Heart,
  HelpCircle,
  LogOut,
  ShoppingBag,
  Star,
  Tag,
  User,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import { formatNaira } from "@/utils/format";
import {
  customerActions,
  DEMO_CUSTOMER_PROFILE,
  useCustomerDemo,
} from "@/features/customer/api";
import { CustomerShell } from "@/features/customer/components";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
  danger?: boolean;
  onClick?: () => void;
}

/**
 * Customer profile — avatar header with order/rating badges and the
 * options list (orders, favorites, wallet, rewards, promo, notifications,
 * FAQ, logout).
 */
export function CustomerProfilePage() {
  const router = useRouter();
  const state = useCustomerDemo();
  const user = DEMO_CUSTOMER_PROFILE;

  const menuItems: MenuItem[] = [
    { id: "orders", label: "Order History", icon: ShoppingBag, href: ROUTES.customer.orders },
    { id: "favorites", label: "Favorites", icon: Heart, href: ROUTES.customer.favorites },
    {
      id: "account",
      label: "Account",
      icon: User,
      onClick: () =>
        customerActions.showToast(
          `${user.name} · ${user.username}@nsuk.edu.ng`
        ),
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: Wallet,
      badge: formatNaira(user.walletBalance),
      onClick: () =>
        customerActions.showToast(
          `Wallet balance: ${formatNaira(user.walletBalance)}`
        ),
    },
    { id: "rewards", label: "Rewards", icon: Award, href: ROUTES.customer.rewards },
    {
      id: "promo",
      label: "Promo Codes",
      icon: Tag,
      badge: state.promoCode || "NSUKFRESH",
      onClick: () =>
        customerActions.showToast(
          "Active promo: NSUKFRESH — save ₦150 on your order"
        ),
    },
    {
      id: "notifications",
      label: "Notification",
      icon: Bell,
      href: ROUTES.customer.notifications,
    },
    { id: "faq", label: "FAQ", icon: HelpCircle, href: ROUTES.customer.faq },
    {
      id: "logout",
      label: "Log out",
      icon: LogOut,
      danger: true,
      onClick: () => customerActions.showToast("Logged out (demo)"),
    },
  ];

  return (
    <CustomerShell className="flex flex-col gap-4">
      {/* Profile header */}
      <div className="flex flex-col items-center rounded-3xl border border-border bg-card px-5 pb-6 pt-7 text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="mb-3 flex size-22.5 items-center justify-center rounded-full border-[3px] border-primary bg-background p-1 text-[42px] shadow-[0_6px_20px_rgba(232,90,29,0.2)]">
          {user.avatarEmoji}
        </div>
        <h2 className="text-[22px] font-extrabold tracking-tight text-foreground">
          {user.name}
        </h2>
        <div className="mt-2.5 flex gap-2">
          <button
            type="button"
            onClick={() => router.push(ROUTES.customer.orders)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
          >
            <Briefcase className="size-3.5" />
            {user.ordersCount}
          </button>
          <span className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
            <Star className="size-3.5 fill-white" />
            {user.rating}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="rounded-3xl border border-border bg-card px-5 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <h3 className="mb-4 text-xl font-extrabold text-foreground">
          Profile Options
        </h3>
        <div className="flex flex-col">
          {menuItems.map((item, idx) => {
            const isLast = idx === menuItems.length - 1;
            const content = (
              <>
                <span
                  className={cn(
                    "flex items-center gap-3.5",
                    item.danger ? "text-red-500" : "text-foreground"
                  )}
                >
                  <item.icon className="size-5.5" />
                  <span className="text-[15px] font-semibold">{item.label}</span>
                </span>
                <span className="flex items-center gap-2">
                  {item.badge && (
                    <span className="rounded-lg bg-secondary px-2 py-1 text-xs font-extrabold text-primary">
                      {item.badge}
                    </span>
                  )}
                  {!item.danger && (
                    <ChevronRight className="size-4.5 text-primary" />
                  )}
                </span>
              </>
            );
            const rowClasses = cn(
              "flex w-full items-center justify-between py-3.5 text-left transition-opacity hover:opacity-80",
              !isLast && "border-b border-border"
            );
            return item.href ? (
              <button
                key={item.id}
                type="button"
                onClick={() => router.push(item.href!)}
                className={rowClasses}
              >
                {content}
              </button>
            ) : (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className={rowClasses}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </CustomerShell>
  );
}
