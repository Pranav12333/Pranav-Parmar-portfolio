// src/presentation/surfaces/chrome/navigation/parts/mobile-sheet.tsx
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "@domain/content";

const GLYPH = { open: 20, closed: 18 } as const;

/** The hamburger trigger. Kept next to the sheet it controls. */
export const MobileMenuButton = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    aria-label="Toggle menu"
    aria-expanded={open}
    aria-controls="mobile-menu"
    className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-700 md:hidden dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200"
  >
    {open ? <FiX size={GLYPH.open} /> : <FiMenu size={GLYPH.open} />}
  </button>
);

/** The expanded mobile link list. */
export const MobileSheet = ({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) => (
  <div
    id="mobile-menu"
    className="border-t border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95"
  >
    <ul className="flex flex-col gap-1">
      {navLinks.map((item) => (
        <li key={item.to}>
          <a
            href={`#${item.to}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.to);
            }}
            aria-current={active === item.to ? "true" : undefined}
            className={`block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium transition-colors ${
              active === item.to
                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "text-slate-700 hover:bg-blue-500/10 dark:text-slate-200"
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
