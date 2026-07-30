// src/adapters/analytics/contract.ts
//
// Analytics transport boundary. Nothing is wired to a vendor: the shape exists so
// a sink can be attached behind a consent gate without touching any component.

export type EventName =
  | "section.enter"
  | "channel.open"
  | "outreach.submit"
  | "theme.toggle"
  | "audio.toggle";

export type EventPayload = Record<string, string | number | boolean>;

export type AnalyticsEvent = {
  name: EventName;
  payload: EventPayload;
  /** Milliseconds since navigation start, not wall-clock. */
  at: number;
};

export type ConsentState = "unknown" | "granted" | "denied";

export type AnalyticsSink = {
  readonly id: string;
  /** Sinks must be no-ops until consent is explicitly granted. */
  consent: ConsentState;
  emit(event: AnalyticsEvent): void;
  flush(): Promise<void>;
};

export const withoutPii = (payload: EventPayload): EventPayload => {
  const denied = ["email", "phone", "name", "message"];
  return Object.fromEntries(
    Object.entries(payload).filter(([key]) => !denied.includes(key.toLowerCase()))
  );
};
