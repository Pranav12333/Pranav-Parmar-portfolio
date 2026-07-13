import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { profile, navLinks } from "../data/profile";
import { scrollToSection, scrollToTop } from "../lib/scroll";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 px-4 py-10 sm:px-6 lg:px-8 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <button
          onClick={scrollToTop}
          data-cursor="hover"
          className="text-2xl font-extrabold brand-text"
        >
          Pranav<span className="text-slate-800 dark:text-white">.</span>
        </button>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navLinks.map((item) => (
            <li key={item.to}>
              <button
                onClick={() => scrollToSection(item.to)}
                className="link-underline text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor="hover" className="text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:scale-125 hover:text-blue-500">
            <FaGithub size={20} />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor="hover" className="text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:scale-125 hover:text-blue-500">
            <FaLinkedin size={20} />
          </a>
          <a href={profile.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" data-cursor="hover" className="text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:scale-125 hover:text-blue-500">
            <FaYoutube size={20} />
          </a>
          <a href={profile.socials.email} aria-label="Email" data-cursor="hover" className="text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:scale-125 hover:text-blue-500">
            <FaEnvelope size={20} />
          </a>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} {profile.fullName} — {profile.title} ·{" "}
          {profile.location}
        </p>
        <p className="-mt-4 text-xs text-slate-400 dark:text-slate-600">
          Built with React, TypeScript, Three.js & Tailwind.
        </p>

        <button
          onClick={scrollToTop}
          data-cursor="hover"
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/60 hover:text-blue-500 hover:shadow-md hover:shadow-blue-500/15 dark:border-slate-800 dark:text-slate-300"
        >
          <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" /> Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
