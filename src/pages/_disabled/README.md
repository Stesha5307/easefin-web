# Disabled pages — do not register in pages.config.js

These four auth pages (Login, Register, ForgotPassword, ResetPassword) are
kept for their JSX only. They still import Base44's auth client
(`@/api/base44Client`), **which does not exist in this repo** — importing
any of them will break the build.

They live in this subfolder so that regenerating or hand-editing
`src/pages.config.js` can't accidentally pick them up.

See **TODO-03** in the root `TODO.md`: once an auth provider is chosen
(Supabase Auth is the lead candidate), replace the Base44 calls, keep the
JSX, move the files back to `src/pages/`, and register the routes.
