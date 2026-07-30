// scripts/generate-sounds.mjs
//
// Procedurally synthesizes the portfolio's UI sound set as small mono
// 16-bit WAV files in src/assets/audio/cues/. Deterministic (seeded noise),
// so re-running always produces identical bytes.
//
//   node scripts/generate-sounds.mjs   (or: npm run sounds)
//
// Design goal: premium, cinematic, organic — not generic UI beeps. Every
// sound is *layered* (a body + a shimmer/air + a resonance tail rather than
// one flat sample), given soft raised-cosine fades so nothing clicks in or
// out, and peak-normalized here; the in-app mix level + per-trigger pitch
// variation live in src/lib/sound.ts.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 22050; // Nyquist 11 kHz — plenty for soft UI sounds, half the bytes
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets", "audio", "cues");
const TWO_PI = Math.PI * 2;

/* ---------------------------------- utils --------------------------------- */

/** Deterministic PRNG so the generated files never change between runs. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One-pole low-pass; returns a stateful per-sample filter fn(x, cutoffHz). */
function lowpass() {
  let y = 0;
  return (x, cutoff) => {
    const a = 1 - Math.exp((-TWO_PI * cutoff) / SR);
    y += a * (x - y);
    return y;
  };
}

/** One-pole high-pass built from a low-pass complement. */
function highpass() {
  const lp = lowpass();
  return (x, cutoff) => x - lp(x, cutoff);
}

/** Attack/decay envelope: fast exponential rise, exponential fall. */
const env = (t, attack, decayTau) =>
  (1 - Math.exp(-t / Math.max(attack, 1e-5))) * Math.exp(-t / decayTau);

/**
 * A soft bell partial starting at `at` seconds: fundamental plus gentle
 * 2nd/3rd harmonics that decay faster than the root (glassy, not buzzy).
 */
function bell(t, at, freq, attack, decayTau) {
  const lt = t - at;
  if (lt < 0) return 0;
  const a = env(lt, attack, decayTau);
  return (
    a *
    (Math.sin(TWO_PI * freq * lt) +
      0.32 * Math.exp(-lt / (decayTau * 0.55)) * Math.sin(TWO_PI * freq * 2 * lt) +
      0.12 * Math.exp(-lt / (decayTau * 0.35)) * Math.sin(TWO_PI * freq * 3 * lt))
  );
}

/** Render `seconds` of audio via fn(t, i), normalize to `peak`, return samples. */
function render(seconds, fn, peak = 0.89) {
  const n = Math.round(seconds * SR);
  const out = new Float64Array(n);
  let max = 1e-9;
  for (let i = 0; i < n; i++) {
    out[i] = fn(i / SR, i);
    max = Math.max(max, Math.abs(out[i]));
  }
  const k = peak / max;
  for (let i = 0; i < n; i++) out[i] *= k;
  return out;
}

/**
 * Soft raised-cosine fade in/out (in ms). Smoother than a linear ramp, so
 * sounds swell in and settle out instead of switching on. Applied after
 * render()'s normalization, so it only ever lowers the tail — peak is safe.
 */
function fade(samples, inMs = 5, outMs = 40) {
  const fi = Math.min(Math.round((inMs / 1000) * SR), samples.length);
  const fo = Math.min(Math.round((outMs / 1000) * SR), samples.length);
  for (let i = 0; i < fi; i++) {
    samples[i] *= 0.5 - 0.5 * Math.cos((Math.PI * i) / fi);
  }
  for (let i = 0; i < fo; i++) {
    samples[samples.length - 1 - i] *= 0.5 - 0.5 * Math.cos((Math.PI * i) / fo);
  }
  return samples;
}

/** Encode mono float samples as a 16-bit PCM WAV file. */
function writeWav(name, samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16); // PCM chunk size
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28); // byte rate
  buf.writeUInt16LE(2, 32); // block align
  buf.writeUInt16LE(16, 34); // bits per sample
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767), 44 + i * 2);
  }
  const file = join(OUT_DIR, `${name}.wav`);
  writeFileSync(file, buf);
  console.log(`  ${name}.wav  ${(buf.length / 1024).toFixed(1)} KB  ${(n / SR).toFixed(2)}s`);
}

/* --------------------------------- sounds --------------------------------- */

mkdirSync(OUT_DIR, { recursive: true });
console.log(`Generating UI sounds → ${OUT_DIR}`);

