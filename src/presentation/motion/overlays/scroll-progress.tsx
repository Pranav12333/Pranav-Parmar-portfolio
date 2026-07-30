// src/presentation/motion/overlays/scroll-progress.tsx
import { m, useScroll, useSpring } from "framer-motion";
import { SPRING } from "../vocabulary";

/** Thin gradient progress bar pinned to the top of the viewport. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING.progress);

  return (
    <m.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left brand-gradient"
    />
  );
};

export default ScrollProgress;
