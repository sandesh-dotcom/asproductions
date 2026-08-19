# AS Production

Landing page for **AS Production** — an end-to-end event production and execution company delivering technology events, conferences, hackathons and corporate experiences across India.

Live domain: [asproductions.in](https://asproductions.in)

## Stack

Plain HTML/CSS/JS — no build step, no dependencies. Fonts are loaded from Google Fonts (Space Grotesk + Inter).

```
index.html    → markup / content
styles.css    → dark, cinematic theme (near-black + electric lime accent)
script.js     → scroll reveals, count-up stats, glass navbar, mobile nav
CNAME         → custom domain for GitHub Pages (asproductions.in)
```

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

### Option A — GitHub Pages (repo already includes `CNAME`)

1. Repo Settings → Pages → Deploy from branch → `main` / root.
2. In your DNS provider for `asproductions.in`, add:
   - `A` records for the apex domain pointing to GitHub Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `CNAME` record for `www` → `<your-github-username>.github.io`
3. Wait for DNS to propagate, then enable **Enforce HTTPS** in Pages settings.

### Option B — Vercel / Netlify

Import the repo as a static site (no build command, publish directory = `/`), then attach `asproductions.in` in the project's domain settings and follow their DNS instructions.

## Content to update before launch

- [ ] Replace placeholder testimonials in `index.html` (`#testimonials`) with real client quotes
- [ ] Add real partner/client logos in `#clients` (currently placeholder slots)
- [ ] Swap the abstract CSS visuals in `#work` for real event photography/video
- [ ] Add real social links in the footer (LinkedIn, Instagram, YouTube)
- [ ] Confirm `hello@asproductions.in` is a live inbox
