// src/presentation/motion/atoms/count-up.tsx
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { VIEWPORT } from "@kernel";
import { DURATION } from "../vocabulary";

type CountUpProps = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

/** Counts from 0 to `to` when it scrolls into view. */
const CountUp = ({
  to,
  suffix = "",
  prefix = "",
  duration = DURATION.counter,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT.meter);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(value)}
      {suffix}
    </span>
  );
};

export default CountUp;
