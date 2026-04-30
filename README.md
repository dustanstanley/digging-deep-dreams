# Myers Underground Utilities — Website

Marketing site for Myers Underground Utilities. Built with **React 18 + Vite + TypeScript + Tailwind CSS**, with a backend powered by **Supabase** (database, edge functions) and **Resend** (transactional email for the contact form).

This README documents how to take this codebase and deploy it on **your own infrastructure** (any Linux server, VPS, or static host) — independent of Lovable.

---

## Table of Contents

1. [What's in the box](#1-whats-in-the-box)
2. [Prerequisites](#2-prerequisites)
3. [Required accounts & API keys](#3-required-accounts--api-keys)
4. [Local setup](#4-local-setup)
5. [Supabase backend setup](#5-supabase-backend-setup)
6. [Edge function deployment (contact form email)](#6-edge-function-deployment-contact-form-email)
7. [Building the frontend for production](#7-building-the-frontend-for-production)
8. [Deploying the frontend to your own server](#8-deploying-the-frontend-to-your-own-server)
9. [Going live — production checklist](#9-going-live--production-checklist)
10. [Updating the site](#10-updating-the-site)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. What's in the box

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 + TypeScript |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Routing | React Router v6 (SPA) |
| Forms | react-hook-form + zod validation |
| Backend | Supabase (Postgres + Edge Functions) |
| Email | Resend (via the contact form edge function) |

The frontend compiles to a fully static bundle (HTML/CSS/JS). The only server-side piece is a single Supabase Edge Function (`send-contact-email`) that the contact form calls.

---

## 2. Prerequisites

Install on your development machine **and** your deployment server:

- **Node.js** 18.x or 20.x (LTS recommended) — https://nodejs.org
- **npm** 9+ (bundled with Node) — or **bun** / **pnpm** if you prefer
- **Git** — to clone the repository
- **Supabase CLI** (for deploying edge functions and migrations) — https://supabase.com/docs/guides/cli/getting-started
  ```bash
  npm install -g supabase
  ```

For the **production web server**, any of these will work:
- Nginx (recommended)
- Apache
- Caddy
- Or a static-file host (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, etc.)

---

## 3. Required accounts & API keys

You will need accounts and credentials for:

### a. Supabase (backend / database)
- Create a free project at https://supabase.com
- From **Project Settings → API**, copy:
  - `Project URL` (looks like `https://xxxxx.supabase.co`)
  - `anon` / `public` key (safe to expose in the frontend)
  - `service_role` key (server-side only — keep secret)
- From **Project Settings → General**, copy the `Reference ID` (used by the CLI)

### b. Resend (transactional email)
- Sign up at https://resend.com
- Verify your sending domain (e.g. `myersunderground.com`) — instructions in the Resend dashboard. Until verified, you can only send from `onboarding@resend.dev` to your own verified email.
- Create an API key under **API Keys** → copy the value (starts with `re_...`)

---

## 4. Local setup

```bash
# 1. Clone the repository
git clone <your-repo-url> myers-website
cd myers-website

# 2. Install dependencies
npm install

# 3. Create the environment file (see next section)
cp .env.example .env   # if provided, otherwise create manually

# 4. Run the dev server
npm run dev
```

The site will be available at http://localhost:8080.

### Environment variables (`.env`)

Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL="https://YOUR-PROJECT-REF.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGc...your-anon-key"
VITE_SUPABASE_PROJECT_ID="YOUR-PROJECT-REF"
```

> Only variables prefixed with `VITE_` are exposed to the frontend. Never put secret keys here — they get bundled into the client.

---

## 5. Supabase backend setup

This project currently has **no database tables** — the contact form sends email directly via an edge function. If you add features that need a database later, place migrations in `supabase/migrations/` and run them with the CLI.

### Link the CLI to your project

```bash
supabase login
supabase link --project-ref YOUR-PROJECT-REF
```

### Apply migrations (if/when present)

```bash
supabase db push
```

---

## 6. Edge function deployment (contact form email)

The contact form calls a Supabase Edge Function at `supabase/functions/send-contact-email/index.ts`, which sends email via Resend.

> **Note:** the existing function uses Lovable's connector gateway (`connector-gateway.lovable.dev`). When deploying outside Lovable, change it to call Resend directly. See the patch at the end of this section.

### a. Configure secrets on your Supabase project

```bash
supabase secrets set RESEND_API_KEY="re_your_resend_api_key"
```

### b. Update recipients

Open `supabase/functions/send-contact-email/index.ts` and replace the test recipients with the real production addresses:

```ts
const RECIPIENTS = ["estimating@myersunderground.com"];
const FROM_ADDRESS = "Myers Underground <noreply@myersunderground.com>";
```

> `FROM_ADDRESS` must use a domain you've verified inside Resend.

### c. Patch the function to call Resend directly (no Lovable gateway)

Replace the gateway block with a direct Resend call:

```ts
const RESEND_URL = "https://api.resend.com/emails";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const resp = await fetch(RESEND_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${RESEND_API_KEY}`,
  },
  body: JSON.stringify({
    from: FROM_ADDRESS,
    to: RECIPIENTS,
    reply_to: d.email,
    subject: `Project Inquiry — ${d.projectType} (${d.name})`,
    html,
  }),
});
```

You can also delete the `LOVABLE_API_KEY` references — they are not needed off-platform.

### d. Deploy the function

```bash
supabase functions deploy send-contact-email --no-verify-jwt
```

`--no-verify-jwt` lets anonymous visitors submit the contact form without logging in.

### e. Verify it works

```bash
curl -X POST "https://YOUR-PROJECT-REF.supabase.co/functions/v1/send-contact-email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "name":"Test","email":"you@example.com","phone":"5555555555",
    "projectType":"Other","message":"Testing the deployment."
  }'
```

You should receive the email within a few seconds.

---

## 7. Building the frontend for production

```bash
npm run build
```

This produces a static bundle in `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ... (images, fonts)
├── robots.txt
└── sitemap.xml
```

Test the build locally:

```bash
npm run preview
```

---

## 8. Deploying the frontend to your own server

The `dist/` folder is **fully static** — drop it on any web server.

### Option A — Nginx (recommended for a VPS)

1. Copy `dist/` to your server, e.g. `/var/www/myers-website`:
   ```bash
   scp -r dist/* user@your-server:/var/www/myers-website/
   ```

2. Create `/etc/nginx/sites-available/myers-website`:

   ```nginx
   server {
       listen 80;
       server_name myersunderground.com www.myersunderground.com;

       root /var/www/myers-website;
       index index.html;

       # SPA fallback — all routes return index.html
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Long cache for hashed assets
       location /assets/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Don't cache index.html
       location = /index.html {
           add_header Cache-Control "no-cache, no-store, must-revalidate";
       }

       gzip on;
       gzip_types text/plain text/css application/javascript application/json image/svg+xml;
   }
   ```

3. Enable the site and reload:
   ```bash
   sudo ln -s /etc/nginx/sites-available/myers-website /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. Add HTTPS with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d myersunderground.com -d www.myersunderground.com
   ```

### Option B — Apache

Drop `dist/` into your DocumentRoot and add to `.htaccess`:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Option C — Caddy (simplest, auto-HTTPS)

Caddyfile:
```
myersunderground.com {
    root * /var/www/myers-website
    try_files {path} /index.html
    file_server
    encode gzip
}
```

### Option D — Static host (Netlify / Vercel / Cloudflare Pages / S3)

Upload the contents of `dist/`. Configure the host's SPA fallback so unknown routes serve `index.html`. Set the build command to `npm run build` and output directory to `dist`.

---

## 9. Going live — production checklist

- [ ] DNS A/AAAA records point to your server's IP
- [ ] HTTPS certificate installed and auto-renews
- [ ] `.env` on the build machine has the **production** Supabase URL and anon key
- [ ] `supabase/functions/send-contact-email/index.ts` has **production** recipients (`estimating@myersunderground.com`)
- [ ] `FROM_ADDRESS` uses a Resend-verified domain
- [ ] `RESEND_API_KEY` is set in Supabase secrets
- [ ] Edge function deployed (`supabase functions deploy send-contact-email --no-verify-jwt`)
- [ ] Submitted a test contact form and confirmed email arrival
- [ ] `public/sitemap.xml` URLs reference the live domain
- [ ] `public/robots.txt` references the live sitemap URL
- [ ] Open Graph / canonical URLs in `index.html` match the live domain
- [ ] Tested in mobile + desktop browsers

---

## 10. Updating the site

After making changes locally:

```bash
git pull                # or commit your edits
npm install             # if dependencies changed
npm run build           # rebuild dist/
rsync -avz --delete dist/ user@your-server:/var/www/myers-website/
```

If you changed the edge function, redeploy it:

```bash
supabase functions deploy send-contact-email --no-verify-jwt
```

---

## 11. Troubleshooting

**Contact form returns 500 / email never arrives**
- Check edge function logs: `supabase functions logs send-contact-email`
- Verify `RESEND_API_KEY` is set: `supabase secrets list`
- Verify the `FROM_ADDRESS` domain is verified in Resend

**404 when refreshing a deep link (e.g. `/about`)**
- The web server isn't doing SPA fallback. See the Nginx / Apache / Caddy snippets above — every unknown route must return `index.html`.

**Blank page in production, errors in console**
- Almost always a missing or wrong `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` at build time. Rebuild after fixing `.env`.

**CORS error calling the edge function**
- The function returns `corsHeaders` already. Make sure you didn't strip the `OPTIONS` preflight handler.

**Logo or images don't load**
- Confirm `dist/assets/` was uploaded in full and Nginx has read permissions on the directory.

---

## License & ownership

Proprietary — © Myers Underground Utilities. All rights reserved.
