import { FaGraduationCap } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import profile_img from "../assets/profile.jpg";
import { profile, education, languages } from "../data/profile";
import Reveal from "./effects/Reveal";
import TiltCard from "./effects/TiltCard";
import { StaggerGroup, StaggerItem } from "./effects/StaggerGroup";

const highlights = [
  "3+ years building real-time, IoT-integrated web apps",
  "Angular (14/16) • TypeScript • RxJS specialist",
  "Node.js / Express REST APIs with WebSocket & MQTT",
  "Optimized APIs handling 400k+ records",
  "Leads & mentors developers via structured Git workflows",
];

const About = () => {
  return (
    <section
      id="about"
      className="relative px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader eyebrow="Get to know me" title="About Me" />
        </Reveal>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Image + languages */}
          <div className="space-y-6 [perspective:1000px]">
            <Reveal direction="right">
              <TiltCard className="group relative mx-auto max-w-sm">
                <div className="absolute -inset-3 rounded-3xl brand-gradient opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-45" />
                <img
                  src={profile_img}
                  alt={profile.name}
                  loading="lazy"
                  decoding="async"
                  className="relative aspect-square w-full rounded-3xl border border-slate-200 object-cover shadow-xl transition-all duration-500 group-hover:border-blue-400/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20 dark:border-slate-800"
                />
              </TiltCard>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card p-5">
                <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                  Languages
                </h4>
                <StaggerGroup className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <StaggerItem key={lang}>
                      <span className="chip">{lang}</span>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </Reveal>
          </div>

          {/* Bio + highlights + education */}
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {profile.summary}
              </p>
            </Reveal>

            <StaggerGroup className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <StaggerItem key={h}>
                  <div className="group flex items-start gap-3 text-sm text-slate-700 transition-transform duration-300 hover:translate-x-1 dark:text-slate-300">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-blue-500 transition-transform duration-300 group-hover:scale-125" />
                    <span>{h}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* Education */}
            <div className="mt-10">
              <Reveal>
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <FaGraduationCap className="text-blue-500" /> Education
                </h3>
              </Reveal>
              <StaggerGroup className="mt-4 space-y-3" stagger={0.1}>
                {education.map((ed) => (
                  <StaggerItem key={ed.degree}>
                    <div className="card card-hover flex flex-wrap items-center justify-between gap-2 p-4">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {ed.degree}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {ed.school}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {ed.period}
                        </p>
                        {ed.detail && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {ed.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionHeader = ({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
}) => (
  <div className={center ? "text-center" : ""}>
    <p className="text-sm font-semibold uppercase tracking-widest brand-text">
      {eyebrow}
    </p>
    <h2 className="section-title mt-2">{title}</h2>
    <div
      className={`mt-4 h-1 w-16 rounded-full brand-gradient ${
        center ? "mx-auto" : ""
      }`}
    />
  </div>
);

export default About;
