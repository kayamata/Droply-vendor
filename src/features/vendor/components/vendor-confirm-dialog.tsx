"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { VendorButton } from "@/features/vendor/components/vendor-button";

interface VendorConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
}

/** Small destructive/neutral confirmation — delete product, cancel order, etc. */
export function VendorConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  destructive,
  onConfirm,
}: VendorConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <VendorButton
            variant="secondary"
            size="md"
            onClick={() => onOpenChange(false)}
          >
            Keep
          </VendorButton>
          <VendorButton
            size="md"
            className={
              destructive
                ? "bg-destructive text-white shadow-none hover:bg-destructive/90"
                : undefined
            }
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </VendorButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
