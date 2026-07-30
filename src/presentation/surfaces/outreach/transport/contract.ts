// src/presentation/surfaces/outreach/transport/contract.ts
//
// The transport boundary. The form component only ever sees these two shapes,
// which is what lets the delivery implementation be code-split away and swapped
// (a serverless endpoint today, a function/worker later) without touching the UI.

export type MessageDraft = {
  name: string;
  email: string;
  message: string;
};

export type DeliveryResult = {
  ok: boolean;
  msg: string;
};

export const emptyDraft = (): MessageDraft => ({ name: "", email: "", message: "" });
