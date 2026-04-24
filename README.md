# Jules — Portfolio

Personal portfolio site styled as a Claude-style terminal. Type commands to explore.

Built with Next.js 15, React 19, TypeScript, Tailwind CSS v4.

## Commands in the site

```
help         list commands
about        bio
experience   work history
projects     list case studies
open <slug>  open a case study
skills       research, design, tools
contact      email + links
clear        clear the screen
```

Keyboard: ↑/↓ cycle history · Tab autocompletes · Ctrl/Cmd+L clears.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where to edit content

All portfolio content lives in one file: **`lib/content.tsx`**.

- `profile` — name, role, tagline, contact links
- `bio` — paragraphs for the `about` command
- `experience` — timeline entries
- `skills` — categorized skill lists
- `projects` — case studies rendered by `open <slug>`

Visual tokens (colors, fonts) live in `app/globals.css`.

## Deploy

Pushes to GitHub auto-deploy to Vercel (see `DEPLOY.md`).
