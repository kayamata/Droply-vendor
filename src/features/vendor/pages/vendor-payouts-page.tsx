"use client";

import * as React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Landmark,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { formatNaira, formatSignedNaira } from "@/utils/format";
import { useVendorDemo } from "@/features/vendor/api";
import {
  VendorButton,
  VendorCard,
  VendorPayoutDialog,
  VendorPortalShell,
  VendorStatCard,
} from "@/features/vendor/components";
import type { TransactionKind } from "@/features/vendor/types";

const txnIcon: Record<TransactionKind, typeof ArrowUpRight> = {
  order: ArrowUpRight,
  fee: ArrowDownRight,
  payout: ArrowDownRight,
  adjustment: ArrowUpRight,
};

export function VendorPayoutsPage() {
  const { earnings, transactions, payouts } = useVendorDemo();
  const [payoutOpen, setPayoutOpen] = React.useState(false);

  return (
    <VendorPortalShell
      title="Payouts & Earnings"
      actions={
        <VendorButton
          size="md"
          className="w-auto"
          onClick={() => setPayoutOpen(true)}
        >
          <Wallet className="size-4" />
          Withdraw
        </VendorButton>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Balances */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <VendorStatCard
            icon={Wallet}
            label="Available balance"
            value={formatNaira(earnings.availableBalance)}
            className="col-span-2"
          />
          <VendorStatCard
            icon={CreditCard}
            label="Pending payout"
            value={formatNaira(earnings.pendingPayout)}
          />
          <VendorStatCard
            icon={TrendingUp}
            label="Total revenue"
            value={formatNaira(earnings.totalRevenue)}
            delta="+12% this week"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Transactions ledger */}
          <VendorCard className="overflow-hidden lg:col-span-3">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-base font-bold text-foreground">
                Transactions
              </h2>
              <span className="text-xs text-muted-foreground">
                Recent activity
              </span>
            </div>
            <ul className="divide-y divide-border">
              {transactions.map((t) => {
                const Icon = txnIcon[t.kind];
                const incoming = t.amount >= 0;
                return (
                  <li
                    key={t.id}
                    className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-xl",
                        incoming
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {t.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t.timestampLabel}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        incoming ? "text-emerald-600" : "text-foreground"
                      )}
                    >
                      {formatSignedNaira(t.amount)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </VendorCard>

          {/* Payout history */}
          <VendorCard className="h-fit overflow-hidden lg:col-span-2">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-base font-bold text-foreground">
                Payout history
              </h2>
            </div>
            <ul className="divide-y divide-border">
              {payouts.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-droply-blue-light text-droply-blue-dark">
                    <Landmark className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">
                      {formatNaira(p.amount)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {p.dateLabel} · {p.method}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-bold",
                      p.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    )}
                  >
                    {p.status === "completed" ? "Completed" : "Processing"}
                  </span>
                </li>
              ))}
            </ul>
          </VendorCard>
        </div>
      </div>

      <VendorPayoutDialog open={payoutOpen} onOpenChange={setPayoutOpen} />
    </VendorPortalShell>
  );
}
