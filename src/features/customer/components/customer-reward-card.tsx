"use client";

import { Check, Gift } from "lucide-react";

import { customerActions } from "@/features/customer/api";
import type { CustomerReward } from "@/features/customer/types";

interface CustomerRewardCardProps {
  reward: CustomerReward;
  points: number;
  claimed: boolean;
}

/** Claimable loyalty reward — title, description, point cost, claim button. */
export function CustomerRewardCard({
  reward,
  points,
  claimed,
}: CustomerRewardCardProps) {
  const handleClaim = () => {
    if (claimed) return;
    const ok = customerActions.claimReward(reward.id, reward.cost);
    customerActions.showToast(
      ok
        ? "Reward claimed — added to your promo codes"
        : "Not enough reward points"
    );
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div className="min-w-0 flex-1">
        <h4 className="mb-1 text-[15.5px] font-extrabold text-foreground">
          {reward.title}
        </h4>
        <p className="mb-2 text-[12.5px] font-medium leading-snug text-muted-foreground">
          {reward.description}
        </p>
        <span className="text-[13px] font-black text-primary">
          {reward.cost.toLocaleString()} pts
        </span>
      </div>

      <button
        type="button"
        onClick={handleClaim}
        disabled={claimed || points < reward.cost}
        className={
          claimed
            ? "flex shrink-0 items-center gap-1 rounded-xl bg-emerald-500/15 px-4 py-2.5 text-[13px] font-extrabold text-emerald-600"
            : "flex shrink-0 items-center gap-1 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-extrabold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
        }
      >
        {claimed ? <Check className="size-3.5" /> : <Gift className="size-3.5" />}
        {claimed ? "Claimed" : "Claim"}
      </button>
    </div>
  );
}
