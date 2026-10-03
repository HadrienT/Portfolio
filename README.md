# Portfolio

Source of [tramonihadrien.com](https://tramonihadrien.com): a personal site
for recruiters, with a case study of
[quant-modeling](https://github.com/HadrienT/quant-modeling), whose app moves
to [quant.tramonihadrien.com](https://quant.tramonihadrien.com).

React 19 + Vite + TypeScript + Tailwind 4, served by nginx, self-hosted behind
a Cloudflare tunnel. No third-party request: fonts are bundled, no analytics.

## Develop

```sh
npm install
npm run dev          # http://localhost:5190
npm test             # vitest — also lists the content placeholders left
npm run lint && npm run typecheck && npm run format:check
npm run build
npm run screenshots  # after a build: full-page PNGs in screenshots/
```

## Edit the content

Everything personal is in `src/content/`:

| File               | What                                                     |
| ------------------ | -------------------------------------------------------- |
| `profile.ts`       | name, pitch, about, experience, education, skills, links |
| `projects.ts`      | the project cards                                        |
| `quantModeling.ts` | the quant-modeling case study (numbers from its README)  |

A string starting with `TODO:` is a placeholder: the page shows it
highlighted in amber, a `TODO:` link renders as plain text, and `npm test`
prints the list of those left. The résumé goes in `public/cv.pdf`, then set
`cv: "/cv.pdf"`.

## Deploy

See [DEPLOY.md](DEPLOY.md).
