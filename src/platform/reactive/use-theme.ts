// src/platform/reactive/use-theme.ts
import { useCallback, useEffect, useState } from "react";
import { PERSISTENCE_KEYS, writeLocal } from "@kernel";

export type Theme = "light" | "dark";

/** The class the Tailwind dark variant keys off, set on <html>. */
const DARK_CLASS = "dark";

function getInitialTheme(): Theme {
  if (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains(DARK_CLASS)
  ) {
    return "dark";
  }
  return "light";
}

/**
 * Manages the light/dark theme by toggling the `dark` class on <html>
 * and persisting the choice to localStorage. The initial value is set by
 * the inline script in index.html to avoid a flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(DARK_CLASS, theme === "dark");
    writeLocal(PERSISTENCE_KEYS.theme, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}

/**
 * Reactively tracks the `dark` class on <html>, so components that aren't the
 * toggle (e.g. the snow canvas) can respond to theme changes from any source.
 */
export function useIsDark(): boolean {
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains(DARK_CLASS)
  );

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() =>
      setDark(el.classList.contains(DARK_CLASS))
    );
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}
