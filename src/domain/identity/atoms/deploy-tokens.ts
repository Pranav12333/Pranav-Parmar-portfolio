// src/domain/identity/atoms/deploy-tokens.ts
//
// Canonical-origin atoms. The runtime base path itself comes from Vite
// (`import.meta.env.BASE_URL`, set by the Pages workflow) — these tokens only
// describe the absolute canonical location used for outbound/share URLs, and
// they are mirrored by the canonical + Open Graph tags in the document head.

export const DEPLOY_TOKENS = {
  scheme: "https",
  host: "pranav12333.github.io",
  project: "Pranav-Parmar-portfolio",
} as const;

export const SHARE_TOKENS = {
  /** Square social card served from the public root. */
  card: "og-image.png",
} as const;
