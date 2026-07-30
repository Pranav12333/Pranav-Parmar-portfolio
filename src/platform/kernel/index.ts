// src/platform/kernel/index.ts
//
// Kernel barrel — the constant surface shared by every layer above it. Import
// from `@kernel`; the individual files are an implementation detail.

export { TIMING } from "./timing";
export {
  PERSISTENCE_KEYS,
  SESSION_KEYS,
  readLocal,
  readSession,
  writeLocal,
  writeSession,
} from "./persistence";
export {
  ACTIVE_SECTION_OBSERVER,
  COMPACT_VIEWPORT_PX,
  MEDIA,
  SECTION_ENTER_THRESHOLD,
  VIEWPORT,
} from "./viewport";
export { BASE_PATH, IS_DEVELOPMENT, IS_PRODUCTION, publicPath } from "./env";
