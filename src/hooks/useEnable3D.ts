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
 */
export function useEnable3D(): boolean {
  const reduced = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  return webgl && !reduced;
}
