// src/domain/identity/composers/canonical.ts
//
// Builds the absolute canonical URL from the deploy atoms. Note this is the
// *canonical* origin, not the runtime base — `import.meta.env.BASE_URL` is what
// Vite rewrites per environment, and asset URLs go through that instead.

import { DEPLOY_TOKENS, SHARE_TOKENS } from "../atoms/deploy-tokens";

/** "https://host" with no trailing slash. */
export const canonicalOrigin = (): string =>
  `${DEPLOY_TOKENS.scheme}://${DEPLOY_TOKENS.host}`;

/** "https://host/project/" — trailing slash is canonical for Pages projects. */
export const canonicalUrl = (): string =>
  `${canonicalOrigin()}/${DEPLOY_TOKENS.project}/`;

/** Absolute URL of the share card (used by share intents, not by the head). */
export const shareCardUrl = (): string => `${canonicalUrl()}${SHARE_TOKENS.card}`;
