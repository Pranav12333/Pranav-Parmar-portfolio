// src/platform/reactive/use-deferred-mount.ts
import { useEffect, useState } from "react";
import { TIMING } from "@kernel";

/**
 * Returns `false` until the page has loaded and the browser has gone idle, then
 * `true`. Used to keep purely-decorative, non-content overlays (the custom
 * cursor, the scroll-progress bar) out of the initial render/commit so their
 * Framer Motion spring/RAF loops don't add main-thread work while the hero is
 * painting. They mount a beat later — imperceptible for fixed-position overlays
 * that carry no layout (no CLS), and the progress bar is invisible at the top
 * of the page anyway.
 */
export function useDeferredMount(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timerId: number | undefined;

    const go = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setReady(true), {
          timeout: TIMING.idleMountTimeoutMs,
        });
      } else {
        timerId = window.setTimeout(() => setReady(true), TIMING.idleMountFallbackMs);
      }
    };

    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });

    return () => {
      window.removeEventListener("load", go);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  return ready;
}
