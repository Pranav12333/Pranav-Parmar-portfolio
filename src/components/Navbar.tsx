import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToSection, scrollToTop } from "../lib/scroll";
import { navLinks } from "../data/profile";

const ids = navLinks.map((l) => l.to);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Primary">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          data-cursor="hover"
          className="text-xl font-extrabold brand-text transition-transform duration-300 hover:scale-105"
        >
          Pranav<span className="text-slate-800 dark:text-white">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((item) => (
            <li key={item.to}>
              <a
                href={`#${item.to}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.to);
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

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle color theme"
            data-cursor="hover"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/70 text-blue-500 transition-all duration-300 hover:rotate-12 hover:scale-110 hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-500/20 dark:border-slate-800 dark:bg-slate-900/70"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-700 md:hidden dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95">
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <li key={item.to}>
                <a
                  href={`#${item.to}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.to);
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
      )}
      </nav>
    </header>
  );
};

export default Navbar;
