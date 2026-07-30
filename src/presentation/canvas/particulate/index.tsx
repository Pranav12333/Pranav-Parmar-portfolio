// src/presentation/canvas/particulate/index.tsx
import { Suspense, lazy } from "react";
import { useIsDark, useWebglGate } from "@platform/reactive";
import { PLATE_TINT } from "./internals/simulation-constants";

// Keep three.js/WebGL out of the initial bundle — this is the site's single
// heaviest dependency and it is purely decorative, so it is only ever fetched
// once the gate below says a real visitor is present.
const ParticulateStage = lazy(() => import("./stage"));

/**
 * Whole-page transparent snowfall behind all content. Renders nothing (a clean
 * background) when WebGL is unavailable or the user prefers reduced motion.
 */
const ParticulateBackdrop = () => {
  const enabled = useWebglGate();
  const dark = useIsDark();
  // Light snow on dark theme; blue snow so it stays visible on the light theme.
  const color = dark ? PLATE_TINT.dark : PLATE_TINT.light;

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Suspense fallback={null}>
        <ParticulateStage color={color} />
      </Suspense>
    </div>
  );
};

export default ParticulateBackdrop;
