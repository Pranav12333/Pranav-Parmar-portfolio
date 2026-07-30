// src/presentation/surfaces/outreach/parts/message-form.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { playCue } from "@platform/audio";
import Magnetic from "@presentation/motion/atoms/magnetic";
import Reveal from "@presentation/motion/atoms/reveal";
import {
  FIELD_COPY,
  MESSAGE_MAX_LENGTH,
  MESSAGE_ROWS,
  STATUS_COPY,
  SUBMIT_COPY,
} from "../internals/copy";
import { FIELD_CLASS, LABEL_CLASS } from "../internals/field-styles";
import type { DeliveryResult } from "../transport/contract";
import { emptyDraft } from "../transport/contract";
import StatusNote from "./status-note";

/**
 * Low magnetic strength: the card clips at overflow-hidden, so the button's
 * travel must stay inside the card padding.
 */
const BUTTON_PULL = 0.1;

const MessageForm = () => {
  const [draft, setDraft] = useState(emptyDraft);
  const [status, setStatus] = useState<DeliveryResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      // Code-split: the delivery implementation only downloads on a real submit.
      const { dispatchMessage } = await import("../transport/dispatch");
      const result = await dispatchMessage(draft);
      setStatus(result);
      if (result.ok) {
        setDraft(emptyDraft());
        playCue("chime", true); // soft confirmation on a successful send
      }
    } catch {
      // The transport chunk itself failed to load (offline) — same fallback.
      setStatus({ ok: false, msg: STATUS_COPY.offline });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal direction="left" className="h-full">
      <form
        onSubmit={handleSubmit}
        className="card flex h-full flex-col gap-4 p-6 sm:p-8"
      >
        <div>
          <label htmlFor="name" className={LABEL_CLASS}>
            {FIELD_COPY.name.label}
          </label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            required
            placeholder={FIELD_COPY.name.placeholder}
            value={draft.name}
            onChange={handleChange}
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            {FIELD_COPY.email.label}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder={FIELD_COPY.email.placeholder}
            value={draft.email}
            onChange={handleChange}
            className={FIELD_CLASS}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label htmlFor="message" className={LABEL_CLASS}>
            {FIELD_COPY.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={MESSAGE_MAX_LENGTH}
            rows={MESSAGE_ROWS}
            placeholder={FIELD_COPY.message.placeholder}
            value={draft.message}
            onChange={handleChange}
            className={`${FIELD_CLASS} flex-1 resize-none`}
          />
        </div>

        <Magnetic strength={BUTTON_PULL}>
          <button
            type="submit"
            disabled={loading}
            data-cursor="hover"
            className="group btn-sheen inline-flex w-full items-center justify-center gap-2 rounded-xl brand-gradient px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? SUBMIT_COPY.busy : SUBMIT_COPY.idle}
            {!loading && (
              <FiSend className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            )}
          </button>
        </Magnetic>

        <StatusNote status={status} draft={draft} />
      </form>
    </Reveal>
  );
};

export default MessageForm;
