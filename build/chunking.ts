// build/chunking.ts
//
// Manual chunk strategy.
//
// Vendors: React and Framer Motion change far less often than app code, so each
// gets its own long-cache chunk — an app-only deploy then leaves them cached for
// returning visitors instead of re-downloading them inside the app bundle.
// three.js is intentionally left alone: it is only reached through the lazy
// particulate stage import, so Rollup already emits it as its own async chunk,
// and pulling it in here would drag it into the initial load.
//
// App code: each layer is emitted separately too. The total bytes and the
// critical path are unchanged (they are all static imports of the entry, so Vite
// modulepreloads them together), but the output is many small hashed files rather
// than one readable bundle — and a change in one layer only invalidates that
// layer's hash.

const VENDOR_CHUNKS: readonly { chunk: string; match: readonly string[] }[] = [
  { chunk: "react-vendor", match: ["/react-dom/", "/react/", "/scheduler/"] },
  { chunk: "motion-vendor", match: ["framer-motion", "motion-dom", "motion-utils"] },
];

/** Left out of manual chunking entirely — handled by the lazy import. */
const VENDOR_EXCLUDED: readonly string[] = ["/three/", "@react-three"];

const APP_CHUNKS: readonly { chunk: string; match: readonly string[] }[] = [
  { chunk: "layer-domain", match: ["/src/domain/", "/src/config/"] },
  { chunk: "layer-platform", match: ["/src/platform/"] },
  { chunk: "layer-motion", match: ["/src/presentation/motion/"] },
  { chunk: "layer-surfaces", match: ["/src/presentation/surfaces/"] },
];

/**
 * Modules that are reached through a dynamic `import()` and must therefore stay
 * out of the static layer chunks — assigning them a manual chunk would merge
 * them back into the initial payload and silently undo the lazy loading.
 */
const LAZY_OWNED: readonly string[] = [
  "/src/presentation/motion/overlays/",
  "/src/presentation/canvas/",
  "/src/presentation/surfaces/outreach/transport/",
];

const hits = (id: string, patterns: readonly string[]) =>
  patterns.some((pattern) => id.includes(pattern));

export function manualChunks(id: string): string | undefined {
  const normalized = id.replace(/\\/g, "/");

  if (normalized.includes("node_modules")) {
    if (hits(normalized, VENDOR_EXCLUDED)) return undefined;
    return VENDOR_CHUNKS.find((entry) => hits(normalized, entry.match))?.chunk;
  }

  if (hits(normalized, LAZY_OWNED)) return undefined;

  return APP_CHUNKS.find((entry) => hits(normalized, entry.match))?.chunk;
}
