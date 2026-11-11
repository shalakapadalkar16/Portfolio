# Shalaka Padalkar — Portfolio

Personal portfolio built with **React 18 + TypeScript + Vite**. No UI framework, just hand-written CSS.

## Run locally

```bash
npm install        # first time only
npm run dev        # http://localhost:5173 (hot-reloads on save)
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Type-check, then build static files into `dist/` |
| `npm run preview` | Serve the production build at http://localhost:4173 |
| `npm run typecheck` | Type-check only |

## Editing content

**Almost everything lives in [`src/data/profile.ts`](src/data/profile.ts):** jobs, projects, skills, education, links and metrics.
Wrap text in `**double asterisks**` to make it bold. The whole page renders from this file.

```
src/
  data/profile.ts       ← content (edit this)
  types.ts              ← content types (TypeScript catches missing fields)
  components/           ← one component per section, plus the command palette and contact form
  hooks/                ← theme, scroll-spy, reveal-on-scroll, toast
  styles/global.css     ← theme tokens at the top (light + dark)
public/
  profile.jpg, favicon-*.png, apple-touch-icon.png   ← static files (tab icons are cropped from the photo)
```

## Contact form

Messages are delivered to your inbox by [Web3Forms](https://web3forms.com) (free: 250/month). The site POSTs the form straight to their API, with no backend needed. Reply-To is set to the sender, so hitting **Reply** in Gmail answers them.

- **Local:** put your key in `.env.local` as `VITE_WEB3FORMS_KEY=...` (gitignored; see `.env.example`). Restart `npm run dev` after changing it.
- **GitHub Pages:** go to repo Settings → Secrets and variables → Actions → **Variables** → add `WEB3FORMS_KEY`.
- **Vercel:** go to Project Settings → Environment Variables → add `VITE_WEB3FORMS_KEY`.
- **No key set:** the form shows a "not set up yet" notice pointing to LinkedIn, and Send is disabled.
- Your email address is intentionally **not** on the site (not even in the JS bundle). It lives only in your Web3Forms account.
- Visitors type their own reason; emails arrive with subject `[Portfolio] <reason> (from <name>)`, which makes a handy Gmail filter.

The access key is public by design: it can only send mail *to you*.

## Before publishing

- [ ] Add your résumé PDF to `public/` and set `links.resume` in `profile.ts` (the button stays hidden until then)
- [ ] Set `links.github` (the icon stays hidden until then)
- [ ] Check the LinkedIn URL
- [ ] Add bullets for the TCS role (search for `TODO` in `profile.ts`)
- [ ] Add `repo` / `live` links to projects if they're public
- [ ] Check each project's `flow` (architecture pipeline)
- [ ] Once you have a domain, make the `og:image` URL in `index.html` absolute

## Deploy

This folder sits inside a parent git repo (Desktop), so start its own repo first:

```bash
git init && git add . && git commit -m "Initial portfolio"
```

**GitHub Pages:** push to GitHub, then go to Settings → Pages → Source: **GitHub Actions**.
The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.
Builds use relative paths (`base: './'`), so they work both at `username.github.io` and at `username.github.io/repo-name/`.

**Vercel:** import the repo (it auto-detects Vite) or run `npx vercel`. Build command `npm run build`, output directory `dist`.
