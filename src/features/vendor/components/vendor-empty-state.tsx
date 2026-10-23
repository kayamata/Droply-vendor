import type { LucideIcon } from "lucide-react";

import { VendorCard } from "@/features/vendor/components/vendor-card";

interface VendorEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/** Shown only when the user filters/searches down to nothing. */
export function VendorEmptyState({
  icon: Icon,
  title,
  description,
  action,
}: VendorEmptyStateProps) {
  return (
    <VendorCard className="flex flex-col items-center gap-3 p-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="size-7" />
      </span>
      <p className="text-base font-bold text-foreground">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action}
    </VendorCard>
  );
}
