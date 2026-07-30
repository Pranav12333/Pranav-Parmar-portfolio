// src/platform/reactive/index.ts
//
// Reactive-hook barrel. Components import from `@platform/reactive` so a hook
// can be re-homed or renamed internally without a component-wide edit.

export { useActiveSection } from "./use-active-section";
export { useCardSpotlight } from "./use-card-spotlight";
export { useDeferredMount } from "./use-deferred-mount";
export { useGreeting } from "./use-greeting";
export {
  useHasFinePointer,
  useIsDesktop,
  useMediaQuery,
  usePrefersReducedMotion,
} from "./use-media-query";
export { useIsDark, useTheme } from "./use-theme";
export type { Theme } from "./use-theme";
export { useWebglGate } from "./use-webgl-gate";
