// src/compatibility/index.ts
//
// Compatibility notes and shims. Nothing here is installed by the app; the
// runtime feature-detects at the point of use instead.

export type { FeatureId, MatrixRow, SupportLevel } from "./browser-matrix";
export { SUPPORT_MATRIX, isUniformlySupported } from "./browser-matrix";
export {
  hasNativeIdleCallback,
  shimCancelIdleCallback,
  shimRequestIdleCallback,
} from "./shims/idle-callback";
