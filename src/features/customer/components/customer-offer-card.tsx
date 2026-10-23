import Link from "next/link";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/utils/constants";
import type { CustomerOffer } from "@/features/customer/types";

/* Card surfaces for the featured-offers rail. */
const themeClasses: Record<
  CustomerOffer["theme"],
  { card: string; badge: string; name: string; title: string; subtitle: string }
> = {
  dark: {
    card: "bg-[#1C1C1E]",
    badge: "bg-primary",
    name: "text-white/70",
    title: "text-white",
    subtitle: "text-white/60",
  },
  orange: {
    card: "bg-[linear-gradient(135deg,#E85A1D_0%,#B83D0D_100%)]",
    badge: "bg-white/20",
    name: "text-white/90",
    title: "text-white",
    subtitle: "text-white/80",
  },
  yellow: {
    card: "bg-[linear-gradient(135deg,#FEE89E_0%,#FDD56A_100%)]",
    badge: "border-[2.5px] border-primary bg-transparent",
    name: "text-[#7A6000]",
    title: "text-[#3D2F00]",
    subtitle: "text-[#7A6000]",
  },
};

interface CustomerOfferCardProps {
  offer: CustomerOffer;
}

/** One slide in the featured-offers rail on the home screen. */
export function CustomerOfferCard({ offer }: CustomerOfferCardProps) {
  const t = themeClasses[offer.theme];

  return (
    <Link
      href={ROUTES.customer.store(offer.storeId)}
      className={cn(
        "flex w-64 shrink-0 items-center gap-3.5 rounded-2xl p-4.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5",
        t.card
      )}
    >
      <span
        className={cn(
          "flex size-13 shrink-0 items-center justify-center rounded-full font-black",
          t.badge,
          offer.markKind === "emoji" ? "text-2xl" : "font-serif text-lg italic text-primary"
        )}
      >
        {offer.mark}
      </span>
      <span>
        <span className={cn("mb-0.5 block text-[11px] font-semibold", t.name)}>
          {offer.storeName}
        </span>
        <span className={cn("block text-lg font-extrabold", t.title)}>
          {offer.title}
        </span>
        <span className={cn("mt-0.5 block text-[11px]", t.subtitle)}>
          {offer.subtitle}
        </span>
      </span>
    </Link>
  );
}
