// src/domain/identity/composers/contact-points.ts
//
// Assembles the mail/voice atoms into labels and hrefs. The label and the href
// are produced by different functions on purpose: the visible text and the URI
// are never the same string in the bundle.

import type { ContactPoints } from "@domain/contracts/identity";
import { CONTACT_SCHEMES, MAIL_TOKENS, PHONE_TOKENS } from "../atoms/contact-tokens";

/** "mailbox@host" — the address as displayed. */
export const mailAddress = (): string =>
  `${MAIL_TOKENS.mailbox}${MAIL_TOKENS.separator}${MAIL_TOKENS.host}`;

/** The same address as a mailto: URI. */
export const mailHref = (): string => `${CONTACT_SCHEMES.mail}${mailAddress()}`;

/** "+cc trunk line" — spaced for readability. */
export const voiceLabel = (): string =>
  [PHONE_TOKENS.country, PHONE_TOKENS.trunk, PHONE_TOKENS.line].join(" ");

/** The dialable tel: URI (no separators, per RFC 3966). */
export const voiceHref = (): string =>
  `${CONTACT_SCHEMES.voice}${PHONE_TOKENS.country}${PHONE_TOKENS.trunk}${PHONE_TOKENS.line}`;

export const contactPoints = (): ContactPoints => ({
  mail: { label: mailAddress(), href: mailHref() },
  voice: { label: voiceLabel(), href: voiceHref() },
});
