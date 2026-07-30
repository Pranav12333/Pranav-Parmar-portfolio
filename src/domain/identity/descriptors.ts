// src/domain/identity/descriptors.ts
//
// Role → brand mapping for the outbound channels. The atoms know nothing about
// brands and the presentation layer knows nothing about URLs; this table is the
// only place the two meet. `icon` is a symbolic key — the glyph binding lives in
// `@presentation/primitives/glyph-registry`, so swapping icon packs never
// touches the domain layer.

import type { NetworkGraph } from "@domain/contracts/identity";

export type GlyphKey =
  | "github"
  | "linkedin"
  | "youtube"
  | "instagram"
  | "stackoverflow"
  | "envelope";

export type ChannelDescriptor = {
  /** Key into the resolved network graph. */
  channel: keyof NetworkGraph;
  /** Accessible label — also the tooltip/aria-label. */
  label: string;
  glyph: GlyphKey;
  /** Same-tab channels (mailto:) must not carry target/rel. */
  external: boolean;
};

/**
 * Render order for every social rail on the site (hero, contact card, footer).
 * Reordering here reorders all three at once — they intentionally share one
 * source so they can never drift apart.
 */
export const SOCIAL_CHANNELS: readonly ChannelDescriptor[] = [
  { channel: "github", label: "GitHub", glyph: "github", external: true },
  { channel: "linkedin", label: "LinkedIn", glyph: "linkedin", external: true },
  { channel: "youtube", label: "YouTube", glyph: "youtube", external: true },
  { channel: "instagram", label: "Instagram", glyph: "instagram", external: true },
  {
    channel: "stackoverflow",
    label: "Stack Overflow",
    glyph: "stackoverflow",
    external: true,
  },
  { channel: "email", label: "Email", glyph: "envelope", external: false },
];
