// src/presentation/motion/overlays/intro-gate/parts/monogram-ring.tsx
import { m } from "framer-motion";
import { identity } from "@identity";

/** Gradient id — must stay unique within the document. */
const GRADIENT_ID = "pl-grad";

const RING = { size: 96, viewBox: 112, centre: 56, radius: 52, stroke: 3 } as const;

/**
 * The monogram inside a ring that draws itself in. The letters come from the
 * identity registry's derived monogram, never from a literal.
 */
const MonogramRing = () => (
  <div className="relative grid place-items-center">
    <svg
      width={RING.size}
      height={RING.size}
      viewBox={`0 0 ${RING.viewBox} ${RING.viewBox}`}
      className="-rotate-90"
    >
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <m.circle
        cx={RING.centre}
        cy={RING.centre}
        r={RING.radius}
        fill="none"
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth={RING.stroke}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </svg>
    <span className="absolute text-2xl font-extrabold brand-text">
      {identity.monogram}
    </span>
  </div>
);

export default MonogramRing;
