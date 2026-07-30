// src/presentation/surfaces/outreach/transport/endpoint.ts
//
// Serverless form delivery (formsubmit.co) — messages go straight to the inbox,
// no backend needed. One-time setup: the first-ever submission triggers an
// activation email to the address; delivery starts once its link is clicked.
//
// The address is not written here: it is resolved from the identity registry, so
// the endpoint follows the branding rather than pinning it.

import { identity } from "@identity";

const PROVIDER = "https://formsubmit.co/ajax/";

export const deliveryEndpoint = (): string => `${PROVIDER}${identity.email}`;

/** Provider control fields sent alongside the message. */
export const PROVIDER_FIELDS = {
  _template: "table",
  _captcha: "false",
} as const;

/** Subject line prefix; the sender's name is appended. */
export const SUBJECT_PREFIX = "Portfolio contact from";

/** What the provider returns on success (a string, not a boolean). */
export const SUCCESS_FLAG = "true";
