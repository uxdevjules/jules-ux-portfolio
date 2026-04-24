export type Mode = "terminal" | "normal";

export function WindowChrome({
  mode,
  onToggleMode,
}: {
  mode: Mode;
  onToggleMode: () => void;
}) {
  return (
    <div className="sticky top-0 z-20 flex items-center px-3 py-2 border-b border-[var(--muted-2)] bg-[#161618] select-none">
      <div className="flex gap-2 shrink-0">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
      </div>
      <div className="flex-1 text-center text-[11px] sm:text-xs text-[var(--muted)] truncate px-3">
        jules@portfolio — 2026
      </div>
      <button
        onClick={onToggleMode}
        type="button"
        aria-label={`switch to ${mode === "terminal" ? "normal" : "terminal"} mode`}
        className="text-[11px] sm:text-xs text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors px-2 py-[3px] rounded border border-[var(--muted-2)] shrink-0"
      >
        {mode === "terminal" ? "normal mode →" : "← terminal"}
      </button>
    </div>
  );
}
