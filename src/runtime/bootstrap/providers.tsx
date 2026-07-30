// src/runtime/bootstrap/providers.tsx
import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * LazyMotion + the `domAnimation` feature bundle (with `m` components in place
 * of `motion`) keeps Framer Motion's drag/layout features out of the bundle —
 * the app uses none of them. `strict` fails fast in dev if a full `motion`
 * component ever sneaks back in and silently reinflates the bundle.
 *
 * `reducedMotion="user"` makes every animation honour the OS preference without
 * a single per-component check.
 */
const MotionProviders = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);

export default MotionProviders;
