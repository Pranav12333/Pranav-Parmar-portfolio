// build/mangle-plugin.ts
//
// A conservative post-minify identifier/string mangler for the FIRST-PARTY chunks
// only. Its job is to make the shipped bundle unpleasant to read and to re-brand,
// not to provide security — anything shipped to a browser can always be run and
// observed.
//
// Deliberate constraints, because Lighthouse must not move:
//   • Vendor chunks (react / motion / three) are never touched. They dominate the
//     byte count, so leaving them alone keeps total size and parse cost flat.
//   • The transforms that actually cost runtime performance — control-flow
//     flattening, dead-code injection, self-defending and debug-protection traps —
//     are all OFF. Only identifier renaming plus a light string-array indirection
//     is applied, which is a few percent of one chunk.
//   • Source maps are not produced (they are disabled for the build anyway).
//   • Skipped entirely for `vite dev`, so the dev loop is untouched.
//
// Escape hatch: set NO_MANGLE=1 to build without this pass.

import type { Plugin } from "vite";

/** Chunks whose names start with any of these are left as-is. */
const PRESERVED_PREFIXES = ["react-vendor", "motion-vendor", "stage", "three"];

/** Only ever transform real JavaScript output. */
const SCRIPT_PATTERN = /\.(?:js|mjs)$/;

const OPTIONS = {
  compact: true,
  identifierNamesGenerator: "mangled" as const,
  simplify: true,
  target: "browser" as const,
  sourceMap: false,
  // Light string indirection: the literals stop being greppable, at negligible
  // runtime cost. No encoding — base64/rc4 would add real decode work.
  // Threshold and wrapper count are kept deliberately low: they are what costs
  // bytes, and the goal is only to stop literals being greppable, not to hide
  // them. Raising these measurably grows the initial payload.
  stringArray: true,
  stringArrayThreshold: 0.4,
  stringArrayEncoding: [],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 0,
  splitStrings: false,
  // Everything below is a known performance or correctness hazard — keep off.
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  selfDefending: false,
  numbersToExpressions: false,
  unicodeEscapeSequence: false,
  renameGlobals: false,
  transformObjectKeys: false,
};

const isPreserved = (fileName: string) =>
  PRESERVED_PREFIXES.some((prefix) => fileName.split("/").pop()?.startsWith(prefix));

/**
 * Runs after Rollup renders (and esbuild minifies) each chunk. A failure is never
 * fatal: the original code is kept and a warning is logged, so a bad
 * dependency install can't break `npm run build`.
 */
export function manglePlugin(): Plugin {
  return {
    name: "portfolio:mangle",
    apply: "build",
    enforce: "post",
    async renderChunk(code, chunk) {
      if (process.env.NO_MANGLE === "1") return null;
      if (!SCRIPT_PATTERN.test(chunk.fileName)) return null;
      if (isPreserved(chunk.fileName)) return null;

      try {
        const { default: obfuscator } = await import("javascript-obfuscator");
        const result = obfuscator.obfuscate(code, OPTIONS);
        return { code: result.getObfuscatedCode(), map: null };
      } catch (error) {
        this.warn(
          `mangle pass skipped for ${chunk.fileName}: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
        return null;
      }
    },
  };
}
