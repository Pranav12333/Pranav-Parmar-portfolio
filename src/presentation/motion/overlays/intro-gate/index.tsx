// src/presentation/motion/overlays/intro-gate/index.tsx
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { TIMING } from "@kernel";
import { usePrefersReducedMotion } from "@platform/reactive";
import { playCue } from "@platform/audio";
import { EASE } from "../../vocabulary";
import { isAutomatedVisitor } from "./internals/automation-probe";
import { hasSeenIntro, markIntroSeen } from "./internals/session-gate";
import Doors from "./parts/doors";
import IntroCopy from "./parts/intro-copy";
import MonogramRing from "./parts/monogram-ring";
import SequenceBar from "./parts/sequence-bar";
import TaglineCycle from "./parts/tagline-cycle";

/** Depth of the 3D scene the doors swing in. */
const SCENE_PERSPECTIVE = "1400px";

/**
 * Full-screen welcome page shown on first visit: a monogram ring draws in,
 * "Welcome to the world of <name>" builds up and two "where X meets Y" lines
 * swap before the screen splits into a pair of palace doors that swing open
 * onto the site. Click or press any key to enter early. Runs once per session
 * (sessionStorage) and is skipped entirely for reduced-motion users.
 */
const IntroGate = () => {
  const reduced = usePrefersReducedMotion();
  const [seen] = useState(hasSeenIntro);
  // Skip for automated/headless visitors (audits, crawlers) so they measure the
  // real hero, not the splash. Computed once — the UA never changes mid-session.
  const [automated] = useState(isAutomatedVisitor);
  const active = !reduced && !seen && !automated;

  const [done, setDone] = useState(!active);
  const [line, setLine] = useState(0);

  const finish = useCallback(() => {
    markIntroSeen();
    // Premium startup chord as the doors swing open. Plays only when the
    // context can be unlocked (i.e. the intro was dismissed by a real
    // click/keypress); a silent auto-enter respects the autoplay policy.
    playCue("startup", true);
    setDone(true);
  }, []);

  // Swap the tagline, then auto-enter.
  useEffect(() => {
    if (!active || done) return;
    const swaps = TIMING.introLineSwapMs.map((ms, i) =>
      window.setTimeout(() => setLine(i + 1), ms)
    );
    const end = window.setTimeout(finish, TIMING.introSequenceMs);
    return () => {
      swaps.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(end);
    };
  }, [active, done, finish]);

  // Any click or key skips straight into the site.
  useEffect(() => {
    if (!active || done) return;
    window.addEventListener("pointerdown", finish);
    window.addEventListener("keydown", finish);
    return () => {
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
    };
  }, [active, done, finish]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {active && !done && (
        <m.div
          data-intro
          aria-hidden="true"
          className="fixed inset-0 z-[100]"
          style={{ perspective: SCENE_PERSPECTIVE }}
          // No-op exit that outlives the doors so the overlay stays mounted
          // for the full swing.
          exit={{ opacity: 1, transition: { duration: 0.8 } }}
        >
          <Doors />

          {/* Content — fades slightly ahead of the doors */}
          <m.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 0.3, ease: EASE },
            }}
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            <MonogramRing />
            <IntroCopy />
            <TaglineCycle line={line} />
            <SequenceBar />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default IntroGate;
