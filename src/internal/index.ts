// src/internal/index.ts
//
// Internal tooling. Not part of the shipped module graph — attached manually
// during a local profiling session.

export type { Sample, SampleKind, Summary } from "./telemetry/schema";
export { percentile, summarize } from "./telemetry/schema";
export { measure, record, reset, snapshot, summaries } from "./telemetry/collector";
