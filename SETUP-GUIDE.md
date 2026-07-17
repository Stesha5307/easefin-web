# Repo Setup Guide (for Alex)

**This folder is already the finished repo** — the Base44 export has been
extracted, merged with the standalone replacements, and it builds clean.
There's no more "clone and copy files" step; just push what's here.

## Step 0 — One-time decisions

- Create a GitHub **organization** (e.g. `easefin-ai`) rather than using your
  personal account, so repos survive people leaving. Free tier is fine.
- Repos: `easefin-web` (this one) and `easefin-ai` (Python backend, later).

## Step 1 — Sanity-check locally before pushing

```bash
cd easefin-web
npm install
npm run build   # should succeed with zero errors/warnings
npm run dev      # spot-check a few pages in the browser
```

If `npm run build` fails, something changed since this was packaged —
check `TODO.md` Section "Verify anytime with" for the standard checks.

## Step 2 — Create the GitHub repo and push

```bash
git init -b main
git add .
git commit -m "Initial standalone import from Base44 export"
# Create empty repo on GitHub first (org: easefin-ai, name: easefin-web,
# private, NO auto-generated README), then:
git remote add origin git@github.com:<org>/easefin-web.git
git push -u origin main
```

## Step 3 — Protect main + invite the team

On GitHub → repo → Settings:

1. **Collaborators & teams**: invite Stesha, Vidushi (Write), Smrutik
   (Write or Triage), San (Admin or Maintain).
2. **Branches → Add branch protection rule** for `main`:
   - Require a pull request before merging (1 approval)
   - Require status checks to pass — the `.github/workflows/ci.yml` in
     this repo already runs lint + build on every PR
   - Block force pushes
3. **General**: disable "Allow force pushes", enable "Automatically delete
   head branches".

## Step 4 — Connect Vercel

1. vercel.com → Add New Project → import `easefin-web` from GitHub.
2. Framework preset: Vite. Build command `npm run build`, output `dist`.
3. Add env var `VITE_API_URL` (point at the backend once it exists;
   a placeholder is fine for now).
4. Every PR now gets an automatic preview URL.

## Step 5 — Brief the team

Message template:

> Repo is live: github.com/<org>/easefin-web — accept the invite.
> Clone it, `npm install`, `cp .env.example .env.local`, `npm run dev`.
> Read README.md for the workflow. **Read TODO.md before touching
> LanguageContext.jsx** — 6 of 8 languages need to be restored from the
> real Base44 source (TODO-11); everything else in TODO.md is normal
> backend-dependent stub work.

## The backend repo (easefin-ai)

Same flow: create `easefin-ai` in the org, `git init`, push the FastAPI
scaffold, protect main. It deploys to Railway/Render/Fly — not Vercel.
Keep its `DATABASE_URL` / `LLM_API_KEY` in the host's env settings, never
in git.
