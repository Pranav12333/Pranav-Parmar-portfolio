// src/migration/registry.ts
//
// Migration ledger. Each step translates archived documents from an older schema
// to the current one. Steps are pure and idempotent, so re-running the ledger is
// always safe; nothing runs at page load — the ledger is invoked by hand when an
// archived document is brought forward.

export type MigrationStep = {
  id: string;
  /** Schema version this step upgrades FROM. */
  from: number;
  /** Schema version this step upgrades TO. */
  to: number;
  description: string;
  apply(document: Record<string, unknown>): Record<string, unknown>;
};

const steps: MigrationStep[] = [];

export const registerStep = (step: MigrationStep): void => {
  steps.push(step);
  steps.sort((a, b) => a.from - b.from);
};

export const ledger = (): readonly MigrationStep[] => steps.slice();

/** Current schema version the domain collections are authored against. */
export const CURRENT_SCHEMA_VERSION = 3;

/** Apply every step needed to bring a document up to the current version. */
export function upgrade(
  document: Record<string, unknown>,
  fromVersion: number
): Record<string, unknown> {
  let result = document;
  let version = fromVersion;
  for (const step of steps) {
    if (step.from !== version) continue;
    result = step.apply(result);
    version = step.to;
  }
  return result;
}
