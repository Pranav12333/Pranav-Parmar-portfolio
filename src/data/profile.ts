// src/data/profile.ts
// Single source of truth for all portfolio content.
// Update anything here and it flows through every section.

export const profile = {
  name: "Pranav Parmar",
  fullName: "Pranav H. Parmar",
  title: "Full Stack Developer",
  specialty: "Angular Specialist",
  location: "Ahmedabad, Gujarat, India",
  email: "parmarhn50@gmail.com",
  phone: "+91 98798 65602",
  liveSite: "https://pranav12333.github.io/Pranav-Parmar-portfolio/",
  tagline:
    "I build scalable, real-time web apps and IoT-integrated systems — turning complex hardware, data, and design problems into clean, dependable software.",
  summary:
    "Angular-focused Full Stack Developer with ~3 years of experience building scalable, real-time web applications and IoT-integrated systems. Deep expertise in Angular (14/16), TypeScript, and RxJS, backed by hands-on Node.js/Express REST APIs and real-time device communication over WebSocket & MQTT. I enjoy debugging tough production issues, applying system-design fundamentals, and mentoring developers through structured Git/GitHub workflows.",
  socials: {
    github: "https://github.com/Pranav12333",
    linkedin: "https://www.linkedin.com/in/pranav-parmar-webdeveloper/",
    youtube: "https://www.youtube.com/@pranav_parmar_123",
    email: "mailto:parmarhn50@gmail.com",
  },
};

export const stats = [
  { to: 3, suffix: "+", label: "Years Experience" },
  { to: 5, suffix: "+", label: "Major Projects" },
  { to: 10, suffix: "K+", label: "LinkedIn Followers" },
  { to: 400, suffix: "K+", label: "Records Optimized" },
];

// Rotating role titles for the hero (RotatingText).
export const roles = [
  "Full Stack Developer",
  "Angular Specialist",
  "Real-Time / IoT Engineer",
  "Node.js API Developer",
];

// Core skills with self-assessed proficiency (drives the animated bars).
export const coreSkills = [
  { name: "Angular (14/16)", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "JavaScript (ES6+)", level: 88 },
  { name: "RxJS", level: 82 },
  { name: "Node.js / Express", level: 80 },
  { name: "MongoDB", level: 74 },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend (Core)",
    items: [
      "Angular 14/16",
      "TypeScript",
      "RxJS",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
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
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "JWT / Auth",
    ],
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

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Rapidise Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Sep 2023 – Present",
    location: "Ahmedabad, Gujarat",
    current: true,
    points: [
      "Lead and mentor junior developers through KT sessions, code reviews, and structured Git/GitHub branching & pull-request workflows to maintain high code quality.",
      "Architected camera & NVR configuration modules with end-to-end hardware-to-web integration, including complex network setups (local/public IP, port forwarding).",
      "Built and optimized robust Node.js/Express APIs with WebSocket & MQTT for seamless real-time device communication across the camera ecosystem.",
      "Debugged and resolved complex real-time connectivity, data-flow, and production issues — significantly improving system stability.",
      "Optimized API performance for large-scale data handling (400k+ records) via query & index tuning.",
    ],
  },
  {
    company: "iFour Technolab Pvt. Ltd.",
    role: "Angular Developer Intern",
    period: "Jun 2023 – Aug 2023",
    location: "Ahmedabad, Gujarat",
    points: [
      "Developed responsive Angular frontend features and integrated REST APIs for real-time data display and dynamic layouts.",
    ],
  },
  {
    company: "Cybercom Creation",
    role: "PHP Developer Intern",
    period: "Mar 2023 – May 2023",
    location: "Ahmedabad, Gujarat",
    points: [
      "Assisted in backend development, server-side logic, and database schema management for client-facing web applications.",
    ],
  },
];

export type Project = {
  title: string;
  tech: string[];
  description: string;
  highlight?: string;
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Patola Saree — E-Commerce Web App",
    tech: ["Angular", "Vercel"],
    highlight: "White-label storefront",
    liveUrl:
      "https://patola-website-gatd-git-development-pranavs-projects-266fb244.vercel.app/",
    description:
      "A config-driven, white-label storefront with role-based Admin & Customer panels where brand, logo, theme, and colors are all editable from a single source of truth. Built as a lightweight SPA optimized for large product catalogs using lazy loading and OnPush change detection.",
  },
  {
    title: "Speco VMS Portal",
    tech: ["Angular", "Node.js", "Networking"],
    highlight: "25+ dev team",
    description:
      "Comprehensive camera & NVR configuration modules with hardware device integration (cameras, NVRs, bridges, switches). Handled network-level setups including local/public IP configuration and port forwarding while integrating backend REST APIs.",
  },
  {
    title: "CellGate Access Control System",
    tech: ["Node.js", "WebSocket", "MQTT"],
    highlight: "Real-time IoT",
    description:
      "Highly responsive Node.js APIs bridging communication between firmware, Android, and web platforms. Implemented a robust real-time communication layer and IoT device integration using WebSocket, MQTT, and socket communication as part of a 15+ member team.",
  },
  {
    title: "Ammann Construction Dashboard",
    tech: ["Angular", "ng-apexcharts"],
    highlight: "Role-based analytics",
    description:
      "Complex role-based dynamic panels tailored for Admin, Dealer, Site Manager, and Partner personas, with fully interactive data-visualization and analytics dashboards built using Angular and ng-apexcharts.",
  },
  {
    title: "Internal Task Management System",
    tech: ["Angular", "Node.js"],
    highlight: "Bug & worklog tracking",
    description:
      "An end-to-end internal platform for managing tasks, tracking software bugs, and generating worklogs — improving cross-functional team tracking efficiency and workflow visibility across projects.",
  },
];

export type Education = {
  degree: string;
  school: string;
  period: string;
  detail?: string;
};

export const education: Education[] = [
  {
    degree: "B.E. in Computer Engineering",
    school: "Gujarat Technological University (GTU)",
    period: "2019 – 2023",
    detail: "CPI: 7.48 / 10.0",
  },
  {
    degree: "Higher Secondary (12th Science)",
    school: "GSHSEB, Ahmedabad",
    period: "2018 – 2019",
  },
  {
    degree: "Secondary School (10th)",
    school: "GSEB, Ahmedabad",
    period: "2016 – 2017",
  },
];

export const languages = ["English (Professional)", "Hindi (Native)", "Gujarati (Native)"];

export const navLinks = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "experience", label: "Experience" },
  { to: "projects", label: "Projects" },
  { to: "contact", label: "Contact" },
];
