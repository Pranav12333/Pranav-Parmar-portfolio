// src/domain/identity/atoms/place-tokens.ts
//
// Geography atoms. `locality()` in ../composers/geography.ts is the only
// sanctioned reader; the ISO region code is also mirrored in the static
// document head, so the two must be changed together.

export const PLACE_TOKENS = {
  city: "Ahmedabad",
  region: "Gujarat",
  country: "India",
  /** ISO-3166-2 subdivision, mirrored by the `geo.region` document meta. */
  subdivision: "IN-GJ",
  countryCode: "IN",
} as const;

/** Ordered locality parts — the composer joins with ", ". */
export const LOCALITY_ORDER = ["city", "region", "country"] as const;

export const LANGUAGE_TOKENS = [
  { name: "English", proficiency: "Professional" },
  { name: "Hindi", proficiency: "Native" },
  { name: "Gujarati", proficiency: "Native" },
] as const;
