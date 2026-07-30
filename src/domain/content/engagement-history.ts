// src/domain/content/engagement-history.ts
//
// Employment timeline, newest first. `location` comes from the identity module's
// short-locality composer so the city/region is never re-typed, and the tuning
// figure is interpolated from the metrics table.

import type { Experience } from "@domain/contracts/content";
import { shortLocality } from "@identity";
import { MEASUREMENTS } from "./metrics";

const HOME_BASE = shortLocality();

export const experience: readonly Experience[] = [
  {
    company: "Rapidise Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Sep 2023 – Present",
    location: HOME_BASE,
    current: true,
    points: [
      "Lead and mentor junior developers through KT sessions, code reviews, and structured Git/GitHub branching & pull-request workflows to maintain high code quality.",
      "Architected camera & NVR configuration modules with end-to-end hardware-to-web integration, including complex network setups (local/public IP, port forwarding).",
      "Built and optimized robust Node.js and Express.js REST APIs with WebSocket & MQTT for seamless real-time device communication across the camera ecosystem.",
      "Debugged and resolved complex real-time connectivity, data-flow, and production issues — significantly improving system stability.",
      `Optimized API performance for large-scale data handling (${MEASUREMENTS.recordsTunedThousands}k+ records) via query & index tuning.`,
    ],
  },
  {
    company: "iFour Technolab Pvt. Ltd.",
    role: "Angular Developer Intern",
    period: "Jun 2023 – Aug 2023",
    location: HOME_BASE,
    points: [
      "Developed responsive Angular frontend features and integrated REST APIs for real-time data display and dynamic layouts.",
    ],
  },
  {
    company: "Cybercom Creation",
    role: "PHP Developer Intern",
    period: "Mar 2023 – May 2023",
    location: HOME_BASE,
    points: [
      "Assisted in backend development, server-side logic, and database schema management for client-facing web applications.",
    ],
  },
];
