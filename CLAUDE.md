# portfolio — notes for Claude Code

Showcase site of `tramonihadrien.com`, for getting hired (C++ quant dev / software & ML
engineer). React 19 + Vite + TypeScript + Tailwind 4, served by nginx in Docker, behind the
quant-modeling Cloudflare tunnel. The pricing app lives on `quant.tramonihadrien.com`
(repository `HadrienT/quant-modeling`); this site presents it and links to it.

## Where things are

|                   |                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/content/`    | **All the site's text** (profile, projects, case study). A text starting with `TODO:` is a placeholder, highlighted on screen and listed by `npm test` |
| `src/sections/`   | Home page sections                                                                                                                                     |
| `src/pages/`      | Routed pages (`/`, `/projects/quant-modeling`, 404)                                                                                                    |
| `src/components/` | Shared blocks (`Text` handles placeholders, `SmartLink` internal / external / `TODO:` links)                                                           |
| `deploy/`         | nginx (including the 301s from the app's old routes to the subdomain) and security headers                                                             |
| `CV/`             | LaTeX source of the résumé, **ignored by git**. `CV/build.sh` produces the version with phone (stays there) and `public/cv.pdf`, without phone, served by the site |
| `scripts/`        | `deploy.sh` (build, restart, health check) and `auto-deploy.sh` (continuous deployment with rollback)                                                  |
| `DEPLOY.md`       | Going live and DNS switch                                                                                                                              |

## Commands

`npm run dev` · `npm test` · `npm run lint` · `npm run typecheck` ·
`npm run format:check` · `npm run build` · `npm run screenshots` (after a build; in a cloud
session: `CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`). CI runs all of
this, plus a Docker build with a smoke test.

## Rules

- **Language: English by default.** Everything you produce is in English: code, identifiers, comments, commit messages, PRs, issues, documentation and interface text. The only exception is the conversation: reply in the language the maintainer writes in, so in French when they write in French.
- Production runs from `~/Portfolio-prod` (worktree on `main`): merging a PR into `main` puts it
  live once CI is green (`DEPLOY.md`). Edit nothing in `~/Portfolio-prod`.
- Go through a branch and a PR, never directly on `main`. End commit messages with
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- No request to a third-party domain (strict CSP in `deploy/security-headers.conf`): fonts
  embedded through `@fontsource`, no analytics, no CDN.
- The quant-modeling figures (`src/content/quantModeling.ts`) come from its README: do not
  invent any, and update them when it changes.
- Never present a placeholder as a fact: the maintainer's background stays `TODO:` until they
  provide it.
- The maintainer's phone number must never appear on the site or in `public/cv.pdf`: it exists
  only in `CV/CV_TRAMONI_Hadrien.tex`.
- Content tone: a candidate for a first quant dev job. Stay factual, no "desk-grade" and no
  title not actually held.
- Check rendering with `npm run screenshots` (mobile + desktop, light + dark) before pushing a
  visual change.
