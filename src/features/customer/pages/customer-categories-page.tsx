"use client";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/utils/constants";
import {
  CUSTOMER_CATEGORIES,
  DEMO_CUSTOMER_PROFILE,
} from "@/features/customer/api";
import {
  CustomerCategoryTile,
  CustomerPageBanner,
  CustomerShell,
} from "@/features/customer/components";

/** The flagship store the categories browser drills into. */
const FLAGSHIP_STORE_ID = "mama-cass-bukka";

/**
 * Shop By Category — grey greeting banner and the 2-up emoji tile grid.
 * Each tile opens that menu category inside the flagship store.
 */
export function CustomerCategoriesPage() {
  const router = useRouter();

  return (
    <CustomerShell className="flex flex-col gap-5">
      <CustomerPageBanner
        tone="muted"
        greeting={`Hey, ${DEMO_CUSTOMER_PROFILE.name.split(" ")[0]}`}
        title="Shop By Category"
        subtitle={`${CUSTOMER_CATEGORIES.length} categories of Nigerian campus food & grocery`}
      />

      <div className="grid gap-3.5 sm:grid-cols-2">
        {CUSTOMER_CATEGORIES.map((cat) => (
          <CustomerCategoryTile
            key={cat.id}
            name={cat.name}
            emoji={cat.emoji}
            bg={cat.bg}
            textColor={cat.textColor}
            subtitle="Tap to browse →"
            onClick={() =>
              router.push(
                ROUTES.customer.storeCategory(FLAGSHIP_STORE_ID, cat.name)
              )
            }
          />
        ))}
      </div>
    </CustomerShell>
  );
}
