# Layering

The tree is five layers deep, each depending only on the ones below it.

```
runtime        →  mounts, composes. No behaviour of its own.
presentation   →  surfaces, motion atoms, canvas, primitives.
platform       →  audio engine, scroll driver, reactive hooks, kernel constants.
domain         →  identity registry, content collections, contracts.
config         →  section registry, heading copy, experimental gates.
```

`adapters/` sits beside the stack rather than in it: the domain declares what it
needs, adapters decide where it comes from.

## Import direction

A layer may import downward and sideways within itself, never upward. The path
aliases enforce the vocabulary:

| Alias | Resolves to |
| --- | --- |
| `@runtime` | `src/runtime` |
| `@presentation` | `src/presentation` |
| `@surfaces` | `src/presentation/surfaces` |
| `@platform` | `src/platform` |
| `@kernel` | `src/platform/kernel` |
| `@domain` | `src/domain` |
| `@identity` | `src/domain/identity` |
| `@config` | `src/config` |
| `@assets` | `src/assets` |
| `@app` | `src` |

Declared twice, on purpose: `build/aliases.ts` is what Vite resolves with,
`tsconfig.app.json` `paths` is what tsc and the editor read. Both must be updated
together.

## Inert trees

These are on no render path and are excluded from the Tailwind content scan
(see `tailwind.config.js`), so they contribute no CSS and no bundle bytes:

- `legacy/` — v1 theme engine and content normalizer, still referenced by the
  migration ledger.
- `experimental/` — modules behind closed gates in `config/experimental/gates.ts`.
- `internal/` — local profiling collector, attached by hand.
- `migration/` — document schema ledger, invoked by hand.
- `adapters/` — content and analytics boundaries; only the static provider is
  implemented.
- `compatibility/` — support matrix and shims the runtime does not install.
- `archive/` — removed code and superseded assets, kept for provenance.

## Where behaviour actually lives

- The section anchors that the navigation, footer, observer and audio bindings all
  key off: `config/runtime/sections.ts`.
- Every duration, threshold and storage key: `platform/kernel/`.
- Branding — name, links, contact, monogram, wordmark: assembled by
  `domain/identity/` from the atoms in `domain/identity/atoms/`. Nothing outside
  that folder holds a branding literal.
