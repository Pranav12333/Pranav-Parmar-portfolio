// src/platform/reactive/use-webgl-gate.ts
import { useEffect, useState } from "react";
import { TIMING } from "@kernel";
import { usePrefersReducedMotion } from "./use-media-query";

/** Interactions that count as "the visitor is here" and arm the canvas. */
const INTENT_EVENTS = [
  "pointerdown",
  "pointermove",
  "wheel",
  "touchstart",
  "keydown",
] as const;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Whether to mount the WebGL hexagon field. The field is purely decorative and
 * its three.js chunk (~240 kB gzip) is by far the heaviest script on the page,
 * so it is kept entirely off the critical path:
 *
 *   1. Nothing happens until the page has fully loaded (the `load` event), so
 *      the chunk never competes with first paint, hydration or LCP.
 *   2. Only then do we arm the triggers. The first real interaction — a mouse
 *      move, wheel, touch or key — brings the snow in, which is instant for any
 *      real visitor. A plain timeout fallback covers a visitor who never
 *      interacts, so the background always eventually appears.
 *
 * Because the fetch + parse + execute of three.js is pushed past load AND user
 * intent, it no longer lands in the first-paint / Total-Blocking-Time window.
 * We still skip it entirely when WebGL is unavailable or the user prefers
 * reduced motion. LCP/TBT are measured on the content, not the background.
 */
export function useWebglGate(): boolean {
  const reduced = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let done = false;
    let timerId: number | undefined;
    let removeTriggers = () => {};

    const enable = () => {
      if (done) return;
      done = true;
      removeTriggers();
      if (timerId !== undefined) window.clearTimeout(timerId);
      setWebgl(supportsWebGL());
    };

    const arm = () => {
      if (done) return;
      const opts: AddEventListenerOptions = {
        once: true,
        passive: true,
        capture: true,
      };
      INTENT_EVENTS.forEach((e) => window.addEventListener(e, enable, opts));
      removeTriggers = () =>
        INTENT_EVENTS.forEach((e) => window.removeEventListener(e, enable, opts));
      // Fallback for a visitor who never interacts. Fires well after load so it
      // stays clear of the first-paint / LCP window.
      timerId = window.setTimeout(enable, TIMING.webglIdleFallbackMs);
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      done = true;
      window.removeEventListener("load", arm);
      removeTriggers();
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [reduced]);

  return webgl && !reduced;
}
