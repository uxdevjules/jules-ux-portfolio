# JulesPortfolio

Personal portfolio site for **Jules**, a UX designer. Styled as a "Claude terminal" — dark, monospace, amber accents, interactive command prompt.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (config-in-CSS via `@theme`)
- Framer Motion (animations)
- MDX (case study content)
- Deploy: Vercel via GitHub

## Commands

```bash
npm run dev     # local dev
npm run build   # production build
npm run lint    # eslint
```

## Visual language

- Background: near-black (`#0b0b0d`)
- Foreground: off-white (`#ededed`)
- Accent (Claude orange): `#d97757`
- Dim/secondary: `#7a7a7a`
- Font: Geist Mono everywhere (no sans fallback UI)

## Conventions

- **Terminal-only UI.** No scrollable marketing fallback, no separate mobile layout — the terminal itself is responsive. On mobile, offer tappable command chips instead of forcing typing.
- **Always dark.** No light-mode toggle — the terminal aesthetic is fixed.
- **Content is the user's own.** All sample bios, case studies, and experience entries are placeholders for Jules to tweak. Don't invent real company names, dates, or metrics without flagging them as placeholders.
- **Commands are the primary nav.** `help`, `about`, `experience`, `projects`, `skills`, `contact`, `ls`, `clear`. Avoid traditional nav bars or hero buttons.
- **Accessibility:** keyboard-first is native to a terminal; still respect `prefers-reduced-motion`, use semantic roles (`log`, `status`), and make sure content is screen-reader legible.
