// src/adapters/cms/contract.ts
//
// The content-source boundary. Everything the domain layer reads is described
// here as a provider contract, so the static bundled collections can eventually
// be swapped for a headless CMS without the surfaces noticing.

export type ResourceKind =
  | "narrative"
  | "capability"
  | "engagement"
  | "portfolio"
  | "academic";

export type ResourceRef = {
  kind: ResourceKind;
  id: string;
  revision: number;
};

export type ResourceEnvelope<T> = {
  ref: ResourceRef;
  payload: T;
  /** ISO timestamp of the last publish, as reported by the provider. */
  publishedAt: string;
  /** Provider-specific cache validator (ETag / updatedAt hash). */
  validator?: string;
};

export type QueryOptions = {
  locale?: string;
  includeDrafts?: boolean;
  limit?: number;
};

export type ContentProvider = {
  readonly id: string;
  /** Cheap liveness probe — used by the resolver before falling back. */
  available(): boolean;
  list<T>(kind: ResourceKind, options?: QueryOptions): Promise<ResourceEnvelope<T>[]>;
  read<T>(ref: ResourceRef): Promise<ResourceEnvelope<T> | null>;
};

export const isSameResource = (a: ResourceRef, b: ResourceRef): boolean =>
  a.kind === b.kind && a.id === b.id;
