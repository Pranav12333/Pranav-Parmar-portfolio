// src/domain/content/capability-matrix.ts
//
// Skills, in two projections: the self-assessed proficiency bars and the
// grouped tech-stack chips. The `category` strings double as the lookup key for
// the glyph table in the capabilities surface, so they must stay in sync with
// `@surfaces/capabilities/internals/category-glyphs`.

import type { CoreSkill, SkillGroup } from "@domain/contracts/content";

/** Drives the animated proficiency bars. */
export const coreSkills: readonly CoreSkill[] = [
  { name: "Angular (14/16)", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "JavaScript (ES6+)", level: 88 },
  { name: "RxJS", level: 82 },
  { name: "Node.js / Express", level: 80 },
  { name: "MongoDB", level: 74 },
];

export const skills: readonly SkillGroup[] = [
  {
    category: "Frontend (Core)",
    items: [
      "Angular 14/16",
      "TypeScript",
      "RxJS",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "React",
      "Next.js",
    ],
  },
  {
    category: "UI & Styling",
    items: [
      "Angular Material",
      "MUI",
      "Bootstrap",
      "Reactive Forms",
      "Responsive Design",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "JWT / Auth"],
  },
  {
    category: "Real-Time & IoT",
    items: [
      "WebSocket",
      "MQTT",
      "Socket.io",
      "Network Config (IP / Port Forwarding)",
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      "Git & GitHub",
      "CI/CD Pipelines",
      "Docker",
      "Postman",
      "VS Code",
      "Agile / Scrum",
    ],
  },
  {
    category: "Angular Depth",
    items: [
      "Component Architecture",
      "OnPush Change Detection",
      "Lazy Loading",
      "State Management",
    ],
  },
];
