// src/presentation/surfaces/outreach/parts/channel-panel.tsx
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { PANEL_HEADINGS } from "@config/runtime/headings";
import { identity } from "@identity";
import Reveal from "@presentation/motion/atoms/reveal";
import ChannelRail from "@presentation/primitives/channel-rail";
import { CHANNEL_COPY } from "../internals/copy";
import ChannelRow from "./channel-row";

/** Chip styling for the contact-card rail — no fill, just a lift. */
const CHIP =
  "grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-lg text-slate-600 transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 hover:border-transparent hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 dark:border-slate-800 dark:text-slate-300";

/** Contact rows plus the social rail, as one column. */
const ChannelPanel = () => (
  <Reveal direction="right" className="flex h-full flex-col gap-4">
    <ChannelRow
      icon={<FiMail />}
      label={CHANNEL_COPY.email}
      value={identity.contact.mail.label}
      href={identity.contact.mail.href}
    />
    <ChannelRow
      icon={<FiPhone />}
      label={CHANNEL_COPY.phone}
      value={identity.contact.voice.label}
      href={identity.contact.voice.href}
    />
    <ChannelRow
      icon={<FiMapPin />}
      label={CHANNEL_COPY.location}
      value={identity.location}
    />

    <div className="card flex-1 p-5">
      <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        {PANEL_HEADINGS.findMeOnline}
      </p>
      <div className="flex flex-wrap gap-3">
        <ChannelRail anchorClassName={CHIP} />
      </div>
    </div>
  </Reveal>
);

export default ChannelPanel;
