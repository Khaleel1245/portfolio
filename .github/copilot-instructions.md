## Repo overview

This is a single-page React portfolio app built with Vite + TypeScript and Tailwind. It loads nearly all content from Google Sheets (CSV export) at runtime and conditionally renders sections based on non-empty rows.

Key code paths:
- Data loading: `src/hooks/usePortfolioData.ts` -> `src/utils/fetchData.ts` (uses PapaParse to download CSVs).
- Sheet IDs & section titles: `src/config/sheets.ts` (authoritative mapping).
- UI entry: `src/App.tsx` (filters sections via `SECTION_TITLES` and only renders non-empty sections).
- Serverless email: `api/send-email.ts` (Vercel function; prefers `RESEND_API_KEY` then falls back to FormSubmit).

Build & dev commands (from `package.json`):
- `npm run dev` — start Vite dev server (local testing).
- `npm run build` — run `tsc -b` then `vite build` (production bundle).
- `npm run lint` — run ESLint across the repo.

Important patterns & constraints
- Data-first design: treat Google Sheets as the CMS. The app expects CSV headers and trims/normalizes keys (`fetchData.ts` uses `transformHeader` + trimming). When adding a new sheet, update `src/config/sheets.ts`.
- Parallel sheet fetching: `usePortfolioData` fetches all sheets in parallel and combines results. Handle missing or empty sheets gracefully (the app hides empty sections).
- Section grouping: several sheet keys map to the same UI section (e.g., `journalPublications`, `conferencePublications`, `books`, `researchProjects` are displayed under "Research & Publications"). See `SECTION_TITLES`.
- Styling: Tailwind utility classes used across components; global styles in `src/index.css`/`App.css`.

Integration points & environment
- Google Sheets: public viewable CSV export URLs are used. If data fails to load, `App.tsx` shows an error screen. Check `src/config/sheets.ts` for the active IDs.
- Email: `api/send-email.ts` uses `process.env.RESEND_API_KEY` for Resend; if not present it posts to FormSubmit. Set `RESEND_API_KEY` in Vercel for production.
- Deployment: repo includes `vercel.json` and `@vercel/node` in devDependencies — the `api/` folder is expected to run as Vercel Serverless functions.

Project-specific conventions for contributors/agents
- When adding new content sources, update `src/config/sheets.ts` and ensure the CSV header names match the front-end keys (headers are trimmed).
- Keep CSV-enabled columns stable: the UI looks up keys case-insensitively (see `getBasicInfoValue` in `src/App.tsx`), but prefer canonical header names to avoid fragile lookups.
- Avoid changing section keys; if you must rename a sheet key, update both `SHEET_IDS` and `SECTION_TITLES` and adjust any component props that expect that key.

Common quick tasks & where to look
- Add a new UI section: create a `src/components/<NewSection>.tsx`, add sheet id to `src/config/sheets.ts`, and include its key in `SECTION_TITLES`.
- Debug data issues: open the network tab for the CSV fetch URL constructed in `fetchData.ts` and verify the exported CSV; check console logs from `usePortfolioData`.
- Test contact form locally: the client posts to `/api/send-email`. Locally `vercel dev` or running Vercel-compatible dev server is needed to exercise `api/` endpoints.

Examples
- To see how empty-section hiding works, inspect `src/App.tsx` where `validSections` filters by `rows && rows.length > 0 && rows.some(...)`.
- To change how CSV headers are normalized, update `transformHeader` and row trimming logic in `src/utils/fetchData.ts`.

What I didn't find / open questions
- No unit tests are present; there is no test script in `package.json`.
- CI/deployment steps are not codified beyond `vercel.json` and the `build` script.

If anything here is incomplete or you'd like more automation (tests, CI, or stronger typing of sheet rows), tell me which area to expand and I'll update this file.
