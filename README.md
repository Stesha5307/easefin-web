# EaseFin AI — Website

## What this is

EaseFin AI is a multilingual, AI-powered platform that helps underserved
communities connect with microfinance institutions, small banks, and
government financial programs — in their own language, by voice if needed.

**This repo is only the frontend** — the website a visitor sees in their
browser. It's the marketing and info pages, the multi-step profile form,
the AI chat interface, and the language switcher. It contains no business
logic, no database, and no secrets.

That's on purpose. This is one of two repos:

- **`easefin-web`** (this repo) — the browser-side UI. React + Vite +
  Tailwind. Nothing here talks to a database or holds a credential.
- **`easefin-ai`** (separate repo) — the entire backend, in Python/FastAPI.
  The AI assistant, the bank/MFI matching engine, profile storage, chat
  logs, leads, and authentication all live there. This site calls it over
  HTTP through a single gateway, `src/api/client.js` — nothing in this
  repo reaches the backend any other way.

**Why split it this way:** code that runs in a visitor's browser can be
opened and inspected by anyone, so it must never hold a database
connection string or an API secret. Keeping all of that server-side means
the frontend can only *ask* the backend to do things, never do them
directly. The same backend is also built to serve a planned Android app
later, so the logic living in one place (not duplicated per client) matters
beyond just this repo.

**Current state:** the backend doesn't exist yet. The site builds, runs,
and the marketing/info pages work end-to-end. Anything that depends on the
backend — AI chat, the contact/demo/partner forms, the profile form,
bank/gold-rate data — is wired up correctly but will show an error message
at runtime, because there's nothing on the other end to answer yet. Don't
demo the live site as if it's fully working until `easefin-ai` is running
and this app is pointed at it.

## Stack

- React 18 + Vite
- Tailwind CSS + shadcn/ui (Radix) components
- react-router-dom for routing
- LanguageContext for i18n (8 languages: EN, HI, UR, AR, TA, TE, PA, BN)

## Getting started

```bash
git clone <repo-url>
cd easefin-web
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:5173
```

## Environment variables

| Variable       | What it is                                  |
| -------------- | ------------------------------------------- |
| `VITE_API_URL` | Base URL of the easefin-ai backend API      |

Never commit `.env.local`. Production values are set in Vercel.

## Project structure

```
src/
├── api/          # client.js — all calls to the backend API go through here
├── components/
│   ├── ui/       # shadcn/Radix primitives (don't edit unless necessary)
│   ├── home/     # homepage sections (Hero, Features, Services, ...)
│   └── profile/  # profile form sections
├── pages/        # one file per route (registered by hand in pages.config.js)
│   └── _disabled/  # Base44-coupled auth pages, kept out of the build (see TODO.md)
└── lib/          # AuthContext, utilities
```

i18n note: `LanguageContext.jsx` (provider + all translations) lives in
`src/components/`, not a separate `i18n/` folder.

## Workflow

- `main` is protected — no direct pushes.
- Branch per task: `feat/<name>`, `fix/<name>`.
- Open a PR; it needs one review + passing checks to merge.
- Every PR gets a Vercel preview URL — check your work there.

## Migration status & known issues

This repo was reconstructed from a PDF export of the original Base44 app
(no other source was available at the time). `npm run build` succeeds
cleanly, but some files still contain PDF-corrupted text — mainly the
non-English translations. `TODO.md` is the source of truth for what's
left, including the exact list of files that need to be replaced verbatim
from the real Base44 source once it's available.
