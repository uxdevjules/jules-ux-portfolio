import React from "react";
import {
  bio,
  education,
  experience,
  profile,
  projects,
  skills,
} from "./content";
import type { Command, CommandContext } from "./types";
import { Portrait } from "@/components/Portrait";
import { CaseStudy } from "@/components/CaseStudy";

export type { Command, CommandContext } from "./types";

// ============================================================
// Primitives
// ============================================================

const Line = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => <div className={`t-line ${className}`}>{children ?? " "}</div>;

const Dim = ({ children }: { children: React.ReactNode }) => (
  <span className="t-dim">{children}</span>
);
const Acc = ({ children }: { children: React.ReactNode }) => (
  <span className="t-acc">{children}</span>
);
const Hdr = ({ children }: { children: React.ReactNode }) => (
  <div className="t-hdr">{children}</div>
);

const Block = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`t-block ${className}`}>{children}</div>;

// ============================================================
// Commands
// ============================================================

const cmdHelp = (): React.ReactNode => (
  <Block>
    <Hdr>available commands</Hdr>
    {commands
      .filter((c) => !c.hidden)
      .map((c) => (
        <Line key={c.name}>
          <span className="t-fg">{c.name.padEnd(14, " ")}</span>
          <Dim>{c.desc}</Dim>
        </Line>
      ))}
    <Line />
    <Line>
      <Dim>tip: ↑/↓ for history · tab autocompletes · type </Dim>
      <Acc>projects</Acc>
      <Dim> then </Dim>
      <Acc>open &lt;slug&gt;</Acc>
    </Line>
  </Block>
);

const cmdAbout = (): React.ReactNode => (
  <Block>
    <Hdr>about</Hdr>
    <div className="t-about-grid">
      <div className="t-about-portrait">
        <Portrait />
      </div>
      <div className="t-about-text">
        {bio.map((l, i) => (
          <Line key={i}>{l || " "}</Line>
        ))}
      </div>
    </div>
  </Block>
);

const cmdExperience = (): React.ReactNode => (
  <Block>
    <Hdr>experience</Hdr>
    {experience.map((e, i) => (
      <div key={i} className="t-exp-item">
        <Line>
          <Acc>
            {e.start} – {e.end}
          </Acc>
          <span>
            {"  "}
            {e.title}
          </span>
          <Dim> @ {e.company}</Dim>
        </Line>
        {e.summary.map((s, j) => (
          <Line key={j}>
            <Dim>{`  ${s}`}</Dim>
          </Line>
        ))}
      </div>
    ))}
    <div className="t-edu">
      <Hdr>education</Hdr>
      {education.map((edu, i) => (
        <Line key={i}>
          <span>{edu.degree}</span>
          <Dim> @ {edu.school}</Dim>
        </Line>
      ))}
    </div>
  </Block>
);

const cmdSkills = (): React.ReactNode => (
  <Block>
    <Hdr>skills</Hdr>
    {Object.entries(skills).map(([cat, items]) => (
      <Line key={cat}>
        <Acc>{cat.padEnd(10, " ")}</Acc>
        <span>{items.join(" · ")}</span>
      </Line>
    ))}
  </Block>
);

const cmdProjects = (): React.ReactNode => (
  <Block>
    <Hdr>case studies</Hdr>
    {projects.map((p) => (
      <div key={p.slug} className="t-proj-row">
        <Line>
          <Acc>{p.slug.padEnd(20, " ")}</Acc>
          <span>{p.title}</span>
        </Line>
        <Line>
          <Dim>
            {" ".repeat(20)}
            {p.tagline}
          </Dim>
        </Line>
      </div>
    ))}
    <Line />
    <Line>
      <Dim>open one with </Dim>
      <Acc>open &lt;slug&gt;</Acc>
      <Dim> — e.g. </Dim>
      <Acc>open soilrisk</Acc>
    </Line>
  </Block>
);

