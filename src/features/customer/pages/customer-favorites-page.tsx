"use client";

import { ROUTES } from "@/utils/constants";
import { getFavoriteItems, useCustomerDemo } from "@/features/customer/api";
import {
  CustomerBackHeader,
  CustomerEmptyState,
  CustomerFavoriteRow,
  CustomerShell,
} from "@/features/customer/components";

/**
 * Favorites — hearted items across all stores with quick remove + add.
 */
export function CustomerFavoritesPage() {
  const state = useCustomerDemo();
  const favorites = getFavoriteItems(state);

  return (
    <CustomerShell className="flex flex-col gap-5">
      <CustomerBackHeader
        title={`Favorites (${favorites.length})`}
        backHref={ROUTES.customer.root}
      />

      {favorites.length === 0 ? (
        <CustomerEmptyState
          emoji="🧡"
          title="No favorites yet"
          description="Tap the heart icon on your favorite meals and stores to see them here."
          actionLabel="Browse Stores"
          actionHref={ROUTES.customer.stores}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {favorites.map(({ product, store }) => (
            <CustomerFavoriteRow
              key={product.id}
              product={product}
              store={store}
            />
          ))}
        </div>
      )}
    </CustomerShell>
  );
}
