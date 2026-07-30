# Extension points

> **Status: placeholder.** Every slot below is declared but not wired. Opening a
> gate makes the guarded branch reachable; it does not make the feature work. The
> missing wiring is listed per slot so the gap is explicit rather than surprising.

## `overlay.beforeContent` / `overlay.afterContent`

Mount a component into `runtime/composition/overlay-layer.tsx`, before or after
the document flow.

- Declared in: `config/plugins.config.mjs` (`slots`)
- Missing: the overlay layer composes a fixed list; it does not read the manifest.

## `surface.append`

Append a section to `runtime/composition/document-flow.tsx`.

- Missing: a new section also needs a role in `config/runtime/sections.ts`
  (anchor id + label) and an entry in `config/runtime/headings.ts`, otherwise it
  gets no nav link and no accessible heading.

## `transport.outreach`

Replace the contact-form delivery.

- Contract: `presentation/surfaces/outreach/transport/contract.ts`
  (`MessageDraft` → `DeliveryResult`).
- Implemented by: `transport/dispatch.ts`, reached by dynamic import so it stays
  out of the initial payload.
- Missing: nothing structural — a replacement only has to satisfy the contract and
  never throw. The mailto fallback in `transport/mailto.ts` is independent and
  keeps working regardless.

## `provider.content`

Serve collections from somewhere other than the bundle.

- Contract: `adapters/cms/contract.ts` (`ContentProvider`).
- Register with: `registerProvider(provider, priority)`.
- Missing: `domain/content/resolvers.ts` reads the authored collections directly
  and does not consult the adapter resolver. Also requires the `remoteContent`
  gate, and the surfaces are synchronous — a remote provider needs a suspense
  boundary that does not currently exist.

## `provider.analytics`

Attach a real sink.

- Contract: `adapters/analytics/contract.ts` (`AnalyticsSink`).
- Missing: consent capture (no UI, no storage key), and no component emits events
  today. `createBufferedSink()` only buffers in memory and drops everything unless
  `consent === "granted"`.
