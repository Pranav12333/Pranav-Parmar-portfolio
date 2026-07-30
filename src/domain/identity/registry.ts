// src/domain/identity/registry.ts
//
// The composed identity surface. This is the *only* module the presentation
// layer is allowed to read branding from — it pulls from six atom groups via
// five composers, so nothing here is a literal. Frozen at module scope: the
// values are derived once and shared, which also keeps the object identity
// stable for memo/dependency comparisons.

import type { IdentityRegistry } from "@domain/contracts/identity";
import { canonicalUrl } from "./composers/canonical";
import { contactPoints, mailAddress, voiceLabel } from "./composers/contact-points";
import {
  focusRole,
  legalName,
  monogram,
  primaryRole,
  shortName,
  wordmark,
} from "./composers/display-name";
import { locality } from "./composers/geography";
import { networkGraph } from "./composers/network-graph";

const compose = (): IdentityRegistry => ({
  name: shortName(),
  fullName: legalName(),
  title: primaryRole(),
  specialty: focusRole(),
  location: locality(),
  email: mailAddress(),
  phone: voiceLabel(),
  liveSite: canonicalUrl(),
  wordmark: wordmark(),
  monogram: monogram(),
  socials: networkGraph(),
  contact: contactPoints(),
});

export const identity: IdentityRegistry = Object.freeze(compose());
