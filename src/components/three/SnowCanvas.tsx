import { Canvas } from "@react-three/fiber";
import SnowField from "./SnowField";

/**
 * Transparent, full-page canvas of falling hexagons. The camera is fixed — the
 * cursor never moves the whole field; only the localized gather/wake in
 * SnowField reacts to the pointer, so the rest of the background stays stable.
 */
const SnowCanvas = ({ color }: { color: string }) => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 10], fov: 60 }}
    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    style={{ pointerEvents: "none", background: "transparent" }}
  >
    <ambientLight intensity={0.9} />
    <directionalLight position={[4, 6, 6]} intensity={2} color="#dbeafe" />
    <pointLight position={[-6, -2, 4]} intensity={45} color="#3b82f6" distance={30} decay={2} />
    <pointLight position={[6, 4, -2]} intensity={30} color="#60a5fa" distance={30} decay={2} />
    <SnowField color={color} />
  </Canvas>
);

export default SnowCanvas;
