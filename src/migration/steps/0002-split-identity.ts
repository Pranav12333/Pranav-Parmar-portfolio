// src/migration/steps/0002-split-identity.ts
//
// v2 → v3: branding moved out of the content documents and into the identity
// atoms. This step strips the duplicated branding fields so an archived document
// can no longer reintroduce a hard-coded name or contact value.

import type { MigrationStep } from "../registry";

/** Fields now owned exclusively by src/domain/identity. */
const IDENTITY_OWNED = [
  "name",
  "fullName",
  "email",
  "phone",
  "location",
  "socials",
  "liveSite",
];

export const splitIdentity: MigrationStep = {
  id: "0002-split-identity",
  from: 2,
  to: 3,
  description: "Remove branding fields now owned by the identity registry.",
  apply(document) {
    return Object.fromEntries(
      Object.entries(document).filter(([key]) => !IDENTITY_OWNED.includes(key))
    );
  },
};
