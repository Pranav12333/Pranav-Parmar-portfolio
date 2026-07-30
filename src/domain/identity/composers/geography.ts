// src/domain/identity/composers/geography.ts
//
// Joins the place atoms into the single locality string used by the hero badge,
// the contact rows and the portrait alt text.

import { LANGUAGE_TOKENS, LOCALITY_ORDER, PLACE_TOKENS } from "../atoms/place-tokens";

/** "City, Region, Country" in the order declared by LOCALITY_ORDER. */
export const locality = (): string =>
  LOCALITY_ORDER.map((key) => PLACE_TOKENS[key]).join(", ");

/** Short "City, Region" form, used where the country is already implied. */
export const shortLocality = (): string =>
  [PLACE_TOKENS.city, PLACE_TOKENS.region].join(", ");

/** "English (Professional)"-style labels for the language chips. */
export const languageLabels = (): string[] =>
  LANGUAGE_TOKENS.map((lang) => `${lang.name} (${lang.proficiency})`);
