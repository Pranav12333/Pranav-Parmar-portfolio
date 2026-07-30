// src/presentation/motion/atoms/tilt-card.tsx
import { useRef } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useHasFinePointer } from "@platform/reactive";
import { SPRING } from "../vocabulary";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

/** Maximum tilt, in degrees, at the edges of the card. */
const DEFAULT_MAX_TILT = 8;

/** Pointer position is tracked normalised; centre is 0.5/0.5. */
const CENTRE = 0.5;

/**
 * A card that tilts in 3D toward the pointer. The parent must establish
 * a perspective (e.g. Tailwind `[perspective:1000px]`). Falls back to a
 * plain div on touch devices.
 */
const TiltCard = ({ children, className, max = DEFAULT_MAX_TILT }: TiltCardProps) => {
  const finePointer = useHasFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(CENTRE);
  const py = useMotionValue(CENTRE);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING.tilt);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING.tilt);

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(CENTRE);
    py.set(CENTRE);
  };

  if (!finePointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </m.div>
  );
};

export default TiltCard;
