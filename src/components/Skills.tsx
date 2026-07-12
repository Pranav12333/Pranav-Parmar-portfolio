import type { IconType } from "react-icons";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaServer,
  FaBroadcastTower,
  FaTools,
  FaAngular,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { skills, coreSkills } from "../data/profile";
import { EASE } from "../lib/motion";
import { SectionHeader } from "./About";
import Reveal from "./effects/Reveal";
import { StaggerGroup, StaggerItem } from "./effects/StaggerGroup";

const icons: Record<string, IconType> = {
  "Frontend (Core)": FaLaptopCode,
  "UI & Styling": FaPaintBrush,
  Backend: FaServer,
  "Real-Time & IoT": FaBroadcastTower,
  "DevOps & Tools": FaTools,
  "Angular Depth": FaAngular,
};

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div>
    <div className="mb-1.5 flex justify-between text-sm">
      <span className="font-medium text-slate-700 dark:text-slate-200">{name}</span>
      <span className="font-semibold text-blue-600 dark:text-blue-400">{level}%</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <motion.div
        className="relative h-full overflow-hidden rounded-full brand-gradient"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      </motion.div>
    </div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader eyebrow="What I work with" title="Skills & Tech" center />
        </Reveal>

        {/* Core proficiency */}
        <Reveal delay={0.05}>
          <div className="card mx-auto mt-12 max-w-3xl p-6 sm:p-8">
            <h3 className="mb-6 text-center text-lg font-bold text-slate-900 dark:text-white">
              Core Proficiency
            </h3>
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {coreSkills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Tech stack categories */}
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const Icon = icons[group.category] ?? FaLaptopCode;
            return (
              <StaggerItem key={group.category}>
                <div className="group card card-hover h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="icon-tile h-11 w-11 text-xl">
                      <Icon />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {group.category}
                    </h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
};

export default Skills;
