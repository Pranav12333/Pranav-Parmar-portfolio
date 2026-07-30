// src/legacy/content-pipeline/normalizer.ts
//
// The v1 content normalizer. Documents were authored as loose records and
// normalized at load; the current build authors typed collections directly, so
// this only runs against archived documents during a migration.

export type RawRecord = Record<string, unknown>;

export type NormalizedRecord = {
  id: string;
  fields: Record<string, string>;
  tags: string[];
};

const asString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const asTags = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

/** Slugify for stable ids — lowercase, alphanumeric, single hyphens. */
export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function normalize(raw: RawRecord, index: number): NormalizedRecord {
  const title = asString(raw.title) || asString(raw.name);
  const id = asString(raw.id) || slugify(title) || `record-${index}`;
  const fields: Record<string, string> = {};

  for (const [key, value] of Object.entries(raw)) {
    if (key === "tags" || key === "id") continue;
    const text = asString(value);
    if (text) fields[key] = text;
  }

  return { id, fields, tags: asTags(raw.tags) };
}

export const normalizeAll = (rows: RawRecord[]): NormalizedRecord[] =>
  rows.map(normalize);
