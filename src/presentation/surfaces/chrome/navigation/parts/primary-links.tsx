// src/presentation/surfaces/chrome/navigation/parts/primary-links.tsx
import { navLinks } from "@domain/content";

type PrimaryLinksProps = {
  active: string;
  onNavigate: (id: string) => void;
};

/** Desktop link row with the animated active-state rule. */
const PrimaryLinks = ({ active, onNavigate }: PrimaryLinksProps) => (
  <ul className="hidden items-center gap-7 md:flex">
    {navLinks.map((item) => (
      <li key={item.to}>
        <a
          href={`#${item.to}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.to);
          }}
          aria-current={active === item.to ? "true" : undefined}
          data-cursor="hover"
          className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-blue-500 after:transition-all after:duration-300 ${
            active === item.to
              ? "text-blue-600 after:w-full dark:text-blue-400"
              : "text-slate-600 after:w-0 hover:text-blue-600 hover:after:w-full dark:text-slate-300 dark:hover:text-blue-400"
          }`}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
);

export default PrimaryLinks;
