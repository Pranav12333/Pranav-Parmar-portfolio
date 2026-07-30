// src/presentation/surfaces/chrome/navigation/parts/theme-switch.tsx
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@platform/reactive";

const GLYPH_SIZE = 18;

/** Light/dark toggle. The class on <html> is the single source of truth. */
const ThemeSwitch = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      data-cursor="hover"
      className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/70 text-blue-500 transition-all duration-300 hover:rotate-12 hover:scale-110 hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-500/20 dark:border-slate-800 dark:bg-slate-900/70"
    >
      {theme === "dark" ? <FiSun size={GLYPH_SIZE} /> : <FiMoon size={GLYPH_SIZE} />}
    </button>
  );
};

export default ThemeSwitch;
