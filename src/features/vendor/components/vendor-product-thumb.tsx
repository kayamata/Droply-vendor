import { cn } from "@/utils/cn";
import type { VendorProduct } from "@/features/vendor/types";

interface VendorProductThumbProps {
  product: Pick<VendorProduct, "name" | "emoji" | "imageUrl">;
  /** Tailwind size class for the square tile. */
  size?: string;
  emojiClassName?: string;
  className?: string;
}

/** Product visual — uploaded image when present, emoji tile otherwise. */
export function VendorProductThumb({
  product,
  size = "size-11",
  emojiClassName = "text-2xl",
  className,
}: VendorProductThumbProps) {
  if (product.imageUrl) {
    return (
      <span
        className={cn(
          "block shrink-0 overflow-hidden rounded-xl border border-border",
          size,
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="size-full object-cover"
        />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-droply-blue-light",
        size,
        emojiClassName,
        className
      )}
    >
      {product.emoji}
    </span>
  );
}
