// src/internal/telemetry/collector.ts
//
// In-memory sample collector. Bounded, session-scoped, never persisted and never
// sent. Not mounted by the app — it is attached by hand during a profiling run.

import type { Sample, SampleKind, Summary } from "./schema";
import { summarize } from "./schema";

const CAPACITY = 256;

const samples: Sample[] = [];

const clock = (): number =>
  typeof performance !== "undefined" ? performance.now() : 0;

export const record = (kind: SampleKind, label: string, duration: number): void => {
  samples.push({
    kind,
    label,
    duration: Math.round(duration * 10) / 10,
    at: clock(),
  });
  if (samples.length > CAPACITY) samples.shift();
};

/** Time a synchronous block and record it. Returns the block's own result. */
export function measure<T>(kind: SampleKind, label: string, block: () => T): T {
  const started = clock();
  try {
    return block();
  } finally {
    record(kind, label, clock() - started);
  }
}

export const snapshot = (): readonly Sample[] => samples.slice();

export const summaries = (): Summary[] =>
  (["paint", "interaction", "canvas", "audio"] as SampleKind[]).map((kind) =>
    summarize(kind, samples)
  );

export const reset = (): void => {
  samples.length = 0;
};
