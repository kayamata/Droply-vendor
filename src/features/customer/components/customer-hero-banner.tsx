"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { ROUTES } from "@/utils/constants";

interface CustomerHeroBannerProps {
  firstName: string;
}

/**
 * Orange gradient hero on the home screen — campus badge, greeting headline,
 * "Order Now" CTA, and the 🍛🌯 motif.
 */
export function CustomerHeroBanner({ firstName }: CustomerHeroBannerProps) {
  const router = useRouter();

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#E85A1D_0%,#B83D0D_100%)] px-5 py-6 text-primary-foreground sm:px-7">
      {/* Dot pattern overlay */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="z-[1] max-w-xl">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles className="size-3.5" />
          <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-extrabold">
            NSUK Campus Delivery
          </span>
        </div>
        <h1 className="mb-2 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
          Hungry on Campus,
          <br />
          {firstName}? 🍛
        </h1>
        <p className="mb-4 max-w-md text-[13px] leading-snug opacity-90">
          Order Jollof Rice, Suya, Shawarma &amp; Groceries delivered to your
          hostel in under 30 mins.
        </p>
        <button
          type="button"
          onClick={() => router.push(ROUTES.customer.stores)}
          className="rounded-2xl bg-[#1E1E22] px-5 py-3 text-sm font-extrabold text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5"
        >
          Order Now →
        </button>
      </div>

      <div className="z-[1] select-none text-5xl leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] sm:text-6xl">
        🍛🌯
      </div>
    </div>
  );
}
