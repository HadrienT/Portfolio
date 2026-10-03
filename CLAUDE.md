# portfolio — notes pour Claude Code

Site vitrine de `tramonihadrien.com`, pour se faire recruter (quant dev C++ /
ingénieur logiciel & ML). React 19 + Vite + TypeScript + Tailwind 4, servi par
nginx dans Docker, derrière le tunnel Cloudflare de quant-modeling. L'app de
pricing vit sur `quant.tramonihadrien.com` (dépôt `HadrienT/quant-modeling`) ;
ce site la présente et y renvoie.

## Où sont les choses

|                   |                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/`    | **Tout le texte du site** (profil, projets, étude de cas). Un texte qui commence par `TODO:` est un placeholder, surligné à l'écran et listé par `npm test` |
| `src/sections/`   | Sections de la page d'accueil                                                                                                                               |
| `src/pages/`      | Pages routées (`/`, `/projects/quant-modeling`, 404)                                                                                                        |
| `src/components/` | Briques partagées (`Text` gère les placeholders, `SmartLink` les liens internes / externes / `TODO:`)                                                       |
| `deploy/`         | nginx (dont les 301 des anciennes routes de l'app vers le sous-domaine) et en-têtes de sécurité                                                             |
| `DEPLOY.md`       | Mise en ligne et bascule DNS                                                                                                                                |

## Commandes

`npm run dev` · `npm test` · `npm run lint` · `npm run typecheck` ·
`npm run format:check` · `npm run build` · `npm run screenshots` (après un
build ; en session cloud : `CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).
La CI lance tout cela, plus un build Docker avec test de fumée.

## Règles

- Conversation avec le mainteneur : **en français**. Code, commentaires,
  commits et contenu du site : **en anglais**.
- Passer par une branche et une PR, jamais directement sur `main`. Terminer
  les messages de commit par `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- Aucune requête vers un domaine tiers (CSP stricte dans
  `deploy/security-headers.conf`) : polices embarquées via `@fontsource`, pas
  d'analytics, pas de CDN.
- Les chiffres de quant-modeling (`src/content/quantModeling.ts`) viennent de
  son README : ne pas en inventer, les mettre à jour quand il change.
- Ne jamais présenter un placeholder comme un fait : le parcours du mainteneur
  reste en `TODO:` tant qu'il ne l'a pas fourni.
- Vérifier le rendu par `npm run screenshots` (mobile + desktop, clair +
  sombre) avant de pousser un changement visuel.
