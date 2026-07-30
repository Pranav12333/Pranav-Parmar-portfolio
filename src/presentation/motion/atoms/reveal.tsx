// src/presentation/motion/atoms/reveal.tsx
import type { ReactNode } from "react";
import { m } from "framer-motion";
import { VIEWPORT } from "@kernel";
import { DURATION, EASE, OFFSET } from "../vocabulary";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
};

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/** Fades + slides its children into view on scroll (once). */
const Reveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = OFFSET.default,
}: RevealProps) => {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT.reveal}
      transition={{ duration: DURATION.reveal, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
};

export default Reveal;
