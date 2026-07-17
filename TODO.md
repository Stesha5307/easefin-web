# TODO — easefin-web

**Status: `npm install && npm run build` succeeds with zero errors** (there
is one harmless ~570KB chunk-size warning — code-splitting is a
nice-to-have, not a blocker). The four lead/profile forms are wired to the
backend API (see TODO-12), and the PDF-extraction `↪` wrap-glyph artifacts
have been cleaned up repo-wide. Everything below is what's left, organized
so each item can become a GitHub issue directly.

## 1. Files to replace from the real Base44 source (the most important tracked item)

This repo came from a **PDF export** of the original Base44 app — there
was no other source to work from. Plain-text extraction from a PDF doesn't
preserve non-Latin and RTL (right-to-left) script reliably: lines get
reordered, split mid-word, or scrambled. **Only English is known-clean.**
All 7 other languages — Hindi, Urdu, Arabic, Tamil, Telugu, Punjabi, and
Bengali — are corrupted and must be replaced **verbatim** from the real
Base44-synced Git repo once someone with export access provides it. Do
**not** hand-translate a replacement — it must match this app's exact
key structure, or the `t()` lookups will silently break.

Hindi's corruption is subtle enough to miss: its *keys* match this app's
structure, but its *content* has a space inserted after most consonant+ि
clusters (e.g. `वि त्तीय` instead of `वित्तीय`, including in the language
name itself, `हि ंदी`). Urdu, Arabic, Tamil, Telugu, Punjabi, and Bengali
are further gone — mostly empty `{}` stubs, with the app currently falling
back to English for them.

**Files to replace:**

- [ ] `src/components/LanguageContext.jsx` — the main translation file,
      all 8 languages plus the provider logic (`t()`, RTL detection,
      text-alignment helpers).
- [ ] `src/pages/AIAgent.jsx` — voice-language map (~line 118) and the
      hardcoded error-message translations used when the AI backend call
      fails.
- [ ] `src/pages/Subscription.jsx` — subscription label + subtitle
      translation maps.
- [ ] `src/components/home/Header.jsx` — subscription label translation
      map (same content as above, duplicated here).
- [ ] `src/pages/MultilingualSupportInfo.jsx` — the language display list
      (~line 46).
- [ ] `src/components/profile/PreferencesInfo.jsx` — the language
      dropdown (~line 32).

**Key-normalization bug — fix this during the replacement, not after:**
the Urdu/Arabic keys in `LanguageContext.jsx`'s translations object use one
bidi-scrambled form, but the selector lists (`Header.jsx`,
`PreferencesInfo.jsx`) and the `rtlLanguages` array (`LanguageContext.jsx`
~line 784) use a *differently* scrambled form — the parenthesis migrated
and a stray directional-mark character is embedded. Net effect today:
selecting Urdu or Arabic from the language switcher falls back to English
text (expected) but **still flips the entire layout to RTL** and sets a
garbage `lang` attribute on `<html>` (not expected). When pasting in the
real translations, normalize every one of these keys to a single canonical
string so the translation lookup, the language switcher, and the RTL check
all agree.

Verify after restoring:

```bash
npm install && npm run build   # should stay clean
```

## 2. Backend-dependent stubs (each maps to a GitHub issue)

These already compile and run, but use hardcoded/placeholder data pending
the `easefin-ai` backend. Look for `// TODO-XX` comments in each file for
the exact spot.

### TODO-02 · AIAgent — remove mock profile, use real backend data
`src/pages/AIAgent.jsx` calls `api.chat()` instead of Base44's InvokeLLM.
Still pending: the hardcoded `profileData` (mock user) and
`sampleRecommendations` are still used to build the prompt/display —
replace with the real profile once auth + `/profiles` exist, and let the
backend build the prompt server-side instead of client-side.

### TODO-04/05 · Gold rates & remittance countries — need backend endpoints
`src/pages/GoldLoans.jsx` and `src/pages/RemittanceServices.jsx` use an
empty array instead of Base44's `GoldRate.list()` / `RemittanceCountry.list()`.
Both pages render but show no data until `api.getGoldRates()` /
`api.getRemittanceCountries()` exist on the backend. Reference schema:
`docs/backend-schema-reference/*.jsonc`.

### TODO-06 · Subscription — confirmation email needs backend
`src/pages/Subscription.jsx` calls `api.submitLead({ type: "subscription", ... })`
instead of Base44's entity + client-side SendEmail. The backend should send
the welcome email when it processes this lead type — nothing left to do
here in the frontend.

### TODO-07 · ProductVideo — needs a settings endpoint + file storage
`src/pages/ProductVideo.jsx` currently hardcodes an empty video URL and
`console.warn`s instead of saving. Needs: a settings endpoint
(`GET`/`POST /settings` or similar) and a file-upload endpoint before this
page actually works.

### TODO-03 · Auth pages — blocked on the auth decision
The four auth pages (`Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`,
`ResetPassword.jsx`) still import Base44's auth client
(`@/api/base44Client`, which doesn't exist in this repo) and will break the
build if ever imported. They live in **`src/pages/_disabled/`** (with a
README explaining why) so that hand-editing `pages.config.js` can't
accidentally pick them up. This matters once an auth provider is chosen
(Supabase Auth is the current lead candidate). When ready: replace the
Base44 calls, keep the JSX, move the files back to `src/pages/`, and
register the routes.

Known gotcha to fix at the same time: `navigateToLogin` in
`src/lib/AuthContext.jsx` (~line 49) redirects to `/login`, which is not a
registered route today — anything calling it lands on the 404 page.

### TODO-12 · Lead + profile forms — wired, pending backend endpoints
`Contact.jsx`, `ScheduleDemo.jsx`, and `PartnerWithUs.jsx` call
`api.submitLead()` (types `contact`, `demo`, `partner`), and
`StartJourney.jsx` calls `api.saveProfile()` — each with loading, success,
and error UI instead of the old fake `alert()`. Subscription's existing
`api.submitLead()` call also has a proper error path now. **Until the
backend's `/leads` and `/profiles` endpoints exist, submitting any of these
shows the error message** — that's expected; the wiring and error handling
are what's in place. Each call site has a `// TODO` comment noting the
dependency.

### TODO-13 · Logo is a placeholder
The logo was previously hot-linked from Base44's Supabase storage bucket
(`grep -rn "qtrypzzcjebvfcihiynt" src/` used to return 7 hits across
Header, Contact, FinancialServices, FaceIdVerification, GovIdVerification,
StartJourney, and ScheduleDemo) — a live runtime dependency on Base44's
infrastructure that would 404 once that account is gone. All of those now
point at `public/easefin-logo.png`, which is a clearly-marked **placeholder**.
Replace `public/easefin-logo.png` (and `public/favicon.svg`, same situation) with
the real brand asset when it's available — no code changes needed beyond
swapping the file.

## 3. Whole-repo verification (do this after any of the above)

- [ ] `npm install && npm run build` — zero errors.
- [ ] `npm run lint` — clean (CI runs this too).
- [ ] `npm run dev` — spot-check each page renders.
- [ ] `grep -rn "↪" src/` — nothing (PDF wrap glyph).
- [ ] `grep -rn "base44\|@/integrations\|@/entities" src/` — the only live
      imports allowed are inside `src/pages/_disabled/` (see TODO-03);
      everything else must be comments.

## 4. Do NOT add back to this repo

```
base44/                      (schema reference only — see docs/backend-schema-reference/)
src/api/base44Client.js
src/lib/app-params.js
```
