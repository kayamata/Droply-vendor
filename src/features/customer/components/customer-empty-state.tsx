import * as React from "react";

import { CustomerButton } from "@/features/customer/components/customer-button";

interface CustomerEmptyStateProps {
  emoji: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

/** Centered empty-state block — big emoji, headline, CTA. */
export function CustomerEmptyState({
  emoji,
  title,
  description,
  actionLabel,
  actionHref,
}: CustomerEmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-5 py-16 text-center">
      <span className="mb-4 block text-6xl">{emoji}</span>
      <h3 className="mb-2 text-xl font-extrabold text-foreground">{title}</h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
      <CustomerButton
        href={actionHref}
        size="md"
        className="w-auto px-6"
      >
        {actionLabel}
      </CustomerButton>
    </div>
  );
}
