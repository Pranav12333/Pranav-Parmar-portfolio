// src/presentation/canvas/particulate/internals/field-geometry.ts
//
// The field's dimensions and its per-plate seed data. Sizing lives here because
// it depends only on the viewport, not on the render loop — which keeps the
// simulation module free of layout maths.

import { COMPACT_VIEWPORT_PX } from "@kernel";

export const FIELD = {
  /** Vertical extent of the fall cycle, in world units. */
  spanY: 14,
  /** Depth spread. */
  spanZ: 8,
  /** Never narrower than this, even on a portrait viewport. */
  minSpanX: 16,
  /** Visible width at the z=0 mid-plane is ≈ aspectSpan · aspect. */
  aspectSpan: 11.6,
  /** Extra margin so the pull radius still has plates to work with at the edges. */
  edgeMargin: 4,
  /** Plate count at the reference width. */
  baseCount: 40,
  /** Reduced count on narrow viewports. */
  compactCount: 20,
  /** Width the counts above were tuned against. */
  referenceSpanX: 16,
  /** Fallback aspect ratio when there is no window (SSR/prerender). */
  fallbackAspect: 1.6,
} as const;

export type Hex = {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  drift: number;
  phase: number;
  rx: number;
  ry: number;
  rz: number;
  spin: number;
  pull: number;
  lag: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
};

/**
 * Field width in world units. A fixed 16 is narrower than the viewport on wide
 * screens, leaving the cursor nothing to attract near the left/right edges — so
 * size it from the aspect ratio instead, plus margin for the pull radius.
 */
export function fieldSpanX(): number {
  const aspect =
    typeof window !== "undefined"
      ? window.innerWidth / window.innerHeight
      : FIELD.fallbackAspect;
  return Math.max(FIELD.minSpanX, aspect * FIELD.aspectSpan + FIELD.edgeMargin);
}

/** Scale the count with the widened field so density is even across it. */
export function fieldCount(spanX: number): number {
  const base =
    typeof window !== "undefined" && window.innerWidth < COMPACT_VIEWPORT_PX
      ? FIELD.compactCount
      : FIELD.baseCount;
  return Math.round(base * (spanX / FIELD.referenceSpanX));
}

/** Seed the plates with randomised size, fall speed, spin and pull response. */
export function createHexes(count: number, spanX: number): Hex[] {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * spanX,
    y: (Math.random() - 0.5) * FIELD.spanY,
    z: (Math.random() - 0.5) * FIELD.spanZ,
    scale: Math.random() * 0.26 + 0.12,
    speed: Math.random() * 0.5 + 0.15,
    drift: Math.random() * 0.4 + 0.1,
    phase: Math.random() * Math.PI * 2,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.7,
    pull: Math.random() * 0.35 + 0.55,
    lag: Math.random() * 5 + 3,
    ox: 0,
    oy: 0,
    vx: 0,
    vy: 0,
  }));
}
