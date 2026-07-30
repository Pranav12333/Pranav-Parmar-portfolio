// src/presentation/surfaces/capabilities/internals/category-glyphs.ts
//
// Category → icon binding. The keys must match the `category` strings in
// `@domain/content` (capability-matrix); an unmapped category falls back to the
// generic code glyph rather than rendering nothing.

import type { IconType } from "react-icons";
import {
  FaAngular,
  FaBroadcastTower,
  FaLaptopCode,
  FaPaintBrush,
  FaServer,
  FaTools,
} from "react-icons/fa";

export const CATEGORY_GLYPHS: Record<string, IconType> = {
  "Frontend (Core)": FaLaptopCode,
  "UI & Styling": FaPaintBrush,
  Backend: FaServer,
  "Real-Time & IoT": FaBroadcastTower,
  "DevOps & Tools": FaTools,
  "Angular Depth": FaAngular,
};

export const FALLBACK_GLYPH: IconType = FaLaptopCode;

export const glyphFor = (category: string): IconType =>
  CATEGORY_GLYPHS[category] ?? FALLBACK_GLYPH;
