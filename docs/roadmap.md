# Roadmap

> **Status: placeholder.** Nothing below is scheduled or in progress. Items are
> recorded so the reasoning behind the inert trees in `src/` is written down
> somewhere other than a commit message.

## Rendering

- **WebGPU particulate backend** — `src/experimental/webgpu/` probes for an
  adapter. Blocked on the support matrix: `webgpu` is `partial` in two of three
  engines (`src/compatibility/browser-matrix.ts`), and the WebGL field already
  costs nothing on the critical path since it loads after `load` + user intent.
- **Instanced plate LOD** — reduce plate count by depth rather than by viewport
  width. Not measured; current density is already 20–40 instances in one draw call.

## Navigation

- **View Transitions between sections** — `src/experimental/view-transitions/`.
  Blocked on the Lenis scroll driver, which owns scroll position and would fight
  a transition for the same frames.

## Content

- **Remote content provider** — `src/adapters/cms/`. Needs a suspense boundary in
  the surfaces, which are synchronous today. See `docs/extension-points.md`.
- **Locale variants** — `resolvers.ts` is the intended seam. Would also need the
  document head's `hreflang` set to something other than `x-default`.

## Instrumentation

- **Consent capture + analytics sink** — `src/adapters/analytics/` buffers in
  memory and transmits nothing. A sink needs consent UI and a storage key first.
- **Vitals sampling** — `src/internal/telemetry/` collects locally. Reporting
  would mean choosing a destination, which is the same blocker as above.

## Build

- **Per-route chunking** — moot while the site is a single document.
- **Self-hosted Inter subset** — would remove two font-origin round trips. Traded
  against the cache-hit rate of the shared Google Fonts copy; not measured.
