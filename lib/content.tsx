// Content for Jules's portfolio. Edit freely.

export const profile = {
  name: "Julyanne Ackermann",
  displayName: "Jules",
  role: "UX Designer + Frontend Developer",
  company: "Stantec Nederland",
  location: "Netherlands",
  tagline: "UX design + frontend development at Stantec Nederland.",
  // Leave empty to hide email line in `contact` output.
  email: "",
  links: {
    linkedin: "https://www.linkedin.com/in/julescorreoackermann/",
    github: "https://github.com/uxdevjules",
  },
};

export const bio = [
  "I'm Jules — a UX designer and frontend developer based in the Netherlands.",
  "",
  "My career didn't start in design, and honestly, that's my advantage.",
  "",
  "I spent 8 years at Manulife working through operations, compliance,",
  "and business analysis. I learned how real systems work: the messy",
  "handoffs, the edge cases nobody documents, the frustration of a process",
  "that makes sense on paper but falls apart in practice. I saw firsthand",
  "how much a poorly designed workflow can cost people — in time, in errors,",
  "in trust.",
  "",
  "That's what pulled me toward UX. I wanted to be on the side that fixes",
  "the experience, not just reports on what's broken.",
  "",
  "Now I design the interface for a platform that turns complex soil data",
  "into risk maps that professionals actually rely on. And it doesn't stop",
  "at design — I also write the frontend, bridging what's designed and",
  "what actually ships. That hybrid role — part designer, part builder —",
  "is where I feel most in my element.",
  "",
  "I care about the person on the other side of the screen. Always have.",
];

export type ExperienceItem = {
  start: string;
  end: string;
  title: string;
  company: string;
  summary: string[];
};

export const experience: ExperienceItem[] = [
  {
    start: "Apr 2023",
    end: "now",
    title: "UX/UI Designer",
    company: "Stantec — Netherlands",
    summary: [
      "Designing the UX for a soil risk mapping platform — making layered,",
      "technical geospatial data usable by people making real decisions",
      "about construction risk, agricultural planning, and environmental",
      "impact.",
      "",
      "Hybrid role: I also write frontend code, working alongside engineers",
      "to ship the interfaces I design. Sitting between design and",
      "development means catching problems earlier and staying close to",
      "the real constraints of what we're building.",
    ],
  },
  {
    start: "Nov 2019",
    end: "May 2022",
    title: "Business Analyst",
    company: "Manulife — Diliman, Quezon City",
    summary: [
      "Covered US and Canadian markets — the person in the room translating",
      "between what the business wanted, what the system could do, and",
      "what was actually feasible.",
      "",
      "A lot of listening, sketching how things currently worked, and",
      "figuring out how they should work. Basically UX thinking — I just",
      "didn't have a name for it yet.",
    ],
  },
  {
    start: "Nov 2016",
    end: "Nov 2019",
    title: "Compliance Quality Analyst",
    company: "Manulife",
    summary: [
      "First-line-of-defence analyst embedded with the business. Built",
      "enough trust with the team to spot issues early, and enough",
      "credibility with management to escalate when something wasn't right.",
      "",
      "Made me detail-obsessed in the best way: reading between the lines",
      "of a process, asking uncomfortable questions, and documenting things",
      "clearly enough for anyone to pick them up.",
    ],
  },
  {
    start: "Jul 2014",
    end: "Nov 2016",
    title: "New Business Process Associate",
    company: "Manulife",
    summary: [
      "Processing new insurance applications for Singapore clients —",
      "making sure every detail was right before a policy went live.",
      "",
      "Foundational learning: accuracy at scale, tight turnarounds, and",
      "the full lifecycle of a client's journey. Where I first noticed",
      "how much process design affects the people doing the work.",
    ],
  },
];

export type EducationItem = {
  degree: string;
  school: string;
};

export const education: EducationItem[] = [
  {
    degree: "BS Business Administration, Marketing Management",
    school: "EARIST Manila",
  },
];

export const skills = {
  Design: [
    "Interaction design",
    "Visual design",
    "Prototyping",
    "Geospatial UX",
  ],
  Frontend: [
    "HTML / CSS",
    "JavaScript / TypeScript",
    "React",
    "Component libraries",
  ],
  Research: [
    "Usability testing",
    "Stakeholder interviews",
    "Process mapping",
    "Documentation",
  ],
  Tools: ["Figma", "Linear", "Notion", "Git"],
  Background: [
    "Business analysis",
    "Compliance & risk",
    "Six Sigma (Green Belt)",
    "Process improvement",
    "Insurance domain",
  ],
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  timeline: string;
  team: string;
  problem: string[];
  research: string[];
  process: string[];
  outcome: string[];
};

export const projects: Project[] = [];

