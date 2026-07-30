// src/presentation/primitives/channel-rail.tsx
import { SOCIAL_CHANNELS, identity } from "@identity";
import { GLYPHS } from "./glyph-registry";

type ChannelRailProps = {
  /** Per-anchor classes — each rail on the site styles its chips differently. */
  anchorClassName: string;
  /** Explicit glyph size in px; omitted means the icon inherits 1em. */
  glyphSize?: number;
};

/**
 * Renders the outbound-channel anchors as a bare fragment, so each caller keeps
 * ownership of its own wrapper (a stagger item, a card, a footer row). Order,
 * labels, hrefs and the same-tab/new-tab decision all come from the identity
 * module — the three rails on the site can therefore never drift apart.
 */
const ChannelRail = ({ anchorClassName, glyphSize }: ChannelRailProps) => (
  <>
    {SOCIAL_CHANNELS.map(({ channel, label, glyph, external }) => {
      const Glyph = GLYPHS[glyph];
      return (
        <a
          key={channel}
          href={identity.socials[channel]}
          aria-label={label}
          data-cursor="hover"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className={anchorClassName}
        >
          <Glyph {...(glyphSize === undefined ? {} : { size: glyphSize })} />
        </a>
      );
    })}
  </>
);

export default ChannelRail;