const cmdOpen = (args: string[]): React.ReactNode => {
  const slug = args[0];
  if (!slug) {
    return (
      <Line>
        <Dim>usage: </Dim>
        <Acc>open &lt;slug&gt;</Acc>
        <Dim>{"  "}(try: </Dim>
        {projects.map((p, i) => (
          <React.Fragment key={p.slug}>
            <Acc>{p.slug}</Acc>
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
        <span className="t-err">open: no such project &apos;{slug}&apos;</span>
      </Line>
    );
  }
  return <CaseStudy p={p} />;
};

const cmdContact = (): React.ReactNode => {
  const labels: Record<string, string> = {
    linkedin: "linkedin",
    github: "github  ",
    twitter: "twitter ",
    dribbble: "dribbble",
  };
  const entries = Object.entries(profile.links).filter(([, v]) => !!v);
  return (
    <Block>
      <Hdr>contact</Hdr>
      {profile.email && (
        <Line>
          <Acc>email{"    "}</Acc>
          <a href={`mailto:${profile.email}`} className="t-link">
            {profile.email}
          </a>
        </Line>
      )}
      {entries.map(([key, url]) => (
        <Line key={key}>
          <Acc>{(labels[key] ?? key).padEnd(9, " ")}</Acc>
          <a href={url} target="_blank" rel="noreferrer" className="t-link">
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
};

// ===== Easter eggs =====

const cmdMerida = (): React.ReactNode => (
  <Block>
    <Line>
      <Acc>merida</Acc>
      <Dim> — princess.archer · clan.dunbroch · chaotic-good</Dim>
    </Line>
    <Line />
    <Line>
      <Dim>
        (the &quot;change your fate&quot; arc is pretty much UX in a nutshell.)
      </Dim>
    </Line>
  </Block>
);

const cmdCoffee = (): React.ReactNode => (
  <Block>
    <pre className="t-ascii">{`        )  )
       (  (
        )_)
     ___|"|___
    |_________|
     \\_______/`}</pre>
    <Line>
      <Dim>brewed. ready when you are.</Dim>
    </Line>
  </Block>
);

const cmdSudo = (): React.ReactNode => (
  <Line>
    <span className="t-err">permission denied: nice try</span>
  </Line>
);

const cmdEcho = (args: string[]): React.ReactNode => (
  <Line>{args.join(" ") || " "}</Line>
);

const cmdDate = (): React.ReactNode => (
  <Line>
    <Dim>{new Date().toString()}</Dim>
  </Line>
);

const cmdLs = (): React.ReactNode => (
  <Block>
    <Line>
      <Dim>drwxr-xr-x  jules  </Dim>
      <Acc>about/</Acc>
    </Line>
    <Line>
      <Dim>drwxr-xr-x  jules  </Dim>
      <Acc>experience/</Acc>
    </Line>
    <Line>
      <Dim>drwxr-xr-x  jules  </Dim>
      <Acc>projects/</Acc>
    </Line>
    <Line>
      <Dim>drwxr-xr-x  jules  </Dim>
      <Acc>skills/</Acc>
    </Line>
    <Line>
      <Dim>-rw-r--r--  jules  </Dim>
      <Acc>contact.txt</Acc>
    </Line>
    <Line>
      <Dim>-rw-r--r--  jules  </Dim>
      <Acc>.merida</Acc>
    </Line>
  </Block>
);

const cmdWhoami = (): React.ReactNode => (
  <Block>
    <Line>
      <Acc>jules</Acc> <Dim>(julyanne ackermann)</Dim>
    </Line>
    <Line>
      <Dim>uid=1000(designer) gid=1000(builder) groups=1000(designer),27(empathy)</Dim>
    </Line>
  </Block>
);

const cmdClear = (_args: string[], ctx: CommandContext): React.ReactNode => {
  ctx.clear();
  return null;
};

// ============================================================
// Registry
// ============================================================

export const commands: Command[] = [
  { name: "help",       desc: "list available commands", aliases: ["?", "h"], run: cmdHelp },
  { name: "about",      desc: "who is jules",            aliases: ["bio"], run: cmdAbout },
  { name: "experience", desc: "work history",            aliases: ["work", "cv", "resume"], run: cmdExperience },
  { name: "skills",     desc: "research, design, tools", run: cmdSkills },
  { name: "projects",   desc: "list case studies",       run: cmdProjects },
  { name: "open",       desc: "open a case study",       aliases: ["cat", "project"], run: cmdOpen },
  { name: "contact",    desc: "get in touch",            run: cmdContact },
  { name: "clear",      desc: "clear the screen",        aliases: ["cls"], run: cmdClear },
  // hidden / easter
  { name: "merida", desc: "the namesake", hidden: true, run: cmdMerida },
  { name: "coffee", desc: "brew one",     hidden: true, run: cmdCoffee },
  { name: "sudo",   desc: "try it",       hidden: true, run: cmdSudo },
  { name: "echo",   desc: "echo args",    hidden: true, run: cmdEcho },
  { name: "date",   desc: "what day",     hidden: true, run: cmdDate },
  { name: "whoami", desc: "identity",     hidden: true, run: cmdWhoami },
  { name: "ls",     desc: "list",         hidden: true, run: cmdLs },
];

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
        <span className="t-err">command not found: {name}</span>
        <Dim> — type </Dim>
        <Acc>help</Acc>
      </Line>
    );
  }
  return cmd.run(args, ctx);
}

export function autocomplete(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/\s+/);
  if (parts[0] === "open" && parts.length === 2) {
    const m = projects.find((p) => p.slug.startsWith(parts[1]));
    if (m) return `open ${m.slug}`;
    return null;
  }
  if (parts.length === 1) {
    const m = commands.find(
      (c) => !c.hidden && c.name.startsWith(trimmed.toLowerCase()),
    );
    if (m) return m.name;
  }
  return null;
}

export const commandNames = commands
  .filter((c) => !c.hidden)
  .map((c) => c.name);

export function bootLines(): React.ReactNode[] {
  return [
    <Line key="b1">
      <Dim>session </Dim>
      <span>{new Date().toISOString().split("T")[0]}</span>
      <Dim> · </Dim>
      <Acc>{profile.location.toLowerCase()}</Acc>
    </Line>,
    <Line key="b2" />,
    <Line key="b3">
      <span>welcome — i&apos;m </span>
      <Acc>jules</Acc>
      <span>, a ux designer + frontend dev.</span>
    </Line>,
    <Line key="b4">
      <Dim>type </Dim>
      <Acc>help</Acc>
      <Dim> for commands · </Dim>
      <Acc>about</Acc>
      <Dim> to meet me · </Dim>
      <Acc>projects</Acc>
      <Dim> to see work</Dim>
    </Line>,
    <Line key="b5" />,
  ];
}
