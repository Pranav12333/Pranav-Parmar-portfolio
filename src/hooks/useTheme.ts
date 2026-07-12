import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
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
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
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
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() =>
      setDark(el.classList.contains("dark"))
    );
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}
