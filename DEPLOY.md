# Deploying to Vercel

One-time setup (~10 minutes). After this, every `git push` auto-deploys.

## 1. Push this project to GitHub

Create an empty repo on GitHub named `jules-portfolio` (or anything).
Do **not** initialize it with a README — the project already has one.

Then, from this directory:

```bash
git add .
git commit -m "initial portfolio"
git branch -M main
git remote add origin git@github.com:<your-username>/jules-portfolio.git
git push -u origin main
```

(If you don't have SSH set up, use the HTTPS URL GitHub shows you.)

## 2. Connect Vercel

1. Go to <https://vercel.com/signup>, click **Continue with GitHub**.
2. After signing in, click **Add New → Project**.
3. Import your `jules-portfolio` repo.
4. Vercel detects Next.js automatically — leave all defaults and click **Deploy**.
5. First deploy takes ~60 seconds. You'll get a URL like
   `jules-portfolio.vercel.app`.

Every subsequent `git push` to `main` redeploys automatically. Branches
get preview URLs.

## 3. Custom domain (optional, later)

Register a domain at **Cloudflare Registrar** (sold at cost, ~$10/yr)
or **Porkbun**. Avoid registrars like GoDaddy that upsell aggressively.

In Vercel: **Project → Settings → Domains → Add**. Paste your domain,
then follow the single DNS instruction Vercel gives you (usually one
`CNAME` or `A` record at your registrar). Propagation takes 5–60 min.

HTTPS is handled automatically.

## 4. Updating the site

Edit `lib/content.tsx` locally, then:

```bash
git add lib/content.tsx
git commit -m "update bio"
git push
```

Vercel builds and deploys in about 60 seconds.
