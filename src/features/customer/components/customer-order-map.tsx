"use client";

import { MessageSquare } from "lucide-react";

import { customerActions } from "@/features/customer/api";
import type { CustomerOrder } from "@/features/customer/types";

interface CustomerOrderMapProps {
  order: CustomerOrder;
}

/**
 * Stylised delivery map — SVG city blocks, dashed route, destination pin —
 * with the floating rider card from the track-order screen.
 */
export function CustomerOrderMap({ order }: CustomerOrderMapProps) {
  return (
    <div className="relative h-72 w-full overflow-hidden border-b border-border bg-card">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 440 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="100%" height="100%" className="fill-background" />

        {/* City blocks */}
        <rect x="10" y="10" width="80" height="60" rx="8" className="fill-card" opacity="0.8" />
        <rect x="100" y="10" width="180" height="60" rx="8" className="fill-card" opacity="0.8" />
        <rect x="290" y="10" width="130" height="60" rx="8" className="fill-card" opacity="0.8" />
        <rect x="10" y="80" width="80" height="40" rx="8" className="fill-card" opacity="0.8" />
        <rect x="100" y="80" width="180" height="40" rx="8" className="fill-card" opacity="0.8" />
        <rect x="290" y="80" width="130" height="40" rx="8" className="fill-card" opacity="0.8" />
        <rect x="10" y="130" width="140" height="60" rx="8" className="fill-primary" opacity="0.2" />
        <rect x="160" y="130" width="260" height="60" rx="8" className="fill-card" opacity="0.8" />

        {/* Roads */}
        <line x1="90" y1="0" x2="90" y2="300" className="stroke-border" strokeWidth="20" />
        <line x1="280" y1="0" x2="280" y2="300" className="stroke-border" strokeWidth="20" />
        <line x1="0" y1="200" x2="440" y2="200" className="stroke-border" strokeWidth="20" />

        {/* Route path */}
        <path
          d="M 280 200 L 350 200 L 350 130 L 160 130"
          fill="none"
          className="stroke-primary"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 6"
        />
        <circle cx="280" cy="200" r="8" className="fill-primary" />

        {/* Destination pin */}
        <g transform="translate(160, 130)">
          <circle cx="0" cy="-20" r="14" className="fill-primary" />
          <circle cx="0" cy="-20" r="6" fill="white" />
        </g>
      </svg>

      {/* Rider card */}
      <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <span className="flex size-11.5 items-center justify-center rounded-full border-2 border-primary bg-secondary text-[22px]">
            🚴
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Delivery Rider
            </p>
            <h4 className="mt-0.5 text-[15px] font-extrabold text-foreground">
              {order.rider.name}
            </h4>
          </div>
        </div>
        <button
          type="button"
          onClick={() => customerActions.showToast("Chat with your rider is coming soon")}
          aria-label="Chat with rider"
          className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(232,90,29,0.3)]"
        >
          <MessageSquare className="size-4.5" />
        </button>
      </div>
    </div>
  );
}
