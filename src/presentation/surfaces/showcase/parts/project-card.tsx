// src/presentation/surfaces/showcase/parts/project-card.tsx
import { FaFolderOpen, FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import type { Project } from "@domain/contracts/content";
import TiltCard from "@presentation/motion/atoms/tilt-card";

const LINK_LABELS = { live: "Live Demo", repo: "Code" } as const;

/** One project. The link row is omitted entirely when there is nothing to link. */
const ProjectCard = ({ project }: { project: Project }) => (
  <article className="h-full">
    <TiltCard className="group card card-hover flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="icon-tile h-12 w-12 text-xl">
          <FaFolderOpen />
        </span>
        {project.highlight && (
          <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400">
            {project.highlight}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {project.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-5 flex gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-all hover:gap-2.5 hover:text-blue-500 dark:text-blue-400"
            >
              <FiExternalLink /> {LINK_LABELS.live}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <FaGithub /> {LINK_LABELS.repo}
            </a>
          )}
        </div>
      )}
    </TiltCard>
  </article>
);

export default ProjectCard;
