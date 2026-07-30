// src/presentation/canvas/particulate/stage.tsx
import { Canvas } from "@react-three/fiber";
import ParticulateField from "./field";
import { STAGE } from "./internals/simulation-constants";

/**
 * Transparent, full-page canvas of falling hexagons. The camera is fixed — the
 * cursor never moves the whole field; only the localized gather/wake in the
 * field reacts to the pointer, so the rest of the background stays stable.
 */
const ParticulateStage = ({ color }: { color: string }) => (
  <Canvas
    dpr={STAGE.dpr}
    camera={{ position: STAGE.cameraPosition, fov: STAGE.fov }}
    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    style={{ pointerEvents: "none", background: "transparent" }}
  >
    <ambientLight intensity={STAGE.ambientIntensity} />
    <directionalLight
      position={STAGE.directional.position}
      intensity={STAGE.directional.intensity}
      color={STAGE.directional.color}
    />
    {STAGE.fills.map((fill) => (
      <pointLight
        key={fill.color}
        position={fill.position}
        intensity={fill.intensity}
        color={fill.color}
        distance={fill.distance}
        decay={fill.decay}
      />
    ))}
    <ParticulateField color={color} />
  </Canvas>
);

export default ParticulateStage;
