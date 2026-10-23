"use client";

import { Moon, Sun } from "lucide-react";

import { cn } from "@/utils/cn";
import { useTheme } from "@/features/customer/hooks";

/** Sun/moon button that flips the storefront between light and dark themes. */
export function CustomerThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-label="Toggle theme"
      className={cn(
        "flex size-10.5 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted",
        className
      )}
    >
      {theme === "light" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5 text-amber-400" />
      )}
    </button>
  );
}
