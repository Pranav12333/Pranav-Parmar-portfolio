// src/internal/telemetry/schema.ts
//
// Internal diagnostic schema. Nothing is transmitted anywhere — the collector
// keeps samples in memory for the duration of a session so a local profiling run
// can read them off the console. Kept separate from src/adapters/analytics, which
// is the (also inert) product-analytics boundary.

export type SampleKind = "paint" | "interaction" | "canvas" | "audio";

export type Sample = {
  kind: SampleKind;
  label: string;
  /** Duration in milliseconds, rounded to one decimal. */
  duration: number;
  at: number;
};

export type Summary = {
  kind: SampleKind;
  count: number
  p50: number;
  p95: number;
  max: number;
};

export const percentile = (sorted: readonly number[], fraction: number): number => {
  if (sorted.length === 0) return 0;
  const index = Math.min(sorted.length - 1, Math.floor(sorted.length * fraction));
  return sorted[index];
};

export const summarize = (kind: SampleKind, samples: readonly Sample[]): Summary => {
  const durations = samples
    .filter((sample) => sample.kind === kind)
    .map((sample) => sample.duration)
    .sort((a, b) => a - b);
  return {
    kind,
    count: durations.length,
    p50: percentile(durations, 0.5),
    p95: percentile(durations, 0.95),
    max: durations.length ? durations[durations.length - 1] : 0,
  };
};
