// PlaceholderImage — terminal-framed mock for case-study covers.
// Renders a chrome bar with figma-style URL, an SVG illustration keyed by
// `kind`, an "awaiting export" pulse, corner ticks, tag and dimensions footer.
// Drop a real image in by passing `src` later.
import type { CoverKind } from "@/lib/types";

const KIND_CONFIG: Record<
  CoverKind,
  { stripeAngle: number; stripeColor: string; dims: string }
> = {
  map:     { stripeAngle: 22,  stripeColor: "var(--accent)",   dims: "1920×1080" },
  diagram: { stripeAngle: -10, stripeColor: "var(--accent-2)", dims: "1440×900" },
  system:  { stripeAngle: 0,   stripeColor: "var(--accent)",   dims: "1600×900" },
  energy:  { stripeAngle: 90,  stripeColor: "var(--accent-2)", dims: "1920×1080" },
};

export function PlaceholderImage({
  caption,
  kind = "map",
}: {
  caption: string;
  kind?: CoverKind;
}) {
  const cfg = KIND_CONFIG[kind];
  const fileName = caption.replace(/^\/\/\s*/, "").trim() || "screen.png";
  const patternId = `stripes-${kind}`;

  return (
    <div className="t-img">
      <div className="t-img-frame">
        <div className="t-img-chrome">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="t-img-chrome-url">jules.figma/file/{fileName}</span>
          <span style={{ width: 24 }} />
        </div>
        <div className="t-img-status">awaiting export</div>
        <svg
          viewBox="0 0 600 240"
          className="t-img-svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              width="14"
              height="14"
              patternTransform={`rotate(${cfg.stripeAngle})`}
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="14"
                stroke={cfg.stripeColor}
                strokeWidth="1.4"
                opacity="0.35"
              />
            </pattern>
          </defs>
          <rect width="600" height="240" fill="var(--surface-2)" />
          <rect width="600" height="240" fill={`url(#${patternId})`} />
          <KindOverlay kind={kind} />
        </svg>
        <div className="t-img-tag">{caption}</div>
        <div className="t-img-corners">
          <span /><span /><span /><span />
        </div>
      </div>
      <div className="t-img-meta">
        <span className="t-dim">[ placeholder · drop figma export here ]</span>
        <span className="meta-right">
          <span className="t-dim">{cfg.dims}</span>
          <span className="t-dim">·</span>
          <span className="t-dim">png</span>
        </span>
      </div>
    </div>
  );
}

function KindOverlay({ kind }: { kind: CoverKind }) {
  if (kind === "map") {
    return (
      <g
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      >
        <path d="M40 180 Q 180 60 320 130 T 560 90" />
        <path d="M40 200 Q 200 100 360 170 T 560 140" opacity="0.6" />
        <circle cx="180" cy="110" r="4" fill="var(--accent)" />
        <circle cx="340" cy="138" r="4" fill="var(--accent)" />
        <circle cx="490" cy="105" r="4" fill="var(--accent)" />
      </g>
    );
  }
  if (kind === "diagram") {
    return (
      <g
        fill="none"
        stroke="var(--accent-2)"
        strokeWidth="1.4"
        strokeOpacity="0.7"
      >
        <rect x="40" y="90" width="80" height="60" />
        <rect x="160" y="90" width="80" height="60" />
        <rect x="280" y="90" width="80" height="60" />
        <rect x="400" y="90" width="80" height="60" />
        <rect x="520" y="90" width="40" height="60" stroke="var(--accent)" />
        <line x1="120" y1="120" x2="160" y2="120" />
        <line x1="240" y1="120" x2="280" y2="120" />
        <line x1="360" y1="120" x2="400" y2="120" />
        <line x1="480" y1="120" x2="520" y2="120" />
      </g>
    );
  }
  if (kind === "system") {
    return (
      <g>
        {[60, 140, 220, 300, 380, 460].map((x, i) => (
          <rect
            key={i}
            x={x}
            y="80"
            width="60"
            height="80"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.3 + i * 0.1}
            strokeWidth="1.2"
          />
        ))}
      </g>
    );
  }
  // energy — stacked bars + benchmark line + slider hint
  const bars = [
    { x: 80,  h: [80, 50, 30] },
    { x: 160, h: [70, 40, 35] },
    { x: 240, h: [60, 45, 38] },
    { x: 320, h: [55, 50, 40] },
    { x: 400, h: [50, 55, 42] },
    { x: 480, h: [45, 60, 44] },
  ];
  const segFill = ["var(--accent)", "var(--accent-2)", "var(--mute)"];
  const segOp = [0.85, 0.65, 0.45];
  return (
    <g>
      {bars.map((b, i) => {
        let y = 200;
        return (
          <g key={i}>
            {b.h.map((seg, j) => {
              y -= seg;
              return (
                <rect
                  key={j}
                  x={b.x}
                  y={y}
                  width="48"
                  height={seg}
                  fill={segFill[j]}
                  fillOpacity={segOp[j]}
                />
              );
            })}
          </g>
        );
      })}
      <line
        x1="60"
        y1="110"
        x2="540"
        y2="110"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.7"
      />
      <text
        x="544"
        y="113"
        fill="var(--accent)"
        fontSize="10"
        fontFamily="monospace"
      >
        benchmark
      </text>
      <g opacity="0.7">
        <line
          x1="60"
          y1="225"
          x2="540"
          y2="225"
          stroke="var(--accent-2)"
          strokeWidth="1"
        />
        <circle cx="220" cy="225" r="4" fill="var(--accent)" />
      </g>
    </g>
  );
}
