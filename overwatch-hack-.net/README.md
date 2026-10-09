# Destiny 2 Hack (destiny2hack.org)

Static Astro site for Destiny 2 — Aimbot, ESP, wallhack, radar — deployed with Cloudflare Workers.

```bash
npm install
npm run dev
npm run build
npx wrangler deploy
```

## Cloudflare: “repository no longer exists”

Cloudflare still points at an old GitHub repo. Fix it in the dashboard (not in code):

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → your worker (`destiny2hack`).
2. **Settings** → **Builds** → **Disconnect** the broken Git repository.
3. Either **Connect** again and choose **`aroojnewcode/destiny-2-hack-net`** / branch **`main`**, or leave Git disconnected and use **GitHub Actions** (`.github/workflows/deploy.yml`).
4. On GitHub: **Settings → Secrets and variables → Actions** — add `CLOUDFLARE_API_TOKEN` (Workers edit) and `CLOUDFLARE_ACCOUNT_ID` (dashboard URL).
5. On GitHub: **Settings → Applications** → Cloudflare Workers & Pages → grant access to **`destiny-2-hack-net`** if you reconnect Git in Cloudflare.
