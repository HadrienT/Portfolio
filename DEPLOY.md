# Deploy

Target: `tramonihadrien.com` serves this site; the quant-modeling app moves to
`quant.tramonihadrien.com`. Both run on the same server behind the Cloudflare
tunnel quant-modeling already runs (`quant-modeling-tunnel`), which routes by
hostname. No port is opened on the host.

```
Cloudflare tunnel ─┬─ tramonihadrien.com, www  → portfolio:8080       (this repo)
                   └─ quant.tramonihadrien.com → quant-modeling:8080  (unchanged)
```

## 1. Run the site

Two folders on the server, as for quant-modeling: `~/Portfolio` is where the
site is written (branches, PRs), `~/Portfolio-prod` is a git worktree that
stays on `main` and is the only one the site is built from.

```sh
git clone https://github.com/HadrienT/Portfolio.git ~/Portfolio
cd ~/Portfolio && git worktree add ~/Portfolio-prod main
~/Portfolio-prod/scripts/deploy.sh    # build, restart, check /health, / and /cv.pdf
```

The container joins `quant-modeling-prod_default`, the network the tunnel
container is on, so cloudflared reaches it by name. If that network has
another name on the server (`docker network ls`), set `TUNNEL_NETWORK` in
`.env`.

### Continuous deployment

Merging into `main` is what puts a change online. Every two minutes a systemd
user timer runs `scripts/auto-deploy.sh` in `~/Portfolio-prod`:

1. nothing new on `origin/main` → nothing happens;
2. the commit's GitHub checks are still running → wait for the next tick;
3. a check failed → the commit is not deployed;
4. all green → fast-forward and run `scripts/deploy.sh`;
5. the deploy fails (build, health check) → back to the previous commit, which
   is deployed again, and the unit ends `failed`.

A commit that failed is not tried again: push a fix. Each attempt shows up
under the repository's _Deployments_ on GitHub.

```sh
cp deploy/autodeploy@.service deploy/autodeploy@.timer ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now autodeploy@Portfolio-prod.timer

journalctl --user -u 'autodeploy@*' -f    # follow it
systemctl --user --failed                  # a deploy that was rolled back
```

The server pulls rather than GitHub pushing: no port is open, and a
self-hosted Actions runner on a public repository would let a pull request run
code on the server. The script and the two units are the same in
quant-modeling and data-ingest (`autodeploy@quant-modeling-prod`,
`autodeploy@data-ingest`).

By hand, if ever needed: `~/Portfolio-prod/scripts/deploy.sh`.

Start on boot: the container has `restart: unless-stopped`, so dockerd brings
it back. `deploy/portfolio.service` is the safety net, a systemd user unit that
recreates the container if it is gone:

```sh
cp deploy/portfolio.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now portfolio.service
loginctl show-user "$USER" -p Linger   # must be yes (else: loginctl enable-linger)
```

After a change to `deploy/portfolio.service`, copy it again and reload: systemd
reads the copy, not the one in the repo.

## 2. quant-modeling on its subdomain

A PR in quant-modeling, merged and deployed **before** step 3:

- `docker-compose.prod.yml`: `QM_PUBLIC_URL=https://quant.tramonihadrien.com`
  and `quant.tramonihadrien.com` in the default of `CORS_ALLOW_ORIGINS`.
- Google Cloud console → OAuth client: add
  `https://quant.tramonihadrien.com/api/auth/google/callback` to the authorised
  redirect URIs (keep the old one until the switch is done).
- `deploy/RUNBOOK.md` and the README link: the new hostname.

## 3. Cloudflare

Zero Trust → Networks → Tunnels → the quant-modeling tunnel → Public Hostname:

| Subdomain | Domain               | Service                                  |
| --------- | -------------------- | ---------------------------------------- |
| `quant`   | `tramonihadrien.com` | `http://quant-modeling:8080`             |
| _(empty)_ | `tramonihadrien.com` | `http://portfolio:8080` (was `app:8080`) |
| `www`     | `tramonihadrien.com` | `http://portfolio:8080` (was `app:8080`) |

Add `quant` first and check it, then switch the two others. Old links such as
`tramonihadrien.com/price?...` are sent to the same path on
`quant.tramonihadrien.com` by a 301 in `deploy/nginx.conf`.

## 4. Check

```sh
curl -sI https://tramonihadrien.com/ | head -1                 # 200
curl -sI https://tramonihadrien.com/price | grep -i location   # quant.tramonihadrien.com/price
curl -sf https://quant.tramonihadrien.com/health
```

Then sign in with Google on the quant app, to confirm the OAuth callback.
