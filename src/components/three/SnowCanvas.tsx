import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import SnowField from "./SnowField";

/** Subtle pointer-driven camera parallax — the snow appears to follow the cursor. */
const CameraRig = () => {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth - 0.5;
      target.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (target.current.x * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (-target.current.y * 1.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/** Transparent, full-page canvas of falling hexagons with cursor parallax. */
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
    <CameraRig />
  </Canvas>
);

export default SnowCanvas;
