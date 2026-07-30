// src/presentation/surfaces/outreach/parts/status-note.tsx
import { AnimatePresence, m } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiMail } from "react-icons/fi";
import type { DeliveryResult, MessageDraft } from "../transport/contract";
import { mailtoHref } from "../transport/mailto";
import { STATUS_COPY } from "../internals/copy";

type StatusNoteProps = {
  status: DeliveryResult | null;
  /** Needed to prefill the mailto fallback when delivery failed. */
  draft: MessageDraft;
};

/**
 * The result banner. On failure it also offers the prefilled mailto so the
 * visitor's message is never lost.
 */
const StatusNote = ({ status, draft }: StatusNoteProps) => (
  <AnimatePresence>
    {status && (
      <m.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className={`flex flex-col gap-2.5 rounded-lg px-3 py-2.5 text-sm ${
          status.ok
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : "bg-red-500/10 text-red-600 dark:text-red-400"
        }`}
      >
        <span className="flex items-center gap-2">
          {status.ok ? (
            <FiCheckCircle className="shrink-0" />
          ) : (
            <FiAlertCircle className="shrink-0" />
          )}
          {status.msg}
        </span>
        {!status.ok && (
          <a
            href={mailtoHref(draft)}
            data-cursor="hover"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 font-medium text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400"
          >
            <FiMail /> {STATUS_COPY.fallbackAction}
          </a>
        )}
      </m.div>
    )}
  </AnimatePresence>
);

export default StatusNote;
