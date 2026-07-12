import { useRef } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useHasFinePointer } from "../../hooks/useMediaQuery";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

/**
 * A card that tilts in 3D toward the pointer. The parent must establish
 * a perspective (e.g. Tailwind `[perspective:1000px]`). Falls back to a
 * plain div on touch devices.
 */
const TiltCard = ({ children, className, max = 8 }: TiltCardProps) => {
  const finePointer = useHasFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (!finePointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
