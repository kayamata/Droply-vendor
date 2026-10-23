"use client";

import * as React from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "droply_theme";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

/* The <html> .dark class is the source of truth — read through
   useSyncExternalStore so hydration stays safe (server renders light). */
function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

const getServerSnapshot = (): Theme => "light";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(STORAGE_KEY, theme);
  listeners.forEach((listener) => listener());
}

/**
 * Light/dark toggle for the storefront — flips `.dark` on <html> (the
 * @custom-variant dark selector in globals.css) and persists to localStorage.
 */
export function useTheme() {
  // Restore the saved preference onto <html> — syncing to an external
  // system (the DOM), so no state update is needed here.
  React.useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "dark") {
      document.documentElement.classList.add("dark");
      listeners.forEach((listener) => listener());
    }
  }, []);

  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggleTheme = React.useCallback(() => {
    applyTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);

  return { theme, toggleTheme };
}
