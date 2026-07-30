// src/compatibility/browser-matrix.ts
//
// The support matrix the feature gates are checked against. Values are declared
// rather than sniffed — the runtime probes actual capabilities, this table only
// records the intent so a gate can be reviewed without opening a caniuse tab.

export type FeatureId =
  | "webgl"
  | "webgpu"
  | "viewTransitions"
  | "requestIdleCallback"
  | "webAudio"
  | "intersectionObserver";

export type SupportLevel = "full" | "partial" | "absent";

export type MatrixRow = Record<"chromium" | "firefox" | "safari", SupportLevel>;

export const SUPPORT_MATRIX: Record<FeatureId, MatrixRow> = {
  webgl: { chromium: "full", firefox: "full", safari: "full" },
  webgpu: { chromium: "full", firefox: "partial", safari: "partial" },
  viewTransitions: { chromium: "full", firefox: "absent", safari: "partial" },
  requestIdleCallback: { chromium: "full", firefox: "full", safari: "absent" },
  webAudio: { chromium: "full", firefox: "full", safari: "partial" },
  intersectionObserver: { chromium: "full", firefox: "full", safari: "full" },
};

/** A feature is gate-eligible only when nothing in the matrix is "absent". */
export const isUniformlySupported = (feature: FeatureId): boolean =>
  Object.values(SUPPORT_MATRIX[feature]).every((level) => level !== "absent");
