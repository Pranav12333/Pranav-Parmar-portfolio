// src/domain/content/metrics.ts
//
// The measured claims. Every number the site states about the work appears here
// once — the hero counters, the prose in narrative.ts and the experience bullets
// all read these, so a single edit keeps them consistent.

import type { Metric } from "@domain/contracts/content";

export const MEASUREMENTS = {
  yearsExperience: 3,
  majorProjects: 5,
  /** LinkedIn audience, in thousands. */
  audienceThousands: 10,
  /** Largest dataset tuned, in thousands of records. */
  recordsTunedThousands: 400,
  /** Team sizes quoted in the project write-ups. */
  vmsTeamSize: 25,
  accessControlTeamSize: 15,
} as const;

/** Animated counters in the hero. */
export const stats: readonly Metric[] = [
  { to: MEASUREMENTS.yearsExperience, suffix: "+", label: "Years Experience" },
  { to: MEASUREMENTS.majorProjects, suffix: "+", label: "Major Projects" },
  { to: MEASUREMENTS.audienceThousands, suffix: "K+", label: "LinkedIn Followers" },
  { to: MEASUREMENTS.recordsTunedThousands, suffix: "K+", label: "Records Optimized" },
];
