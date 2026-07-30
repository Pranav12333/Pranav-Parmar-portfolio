// build/legal.ts
//
// The single source of the copyright notice. It is stamped onto every emitted
// JS and CSS chunk as a Rollup banner, which runs AFTER minification and after
// the mangling pass — so the notice survives both, and `legalComments: 'none'`
// (which strips comments from module sources) cannot remove it.
//
// The `/*!` form is the conventional "preserve this" marker: bundlers and
// minifiers downstream of this build treat it as a legal comment and keep it.
//
// Removing or altering this banner is prohibited by section 2(g) of LICENSE.

const HOLDER = "Pranav H. Parmar";

/** First year of publication. Bump the range end, never the start. */
const YEAR = "2026";

const CANONICAL = "https://pranav12333.github.io/Pranav-Parmar-portfolio/";

export const COPYRIGHT_LINE = `Copyright (c) ${YEAR} ${HOLDER}. All rights reserved.`;

/**
 * Banner prepended to each emitted chunk. Kept to five short lines: it is
 * repeated once per output file, so length is a real (if tiny) byte cost.
 */
export const LEGAL_BANNER = [
  "/*!",
  ` * ${HOLDER} — Portfolio`,
  ` * ${COPYRIGHT_LINE}`,
  " *",
  " * PROPRIETARY AND CONFIDENTIAL. Not open source.",
  " * Copying, modification, re-branding, white-labelling or redistribution of",
  " * this file or any part of it is prohibited without prior written permission.",
  ` * ${CANONICAL} — see LICENSE and NOTICE in the source repository.`,
  " * Third-party dependencies remain under their own licenses (see NOTICE).",
  " */",
].join("\n");
