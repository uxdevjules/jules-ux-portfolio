"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  autocomplete,
  bootLines,
  runCommand,
} from "@/lib/commands";
import { WindowChrome, type Mode } from "./WindowChrome";
import { CommandChips } from "./CommandChips";
import { NormalView } from "./NormalView";

type Line = { id: number; node: React.ReactNode };

export function Terminal() {
  const [mode, setMode] = useState<Mode>("terminal");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [booted, setBooted] = useState(false);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const pushLine = useCallback((node: React.ReactNode) => {
    setLines((prev) => [
      ...prev,
      { id: nextId.current++, node },
    ]);
  }, []);

  const clear = useCallback(() => setLines([]), []);

  // boot sequence — progressive reveal (terminal mode only)
  useEffect(() => {
    let cancelled = false;
    const boot = bootLines();
    (async () => {
      for (const node of boot) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 90));
        pushLine(node);
      }
      if (!cancelled) setBooted(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [pushLine]);

  // scroll to the end marker when content changes (terminal mode)
  useEffect(() => {
    if (mode !== "terminal") return;
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [lines, booted, mode]);

  const toggleMode = () => {
    setMode((m) => (m === "terminal" ? "normal" : "terminal"));
    // reset scroll on mode switch so user isn't dropped mid-content
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // focus input when user clicks inside terminal (desktop UX)
  const focusInput = () => {
    if (mode !== "terminal" || !booted) return;
    const sel = window.getSelection();
    if (sel && sel.toString().length > 0) return;
    inputRef.current?.focus();
  };

  const submit = (raw: string) => {
    const cmd = raw.trim();
    pushLine(<PromptEcho cmd={raw} />);
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

  return (
    <div
      className="min-h-[100svh] flex flex-col p-2 sm:p-6"
      onClick={focusInput}
    >
      <div className="mx-auto w-full max-w-4xl flex-1 flex flex-col rounded-lg border border-[var(--muted-2)] bg-[var(--background)] shadow-2xl overflow-hidden">
        <WindowChrome mode={mode} onToggleMode={toggleMode} />

        {mode === "terminal" ? (
          <>
            <div
              className="px-3 sm:px-5 py-3 text-[13px] sm:text-[13.5px] leading-relaxed"
              role="log"
              aria-live="polite"
              aria-label="terminal output"
            >
              {lines.map((l) => (
                <div key={l.id}>{l.node}</div>
              ))}
              {booted && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit(input);
                    setInput("");
                  }}
                  className="flex items-center gap-0 flex-wrap"
                >
                  <Prompt />
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    autoFocus
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="off"
                    className="flex-1 min-w-[4ch] bg-transparent outline-none caret-[var(--accent)] text-[var(--foreground)]"
                    aria-label="terminal input"
                  />
                </form>
              )}
              <div ref={endRef} />
            </div>
            <CommandChips onPick={(c) => submit(c)} />
          </>
        ) : (
          <NormalView />
        )}
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-[var(--accent)]">jules@portfolio</span>
      <span className="text-[var(--muted)]"> ~ </span>
      <span className="text-[var(--accent)]">%</span>
      <span>&nbsp;</span>
    </span>
  );
}

function PromptEcho({ cmd }: { cmd: string }) {
  return (
    <div className="flex flex-wrap">
      <Prompt />
      <span>{cmd}</span>
    </div>
  );
}
