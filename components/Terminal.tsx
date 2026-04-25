"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  autocomplete,
  bootLines,
  runCommand,
} from "@/lib/commands";
import type { Mode, TerminalLine } from "@/lib/types";
import { NormalView } from "./NormalView";

const TIP_STORAGE_KEY = "jules:normal-tip-seen";
const RAIL_CHIPS = ["help", "about", "projects", "experience", "skills", "contact"];

export function Terminal() {
  const [mode, setMode] = useState<Mode>("terminal");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [booted, setBooted] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [ghostHint, setGhostHint] = useState(true);
  const [clock, setClock] = useState<Date | null>(null);
  const [stats, setStats] = useState({ cpu: 0.18, mem: 0.42 });

  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pushLine = useCallback((node: React.ReactNode) => {
    setLines((prev) => [...prev, { id: nextId.current++, node }]);
  }, []);

  const clear = useCallback(() => setLines([]), []);

  // Boot sequence
  useEffect(() => {
    let cancelled = false;
    const boot = bootLines();
    (async () => {
      for (const node of boot) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 110));
        pushLine(node);
      }
      if (!cancelled) setBooted(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [pushLine]);

  // Live clock + jittery system stats (chrome decoration)
  useEffect(() => {
    setClock(new Date());
    const t = setInterval(() => {
      setClock(new Date());
      setStats((s) => ({
        cpu: Math.max(0.05, Math.min(0.95, s.cpu + (Math.random() - 0.5) * 0.08)),
        mem: Math.max(0.2, Math.min(0.85, s.mem + (Math.random() - 0.5) * 0.04)),
      }));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll the log container as new lines come in
  useEffect(() => {
    if (mode !== "terminal" || !scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollTop = el.scrollHeight;
  }, [lines, booted, mode]);

  // Restore tooltip dismissal across visits
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(TIP_STORAGE_KEY);
    if (!seen) setShowTip(true);
  }, []);

  const dismissTip = useCallback(() => {
    setShowTip(false);
    try {
      window.localStorage.setItem(TIP_STORAGE_KEY, "1");
    } catch {
      /* storage unavailable — fine, just hide for this session */
    }
  }, []);

  const toggleMode = () => {
    setMode((m) => (m === "terminal" ? "normal" : "terminal"));
    dismissTip();
  };

  const focusInput: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (mode !== "terminal" || !booted) return;
    const sel = window.getSelection();
    if (sel && sel.toString().length > 0) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("a") || target?.closest("button")) return;
    inputRef.current?.focus();
  };

  const submit = (raw: string) => {
    const cmd = raw.trim();
    pushLine(<PromptEcho cmd={raw} />);
    setGhostHint(false);
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);
    const [name, ...args] = cmd.split(/\s+/);
    const node = runCommand(name, args, {
      clear,
      run: (r) => submit(r),
    });
    if (node != null) pushLine(node);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setGhostHint(false);
    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const i =
        histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const i = histIdx + 1;
      if (i >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = autocomplete(input);
      if (match) setInput(match);
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      clear();
    }
  };

  const timeStr = clock
    ? clock.toLocaleTimeString("en-GB", { hour12: false })
    : "--:--:--";
  const dateStr = clock
    ? clock
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        .toLowerCase()
    : "";

  return (
    <div className="term-shell" onClick={focusInput}>
      <div className="term-window">
        {/* Window chrome */}
        <header className="term-chrome">
          <div className="chrome-dots">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
          </div>
          <div className="chrome-title">
            <span className="t-dim">jules@portfolio</span>
            <span className="t-mute"> · </span>
            <span>~/portfolio</span>
            <span className="t-mute"> · </span>
            <span className="t-dim">zsh</span>
          </div>
          <div className="chrome-stats">
            <StatBar label="cpu" v={stats.cpu} />
            <StatBar label="mem" v={stats.mem} />
            <span className="chrome-clock">{timeStr}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMode();
              }}
              className="chrome-mode"
              aria-label={`switch to ${
                mode === "terminal" ? "normal" : "terminal"
              } mode`}
            >
              {mode === "terminal" ? "normal mode →" : "← terminal"}
            </button>
          </div>
          {showTip && booted && mode === "terminal" && (
            <div role="status" className="term-tooltip">
              <div className="term-tooltip-body">
                <span>
                  <span className="t-dim">new here? try </span>
                  <span className="t-acc">normal mode</span>
                  <span className="t-dim"> — easier to read.</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissTip();
                  }}
                  aria-label="dismiss hint"
                  className="term-tooltip-x"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Tab bar */}
        <div className="term-tabs">
          <div className="tab tab-active">
            <span className="tab-dot" />
            <span>portfolio</span>
            {dateStr && <span className="t-dim"> · {dateStr}</span>}
          </div>
          <div className="tab tab-add">+</div>
          <div className="tabs-spacer" />
          <div className="tab-meta">
            <span className="t-dim">conn</span>
            <span className="conn-bar">
              <span /><span /><span /><span />
            </span>
          </div>
        </div>

        {mode === "terminal" ? (
          <>
            <div
              ref={scrollRef}
              className="term-output"
              role="log"
              aria-live="polite"
              aria-label="terminal output"
            >
              <div className="term-content">
                {lines.map((l, i) => (
                  <div
                    key={l.id}
                    className="term-line-wrap"
                    style={{ animationDelay: `${Math.min(i, 8) * 20}ms` }}
                  >
                    {l.node}
                  </div>
                ))}
                {booted && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit(input);
                      setInput("");
                    }}
                    className="term-prompt-form"
                  >
                    <Prompt />
                    <div className="term-input-wrap">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          setGhostHint(false);
                        }}
                        onKeyDown={onKeyDown}
                        autoFocus
                        spellCheck={false}
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoComplete="off"
                        className="term-input"
                        aria-label="terminal input"
                      />
                      {!input && ghostHint && (
                        <span className="term-ghost">
                          about
                          <span className="ghost-hint">↵ try this</span>
                        </span>
                      )}
                      <span
                        className={`term-caret ${
                          input ? "is-typing" : "is-idle"
                        }`}
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Quick rail */}
            <footer className="term-rail">
              <div className="rail-label">
                <span className="t-dim">▸</span> quick
              </div>
              <div className="rail-chips">
                {RAIL_CHIPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="rail-chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      submit(c);
                    }}
                  >
                    {c}
                  </button>
                ))}
                <button
                  type="button"
                  className="rail-chip rail-chip-clear"
                  onClick={(e) => {
                    e.stopPropagation();
                    clear();
                  }}
                >
                  clear
                </button>
              </div>
              <div className="rail-hints">
                <kbd>↑↓</kbd>
                <span className="t-dim">history</span>
                <kbd>tab</kbd>
                <span className="t-dim">complete</span>
                <kbd>⌘L</kbd>
                <span className="t-dim">clear</span>
              </div>
            </footer>
          </>
        ) : (
          <div className="term-output">
            <NormalView />
          </div>
        )}
      </div>

      <div className="grain-overlay" aria-hidden />
      <div className="vignette" aria-hidden />
    </div>
  );
}

function Prompt() {
  return (
    <span className="term-prompt">
      <span className="t-acc">jules</span>
      <span className="t-mute">@</span>
      <span className="t-fg">portfolio</span>
      <span className="t-mute"> </span>
      <span className="t-acc-2">~</span>
      <span className="t-mute"> </span>
      <span className="t-acc">❯</span>
      <span>{" "}</span>
    </span>
  );
}

function PromptEcho({ cmd }: { cmd: string }) {
  return (
    <div className="term-echo flex flex-wrap">
      <Prompt />
      <span className="t-fg">{cmd}</span>
    </div>
  );
}

function StatBar({ label, v }: { label: string; v: number }) {
  const cells = 8;
  const filled = Math.round(v * cells);
  return (
    <span className="stat">
      <span className="t-dim">{label}</span>
      <span className="stat-bar">
        {Array.from({ length: cells }, (_, i) => (
          <span key={i} className={`stat-cell ${i < filled ? "on" : ""}`} />
        ))}
      </span>
    </span>
  );
}
