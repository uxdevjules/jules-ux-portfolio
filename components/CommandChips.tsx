const chips = [
  "help",
  "about",
  "projects",
  "experience",
  "skills",
  "contact",
  "clear",
];

export function CommandChips({
  onPick,
}: {
  onPick: (cmd: string) => void;
}) {
  return (
    <div className="sticky bottom-0 z-10 flex flex-wrap gap-1.5 px-3 py-2 border-t border-[var(--muted-2)] bg-[#141416] sm:hidden">
      {chips.map((c) => (
        <button
          key={c}
          onClick={() => onPick(c)}
          className="text-[11px] px-2 py-1 rounded border border-[var(--muted-2)] text-[var(--foreground)] active:bg-[var(--muted-2)]"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
