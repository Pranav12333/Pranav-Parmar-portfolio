// src/adapters/index.ts
//
// Adapter barrel. Adapters sit outside the domain layer on purpose: the domain
// declares what it needs, adapters decide where it comes from.

export type {
  ContentProvider,
  QueryOptions,
  ResourceEnvelope,
  ResourceKind,
  ResourceRef,
} from "./cms/contract";
export { isSameResource } from "./cms/contract";
export { createStaticProvider, seedStaticRegistry } from "./cms/static-provider";
export { activeProvider, registerProvider, resolveCollection } from "./cms/resolver";
export type {
  AnalyticsEvent,
  AnalyticsSink,
  ConsentState,
  EventName,
  EventPayload,
} from "./analytics/contract";
export { withoutPii } from "./analytics/contract";
export { createBufferedSink } from "./analytics/buffered-sink";
