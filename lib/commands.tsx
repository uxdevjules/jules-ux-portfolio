import React from "react";
import {
  bio,
  education,
  experience,
  profile,
  projects,
  skills,
} from "./content";
import { Portrait } from "@/components/Portrait";

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

const Line = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => <div className={className}>{children || " "}</div>;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[var(--accent)] font-semibold mt-1 mb-1">{children}</div>
);

const Dim = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[var(--muted)]">{children}</span>
);

const Block = ({ children }: { children: React.ReactNode }) => (
  <div className="my-1">{children}</div>
);

export const commands: Command[] = [
  {
    name: "help",
    desc: "list available commands",
    aliases: ["?", "h"],
    run: () => (
      <Block>
        <Heading>available commands</Heading>
        {commandList
          .filter((c) => !c.hidden)
          .map((c) => (
            <Line key={c.name}>
              <span className="text-[var(--foreground)]">
                {c.name.padEnd(14, " ")}
              </span>
              <Dim>{c.desc}</Dim>
            </Line>
          ))}
        <Line />
        <Line>
          <Dim>
            tip: ↑/↓ for history · tab to autocomplete · type{" "}
          </Dim>
          <span className="text-[var(--accent)]">projects</span>
          <Dim> then </Dim>
          <span className="text-[var(--accent)]">open &lt;slug&gt;</span>
        </Line>
      </Block>
    ),
  },
  {
    name: "about",
    desc: "who is jules",
    aliases: ["bio", "whoami"],
    run: () => (
      <Block>
        <Heading>about</Heading>
        {bio.map((l, i) => (
          <Line key={i}>{l}</Line>
        ))}
      </Block>
    ),
  },
  {
    name: "experience",
    desc: "work history",
    aliases: ["work", "cv", "resume"],
    run: () => (
      <Block>
        <Heading>experience</Heading>
        {experience.map((e, i) => (
          <div key={i} className="mb-3">
            <Line>
              <span className="text-[var(--accent)]">
                {e.start} – {e.end}
              </span>
              <span>
                {"  "}
                {e.title}
              </span>
              <Dim> @ {e.company}</Dim>
            </Line>
            {e.summary.map((s, j) => (
              <Line key={j}>
                <Dim>  {s}</Dim>
              </Line>
            ))}
          </div>
        ))}
        <div className="mt-3">
          <Heading>education</Heading>
          {education.map((edu, i) => (
            <Line key={i}>
              <span>{edu.degree}</span>
              <Dim> @ {edu.school}</Dim>
            </Line>
          ))}
        </div>
      </Block>
    ),
  },
  {
    name: "skills",
    desc: "research, design, tools",
    run: () => (
      <Block>
        <Heading>skills</Heading>
        {Object.entries(skills).map(([cat, items]) => (
          <Line key={cat}>
            <span className="text-[var(--accent)]">
              {cat.padEnd(10, " ")}
            </span>
            <span>{items.join(" · ")}</span>
          </Line>
        ))}
      </Block>
    ),
  },
  {
    name: "projects",
    desc: "list case studies",
    aliases: ["ls", "work"],
    run: () => (
      <Block>
        <Heading>projects</Heading>
        {projects.map((p) => (
          <div key={p.slug} className="mb-1">
            <Line>
              <span className="text-[var(--accent)]">{p.slug}</span>
              <Dim>{"  —  "}</Dim>
              <span>{p.title}</span>
            </Line>
            <Line>
              <Dim>{"  "}{p.tagline}</Dim>
            </Line>
          </div>
        ))}
        <Line />
        <Line>
          <Dim>open a case study: </Dim>
          <span className="text-[var(--accent)]">open &lt;slug&gt;</span>
        </Line>
      </Block>
    ),
  },
  {
    name: "open",
    desc: "open a case study (open <slug>)",
    aliases: ["cat", "project"],
    run: (args) => {
      const slug = args[0];
      if (!slug) {
        return (
          <Line>
            <Dim>usage: </Dim>
            <span className="text-[var(--accent)]">open &lt;slug&gt;</span>
            <Dim>  (try: </Dim>
            {projects.map((p, i) => (
              <React.Fragment key={p.slug}>
                <span className="text-[var(--accent)]">{p.slug}</span>
                {i < projects.length - 1 && <Dim>, </Dim>}
              </React.Fragment>
            ))}
            <Dim>)</Dim>
          </Line>
        );
      }
      const p = projects.find((x) => x.slug === slug);
      if (!p) {
        return (
          <Line>
            <span className="text-[var(--error)]">
              open: no such project &apos;{slug}&apos;
            </span>
          </Line>
        );
      }
      return (
        <Block>
          <Heading>{p.title}</Heading>
          <Line>
            <Dim>{p.tagline}</Dim>
          </Line>
          <Line />
          <Line>
            <span className="text-[var(--accent)]">role</span>
            <Dim>     {p.role}</Dim>
          </Line>
          <Line>
            <span className="text-[var(--accent)]">timeline</span>
            <Dim> {p.timeline}</Dim>
          </Line>
          <Line>
            <span className="text-[var(--accent)]">team</span>
            <Dim>     {p.team}</Dim>
          </Line>
          <Section label="problem" lines={p.problem} />
          <Section label="research" lines={p.research} />
          <Section label="process" lines={p.process} />
          <Section label="outcome" lines={p.outcome} />
        </Block>
      );
    },
  },
  {
    name: "contact",
    desc: "get in touch",
    run: () => {
      const links = profile.links as Record<string, string | undefined>;
      const labels: Record<string, string> = {
        linkedin: "linkedin",
        dribbble: "dribbble",
        github:   "github  ",
        twitter:  "twitter ",
      };
      const entries = Object.entries(links).filter(([, v]) => !!v);
      return (
        <Block>
          <Heading>contact</Heading>
          {profile.email && (
            <Line>
              <span className="text-[var(--accent)]">email    </span>
              <a
                href={`mailto:${profile.email}`}
                className="underline decoration-[var(--muted-2)] hover:decoration-[var(--accent)]"
              >
                {profile.email}
              </a>
            </Line>
          )}
          {entries.map(([key, url]) => (
            <Line key={key}>
              <span className="text-[var(--accent)]">
                {(labels[key] ?? key).padEnd(9, " ")}
              </span>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--muted-2)] hover:decoration-[var(--accent)]"
              >
                {url!.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </Line>
          ))}
          <Line />
          <Line>
            <Dim>based in {profile.location}. open to roles + collaborations.</Dim>
          </Line>
        </Block>
      );
    },
  },
  {
    name: "date",
    desc: "what day is it",
    hidden: true,
    run: () => (
      <Line>
        <Dim>{new Date().toString()}</Dim>
      </Line>
    ),
  },
  {
    name: "echo",
    desc: "echo arguments",
    hidden: true,
    run: (args) => <Line>{args.join(" ")}</Line>,
  },
  {
    name: "sudo",
    desc: "try it",
    hidden: true,
    run: () => (
      <Line>
        <span className="text-[var(--error)]">
          permission denied: nice try 😉
        </span>
      </Line>
    ),
  },
  {
    name: "clear",
    desc: "clear the screen",
    aliases: ["cls"],
    run: (_args, ctx) => {
      ctx.clear();
      return null;
    },
  },
];

