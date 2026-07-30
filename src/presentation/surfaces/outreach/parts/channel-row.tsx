// src/presentation/surfaces/outreach/parts/channel-row.tsx
import type { ReactNode } from "react";

type ChannelRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
};

/** One contact row. Wrapped in an anchor only when there is somewhere to go. */
const ChannelRow = ({ icon, label, value, href }: ChannelRowProps) => {
  const content = (
    <div className="group card card-hover flex items-center gap-4 p-5">
      <span className="icon-tile h-11 w-11 text-lg">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="font-medium text-slate-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          {value}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} data-cursor="hover" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

export default ChannelRow;
