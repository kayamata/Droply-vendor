"use client";

import * as React from "react";

import { cn } from "@/utils/cn";

interface CustomerCategoryTileProps {
  name: string;
  emoji: string;
  /** Tile backdrop color. */
  bg: string;
  /** Tile text color. */
  textColor: string;
  /** Secondary line — "Tap to browse" or "12 items available". */
  subtitle: React.ReactNode;
  onClick: () => void;
  className?: string;
}

/**
 * Big colored category banner tile — name left, tilted emoji right. Used on
 * the categories screen and each store's menu-category list.
 */
export function CustomerCategoryTile({
  name,
  emoji,
  bg,
  textColor,
  subtitle,
  onClick,
  className,
}: CustomerCategoryTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: bg }}
      className={cn(
        "flex h-28 w-full items-center justify-between overflow-hidden rounded-2xl px-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04] transition-transform duration-200 hover:-translate-y-0.5",
        className
      )}
    >
      <span className="min-w-0">
        <span
          className="block text-xl font-black leading-tight tracking-tight"
          style={{ color: textColor }}
        >
          {name}
        </span>
        <span
          className="mt-1 flex items-center gap-1 text-xs font-bold"
          style={{ color: textColor, opacity: 0.75 }}
        >
          {subtitle}
        </span>
      </span>
      <span className="shrink-0 rotate-[-5deg] select-none text-5xl">
        {emoji}
      </span>
    </button>
  );
}
