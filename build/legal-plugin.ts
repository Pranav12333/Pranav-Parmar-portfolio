// build/legal-plugin.ts
//
// Rollup's `output.banner` covers JS chunks only. This stamps the same notice
// onto the emitted stylesheet, so no build artefact ships without attribution.

import type { Plugin } from "vite";
import { LEGAL_BANNER } from "./legal";

export function legalPlugin(): Plugin {
  return {
    name: "portfolio:legal",
    apply: "build",
    enforce: "post",
    // Applied in generateBundle (after minification/mangling has finished, not
    // via Rollup's `output.banner`) so nothing downstream can strip it as a
    // "legal comment".
    generateBundle(_options, bundle) {
      for (const item of Object.values(bundle)) {
        if (item.type === "asset" && item.fileName.endsWith(".css")) {
          if (typeof item.source === "string") {
            item.source = `${LEGAL_BANNER}\n${item.source}`;
          }
        } else if (item.type === "chunk" && item.fileName.endsWith(".js")) {
          item.code = `${LEGAL_BANNER}\n${item.code}`;
        }
      }
    },
  };
}
