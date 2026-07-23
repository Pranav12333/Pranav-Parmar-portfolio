import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

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
 * Whether to mount the WebGL hexagon field. The field is lightweight (one
 * instanced draw call) so it runs on mobile too — we only skip it when there's
 * no GPU context or the user prefers reduced motion.
 *
 * The check (and the ~240 kB gzip three.js chunk fetch it unlocks) is deferred
 * to the first idle window after paint, so the canvas never competes with the
 * initial render for CPU or bandwidth — it simply fades in once the page is
 * interactive. LCP/TBT are measured on the content, not the background.
 */
export function useEnable3D(): boolean {
  const reduced = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const check = () => {
      if (!cancelled) setWebgl(supportsWebGL());
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(check, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }
    const id = window.setTimeout(check, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [reduced]);

  return webgl && !reduced;
}
