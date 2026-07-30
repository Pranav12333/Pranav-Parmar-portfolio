// src/presentation/canvas/particulate/field.tsx
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";
import type { InstancedMesh } from "three";
import { FIELD, createHexes, fieldCount, fieldSpanX } from "./internals/field-geometry";
import { PLATE, SIM } from "./internals/simulation-constants";
import {
  attachPointerChannel,
  createPointerChannel,
} from "./internals/pointer-channel";

/**
 * A gentle "snowfall" of tumbling hexagonal plates (single instanced draw call).
 * While the cursor is on the page, plates near it drift toward the pointer with
 * a smooth radial falloff — local density rises around the cursor and relaxes
 * back to plain snowfall when it leaves. Every click pops the plates around it
 * with a radial burst; the first click also switches the cursor attraction off
 * for the rest of the session (a reload re-enables it). Holding the primary
 * button (or a finger) and dragging draws a continuous ripple wake along the
 * path — the same velocity channel as the burst, so it blends in and settles
 * naturally the instant the press ends.
 */
const ParticulateField = ({ color }: { color: string }) => {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const rayDir = useMemo(() => new Vector3(), []);

  const spanX = useMemo(fieldSpanX, []);
  const count = useMemo(() => fieldCount(spanX), [spanX]);
  const hexes = useMemo(() => createHexes(count, spanX), [count, spanX]);

  const channel = useMemo(createPointerChannel, []);

  // Eased follow-point (NDC) + eased activity. The local gather glides after
  // the cursor with a slight lag and fades in/out instead of snapping.
  const view = useRef({ x: 0, y: 0, act: 0 });

  useEffect(() => attachPointerChannel(channel), [channel]);

  const elapsed = useRef(0);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const d = Math.min(delta, SIM.deltaClamp); // clamp after tab refocus
    elapsed.current += d;
    const t = elapsed.current;

    const cam = state.camera;
    const camX = cam.position.x;
    const camY = cam.position.y;
    const camZ = cam.position.z;

    // Ease the follow-point toward the live pointer so the local gather glides
    // after the cursor with a slight lag rather than snapping — and can never
    // teleport across the field on a fast flick. `act` eases in/out too, so the
    // cluster forms and releases smoothly instead of popping in and out.
    const v = view.current;
    v.x += (channel.pointer.x - v.x) * (1 - Math.exp(-SIM.followEase * d));
    v.y += (channel.pointer.y - v.y) * (1 - Math.exp(-SIM.followEase * d));
    v.act += (channel.pointer.active - v.act) * (1 - Math.exp(-SIM.activityEase * d));
    const active = v.act;

    // Cursor ray → the follow-point's world position at any depth, so the
    // gathering lines up with the on-screen pointer for near and far plates.
    rayDir.set(v.x, v.y, 0.5).unproject(cam).sub(cam.position).normalize();
    const dirZ = Math.abs(rayDir.z) > SIM.epsilon ? rayDir.z : -SIM.epsilon;
    const kx = rayDir.x / dirZ;
    const ky = rayDir.y / dirZ;

    // One-shot click burst: aim a second ray at the click point.
    const fire = channel.burst.fire;
    let bkx = 0;
    let bky = 0;
    if (fire) {
      channel.burst.fire = false;
      rayDir
        .set(channel.burst.x, channel.burst.y, 0.5)
        .unproject(cam)
        .sub(cam.position)
        .normalize();
      const bDirZ = Math.abs(rayDir.z) > SIM.epsilon ? rayDir.z : -SIM.epsilon;
      bkx = rayDir.x / bDirZ;
      bky = rayDir.y / bDirZ;
    }

    // Drag wake: build the segment the pointer swept THIS frame — previous
    // point → current point — as two per-depth ray slopes (`p*` = start,
    // `d*` = end). Carving the wake against the whole segment below, not just
    // the latest event, keeps the trail gap-free during fast drags: a faster
    // pointer sweeps a longer segment and so carves a longer trough, while a
    // still/slow drag collapses it to a point and carves a small local dimple.
    // The span is clamped so a pointer warp can't rake the whole screen at once.
    const dragging = channel.drag.active && channel.drag.has;
    let pkx = 0;
    let pky = 0;
    let dkx = 0;
    let dky = 0;
    let dragSpeed = 0;
    if (dragging) {
      const dr = channel.drag;
      const sx = dr.x - dr.px;
      const sy = dr.y - dr.py;
      const span = Math.hypot(sx, sy);
      const maxSpan = SIM.dragMaxSpan; // NDC units
      if (span > maxSpan) {
        const k = maxSpan / span;
        dr.px = dr.x - sx * k;
        dr.py = dr.y - sy * k;
      }
      dragSpeed = span < maxSpan ? span : maxSpan;
      rayDir.set(dr.px, dr.py, 0.5).unproject(cam).sub(cam.position).normalize();
      let z = Math.abs(rayDir.z) > SIM.epsilon ? rayDir.z : -SIM.epsilon;
      pkx = rayDir.x / z;
      pky = rayDir.y / z;
      rayDir.set(dr.x, dr.y, 0.5).unproject(cam).sub(cam.position).normalize();
      z = Math.abs(rayDir.z) > SIM.epsilon ? rayDir.z : -SIM.epsilon;
      dkx = rayDir.x / z;
      dky = rayDir.y / z;
      dr.px = dr.x; // advance the trailing point for next frame
      dr.py = dr.y;
    }
    // Wake grows mildly with sweep speed, so a fast drag flings plates further
    // (a longer settling trail) than a slow one.
    const wakeStrength = SIM.wakeBase * (1 + dragSpeed * SIM.wakeSpeedGain);

    const damp = Math.exp(-SIM.velocityDamping * d);

    for (let i = 0; i < count; i++) {
      const h = hexes[i];
      h.y -= h.speed * d;
      h.x += Math.sin(t * h.drift + h.phase) * d * SIM.driftScale;
      if (h.y < -FIELD.spanY / 2) {
        h.y = FIELD.spanY / 2;
        h.x = (Math.random() - 0.5) * spanX;
      }
      h.rx += h.spin * d;
      h.ry += h.spin * d * SIM.spinYRatio;

      // Pull toward the cursor with a gaussian falloff: nearby plates gather
      // (raising local density), distant ones keep snowing undisturbed. The
      // offset is applied on top of the untouched fall simulation and eased
      // per plate, so the cluster forms — and releases — smoothly.
      const cx = camX + kx * (h.z - camZ);
      const cy = camY + ky * (h.z - camZ);
      const dx = cx - h.x;
      const dy = cy - h.y;
      const g =
        active * h.pull * Math.exp(-(dx * dx + dy * dy) / SIM.gatherFalloff);
      const f = 1 - Math.exp(-h.lag * d);
      h.ox += (dx * g - h.ox) * f;
      h.oy += (dy * g - h.oy) * f;

      // Radial impulse away from the click point, strongest at the center.
      if (fire) {
        const bx = camX + bkx * (h.z - camZ);
        const by = camY + bky * (h.z - camZ);
        let ex = h.x + h.ox - bx;
        let ey = h.y + h.oy - by;
        const dist = Math.hypot(ex, ey);
        const boom =
          SIM.burstStrength *
          Math.exp(-(dist * dist) / SIM.burstFalloff) *
          (Math.random() * SIM.burstJitterSpan + SIM.burstJitterBase);
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

      // Continuous drag wake: push each plate away from the CLOSEST point on the
      // swept segment, so the whole path carves one smooth capsule-shaped
      // trough with no gaps or jitter between sparse pointer events. Feeds the
      // same vx/vy channel as hover/burst, so it settles back into snowfall.
      if (dragging) {
        const hx = h.x + h.ox;
        const hy = h.y + h.oy;
        const ax = camX + pkx * (h.z - camZ);
        const ay = camY + pky * (h.z - camZ);
        const abx = camX + dkx * (h.z - camZ) - ax;
        const aby = camY + dky * (h.z - camZ) - ay;
        const ab2 = abx * abx + aby * aby;
        let tt = ab2 > 1e-6 ? ((hx - ax) * abx + (hy - ay) * aby) / ab2 : 0;
        tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
        let wx = hx - (ax + abx * tt);
        let wy = hy - (ay + aby * tt);
        const wdist = Math.hypot(wx, wy);
        const wake = wakeStrength * Math.exp(-(wdist * wdist) / SIM.wakeFalloff) * d;
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

      // Burst/drag velocity rides on the same eased offset and bleeds off, so
      // the motion flies outward and then settles back into plain snowfall.
      h.ox += h.vx * d;
      h.oy += h.vy * d;
      h.vx *= damp;
      h.vy *= damp;

      dummy.position.set(h.x + h.ox, h.y + h.oy, h.z);
      dummy.rotation.set(h.rx, h.ry, h.rz);
      dummy.scale.setScalar(h.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <cylinderGeometry
        args={[PLATE.radius, PLATE.radius, PLATE.thickness, PLATE.segments]}
      />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={PLATE.emissiveIntensity}
        roughness={PLATE.roughness}
        metalness={PLATE.metalness}
        transparent
        opacity={PLATE.opacity}
      />
    </instancedMesh>
  );
};

export default ParticulateField;
