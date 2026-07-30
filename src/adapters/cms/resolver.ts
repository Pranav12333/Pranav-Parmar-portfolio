// src/adapters/cms/resolver.ts
//
// Provider selection. Providers are tried in priority order and the first
// available one wins, with the static provider always last so a read can never
// fail outright.

import type { ContentProvider, ResourceKind, ResourceEnvelope } from "./contract";
import { createStaticProvider } from "./static-provider";

type Registration = { provider: ContentProvider; priority: number };

const registrations: Registration[] = [
  { provider: createStaticProvider(), priority: Number.MAX_SAFE_INTEGER },
];

export const registerProvider = (provider: ContentProvider, priority: number): void => {
  registrations.push({ provider, priority });
  registrations.sort((a, b) => a.priority - b.priority);
};

export const activeProvider = (): ContentProvider => {
  const found = registrations.find((entry) => entry.provider.available());
  return (found ?? registrations[registrations.length - 1]).provider;
};

export const resolveCollection = async <T>(
  kind: ResourceKind
): Promise<ResourceEnvelope<T>[]> => activeProvider().list<T>(kind);
