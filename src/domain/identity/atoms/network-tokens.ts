// src/domain/identity/atoms/network-tokens.ts
//
// Outbound-channel atoms: the provider origins, the account handles and the
// per-provider path shapes are stored separately, so a URL only exists once
// ../composers/network-graph.ts has combined all three. The `channel` keys are
// intentionally role-based rather than brand-based — the brand mapping lives in
// ../descriptors.ts.

export const PROVIDER_ORIGINS = {
  code: "https://github.com",
  professional: "https://www.linkedin.com",
  video: "https://www.youtube.com",
  visual: "https://www.instagram.com",
  qa: "https://stackoverflow.com",
} as const;

export const HANDLE_TOKENS = {
  code: "Pranav12333",
  professional: "pranav-parmar-webdeveloper",
  video: "pranav_parmar_123",
  visual: "pranav_parmar.12333",
  qa: { id: "32940722", slug: "pranav-parmar" },
} as const;

/**
 * Path templates applied to the handles. `:handle` is substituted by the
 * composer; a trailing slash is significant (LinkedIn canonicalizes to it).
 */
export const HANDLE_PATHS = {
  code: "/:handle",
  professional: "/in/:handle/",
  video: "/@:handle",
  visual: "/:handle",
  qa: "/users/:id/:slug",
} as const;

/** Referral params carried by the shared visual-channel link. */
export const VISUAL_REFERRAL: Record<string, string> = {
  igsh: "bXB3MWRjcmdoZmgx",
  utm_source: "qr",
};
