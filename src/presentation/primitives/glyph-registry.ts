// src/presentation/primitives/glyph-registry.ts
//
// The only place react-icons is bound to a domain concept. The identity module
// emits symbolic glyph keys; this table turns them into components, so swapping
// icon packs is a change here and nowhere else.

import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaStackOverflow,
  FaYoutube,
} from "react-icons/fa";
import type { GlyphKey } from "@identity";

export const GLYPHS: Record<GlyphKey, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  instagram: FaInstagram,
  stackoverflow: FaStackOverflow,
  envelope: FaEnvelope,
};
