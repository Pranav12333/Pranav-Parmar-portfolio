import type { ReactNode } from "react";
import { m } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaYoutube, FaInstagram, FaStackOverflow } from "react-icons/fa";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { profile, stats, roles } from "../data/profile";
import { useGreeting } from "../hooks/useGreeting";
import { scrollToSection } from "../lib/scroll";
import { staggerContainer, staggerItem } from "../lib/motion";
import RotatingText from "./effects/RotatingText";
import CountUp from "./effects/CountUp";
import Magnetic from "./effects/Magnetic";

const Home = () => {
  const greeting = useGreeting();

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8"
    >
      {/* Soft glow behind the headline for depth + legibility over the snow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <m.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
        >
          <m.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur-sm dark:text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {greeting} · open to new opportunities
            </span>
          </m.div>

          <m.h1
            id="home-heading"
            variants={staggerItem}
            className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-6xl lg:text-7xl"
          >
            <span className="text-slate-900 dark:text-white">Hi, I'm </span>
            <span className="brand-text-animated">{profile.name}</span>
            {/* Screen-reader/crawler text: the role rotates via JS below, so
                keep the primary keywords statically inside the h1 */}
            <span className="sr-only">
              {" "}— {profile.title} & {profile.specialty} in {profile.location}
            </span>
          </m.h1>

          <m.div
            variants={staggerItem}
            className="mt-4 flex h-9 items-center justify-center gap-2 text-lg font-semibold text-slate-600 sm:text-2xl dark:text-slate-300"
          >
            <span className="font-mono text-blue-500">&lt;/&gt;</span>
            <RotatingText items={roles} />
          </m.div>

          <m.p
            variants={staggerItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
          >
            {profile.tagline}
          </m.p>

          <m.div
            variants={staggerItem}
            className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400"
          >
            <FiMapPin className="text-blue-500" /> {profile.location}
          </m.div>

          {/* CTAs */}
          <m.div
            variants={staggerItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
                data-cursor="hover"
                className="group btn-sheen inline-flex items-center justify-center gap-2 rounded-full brand-gradient px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.04] hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 sm:text-base"
              >
                View My Work
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                data-cursor="hover"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/50 bg-white/50 px-7 py-3 text-sm font-semibold text-blue-600 backdrop-blur-sm transition-all hover:scale-[1.04] hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 sm:text-base dark:bg-slate-900/40 dark:text-blue-400"
              >
                Get in Touch
              </a>
            </Magnetic>
          </m.div>

          {/* Socials */}
          <m.div
            variants={staggerItem}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <SocialIcon href={profile.socials.github} label="GitHub">
              <FaGithub />
            </SocialIcon>
            <SocialIcon href={profile.socials.linkedin} label="LinkedIn">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href={profile.socials.youtube} label="YouTube">
              <FaYoutube />
            </SocialIcon>
            <SocialIcon href={profile.socials.instagram} label="Instagram">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href={profile.socials.stackoverflow} label="Stack Overflow">
              <FaStackOverflow />
            </SocialIcon>
            <SocialIcon href={profile.socials.email} label="Email" external={false}>
              <FaEnvelope />
            </SocialIcon>
          </m.div>
        </m.div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group card card-hover px-3 py-4 text-center backdrop-blur-sm"
            >
              <div className="text-2xl font-extrabold brand-text transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type SocialIconProps = {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
};

const SocialIcon = ({ href, label, children, external = true }: SocialIconProps) => (
  <a
    href={href}
    aria-label={label}
    data-cursor="hover"
    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/70 text-lg text-slate-600 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 hover:border-transparent hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
  >
    {children}
  </a>
);

export default Home;
