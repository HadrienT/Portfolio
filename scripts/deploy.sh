#!/usr/bin/env bash
# Build and (re)start the site from this checkout, then check it answers.
#
#   scripts/deploy.sh
#
# Run by scripts/auto-deploy.sh (which sets DEPLOY_NO_PULL=1 to deploy exactly
# the commit it checked), or by hand. Exits non-zero if the site is not healthy.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -z "${DEPLOY_NO_PULL:-}" ]]; then
  git pull --ff-only --quiet 2>/dev/null &&
    echo "→ synced with $(git rev-parse --abbrev-ref '@{u}')" ||
    echo "⚠ git pull skipped (offline or diverged) — deploying the current checkout"
fi

echo "→ deploying $(git rev-parse --short HEAD)"
# Built before anything is restarted: a build that fails leaves the site as is.
docker compose build
# --wait fails unless the container ends up healthy (/health, see Dockerfile).
docker compose up -d --wait --wait-timeout 120

# /health is nginx alone; also check what the build produced.
fetch() { docker exec portfolio wget -qO- "http://127.0.0.1:8080$1"; }
fetch / | grep -q '<div id="root">' || { echo "✗ / does not serve the app" >&2; exit 1; }
fetch /cv.pdf | head -c 5 | grep -q '%PDF-' || { echo "✗ /cv.pdf is not a PDF" >&2; exit 1; }

docker image prune -f >/dev/null
echo "✓ deployed $(git rev-parse --short HEAD)"
