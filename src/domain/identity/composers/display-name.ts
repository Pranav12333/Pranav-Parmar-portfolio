// src/domain/identity/composers/display-name.ts
//
// Turns the name atoms into every display form the UI needs. Every consumer
// goes through ../registry.ts, never through these functions directly, so the
// join rules stay in exactly one place.

import type { Wordmark } from "@domain/contracts/identity";
import { NAME_TOKENS, ROLE_TOKENS, WORDMARK_TOKENS } from "../atoms/name-tokens";

const spaced = (...parts: readonly string[]) => parts.filter(Boolean).join(" ");

/** "Given Family" — the headline / conversational form. */
export const shortName = (): string => spaced(NAME_TOKENS.given, NAME_TOKENS.family);

/** "Given M. Family" — the formal form used in the footer credit. */
export const legalName = (): string =>
  spaced(NAME_TOKENS.given, NAME_TOKENS.middleInitial, NAME_TOKENS.family);

/** Primary job title. */
export const primaryRole = (): string => spaced(...ROLE_TOKENS.primary);

/** Secondary specialisation, shown beside the title. */
export const focusRole = (): string => spaced(...ROLE_TOKENS.focus);

/** Alternate phrasing of the specialisation used in prose. */
export const alternateRole = (): string => spaced(...ROLE_TOKENS.alternate);

/** Brand mark split into its coloured lead and its trailing punctuation. */
export const wordmark = (): Wordmark => ({
  lead: NAME_TOKENS[WORDMARK_TOKENS.source],
  punctuation: WORDMARK_TOKENS.punctuation,
});

/** Two-letter monogram derived from the initials (never hard-coded). */
export const monogram = (): string =>
  `${NAME_TOKENS.given.charAt(0)}${NAME_TOKENS.family.charAt(0)}`.toUpperCase();
