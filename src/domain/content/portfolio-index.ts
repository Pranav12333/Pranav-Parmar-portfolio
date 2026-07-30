// src/domain/content/portfolio-index.ts
//
// Featured work. Team sizes are interpolated from the metrics table so the
// highlight chip and the prose can never disagree. Entries without a liveUrl /
// repoUrl simply render no link row — the surface handles both shapes.

import type { Project } from "@domain/contracts/content";
import { MEASUREMENTS } from "./metrics";

export const projects: readonly Project[] = [
  {
    title: "Patola Saree — E-Commerce Web App",
    tech: ["Angular", "TypeScript", "Vercel"],
    highlight: "White-label storefront",
    liveUrl:
      "https://patola-website-gatd-git-development-pranavs-projects-266fb244.vercel.app/",
    description:
      "An Angular + TypeScript e-commerce storefront built as a config-driven, white-label platform — brand, logo, theme, and colors are all editable from a single source of truth, with role-based Admin and Customer panels. Optimized for large product catalogs as a lightweight SPA using lazy loading and OnPush change detection for fast, responsive browsing.",
  },
  {
    title: "Speco VMS Portal",
    tech: ["Angular", "Node.js", "Networking"],
    highlight: `${MEASUREMENTS.vmsTeamSize}+ dev team`,
    description: `A large-scale video management system (VMS) built with Angular and Node.js and delivered with a ${MEASUREMENTS.vmsTeamSize}+ developer team. Developed camera & NVR configuration modules with end-to-end hardware integration (cameras, NVRs, bridges, switches) plus network-level setup — local/public IP configuration and port forwarding — wired to backend REST APIs.`,
  },
  {
    title: "CellGate Access Control System",
    tech: ["Node.js", "WebSocket", "MQTT"],
    highlight: "Real-time IoT",
    description: `A real-time IoT access-control platform where highly responsive Node.js APIs bridge firmware, Android, and web clients. Built the real-time communication layer and IoT device integration using WebSocket, MQTT, and socket messaging, delivered within a ${MEASUREMENTS.accessControlTeamSize}+ member team.`,
  },
  {
    title: "Ammann Construction Dashboard",
    tech: ["Angular", "TypeScript", "ng-apexcharts"],
    highlight: "Role-based analytics",
    description:
      "An analytics platform with role-based dynamic panels tailored to Admin, Dealer, Site Manager, and Partner personas. Built with Angular, TypeScript, and ng-apexcharts to deliver fully interactive data-visualization and reporting dashboards for construction-equipment operations.",
  },
  {
    title: "Internal Task Management System",
    tech: ["Angular", "Node.js"],
    highlight: "Bug & worklog tracking",
    description:
      "An end-to-end internal platform built with Angular and Node.js for managing tasks, tracking software bugs, and generating worklogs — improving cross-functional tracking efficiency and workflow visibility across projects.",
  },
];
