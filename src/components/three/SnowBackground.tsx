import { Suspense, lazy } from "react";
import { useEnable3D } from "../../hooks/useEnable3D";
import { useIsDark } from "../../hooks/useTheme";

// Keep three.js/WebGL out of the initial bundle.
const SnowCanvas = lazy(() => import("./SnowCanvas"));

/**
 * Whole-page transparent snowfall behind all content. Renders nothing (a clean
 * background) when WebGL is unavailable or the user prefers reduced motion.
 */
const SnowBackground = () => {
  const enable3D = useEnable3D();
  const dark = useIsDark();
  // Light snow on dark theme; blue snow so it stays visible on the light theme.
  const color = dark ? "#bfdbfe" : "#3b82f6";

  if (!enable3D) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Suspense fallback={null}>
        <SnowCanvas color={color} />
      </Suspense>
    </div>
  );
};

export default SnowBackground;
