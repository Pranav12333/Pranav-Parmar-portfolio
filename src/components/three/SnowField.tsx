import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";
import type { InstancedMesh } from "three";

const RY = 14;
const RZ = 8;

type Hex = {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  drift: number;
  phase: number;
  rx: number;
  ry: number;
  rz: number;
  spin: number;
  pull: number;
  lag: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
};

/**
 * A gentle "snowfall" of tumbling hexagonal plates (single instanced draw call).
 * While the cursor is on the page, hexes near it drift toward the pointer with
 * a smooth radial falloff — local density rises around the cursor and relaxes
 * back to plain snowfall when it leaves. Every click pops the hexes around it
 * with a radial burst; the first click also switches the cursor attraction off
 * for the rest of the session (a reload re-enables it). Holding the primary
 * button (or a finger) and dragging draws a continuous ripple wake along the
 * path — the same velocity channel as the burst, so it blends in and settles
 * naturally the instant the press ends.
 */
const SnowField = ({ color }: { color: string }) => {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const rayDir = useMemo(() => new Vector3(), []);

  // Field width in world units. A fixed 16 is narrower than the viewport on
  // wide screens, leaving the cursor nothing to attract near the left/right
  // edges — size it from the aspect ratio instead (visible width at the z=0
  // mid-plane is ≈ 11.6·aspect) plus margin for the pull radius.
  const rx = useMemo(() => {
    const aspect =
      typeof window !== "undefined"
        ? window.innerWidth / window.innerHeight
        : 1.6;
    return Math.max(16, aspect * 11.6 + 4);
  }, []);

  // Scale the count with the widened field so density is even across it.
  const count = useMemo(() => {
    const base =
      typeof window !== "undefined" && window.innerWidth < 640 ? 20 : 40;
    return Math.round(base * (rx / 16));
  }, [rx]);

  const hexes = useMemo<Hex[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * rx,
        y: (Math.random() - 0.5) * RY,
        z: (Math.random() - 0.5) * RZ,
        scale: Math.random() * 0.26 + 0.12,
        speed: Math.random() * 0.5 + 0.15,
        drift: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.7,
        pull: Math.random() * 0.35 + 0.55,
        lag: Math.random() * 5 + 3,
        ox: 0,
        oy: 0,
        vx: 0,
        vy: 0,
      })),
    [count, rx]
  );

  // Pointer kept in NDC; resolved to world space per-frame against the live
  // (parallax-shifted) camera. `enabled` is deliberately session-only — a
  // click turns the interaction off, a reload brings it back.
  const pointer = useRef({ x: 0, y: 0, active: 0, enabled: true });
  const burst = useRef({ x: 0, y: 0, fire: false });
  // Drag trail: the pointer position (NDC) while the primary button / a finger
  // is held down. Separate from `pointer` so the wake keeps tracking even for
  // touch and after a click has switched the hover-follow off.
  const drag = useRef({ x: 0, y: 0, active: false, has: false });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const p = pointer.current;
      if (!p.enabled || e.pointerType === "touch") return; // cursor-only
      p.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.y = -(e.clientY / window.innerHeight) * 2 + 1;
      p.active = 1;
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) pointer.current.active = 0; // left the window
    };
    const onBlur = () => {
      pointer.current.active = 0;
    };
    // Every click pops the hexes around the click point; the first click also
    // switches the cursor-follow off until the page is reloaded. Clicks on the
    // welcome overlay only dismiss it — they must not spend the interaction.
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.("[data-intro]")) return;
      const p = pointer.current;
      p.enabled = false;
      p.active = 0;
      burst.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      burst.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      burst.current.fire = true;
    };
    // Press-and-drag → a continuous ripple wake, as if a finger were gliding
    // through the field. `onDragMove` refreshes the point every move (touch
    // included) so useFrame can lay the trail down frame-by-frame; releasing
    // just clears `active` and the displaced hexes settle on their own.
    const onDragDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // left mouse / touch / pen-tip only
      if ((e.target as Element | null)?.closest?.("[data-intro]")) return;
      const dr = drag.current;
      dr.x = (e.clientX / window.innerWidth) * 2 - 1;
      dr.y = -(e.clientY / window.innerHeight) * 2 + 1;
      dr.has = true;
      dr.active = true;
    };
    const onDragMove = (e: PointerEvent) => {
      const dr = drag.current;
      if (!dr.active) return;
      dr.x = (e.clientX / window.innerWidth) * 2 - 1;
      dr.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onDragEnd = () => {
      drag.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut);
    window.addEventListener("blur", onBlur);
    window.addEventListener("click", onClick, true);
    window.addEventListener("pointerdown", onDragDown, { passive: true });
    window.addEventListener("pointermove", onDragMove, { passive: true });
    window.addEventListener("pointerup", onDragEnd, { passive: true });
    window.addEventListener("pointercancel", onDragEnd, { passive: true });
    window.addEventListener("blur", onDragEnd);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("pointerdown", onDragDown);
      window.removeEventListener("pointermove", onDragMove);
      window.removeEventListener("pointerup", onDragEnd);
      window.removeEventListener("pointercancel", onDragEnd);
      window.removeEventListener("blur", onDragEnd);
    };
  }, []);

  const elapsed = useRef(0);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    const d = Math.min(delta, 0.05); // clamp after tab refocus
    elapsed.current += d;
    const t = elapsed.current;

    // Cursor ray → the cursor's world position at any depth, so the gathering
    // lines up with the on-screen pointer for near and far hexes alike.
    const cam = state.camera;
    rayDir
      .set(pointer.current.x, pointer.current.y, 0.5)
      .unproject(cam)
      .sub(cam.position)
      .normalize();
    const dirZ = Math.abs(rayDir.z) > 1e-5 ? rayDir.z : -1e-5;
    const kx = rayDir.x / dirZ;
    const ky = rayDir.y / dirZ;
    const active = pointer.current.active;

    // One-shot click burst: aim a second ray at the click point.
    const fire = burst.current.fire;
    let bkx = 0;
    let bky = 0;
    if (fire) {
      burst.current.fire = false;
      rayDir
        .set(burst.current.x, burst.current.y, 0.5)
        .unproject(cam)
        .sub(cam.position)
        .normalize();
      const bDirZ = Math.abs(rayDir.z) > 1e-5 ? rayDir.z : -1e-5;
      bkx = rayDir.x / bDirZ;
      bky = rayDir.y / bDirZ;
    }

    // Drag wake: a live ray at the held pointer, resolved per hex below so the
    // trail lines up with the finger at every depth.
    const dragging = drag.current.active && drag.current.has;
    let dkx = 0;
    let dky = 0;
    if (dragging) {
      rayDir
        .set(drag.current.x, drag.current.y, 0.5)
        .unproject(cam)
        .sub(cam.position)
        .normalize();
      const dDirZ = Math.abs(rayDir.z) > 1e-5 ? rayDir.z : -1e-5;
      dkx = rayDir.x / dDirZ;
      dky = rayDir.y / dDirZ;
    }

    const damp = Math.exp(-3.2 * d);

    for (let i = 0; i < count; i++) {
      const h = hexes[i];
      h.y -= h.speed * d;
      h.x += Math.sin(t * h.drift + h.phase) * d * 0.12;
      if (h.y < -RY / 2) {
        h.y = RY / 2;
        h.x = (Math.random() - 0.5) * rx;
      }
      h.rx += h.spin * d;
      h.ry += h.spin * d * 0.8;

      // Pull toward the cursor with a gaussian falloff: nearby hexes gather
      // (raising local density), distant ones keep snowing undisturbed. The
      // offset is applied on top of the untouched fall simulation and eased
      // per hex, so the cluster forms — and releases — smoothly.
      const cx = cam.position.x + kx * (h.z - cam.position.z);
      const cy = cam.position.y + ky * (h.z - cam.position.z);
      const dx = cx - h.x;
      const dy = cy - h.y;
      const g = active * h.pull * Math.exp(-(dx * dx + dy * dy) / 9.7);
      const f = 1 - Math.exp(-h.lag * d);
      h.ox += (dx * g - h.ox) * f;
      h.oy += (dy * g - h.oy) * f;

      // Radial impulse away from the click point, strongest at the center.
      if (fire) {
        const bx = cam.position.x + bkx * (h.z - cam.position.z);
        const by = cam.position.y + bky * (h.z - cam.position.z);
        let ex = h.x + h.ox - bx;
        let ey = h.y + h.oy - by;
        const dist = Math.hypot(ex, ey);
        const boom =
          15 * Math.exp(-(dist * dist) / 18) * (Math.random() * 0.6 + 0.7);
        if (dist > 1e-4) {
          ex /= dist;
          ey /= dist;
        } else {
          ex = Math.cos(h.phase);
          ey = Math.sin(h.phase);
        }
        h.vx += ex * boom;
        h.vy += ey * boom;
      }

      // Continuous drag wake: while held, nudge nearby hexes radially outward
      // from the live pointer. Scaling by `d` makes it a smooth per-second push
      // (a moving trough, not a one-shot pop), and it feeds the same vx/vy the
      // click burst uses — so hover, burst and drag all settle as one motion.
      if (dragging) {
        const gx = cam.position.x + dkx * (h.z - cam.position.z);
        const gy = cam.position.y + dky * (h.z - cam.position.z);
        let wx = h.x + h.ox - gx;
        let wy = h.y + h.oy - gy;
        const wdist = Math.hypot(wx, wy);
        const wake = 28 * Math.exp(-(wdist * wdist) / 4) * d;
        if (wdist > 1e-4) {
          wx /= wdist;
          wy /= wdist;
        } else {
          wx = Math.cos(h.phase);
          wy = Math.sin(h.phase);
        }
        h.vx += wx * wake;
        h.vy += wy * wake;
      }

      // Burst velocity rides on the same eased offset and bleeds off, so the
      // pop flies outward and then settles back into plain snowfall.
      h.ox += h.vx * d;
      h.oy += h.vy * d;
      h.vx *= damp;
      h.vy *= damp;

      dummy.position.set(h.x + h.ox, h.y + h.oy, h.z);
      dummy.rotation.set(h.rx, h.ry, h.rz);
      dummy.scale.setScalar(h.scale);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      {/* 6 radial segments → hexagonal prism; thin height → plate */}
      <cylinderGeometry args={[0.5, 0.5, 0.12, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.22}
        roughness={0.4}
        metalness={0.3}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
};

export default SnowField;
