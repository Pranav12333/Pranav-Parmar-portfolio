// src/presentation/surfaces/outreach/transport/mailto.ts
//
// The never-lose-a-message fallback: a prefilled mailto so the visitor's text
// survives an API outage — their email app opens with everything already written.
//
// Line breaks must be CRLF (RFC 6068) and some mail handlers reject URLs beyond
// ~2k chars, so overly long messages are trimmed with an ellipsis (the full text
// stays in the form either way).

import { identity } from "@identity";
import type { MessageDraft } from "./contract";
import { SUBJECT_PREFIX } from "./endpoint";

/** Conservative body budget, in encoded characters. */
const BODY_BUDGET = 1700;

/** How much of the message survives each trim pass. */
const TRIM_RATIO = 0.8;

const FALLBACK_SENDER = "your website";

export function mailtoHref(draft: MessageDraft): string {
  const subject = encodeURIComponent(
    `${SUBJECT_PREFIX} ${draft.name || FALLBACK_SENDER}`
  );
  const signature = `\r\n\r\n— ${draft.name}${draft.email ? ` (${draft.email})` : ""}`;
  let message = draft.message.replace(/\r?\n/g, "\r\n");
  let body = encodeURIComponent(message + signature);
  while (body.length > BODY_BUDGET && message.length > 0) {
    message = message.slice(0, Math.floor(message.length * TRIM_RATIO));
    body = encodeURIComponent(`${message}…${signature}`);
  }
  return `${identity.socials.email}?subject=${subject}&body=${body}`;
}
