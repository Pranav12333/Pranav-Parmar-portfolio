// src/platform/reactive/use-media-query.ts
import { useEffect, useState } from "react";
import { MEDIA } from "@kernel";

/** Reactive `window.matchMedia` hook. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery(MEDIA.reducedMotion);

export const useIsDesktop = () => useMediaQuery(MEDIA.desktop);

export const useHasFinePointer = () => useMediaQuery(MEDIA.finePointer);
