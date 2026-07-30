// src/presentation/surfaces/chrome/navigation/index.tsx
import { useEffect, useState } from "react";
import { TIMING } from "@kernel";
import { observedSectionIds } from "@domain/content";
import { useActiveSection } from "@platform/reactive";
import { scrollToSection } from "@platform/scroll/navigator";
import BrandMark from "@presentation/primitives/brand-mark";
import { MobileMenuButton, MobileSheet } from "./parts/mobile-sheet";
import PrimaryLinks from "./parts/primary-links";
import ThemeSwitch from "./parts/theme-switch";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(observedSectionIds);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > TIMING.navbarConcealThreshold);
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
          <BrandMark className="text-xl font-extrabold brand-text transition-transform duration-300 hover:scale-105" />

          <PrimaryLinks active={active} onNavigate={go} />

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSwitch />
            <MobileMenuButton open={open} onToggle={() => setOpen((v) => !v)} />
          </div>
        </div>

        {open && <MobileSheet active={active} onNavigate={go} />}
      </nav>
    </header>
  );
};

export default Navigation;
