// src/domain/content/narrative.ts
//
// Long-form prose. The name, title and specialisation are interpolated from
// `@identity` rather than typed out, so the bio can never fall out of sync with
// the branding registry — and white-labelling the site means the prose follows
// automatically instead of needing a find-and-replace.

import { alternateRole, identity } from "@identity";
import { MEASUREMENTS } from "./metrics";

/** Hero sub-headline. */
export const tagline =
  "I build scalable, real-time web apps and IoT-integrated systems with Angular, React, Next.js, and the MEAN stack — turning complex hardware, data, and design problems into clean, dependable software.";

/** About-section bio. Assembled from three sentences to keep the lines short. */
export const summary = [
  `${identity.name} is a ${identity.title} and ${alternateRole()} with ${MEASUREMENTS.yearsExperience}+ years of experience building scalable, real-time web applications and IoT-integrated systems.`,
  "He brings deep expertise in Angular (14/16), React, Next.js, TypeScript, JavaScript, and RxJS on the frontend, backed by hands-on Node.js and Express.js REST APIs with MongoDB — the full MEAN stack — plus real-time device communication over WebSocket & MQTT.",
  `${identity.wordmark.lead} enjoys debugging tough production issues, applying system-design fundamentals, and mentoring developers through structured Git/GitHub workflows.`,
].join(" ");

/** The checklist beside the bio. */
export const highlights: readonly string[] = [
  `${MEASUREMENTS.yearsExperience}+ years building scalable, real-time & IoT web apps`,
  "Frontend: Angular, React, Next.js, TypeScript & RxJS",
  "Backend: Node.js, Express.js & MongoDB (MEAN stack)",
  "Real-time device comms over WebSocket & MQTT",
  `Optimized APIs for ${MEASUREMENTS.recordsTunedThousands}k+ records; mentors dev teams`,
];

/** Availability line in the hero badge, appended after the greeting. */
export const availability = "open to new opportunities";

/** Invitation copy above the contact form. */
export const outreachInvitation =
  "Got a project idea, a role in mind, or just want to connect? Drop me a message — I'm always open to interesting conversations.";

/** Footer credit line listing the stack this site is built on. */
export const stackCredit = "Built with React, TypeScript, Three.js & Tailwind.";
