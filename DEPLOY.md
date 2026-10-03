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

On the server, next to the other repos:

```sh
git clone git@github.com:HadrienT/portfolio.git ~/portfolio
cd ~/portfolio
docker compose up -d --build
docker exec portfolio wget -qO- http://127.0.0.1:8080/health   # → ok
```

The container joins `quant-modeling-prod_default`, the network the tunnel
container is on, so cloudflared reaches it by name. If that network has
another name on the server (`docker network ls`), set `TUNNEL_NETWORK` in
`.env`.

Update later: `git pull && docker compose up -d --build`.

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
