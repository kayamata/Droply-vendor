"use client";

import { Award } from "lucide-react";

import { ROUTES } from "@/utils/constants";
import { CUSTOMER_REWARDS, useCustomerDemo } from "@/features/customer/api";
import {
  CustomerBackHeader,
  CustomerRewardCard,
  CustomerShell,
} from "@/features/customer/components";

/**
 * Rewards — loyalty points banner and the claimable voucher list.
 */
export function CustomerRewardsPage() {
  const state = useCustomerDemo();

  return (
    <CustomerShell className="flex flex-col gap-5">
      <CustomerBackHeader title="Rewards" backHref={ROUTES.customer.profile} />

      {/* Points banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-[linear-gradient(135deg,#1C1C1E_0%,#3A3A3C_100%)] p-6 text-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold opacity-70">
              Campus Rewards Balance
            </p>
            <h3 className="mt-1 text-3xl font-black text-primary">
              {state.rewardPoints.toLocaleString()}{" "}
              <span className="text-sm font-bold text-white">pts</span>
            </h3>
          </div>
          <span className="flex size-13.5 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Award className="size-7" />
          </span>
        </div>
        <p className="mt-4 text-xs opacity-60">
          Earn 10 points for every ₦100 spent on DROPly orders.
        </p>
      </div>

      {/* Claimable rewards */}
      <section className="flex flex-col gap-4">
        <h3 className="px-1 text-lg font-extrabold text-foreground">
          Available Rewards
        </h3>
        {CUSTOMER_REWARDS.map((reward) => (
          <CustomerRewardCard
            key={reward.id}
            reward={reward}
            points={state.rewardPoints}
            claimed={state.claimedRewards.includes(reward.id)}
          />
        ))}
      </section>
    </CustomerShell>
  );
}
