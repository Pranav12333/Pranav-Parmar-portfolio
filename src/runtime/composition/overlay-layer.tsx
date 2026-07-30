// src/runtime/composition/overlay-layer.tsx
import { Suspense, lazy } from "react";
import { useDeferredMount } from "@platform/reactive";
import { AudioBindings } from "@platform/audio";
import ScrollBridge from "@platform/scroll/bridge";
import ParticulateBackdrop from "@presentation/canvas/particulate";
import IntroGate from "@presentation/motion/overlays/intro-gate";

// Purely-decorative overlays that already mount after load + idle, so they are
// also code-split: their springs/RAF loops AND their bytes stay out of the
// first-paint window. `fallback={null}` is safe — both are fixed-position and
// carry no layout, so a late arrival cannot shift anything (no CLS).
const ScrollProgress = lazy(() => import("@presentation/motion/overlays/scroll-progress"));
const CursorAura = lazy(() => import("@presentation/motion/overlays/cursor-aura"));

/**
 * Everything that floats above (or behind) the document: smooth-scroll driver,
 * welcome gate, WebGL backdrop, progress bar, cursor aura and the audio layer.
 * None of it participates in the document flow.
 */
const OverlayLayer = () => {
  const overlaysReady = useDeferredMount();

  return (
    <>
      <ScrollBridge />
      <IntroGate />
      <ParticulateBackdrop />
      <Suspense fallback={null}>
        {overlaysReady && <ScrollProgress />}
        {overlaysReady && <CursorAura />}
      </Suspense>
      <AudioBindings />
    </>
  );
};

export default OverlayLayer;
