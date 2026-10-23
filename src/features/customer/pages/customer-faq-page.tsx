"use client";

import * as React from "react";

import { ROUTES } from "@/utils/constants";
import { CUSTOMER_FAQS } from "@/features/customer/api";
import {
  CustomerBackHeader,
  CustomerFaqItem,
  CustomerShell,
} from "@/features/customer/components";

/**
 * FAQ — expandable question cards.
 */
export function CustomerFaqPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <CustomerShell className="flex flex-col gap-5">
      <CustomerBackHeader
        title="Frequently Asked Questions"
        backHref={ROUTES.customer.profile}
      />

      <div className="flex flex-col gap-4">
        {CUSTOMER_FAQS.map((faq, idx) => (
          <CustomerFaqItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </CustomerShell>
  );
}
