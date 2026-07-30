// src/domain/contracts/content.ts
//
// Shape definitions for every content collection. Kept apart from the data so
// the resolver in `@domain/content` and the read-only projections used by the
// presentation surfaces agree on one vocabulary.

export type SkillGroup = {
  category: string;
  items: string[];
};

export type CoreSkill = {
  name: string;
  level: number;
};

export type Metric = {
  to: number;
  suffix: string;
  label: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
};

export type Project = {
  title: string;
  tech: string[];
  description: string;
  highlight?: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  detail?: string;
};

export type NavigationEntry = {
  to: string;
  label: string;
};
