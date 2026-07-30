// src/presentation/surfaces/outreach/transport/dispatch.ts
//
// The actual delivery call. This module is reached through a dynamic import from
// the form, so its code (and the provider's contract) is a separate chunk that
// only downloads when someone genuinely submits — it is never part of the initial
// page weight.

import { TIMING } from "@kernel";
import { STATUS_COPY } from "../internals/copy";
import type { DeliveryResult, MessageDraft } from "./contract";
import {
  PROVIDER_FIELDS,
  SUBJECT_PREFIX,
  SUCCESS_FLAG,
  deliveryEndpoint,
} from "./endpoint";

type ProviderResponse = { success?: unknown; message?: string };

/**
 * POST the draft and translate the provider's answer into a UI-ready result.
 * Never throws: a network failure, a timeout and a rejection all resolve to a
 * `{ ok: false }` result with the appropriate copy, so the caller has exactly one
 * path to render.
 */
export async function dispatchMessage(draft: MessageDraft): Promise<DeliveryResult> {
  const controller = new AbortController();
  const abortTimer = window.setTimeout(
    () => controller.abort(),
    TIMING.outreachTimeoutMs
  );

  try {
    const response = await fetch(deliveryEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: draft.name,
        email: draft.email,
        message: draft.message,
        _subject: `${SUBJECT_PREFIX} ${draft.name}`,
        ...PROVIDER_FIELDS,
      }),
      signal: controller.signal,
    });
    const data = (await response.json()) as ProviderResponse;
    if (response.ok && String(data.success) === SUCCESS_FLAG) {
      return { ok: true, msg: STATUS_COPY.sent };
    }
    return { ok: false, msg: data.message || STATUS_COPY.rejected };
  } catch {
    return { ok: false, msg: STATUS_COPY.offline };
  } finally {
    window.clearTimeout(abortTimer);
  }
}
