import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../../data/profile";
import { EASE, EASE_INOUT } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

// "Where X meets Y" lines cycled on the welcome screen (keep it to 1–2).
const LINES = [
  "Where technology meets innovation",
  "Where smart work meets dedication",
];

const LINE_SWAP_MS = [2200]; // moment line 2 takes over
const INTRO_MS = 4000; // auto-enter after the full sequence

const DOOR_EXIT = {
  duration: 0.95,
  ease: EASE_INOUT,
  delay: 0.15,
};

/**
 * Full-screen welcome page shown on first visit: a monogram ring draws in,
 * "Welcome to the world of <name>" builds up and two "where X meets Y" lines
 * swap before the screen splits into a pair of palace doors that swing open
 * onto the site. Click or press any key to enter early. Runs once per session
 * (sessionStorage) and is skipped entirely for reduced-motion users.
 */
const Preloader = () => {
  const reduced = usePrefersReducedMotion();
  const [seen] = useState(() => {
    try {
      return sessionStorage.getItem("introSeen") === "1";
    } catch {
      return false;
    }
  });
  const active = !reduced && !seen;

  const [done, setDone] = useState(!active);
  const [line, setLine] = useState(0);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      /* ignore */
    }
    setDone(true);
  }, []);

  // Swap the tagline, then auto-enter.
  useEffect(() => {
    if (!active || done) return;
    const swaps = LINE_SWAP_MS.map((ms, i) =>
      window.setTimeout(() => setLine(i + 1), ms)
    );
    const end = window.setTimeout(finish, INTRO_MS);
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
        <motion.div
          data-intro
          className="fixed inset-0 z-[100]"
          style={{ perspective: "1400px" }}
          // No-op exit that outlives the doors so the overlay stays mounted
          // for the full swing.
          exit={{ opacity: 1, transition: { duration: 1.15 } }}
        >
          {/* Left door */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 border-r border-slate-200/60 bg-slate-50 shadow-2xl dark:border-slate-800/60 dark:bg-slate-950"
            style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
            exit={{ rotateY: -102, transition: DOOR_EXIT }}
          />
          {/* Right door */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-slate-50 shadow-2xl dark:bg-slate-950"
            style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
            exit={{ rotateY: 102, transition: DOOR_EXIT }}
          />

          {/* Content — fades slightly ahead of the doors */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 0.3, ease: EASE },
            }}
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Monogram ring */}
            <div className="relative grid place-items-center">
              <svg width="96" height="96" viewBox="0 0 112 112" className="-rotate-90">
                <defs>
                  <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="56"
                  cy="56"
                  r="52"
                  fill="none"
                  stroke="url(#pl-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>
              <span className="absolute text-2xl font-extrabold brand-text">PP</span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
              className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 sm:text-sm dark:text-slate-400"
            >
              Welcome to the world of
            </motion.p>

            {/* Not an h1: the real page H1 lives in the Home hero. This is a
                transient splash overlay, so the name here stays a styled
                paragraph to keep the page to a single H1 for SEO/a11y. */}
            <motion.p
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              className="mt-3 text-4xl font-extrabold tracking-tight brand-text-animated sm:text-6xl"
            >
              {profile.name}
            </motion.p>

            {/* Swapping "where X meets Y" line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="relative mt-5 h-8 sm:h-9"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-base font-medium text-slate-600 sm:text-xl dark:text-slate-300"
                >
                  {LINES[line]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Intro timeline */}
            <div className="mt-9 h-[3px] w-56 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <motion.div
                className="h-full brand-gradient"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: INTRO_MS / 1000, ease: "linear" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-4 text-xs text-slate-400 dark:text-slate-500"
            >
              Click anywhere or press any key to enter
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
