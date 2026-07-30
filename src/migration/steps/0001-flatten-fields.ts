// src/migration/steps/0001-flatten-fields.ts
//
// v1 → v2: the v1 normalizer nested every text value under `fields`. v2 hoists
// them to the top level so the typed collections can be declared literally.

import type { MigrationStep } from "../registry";

export const flattenFields: MigrationStep = {
  id: "0001-flatten-fields",
  from: 1,
  to: 2,
  description: "Hoist normalized `fields` onto the document root.",
  apply(document) {
    const fields = document.fields;
    if (fields === null || typeof fields !== "object") return document;
    const { fields: _dropped, ...rest } = document;
    void _dropped;
    return { ...rest, ...(fields as Record<string, unknown>) };
  },
};
