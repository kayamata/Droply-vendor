"use client";

import * as React from "react";
import { CheckCircle2, Landmark } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { formatNaira } from "@/utils/format";
import { useVendorDemo, vendorDemoActions } from "@/features/vendor/api";
import { VendorButton } from "@/features/vendor/components/vendor-button";
import { VendorInput } from "@/features/vendor/components/vendor-input";

function PayoutForm({ onClose }: { onClose: () => void }) {
  const { earnings } = useVendorDemo();
  const [amount, setAmount] = React.useState(String(earnings.availableBalance));
  const [done, setDone] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  function onConfirm() {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    if (value > earnings.availableBalance) {
      setError(
        `You can withdraw up to ${formatNaira(earnings.availableBalance)}.`
      );
      return;
    }
    vendorDemoActions.requestPayout(value);
    setDone(value);
  }

  if (done !== null) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-7" />
        </span>
        <p className="text-lg font-bold text-foreground">
          {formatNaira(done)} on the way
        </p>
        <p className="text-sm text-muted-foreground">
          Payout to GTBank ••4521 is processing. It usually lands within 24
          hours. (Demo — no real money moved.)
        </p>
        <VendorButton size="md" onClick={onClose} className="mt-2">
          Done
        </VendorButton>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 rounded-2xl bg-muted p-4">
          <span className="flex size-10 items-center justify-center rounded-xl bg-card text-muted-foreground">
            <Landmark className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">GTBank ••4521</p>
            <p className="text-xs text-muted-foreground">
              Daniel Okafor — default payout account
            </p>
          </div>
        </div>
        <VendorInput
          label="Amount (₦)"
          type="number"
          inputMode="numeric"
          min={0}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError("");
          }}
          hint={`Available balance: ${formatNaira(earnings.availableBalance)}`}
          error={error || undefined}
        />
        <button
          type="button"
          onClick={() => setAmount(String(earnings.availableBalance))}
          className="self-start text-xs font-semibold text-primary transition-colors hover:text-droply-orange-hover"
        >
          Withdraw full balance
        </button>
      </div>

      <div className="flex gap-2">
        <VendorButton variant="secondary" size="md" onClick={onClose}>
          Cancel
        </VendorButton>
        <VendorButton size="md" onClick={onConfirm}>
          Withdraw
        </VendorButton>
      </div>
    </>
  );
}

interface VendorPayoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Demo payout flow — updates balances in the demo store; no real money moves. */
export function VendorPayoutDialog({
  open,
  onOpenChange,
}: VendorPayoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Withdraw earnings
          </DialogTitle>
        </DialogHeader>
        {open && <PayoutForm onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
