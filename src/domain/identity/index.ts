// src/domain/identity/index.ts
//
// Public face of the identity module. Consumers import from `@identity` and get
// the composed registry plus the channel descriptors — never the atoms or the
// composers, which stay internal to this folder.

export { identity } from "./registry";
export { SOCIAL_CHANNELS } from "./descriptors";
export type { ChannelDescriptor, GlyphKey } from "./descriptors";
export { alternateRole } from "./composers/display-name";
export { languageLabels, shortLocality } from "./composers/geography";
export { shareCardUrl } from "./composers/canonical";
