// src/adapters/cms/static-provider.ts
//
// The provider that backs the current build: collections are compiled into the
// bundle, so every read resolves synchronously and `available()` is always true.
// It exists to satisfy the ContentProvider contract while the remote providers
// are behind their feature gates.

import type {
  ContentProvider,
  QueryOptions,
  ResourceEnvelope,
  ResourceKind,
  ResourceRef,
} from "./contract";

const PROVIDER_ID = "static-bundled";

/** Build-time publish stamp; the bundler substitutes nothing, so it is fixed. */
const PUBLISHED_AT = "1970-01-01T00:00:00.000Z";

type Registry = Partial<Record<ResourceKind, unknown[]>>;

const registry: Registry = {};

const envelope = <T>(kind: ResourceKind, index: number, payload: T) =>
  ({
    ref: { kind, id: `${kind}-${index}`, revision: 1 },
    payload,
    publishedAt: PUBLISHED_AT,
  }) satisfies ResourceEnvelope<T>;

export const createStaticProvider = (): ContentProvider => ({
  id: PROVIDER_ID,

  available: () => true,

  async list<T>(kind: ResourceKind, options?: QueryOptions) {
    const rows = (registry[kind] ?? []) as T[];
    const limited = options?.limit === undefined ? rows : rows.slice(0, options.limit);
    return limited.map((payload, index) => envelope(kind, index, payload));
  },

  async read<T>(ref: ResourceRef) {
    const rows = (registry[ref.kind] ?? []) as T[];
    const index = Number(ref.id.split("-").pop());
    if (!Number.isInteger(index) || index < 0 || index >= rows.length) return null;
    return envelope(ref.kind, index, rows[index]);
  },
});

/** Register a bundled collection under a resource kind. */
export const seedStaticRegistry = (kind: ResourceKind, rows: unknown[]): void => {
  registry[kind] = rows;
};
