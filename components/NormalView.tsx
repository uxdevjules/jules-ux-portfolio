import { resolveCommand } from "@/lib/commands";
import { projects } from "@/lib/content";

const navItems = [
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
] as const;

const noopCtx = { clear: () => {}, run: () => {} };

function run(name: string, args: string[] = []) {
  const cmd = resolveCommand(name);
  if (!cmd) return null;
  return cmd.run(args, noopCtx);
}

export function NormalView() {
  return (
    <div className="px-4 sm:px-6 py-4 text-[13px] sm:text-[13.5px] leading-relaxed">
      <nav
        aria-label="sections"
        className="flex flex-wrap gap-x-4 gap-y-1 pb-3 mb-4 border-b border-[var(--muted-2)]"
      >
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      <section id="about" className="scroll-mt-16">
        {run("about")}
      </section>

      <section id="experience" className="scroll-mt-16 mt-6">
        {run("experience")}
      </section>

      <section id="skills" className="scroll-mt-16 mt-6">
        {run("skills")}
      </section>

      <section id="projects" className="scroll-mt-16 mt-6">
        <div className="text-[var(--accent)] font-semibold mt-1 mb-2">
          projects
        </div>
        {projects.map((p) => (
          <div
            key={p.slug}
            id={`project-${p.slug}`}
            className="scroll-mt-16 mb-6 pb-4 border-b border-[var(--muted-2)] last:border-0"
          >
            {run("open", [p.slug])}
          </div>
        ))}
      </section>

      <section id="contact" className="scroll-mt-16 mt-6">
        {run("contact")}
      </section>
    </div>
  );
}
