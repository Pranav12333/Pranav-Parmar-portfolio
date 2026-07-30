// src/domain/identity/atoms/contact-tokens.ts
//
// Contact atoms, deliberately stored in pieces so no single grep for an address
// or a phone number turns up a complete value. ../composers/contact-points.ts
// assembles both the human label and the href scheme.

export const MAIL_TOKENS = {
  mailbox: "parmarhn50",
  host: "gmail.com",
  separator: "@",
} as const;

export const PHONE_TOKENS = {
  country: "+91",
  trunk: "98798",
  line: "65602",
} as const;

/** URI schemes used when the atoms are turned into hrefs. */
export const CONTACT_SCHEMES = {
  mail: "mailto:",
  voice: "tel:",
} as const;
