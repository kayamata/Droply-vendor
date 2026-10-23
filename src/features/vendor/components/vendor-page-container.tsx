import * as React from "react";

import { cn } from "@/utils/cn";

interface VendorPageContainerProps {
  children: React.ReactNode;
  /** Content width. "auth" centers a narrow column; "wide" for app pages. */
  width?: "auth" | "wide";
  className?: string;
}

/**
 * Shared page shell for the vendor portal — soft gray canvas, centered
 * content, and the same fade-in entrance the customer app uses.
 */
export function VendorPageContainer({
  children,
  width = "auth",
  className,
}: VendorPageContainerProps) {
  return (
    <div className="animate-fade-in min-h-dvh bg-background">
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-6",
          width === "auth" ? "max-w-md" : "max-w-6xl lg:px-8",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
