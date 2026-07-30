# Content pipeline

Collections reach a surface through four stages.

```
authored collection  →  resolver projection  →  content barrel  →  surface
   domain/content/*      domain/content/         @domain/content    @surfaces/*
                         resolvers.ts
```

## Stages

1. **Authored collection** — typed literals in `domain/content/`, validated by the
   contracts in `domain/contracts/content.ts`. Numbers that appear in more than one
   place (years of experience, records tuned, team sizes) live only in
   `metrics.ts` and are interpolated everywhere else, so prose and counters can
   never disagree.
2. **Resolver projection** — `resolvers.ts` is where filtering, ordering and
   locale selection belong. Today the projections are pass-throughs; the indirection
   exists so a collection can gain behaviour without every consumer re-importing.
3. **Content barrel** — surfaces import named collections from `@domain/content`
   and never from a specific file, so a collection can be re-homed freely.
4. **Surface** — renders. No surface transforms content.

## Provider substitution

`adapters/cms/` describes the same collections as a provider contract. The
resolver in `adapters/cms/resolver.ts` tries registered providers in priority
order, with the static bundled provider always registered last so a read cannot
fail. Switching to a remote source is a provider registration plus opening the
`remoteContent` gate — no surface changes.

## Schema versions

Archived documents are brought forward by the ledger in `src/migration/`.
`CURRENT_SCHEMA_VERSION` is 3:

- v1 → v2 (`0001-flatten-fields`) hoists the v1 normalizer's nested `fields`.
- v2 → v3 (`0002-split-identity`) strips branding fields now owned by the identity
  registry, so an archived document cannot reintroduce a hard-coded name or
  contact value.

Steps are pure and idempotent; nothing runs at page load.
