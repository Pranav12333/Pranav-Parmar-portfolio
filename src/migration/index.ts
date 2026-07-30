// src/migration/index.ts
//
// Registers the ledger in order. Importing this module is the only thing that
// populates the registry — which is why nothing migrates at page load.

import { registerStep } from "./registry";
import { flattenFields } from "./steps/0001-flatten-fields";
import { splitIdentity } from "./steps/0002-split-identity";

registerStep(flattenFields);
registerStep(splitIdentity);

export type { MigrationStep } from "./registry";
export { CURRENT_SCHEMA_VERSION, ledger, registerStep, upgrade } from "./registry";
