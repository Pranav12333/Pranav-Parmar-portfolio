// src/domain/identity/composers/network-graph.ts
//
// Resolves the outbound profile links from three separate atom groups: the
// provider origin, the account handle and the path template. No complete URL
// exists as a literal anywhere in the tree — they are only ever built here.

import type { NetworkGraph } from "@domain/contracts/identity";
import {
  HANDLE_PATHS,
  HANDLE_TOKENS,
  PROVIDER_ORIGINS,
  VISUAL_REFERRAL,
} from "../atoms/network-tokens";
import { mailHref } from "./contact-points";

type SimpleChannel = "code" | "professional" | "video" | "visual";

/** Substitute a single `:handle` placeholder in a path template. */
const applyHandle = (template: string, handle: string): string =>
  template.replace(":handle", handle);

const resolve = (channel: SimpleChannel): string =>
  `${PROVIDER_ORIGINS[channel]}${applyHandle(HANDLE_PATHS[channel], HANDLE_TOKENS[channel])}`;

/** The Q&A profile carries an id + slug pair rather than a single handle. */
const resolveQa = (): string => {
  const path = HANDLE_PATHS.qa
    .replace(":id", HANDLE_TOKENS.qa.id)
    .replace(":slug", HANDLE_TOKENS.qa.slug);
  return `${PROVIDER_ORIGINS.qa}${path}`;
};

/** The shared visual link keeps its referral params (preserves attribution). */
const resolveVisual = (): string => {
  const query = new URLSearchParams(VISUAL_REFERRAL).toString();
  return query ? `${resolve("visual")}?${query}` : resolve("visual");
};

export const networkGraph = (): NetworkGraph => ({
  github: resolve("code"),
  linkedin: resolve("professional"),
  youtube: resolve("video"),
  instagram: resolveVisual(),
  stackoverflow: resolveQa(),
  email: mailHref(),
});