// pop — CLICK: a deep water drop + a soft glass "pop", ringing into a light
// low resonance. Layers: (1) a sine whose pitch plunges 520→90 Hz (the drop),
// (2) a quick high glass partial (the pop), (3) a faint surface tick, and
// (4) a soft low bell that resonates after. ~0.5s incl. tail.
{
  const rnd = mulberry32(11);
  const hp = highpass();
  let phase = 0;
  writeWav(
    "pop",
    fade(
      render(0.5, (t) => {
        const f = 90 + 430 * Math.exp(-t / 0.035); // drop glissando
        phase += (TWO_PI * f) / SR;
        const drop = Math.sin(phase) * env(t, 0.003, 0.06);
        const glass = bell(t, 0, 1180, 0.002, 0.05) * 0.32; // soft glass pop
        const surface = hp((rnd() - 0.5) * 2, 3000) * Math.exp(-t / 0.005) * 0.16;
        const resonance = bell(t, 0.02, 300, 0.02, 0.19) * 0.24; // light ring
        return drop + glass + surface + resonance;
      }),
      3,
      110
    )
  );
}

// tick — HOVER: a subtle crystal shimmer, very airy. Two high glassy partials
// (slightly staggered so they twinkle) over a breath of high-passed air.
{
  const rnd = mulberry32(22);
  const hp = highpass();
  writeWav(
    "tick",
    fade(
      render(
        0.2,
        (t) => {
          const shimmer =
            bell(t, 0, 2637, 0.004, 0.05) * 0.5 + // ~E7
            bell(t, 0.014, 3520, 0.004, 0.04) * 0.34; // ~A7
          const air = hp((rnd() - 0.5) * 2, 5200) * env(t, 0.01, 0.05) * 0.12;
          return shimmer + air;
        },
        0.8
      ),
      5,
      60
    )
  );
}

// whoosh — SCROLL: a soft breath of band-swept air. The engine scales its
// gain/pitch to scroll speed and throttles it, so it only breathes on
// meaningful movement. Cutoff rises then falls — air moving past, not hiss.
{
  const rnd = mulberry32(33);
  const lp = lowpass();
  const hp = highpass();
  const T = 0.6;
  writeWav(
    "whoosh",
    fade(
      render(T, (t) => {
        const x = t / T;
        const cutoff = 280 + 1100 * Math.sin(Math.PI * x) ** 2;
        const swell = Math.sin(Math.PI * x) ** 1.7;
        return hp(lp((rnd() - 0.5) * 2, cutoff), 150) * swell;
      }),
      12,
      120
    )
  );
}

// cardhover — CARD HOVER: a soft magnetic pulse. A low body that glides gently
// upward (150→240 Hz, a "pull") under a sine-window swell, warmed by a 2nd
// partial and topped with a faint sparkle. ~0.36s, syncs with the card lift.
{
  const rnd = mulberry32(77);
  const lp = lowpass();
  let phase = 0;
  const T = 0.36;
  writeWav(
    "cardhover",
    fade(
      render(T, (t) => {
        const x = t / T;
        const f = 150 + 90 * x; // magnetic upward glide
        phase += (TWO_PI * f) / SR;
        const pulse = Math.sin(Math.PI * x) ** 1.4; // swell in and out
        const body = Math.sin(phase) * pulse;
        const warm = Math.sin(phase * 2) * pulse * 0.15;
        const sparkle = bell(t, 0.02, 1760, 0.02, 0.12) * 0.12;
        const air = lp((rnd() - 0.5) * 2, 520) * pulse * 0.05;
        return (body + warm) * 0.8 + sparkle + air;
      }),
      8,
      110
    )
  );
}

// transition — a light ambient fifth (C5+G5) with a slow attack; plays when a
// new section scrolls into view.
{
  const rnd = mulberry32(44);
  const lp = lowpass();
  writeWav(
    "transition",
    fade(
      render(0.55, (t) => {
        const tone =
          bell(t, 0, 523.25, 0.08, 0.2) * 0.8 + bell(t, 0.02, 783.99, 0.09, 0.18) * 0.55;
        const air = lp((rnd() - 0.5) * 2, 900) * env(t, 0.1, 0.15) * 0.06;
        return tone + air;
      }),
      10,
      120
    )
  );
}

