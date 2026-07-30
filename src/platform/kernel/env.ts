// src/platform/kernel/env.ts
//
// Environment probes. Everything is resolved from Vite's compile-time env so the
// dead branches are eliminated by the minifier rather than evaluated at runtime.

/** True in `vite build` output. */
export const IS_PRODUCTION: boolean = import.meta.env.PROD;

/** True under `vite dev`. */
export const IS_DEVELOPMENT: boolean = import.meta.env.DEV;

/**
 * Deploy base path — "/" locally and on Vercel, "/<repo>/" on GitHub Pages
 * (injected by the Pages workflow through BASE_PATH). Asset URLs are resolved by
 * the bundler, so this is only needed for hand-built paths.
 */
export const BASE_PATH: string = import.meta.env.BASE_URL;

/** Resolve a public-directory path against the active base. */
export const publicPath = (file: string): string =>
  `${BASE_PATH}${file.replace(/^\/+/, "")}`;
