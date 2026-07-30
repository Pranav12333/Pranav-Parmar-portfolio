// src/domain/contracts/identity.ts
//
// Structural contracts for the identity layer. The concrete values never live
// here — they are assembled by `@domain/identity` from the atom tokens, so this
// file describes shape only and can be shared with the adapter/compatibility
// trees without dragging the composers in.

/** Wordmark pieces used by the navbar / footer brand marks. */
export type Wordmark = {
  lead: string;
  punctuation: string;
};

/** Resolved outbound profile links, keyed by channel role. */
export type NetworkGraph = {
  github: string;
  linkedin: string;
  youtube: string;
  instagram: string;
  stackoverflow: string;
  email: string;
};

/** Resolved contact points (labels + hrefs are derived separately). */
export type ContactPoints = {
  mail: { label: string; href: string };
  voice: { label: string; href: string };
};

/** The composed identity surface consumed by the presentation layer. */
export type IdentityRegistry = {
  name: string;
  fullName: string;
  title: string;
  specialty: string;
  location: string;
  email: string;
  phone: string;
  liveSite: string;
  wordmark: Wordmark;
  monogram: string;
  socials: NetworkGraph;
  contact: ContactPoints;
};
