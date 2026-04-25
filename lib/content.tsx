// Content for Jules's portfolio. Edit freely.
import type {
  EducationItem,
  ExperienceItem,
  Profile,
  Project,
  SkillsByCategory,
} from "./types";

export type {
  CaseSection,
  CoverKind,
  EducationItem,
  ExperienceItem,
  Profile,
  Project,
  SkillsByCategory,
} from "./types";

export const profile: Profile = {
  name: "Julyanne Ackermann",
  displayName: "jules",
  role: "UX Designer + Frontend Developer",
  company: "Stantec Nederland",
  location: "Netherlands",
  tagline: "UX design + frontend development at Stantec Nederland.",
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
  "that makes sense on paper but falls apart in practice.",
  "",
  "That's what pulled me toward UX. I wanted to be on the side that fixes",
  "the experience, not just reports on what's broken.",
  "",
  "Now I design the interface for a platform that turns complex soil data",
  "into risk maps that professionals actually rely on. And it doesn't stop",
  "at design — I also write the frontend, bridging what's designed and",
  "what actually ships.",
  "",
  "I care about the person on the other side of the screen. Always have.",
];

export const experience: ExperienceItem[] = [
  {
    start: "Apr 2023",
    end: "now",
    title: "UX/UI Designer + Frontend Developer",
    company: "Stantec — Netherlands",
    summary: [
      "Designing the UX for a soil risk mapping platform — making layered,",
      "technical geospatial data usable by people making real decisions.",
      "",
      "Hybrid role: I also write frontend code, working alongside engineers",
      "to ship the interfaces I design.",
    ],
  },
  {
    start: "Nov 2019",
    end: "May 2022",
    title: "Business Analyst",
    company: "Manulife — Quezon City",
    summary: [
      "Covered US and Canadian markets — translating between what the",
      "business wanted, what the system could do, and what was feasible.",
      "",
      "A lot of listening, sketching, and figuring out how things should",
      "work. UX thinking — I just didn't have a name for it yet.",
    ],
  },
  {
    start: "Nov 2016",
    end: "Nov 2019",
    title: "Compliance Quality Analyst",
    company: "Manulife",
    summary: [
      "First-line analyst embedded with the business. Built trust to spot",
      "issues early and credibility to escalate when something wasn't right.",
    ],
  },
  {
    start: "Jul 2014",
    end: "Nov 2016",
    title: "New Business Process Associate",
    company: "Manulife",
    summary: [
      "Processing new insurance applications for Singapore clients.",
      "Where I first noticed how much process design affects people.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: "BS Business Administration, Marketing Management",
    school: "EARIST Manila",
  },
];

export const skills: SkillsByCategory = {
  Design:   ["Interaction design", "Visual design", "Prototyping", "Geospatial UX"],
  Frontend: ["HTML / CSS", "JavaScript / TypeScript", "React", "Component libraries"],
  Research: ["Usability testing", "Stakeholder interviews", "Process mapping"],
  Tools:    ["Figma", "Linear", "Notion", "Git"],
  Domain:   ["Business analysis", "Compliance & risk", "Six Sigma (Green Belt)", "Insurance"],
};

export const projects: Project[] = [
  {
    slug: "soilrisk",
    title: "Soil-risk mapping platform",
    tagline: "Turning multi-layer geospatial data into decisions you can act on.",
    role: "Lead UX + Frontend",
    timeline: "2023 — ongoing",
    team: "1 designer (me), 4 engineers, 1 PM, domain experts",
    cover: { kind: "map", caption: "// risk-map.dashboard.png" },
    sections: [
      {
        label: "problem",
        body: [
          "Geotechnical engineers and planners had to cross-reference 6+ data",
          "layers in different tools to understand a single site. Decisions",
          "were slow, and important context got lost in handoffs.",
        ],
      },
      {
        label: "research",
        body: [
          "Shadowed 5 engineers across 12 site assessments. Mapped every",
          "tool-switch and re-keying step. Interviewed 8 stakeholders across",
          "construction, agriculture, and environmental teams.",
        ],
      },
      {
        label: "process",
        body: [
          "Designed a layered map canvas where every dataset is a togglable,",
          "queryable overlay — with a sidebar that explains what you're seeing,",
          "in plain language. Shipped it iteratively, one layer at a time.",
        ],
      },
      {
        label: "outcome",
        body: [
          "First-pass site assessment time down from ~3 days to under 1.",
          "Adopted as the team's primary tool. Ongoing weekly research with",
          "field engineers feeding the next iteration.",
        ],
      },
      {
        label: "metrics",
        kind: "metrics",
        body: [
          ["3d → 1d", "site assessment"],
          ["6 → 1",   "tools per task"],
          ["94%",     "task completion"],
          ["+0.6",    "SUS delta"],
        ],
      },
    ],
  },
  {
    slug: "energy-sim",
    title: "Energy simulation tool",
    tagline:
      "Letting building teams test design choices against energy use, before drawings are final.",
    role: "Solo UX + Frontend",
    timeline: "5 months",
    team: "1 designer (me), 2 engineers, 1 building-physics expert",
    cover: { kind: "energy", caption: "// energy-sim.dashboard.png" },
    sections: [
      {
        label: "problem",
        body: [
          "Architects and building engineers were making early design choices —",
          "orientation, glazing, insulation — without a fast way to see the",
          "energy consequences. Simulations took specialists, hours, and",
          "specialised software. By the time numbers came back, the design",
          "had moved on.",
        ],
      },
      {
        label: "research",
        body: [
          "Sat in on 6 early-design meetings to see where energy questions",
          "actually got raised. Interviewed 4 building-physics specialists",
          "about which inputs they trusted vs. which were rough proxies.",
          "Found the team really needed direction-of-travel answers, fast —",
          "not perfect numbers, slow.",
        ],
      },
      {
        label: "process",
        body: [
          "Designed a tool around three live sliders — orientation, window-",
          "to-wall ratio, insulation tier — that re-run a simplified model",
          "in under a second. Results show as a stacked bar (heating, cooling,",
          "lighting) plus a single annual kWh/m² number, with a benchmark line.",
          "Specialists can hand off a saved scenario to their full pipeline",
          "when they're ready for the real run.",
        ],
      },
      {
        label: "outcome",
        body: [
          "Adopted in early-stage charrettes for 3 active projects. Designers",
          "report making energy trade-offs in the room instead of waiting",
          "days. Specialist time freed up for the runs that actually need it.",
        ],
      },
      {
        label: "metrics",
        kind: "metrics",
        body: [
          ["< 1s",    "model run"],
          ["3 live",  "design knobs"],
          ["3 / 3",   "projects piloting"],
          ["−4 days", "feedback loop"],
        ],
      },
    ],
  },
  {
    slug: "process-library",
    title: "A process-mapping mini design system",
    tagline: "One shared visual language for ops, BAs, and designers.",
    role: "Solo designer",
    timeline: "10 weeks",
    team: "1 designer, async with 12 BAs",
    cover: { kind: "system", caption: "// process-tokens.fig.png" },
    sections: [
      {
        label: "problem",
        body: [
          "Every team mapped processes a different way. Reviewing them was",
          "exhausting. Stakeholders had to relearn notation per document.",
        ],
      },
      {
        label: "process",
        body: [
          "Audited 38 existing process docs. Pulled out the ~20 shapes and",
          "patterns that did 90% of the work. Built a Figma library plus a",
          "one-page rules card. Trained 12 BAs and held office hours weekly.",
        ],
      },
      {
        label: "outcome",
        body: [
          "Adopted across 3 squads. Doc review time roughly halved.",
          "Now the default starting point for new process work.",
        ],
      },
      {
        label: "metrics",
        kind: "metrics",
        body: [
          ["38 → 1", "notations"],
          ["~50%",   "review time"],
          ["3/3",    "squads adopted"],
        ],
      },
    ],
  },
];