function Section({
  label,
  lines,
}: {
  label: string;
  lines: string[];
}) {
  return (
    <div className="mt-2">
      <div className="text-[var(--accent)]">{label}</div>
      {lines.map((l, i) => (
        <Line key={i}>
          <Dim>  {l}</Dim>
        </Line>
      ))}
    </div>
  );
}

const commandList = commands;

export function resolveCommand(name: string): Command | undefined {
  const n = name.toLowerCase();
  return commands.find(
    (c) => c.name === n || (c.aliases && c.aliases.includes(n)),
  );
}

export function runCommand(
  name: string,
  args: string[],
  ctx: CommandContext,
): React.ReactNode {
  if (!name) return null;
  const cmd = resolveCommand(name);
  if (!cmd) {
    return (
      <Line>
        <span className="text-[var(--error)]">command not found: {name}</span>
        <Dim> — type </Dim>
        <span className="text-[var(--accent)]">help</span>
      </Line>
    );
  }
  return cmd.run(args, ctx);
}

export function autocomplete(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/\s+/);
  // autocomplete "open <slug>"
  if (parts[0] === "open" && parts.length === 2) {
    const partial = parts[1];
    const match = projects.find((p) => p.slug.startsWith(partial));
    if (match) return `open ${match.slug}`;
    return null;
  }
  // autocomplete command name
  if (parts.length === 1) {
    const match = commands.find(
      (c) => !c.hidden && c.name.startsWith(trimmed.toLowerCase()),
    );
    if (match) return match.name;
  }
  return null;
}

export const commandNames = commands.filter((c) => !c.hidden).map((c) => c.name);

export function bootLines(): React.ReactNode[] {
  return [
    <Line key="b1">
      <Dim>claude-portfolio v1.0.0 · mac · tty</Dim>
    </Line>,
    <Line key="b2">
      <Dim>session started </Dim>
      <span>{new Date().toISOString().split("T")[0]}</span>
    </Line>,
    <Line key="b3" />,
    <Portrait key="portrait" />,
    <Line key="b4">
      <span>welcome — i&apos;m </span>
      <span className="text-[var(--accent)]">jules</span>
      <span>, a ux designer + frontend dev.</span>
    </Line>,
    <Line key="b5">
      <Dim>type </Dim>
      <span className="text-[var(--accent)]">help</span>
      <Dim> to see what&apos;s here, or </Dim>
      <span className="text-[var(--accent)]">about</span>
      <Dim> to meet me.</Dim>
    </Line>,
    <Line key="b6" />,
  ];
}
