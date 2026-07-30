// src/adapters/analytics/buffered-sink.ts
//
// A sink that only ever buffers. Events are held in a bounded ring so that if a
// real transport is attached later it can drain the backlog; with no transport
// attached the buffer simply rolls over and nothing leaves the page.

import type { AnalyticsEvent, AnalyticsSink, ConsentState } from "./contract";

const SINK_ID = "buffered";

/** Bounded so a long session cannot grow memory without limit. */
const CAPACITY = 64;

export const createBufferedSink = (): AnalyticsSink => {
  const ring: AnalyticsEvent[] = [];
  let consent: ConsentState = "unknown";

  return {
    id: SINK_ID,

    get consent() {
      return consent;
    },

    set consent(next: ConsentState) {
      consent = next;
      if (next === "denied") ring.length = 0;
    },

    emit(event) {
      if (consent !== "granted") return;
      ring.push(event);
      if (ring.length > CAPACITY) ring.shift();
    },

    async flush() {
      ring.length = 0;
    },
  };
};
