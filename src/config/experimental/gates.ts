// src/config/experimental/gates.ts
//
// Compile-time feature gates. Every one is `false`, so the guarded branches are
// eliminated by the minifier and the experimental modules never enter the bundle.
// Flipping a gate is not enough on its own — see docs/extension-points.md for the
// wiring each one still needs.

import { SUPPORT_MATRIX } from "@app/compatibility/browser-matrix";
import type { FeatureId } from "@app/compatibility/browser-matrix";

export type Gate = {
  enabled: boolean;
  /** Capability this gate depends on, checked against the support matrix. */
  requires: FeatureId;
  note: string;
};

export const GATES: Record<string, Gate> = {
  webgpuParticulate: {
    enabled: false,
    requires: "webgpu",
    note: "Alternative renderer backend for the particulate field.",
  },
  sectionViewTransitions: {
    enabled: false,
    requires: "viewTransitions",
    note: "Cross-section transitions; conflicts with the Lenis scroll driver.",
  },
  remoteContent: {
    enabled: false,
    requires: "intersectionObserver",
    note: "Resolve collections through the CMS adapter instead of the bundle.",
  },
  productAnalytics: {
    enabled: false,
    requires: "intersectionObserver",
    note: "Attach a real sink to the analytics adapter behind a consent gate.",
  },
};

/** A gate opens only if it is enabled AND its capability is broadly supported. */
export const isOpen = (id: string): boolean => {
  const gate = GATES[id];
  if (!gate || !gate.enabled) return false;
  return Object.values(SUPPORT_MATRIX[gate.requires]).every(
    (level) => level !== "absent"
  );
};