// drag — DRAG: a continuous, smooth ambient tone for the press-and-drag glide.
// A soft low pad (90 Hz + a fifth at 135 Hz) under a veil of low-passed air.
// Both pad partials complete whole cycles over the loop (108 & 162), and the
// only movement is a single slow cycle of gentle breathing — NO fast tremolo,
// so it never pulses ("ghurr-ghurr"). The head is crossfaded with the tail so
// the seam is inaudible; the engine fades the whole thing in on grab and out
// on release, so the loop itself stays at constant level.
{
  const rnd = mulberry32(55);
  const lp1 = lowpass();
  const lp2 = lowpass();
  const LOOP = 1.2;
  const FADE = Math.round(0.12 * SR);
  const n = Math.round(LOOP * SR);
  const gen = render(LOOP + FADE / SR, (t) => {
    // one slow cycle across the loop → gentle breathing, never an audible pulse
    const drift = 1 + 0.05 * Math.sin(TWO_PI * (1 / LOOP) * t);
    // soft warm pad — a low root (90), its fifth (135) and octave (180). The
    // octave gives body that still carries on laptop speakers (which roll off
    // below ~150 Hz), so it reads as a smooth glide rather than a rough sub
    // rumble. All three are loop-locked (108/162/216 whole cycles per loop), so
    // value AND slope match at the seam → no click, no pulse.
    const pad =
      Math.sin(TWO_PI * 90 * t) * 0.5 +
      Math.sin(TWO_PI * 135 * t) * 0.3 +
      Math.sin(TWO_PI * 180 * t) * 0.2;
    // a veil of low-passed air for texture
    const air = lp2(lp1((rnd() - 0.5) * 2, 520), 520) * 0.7;
    return (pad * 0.55 + air) * drift;
  });
  const looped = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    looped[i] = i < FADE ? gen[i] * (i / FADE) + gen[i + n] * (1 - i / FADE) : gen[i];
  }
  writeWav("drag", looped); // no fade — ends must meet for the loop
}

// startup — WELCOME: a cinematic gesture that builds in and fades out. A low
// warm swell rises, a filtered breath of air climbs alongside, then a resolving
// A-major arpeggio (A4→C#5→E5→A5) blooms over it and rings away. ~1.9s, timed
// to the palace doors swinging open. Long soft fades at both ends.
{
  const rnd = mulberry32(66);
  const lp = lowpass();
  const T = 1.9;
  writeWav(
    "startup",
    fade(
      render(T, (t) => {
        const swellEnv = Math.min(1, t / 0.5) * Math.exp(-Math.max(0, t - 0.9) / 0.85);
        const sub =
          (Math.sin(TWO_PI * 110 * t) * 0.6 + Math.sin(TWO_PI * 220 * t) * 0.4) * swellEnv * 0.28;
        const airCut = 300 + 2600 * Math.min(1, t / 1.1);
        const airEnv = Math.min(1, t / 0.4) * Math.exp(-Math.max(0, t - 1.0) / 0.6);
        const air = lp((rnd() - 0.5) * 2, airCut) * airEnv * 0.06;
        const arp =
          bell(t, 0.45, 440.0, 0.01, 0.5) * 0.55 + // A4
          bell(t, 0.68, 554.37, 0.01, 0.5) * 0.5 + // C#5
          bell(t, 0.91, 659.25, 0.01, 0.55) * 0.5 + // E5
          bell(t, 1.16, 880.0, 0.008, 0.72) * 0.6; // A5 (the finish)
        return sub + air + arp;
      }),
      35,
      420
    )
  );
}

// bloom — PROJECT OPEN: an elegant "bloom" with a satisfying finish. A pad
// whose filter opens up (the bloom), a warm sustained fifth (C4+G4), an
// ascending triad C5→E5→G5 that unfurls, and a bright resolved C6 that rings
// out to finish. ~1.15s.
{
  const rnd = mulberry32(88);
  const lp = lowpass();
  writeWav(
    "bloom",
    fade(
      render(1.15, (t) => {
        const openCut = 250 + 2200 * Math.min(1, t / 0.5); // filter blooms open
        const pad = lp((rnd() - 0.5) * 2, openCut) * env(t, 0.08, 0.4) * 0.08;
        const warm =
          (Math.sin(TWO_PI * 261.63 * t) + Math.sin(TWO_PI * 392.0 * t) * 0.7) *
          env(t, 0.06, 0.45) *
          0.12;
        const rise =
          bell(t, 0.0, 523.25, 0.01, 0.32) * 0.45 + // C5
          bell(t, 0.13, 659.25, 0.01, 0.34) * 0.45 + // E5
          bell(t, 0.26, 783.99, 0.01, 0.36) * 0.45; // G5
        const finish = bell(t, 0.5, 1046.5, 0.006, 0.5) * 0.5; // C6, the payoff
        return pad + warm + rise + finish;
      }),
      15,
      260
    )
  );
}

// chime — two-note glassy confirmation (C6→E6) for success actions
// (contact form sent, re-enabling sound).
{
  writeWav(
    "chime",
    fade(
      render(0.55, (t) => bell(t, 0, 1046.5, 0.005, 0.16) * 0.85 + bell(t, 0.11, 1318.5, 0.005, 0.2)),
      5,
      120
    )
  );
}

console.log("Done.");
