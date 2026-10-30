import Image from "next/image";

import { cn } from "@/utils/cn";

/**
 * Official DROPly wordmark — "Dr" badge + "oply." text + orange period.
 *
 * `variant="auto"` renders both supplied artworks and swaps them with the
 * app's `.dark` theme class via pure CSS (`droply-logo-light/-dark` in
 * globals.css), so the correct version appears on first paint with no
 * hydration flash and no JS dependency:
 *
 * - light backgrounds → `droply-logo-light.png` (black "oply." text)
 * - dark backgrounds  → `droply-logo-dark.png` (white "oply." text)
 *
 * Force `variant="light"` on surfaces that stay light in every theme
 * (e.g. an orange hero), `"dark"` on surfaces that stay dark.
 */
interface DroplyLogoProps {
  variant?: "auto" | "light" | "dark";
  /** Sizing utilities — set the height (`h-7`), width stays proportional. */
  className?: string;
}

const ASSETS = {
  light: { src: "/brand/droply-logo-light.png", width: 394, height: 161 },
  dark: { src: "/brand/droply-logo-dark.png", width: 896, height: 318 },
} as const;

export function DroplyLogo({ variant = "auto", className }: DroplyLogoProps) {
  if (variant === "light") {
    return (
      <Image
        {...ASSETS.light}
        alt="DROPly"
        className={cn("w-auto", className)}
      />
    );
  }
  if (variant === "dark") {
    return (
      <Image
        {...ASSETS.dark}
        alt="DROPly"
        className={cn("w-auto", className)}
      />
    );
  }
  return (
    <>
      <Image
        {...ASSETS.light}
        alt="DROPly"
        className={cn("droply-logo-light w-auto", className)}
      />
      <Image
        {...ASSETS.dark}
        alt=""
        aria-hidden="true"
        className={cn("droply-logo-dark w-auto", className)}
      />
    </>
  );
}