// Sample projects hidden for now — restore by moving entries back into the
// array above when real case studies are ready.
/*
const _sampleProjects: Project[] = [
  {
    slug: "fintech-onboarding",
    title: "Redesigning onboarding for a mobile banking app",
    tagline: "Cut drop-off in account creation by 31%.",
    role: "Lead designer",
    timeline: "4 months",
    team: "1 designer, 1 researcher, 3 engineers, 1 PM",
    problem: [
      "New users were dropping off mid-sign-up. Analytics showed a 62%",
      "abandonment rate between KYC upload and the first tap inside",
      "the app. Support tickets mentioned 'confusing', 'too many steps',",
      "and 'didn't know what was needed'.",
    ],
    research: [
      "12 remote usability sessions on the existing flow.",
      "Diary study with 8 users across their first 7 days.",
      "Stakeholder interviews with compliance, product, and support.",
      "Insight: users didn't know why they were being asked for each",
      "piece of info. Trust, not UX, was the blocker.",
    ],
    process: [
      "Mapped the existing 14-screen flow and tagged each screen with",
      "the job the user was doing vs. the job the business was doing.",
      "Prototyped a 'just-in-time' flow — we ask for info only when",
      "the user tries to do something that needs it.",
      "Ran A/B on two variants with 2,400 real users over 3 weeks.",
    ],
    outcome: [
      "Account-creation drop-off fell from 62% to 31%.",
      "Average time-to-first-transaction dropped from 11 min to 4 min.",
      "Support tickets tagged 'onboarding' dropped 48% quarter-over-quarter.",
    ],
  },
  {
    slug: "saas-design-system",
    title: "Building the design system for a B2B analytics product",
    tagline: "One language across 3 products, 14 designers, 60+ engineers.",
    role: "Systems lead",
    timeline: "9 months, then ongoing",
    team: "2 designers, 2 engineers",
    problem: [
      "Three products, three visual languages, three ways to render the",
      "same bar chart. Designers spent ~30% of their time re-inventing",
      "primitives. Engineers had four button components.",
    ],
    research: [
      "Audited every screen across the three products — 411 screens",
      "in total.",
      "Surveyed designers and engineers on the 10 most painful components.",
      "Benchmarked against shadcn/ui, Radix, and Polaris.",
    ],
    process: [
      "Defined tokens first (color, spacing, type, motion, elevation).",
      "Built a 'core 30' component set in Figma and React in parallel.",
      "Wrote usage guidelines with real product examples, not isolated demos.",
      "Adopted incrementally — one surface at a time, never a big-bang port.",
    ],
    outcome: [
      "Design-to-code parity measured weekly, now above 94%.",
      "New feature design time down ~40% per internal tracking.",
      "System is now the default stack for new product work.",
    ],
  },
  {
    slug: "ecommerce-checkout",
    title: "A checkout audit that cut cart abandonment by 22%",
    tagline: "Small changes, measurable impact.",
    role: "Solo designer + researcher",
    timeline: "6 weeks",
    team: "1 designer, 2 engineers",
    problem: [
      "Mid-size DTC brand was losing customers at checkout. Abandonment",
      "rate was 74% — above the industry median of 69%.",
    ],
    research: [
      "Session replays on 200 abandoned carts.",
      "5-second tests on the payment screen.",
      "Heuristic audit against Baymard's 2024 checkout benchmarks.",
    ],
    process: [
      "Identified 11 friction points, ranked by estimated impact × effort.",
      "Shipped 7 of them in 4 weekly releases.",
      "Notable fixes: inline field validation, consolidated shipping step,",
      "express-pay above the fold, clearer error copy.",
    ],
    outcome: [
      "Abandonment down to 52%.",
      "Mobile conversion up 18% WoW after the first release.",
      "No change to traffic or acquisition spend.",
    ],
  },
  {
    slug: "research-study",
    title: "Diary study: how small teams actually use shared docs",
    tagline: "Foundational research that shaped a year of roadmap.",
    role: "Lead researcher",
    timeline: "8 weeks",
    team: "1 researcher, 1 designer, 1 PM",
    problem: [
      "Our assumption: 'teams collaborate in real time'. Our analytics",
      "said otherwise — 82% of edits happened with a single active user.",
      "We needed to understand what collaboration actually looked like.",
    ],
    research: [
      "14-day diary study with 12 teams (4–15 people each).",
      "Structured daily prompts + weekly 30-min synthesis calls.",
      "Observation sessions in 5 of the 12 teams.",
    ],
    process: [
      "Coded 840 diary entries into 6 collaboration 'modes'.",
      "Mapped each mode to a job-to-be-done and a moment in the workweek.",
      "Wrote a 'how teams actually work' brief that became input to the",
      "2025 roadmap.",
    ],
    outcome: [
      "Reframed roadmap around async collaboration as the default, not",
      "the edge case.",
      "Two features — 'working copy' and 'review mode' — shipped from",
      "this research and drove +12% WAU in the segments we studied.",
    ],
  },
];
*/
