// Shared types for content + commands.

export type Profile = {
  name: string;
  displayName: string;
  role: string;
  company: string;
  location: string;
  tagline: string;
  email: string;
  links: Record<string, string | undefined>;
};

export type ExperienceItem = {
  start: string;
  end: string;
  title: string;
  company: string;
  summary: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
};

export type SkillsByCategory = Record<string, string[]>;

export type CoverKind = "map" | "diagram" | "system" | "energy";

export type CaseSection =
  | { label: string; body: string[]; kind?: undefined }
  | { label: string; kind: "metrics"; body: [string, string][] };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  timeline: string;
  team: string;
  cover: { kind: CoverKind; caption: string; src?: string };
  sections: CaseSection[];
};

// Mode toggle for the shell — terminal vs. normal page view.
export type Mode = "terminal" | "normal";

// A rendered terminal log entry.
export type TerminalLine = { id: number; node: React.ReactNode };

// Command system.
export type CommandContext = {
  clear: () => void;
  run: (raw: string) => void;
};

export type Command = {
  name: string;
  desc: string;
  aliases?: string[];
  hidden?: boolean;
  run: (args: string[], ctx: CommandContext) => React.ReactNode;
};
