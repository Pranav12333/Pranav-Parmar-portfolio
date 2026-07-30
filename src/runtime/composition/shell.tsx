// src/runtime/composition/shell.tsx
import { useCardSpotlight } from "@platform/reactive";
import Navigation from "@surfaces/chrome/navigation";
import DocumentFlow, { MAIN_ID } from "./document-flow";
import OverlayLayer from "./overlay-layer";

const SKIP_LABEL = "Skip to main content";

/** Page background + text colour for both themes. */
const CANVAS_CLASS =
  "relative min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200";

/** Visually hidden until focused, then pinned top-left. */
const SKIP_CLASS =
  "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg";

/**
 * The application shell: one delegated card-spotlight listener, the skip link,
 * the overlay layer and the document flow. Deliberately thin — composition only,
 * no behaviour of its own.
 */
const AppShell = () => {
  useCardSpotlight();

  return (
    <div className={CANVAS_CLASS}>
      <a href={`#${MAIN_ID}`} className={SKIP_CLASS}>
        {SKIP_LABEL}
      </a>
      <OverlayLayer />
      <Navigation />
      <DocumentFlow />
    </div>
  );
};

export default AppShell;
