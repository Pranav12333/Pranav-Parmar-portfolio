// src/presentation/surfaces/profile/parts/portrait-panel.tsx
import portraitUrl from "@assets/media/raster/portrait/profile.png";
import { identity } from "@identity";
import Reveal from "@presentation/motion/atoms/reveal";
import TiltCard from "@presentation/motion/atoms/tilt-card";

/** Intrinsic size — set explicitly so the image reserves its box (no CLS). */
const PORTRAIT_BOX = 500;

/**
 * The portrait, tilting toward the pointer inside a soft gradient halo. The alt
 * text is assembled from the identity registry: it is the image's only
 * description for search and for screen readers, so it states the role and the
 * location rather than repeating the file name.
 */
const PortraitPanel = () => (
  <Reveal direction="right">
    <TiltCard className="group relative mx-auto max-w-sm">
      <div className="absolute -inset-3 rounded-3xl brand-gradient opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-45" />
      <img
        src={portraitUrl}
        alt={`${identity.name} — ${identity.title} & ${identity.specialty} based in ${identity.location}`}
        width={PORTRAIT_BOX}
        height={PORTRAIT_BOX}
        loading="lazy"
        decoding="async"
        className="relative aspect-square w-full rounded-3xl border border-slate-200 object-cover shadow-xl transition-all duration-500 group-hover:border-blue-400/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20 dark:border-slate-800"
      />
    </TiltCard>
  </Reveal>
);

export default PortraitPanel;
