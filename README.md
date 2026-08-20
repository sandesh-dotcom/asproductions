# AS Production

Landing page for **AS Production** — an end-to-end event production and execution company delivering technology events, conferences, hackathons and corporate experiences across India.

Live domain: [asproductions.in](https://asproductions.in)

## Stack

Plain HTML/CSS/JS — no build step, no dependencies. Fonts are loaded from Google Fonts (Fraunces + Space Mono + Inter).

```
index.html            → markup / content
styles.css             → white/yellow/black poster theme, neo-brutalist hard shadows
script.js              → scroll reveals, magnetic buttons, polaroid tilt, marquees, nav
assets/placeholders/   → dummy client-logo marks (SVG, self-contained)
CNAME                  → custom domain for GitHub Pages (asproductions.in)
```

**Images right now are dummy placeholders**, not final assets:
- Photos (hero, work panels, gallery strip, testimonial avatars) load from [Lorem Picsum](https://picsum.photos) with fixed seeds (`?seed=asprod-...`) — random stock-style photography, just for layout. Requires internet access to load; swap each `src` for a real photo when ready (search `picsum.photos` in `index.html` to find every instance).
- Client logos in `assets/placeholders/logo-0*.svg` are invented abstract marks (no real brand names/logos) — purely to show the grid's grayscale-to-color hover treatment. Replace the files (or the `src` paths) with real partner logos once confirmed.

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
- [ ] Swap dummy client logos in `#clients` for real partner logos once confirmed
- [ ] Swap dummy Picsum photos (hero, `#work`, `#gallery`, testimonial avatars) for real event photography
- [ ] Add real social links in the footer (LinkedIn, Instagram, YouTube)
- [ ] Confirm `hello@asproductions.in` is a live inbox
