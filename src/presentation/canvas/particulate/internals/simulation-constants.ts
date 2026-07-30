// src/presentation/canvas/particulate/internals/simulation-constants.ts
//
// Every tunable in the render loop. Pulling them out of the loop body means the
// feel of the field can be retuned without touching the integration code.

export const SIM = {
  /** Clamp on delta so a tab refocus can't teleport the field. */
  deltaClamp: 0.05,
  /** Exponential-approach rate of the follow point toward the live pointer. */
  followEase: 16,
  /** Exponential-approach rate of the activity fade in/out. */
  activityEase: 8,
  /** Gaussian denominator for the cursor gather falloff. */
  gatherFalloff: 9.7,
  /** Lateral drift amplitude applied to the fall. */
  driftScale: 0.12,
  /** Secondary spin ratio on the Y axis. */
  spinYRatio: 0.8,

  /** Click burst: peak impulse and its gaussian falloff. */
  burstStrength: 15,
  burstFalloff: 18,
  burstJitterBase: 0.7,
  burstJitterSpan: 0.6,

  /** Drag wake: base impulse, speed multiplier and gaussian falloff. */
  wakeBase: 26,
  wakeSpeedGain: 2,
  wakeFalloff: 4,
  /** Max swept segment per frame, in NDC units — stops a pointer warp raking. */
  dragMaxSpan: 0.6,

  /** Velocity bleed-off so bursts settle back into plain snowfall. */
  velocityDamping: 3.2,

  /** Guard against a degenerate ray direction. */
  epsilon: 1e-5,
} as const;

/** Geometry + material of a single plate. */
export const PLATE = {
  radius: 0.5,
  thickness: 0.12,
  /** 6 radial segments → hexagonal prism; thin height → plate. */
  segments: 6,
  emissiveIntensity: 0.22,
  roughness: 0.4,
  metalness: 0.3,
  opacity: 0.7,
} as const;

/** Camera + renderer setup for the transparent full-page canvas. */
export const STAGE = {
  dpr: [1, 1.5] as [number, number],
  cameraPosition: [0, 0, 10] as [number, number, number],
  fov: 60,
  ambientIntensity: 0.9,
  directional: {
    position: [4, 6, 6] as [number, number, number],
    intensity: 2,
    color: "#dbeafe",
  },
  fills: [
    {
      position: [-6, -2, 4] as [number, number, number],
      intensity: 45,
      color: "#3b82f6",
      distance: 30,
      decay: 2,
    },
    {
      position: [6, 4, -2] as [number, number, number],
      intensity: 30,
      color: "#60a5fa",
      distance: 30,
      decay: 2,
    },
  ],
} as const;

/** Plate tint per theme — blue stays visible on the light background. */
export const PLATE_TINT = { dark: "#bfdbfe", light: "#3b82f6" } as const;
