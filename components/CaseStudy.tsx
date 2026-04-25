// CaseStudy — notebook-style renderer for a single project: header, cover image,
// meta row, numbered sections (with optional metrics grid), and a "back" foot.
import type { Project } from "@/lib/types";
import { PlaceholderImage } from "./PlaceholderImage";

export function CaseStudy({ p }: { p: Project }) {
  return (
    <div className="t-block t-case">
      <div className="t-case-header">
        <div className="t-case-eyebrow">
          <span className="t-acc">case_study</span>
          <span className="t-mono-tag">{p.slug}</span>
        </div>
        <h2 className="t-case-title">{p.title}</h2>
        <div className="t-case-tagline">{p.tagline}</div>
      </div>

      <PlaceholderImage caption={p.cover.caption} kind={p.cover.kind} />

      <div className="t-case-meta">
        <div>
          <span className="t-meta-k">role</span>
          <span className="t-meta-v">{p.role}</span>
        </div>
        <div>
          <span className="t-meta-k">timeline</span>
          <span className="t-meta-v">{p.timeline}</span>
        </div>
        <div>
          <span className="t-meta-k">team</span>
          <span className="t-meta-v">{p.team}</span>
        </div>
      </div>

      {p.sections.map((s, i) => (
        <div key={i} className="t-case-section">
          <div className="t-case-section-label">
            <span className="t-case-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="t-acc">{s.label}</span>
          </div>
          {s.kind === "metrics" ? (
            <div className="t-metrics">
              {s.body.map(([n, lbl], j) => (
                <div key={j} className="t-metric">
                  <div className="t-metric-n">{n}</div>
                  <div className="t-metric-l">{lbl}</div>
                </div>
              ))}
            </div>
          ) : (
            s.body.map((l, j) => (
              <div key={j} className="t-line">
                <span className="t-dim">{l}</span>
              </div>
            ))
          )}
        </div>
      ))}

      <div className="t-case-foot">
        <div className="t-rule">{"·".repeat(48)}</div>
        <div className="t-line">
          <span className="t-dim">back to list: </span>
          <span className="t-acc">projects</span>
        </div>
      </div>
    </div>
  );
}
