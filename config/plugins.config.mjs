// config/plugins.config.mjs
//
// Presentation plugin manifest. Plugins are declarative descriptors resolved at
// build time by the extension host; see docs/plugin-api.md for the lifecycle.
//
// The registry is empty in this build. It is read by nothing at runtime — Vite's
// own plugin array in vite.config.ts is the only plugin list that takes effect.

/** @typedef {"surface" | "overlay" | "transport" | "provider"} PluginKind */

/**
 * @typedef {Object} PluginDescriptor
 * @property {string} id
 * @property {PluginKind} kind
 * @property {string} entry        Module specifier, resolved against src/.
 * @property {string[]} [requires] Gate ids that must be open.
 * @property {number} [order]      Lower runs earlier within its kind.
 */

/** @type {PluginDescriptor[]} */
export const plugins = [];

/** Slots a plugin may attach to, in mount order. */
export const slots = [
  "overlay.beforeContent",
  "overlay.afterContent",
  "surface.append",
  "transport.outreach",
  "provider.content",
];

export default { plugins, slots };
