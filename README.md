# Vietnam Lindy Exchange — holding page

The **planning-mode holding page** for VLX 2027: the "we will return in 2027" page with a live
countdown to the date announcement.

Fully static — plain HTML + a few lines of inline JS. **No build step, no framework, no
dependencies.** It is intended to be served at the **root** of the domain
(`https://www.thevlx.net/`) while the full site is not yet published.

> The full static site lives on the `static` branch.
> The previous Angular version lives untouched on the `the-vlx` branch.

## Files

```
.
├── index.html            # The holding page (countdown, the essentials, "relive VLX 2026")
├── og-image.png          # 1200×630 social share card (Open Graph / Twitter)
├── apple-touch-icon.png  # 180×180 iOS home-screen icon
├── favicon.svg           # Browser tab icon (paper + ink “VLX”)
├── favicon.ico
├── robots.txt            # Crawl rules — open to search + AI crawlers, points to the sitemap
├── sitemap.xml           # Single-URL sitemap
├── llms.txt              # Plain-text facts for AI assistants / answer engines
├── .nojekyll             # Stop GitHub Pages running Jekyll over the files
└── social/
    └── og-image.html     # Source for og-image.png — edit + re-render to regenerate
```

## What the page does

- Headline: *"We've been waiting. You've been waiting."* → *"We will return in 2027."*
- **Countdown** to the date announcement: **19 September 2026, 21:00 Vietnam time (GMT+7)**
- When the countdown hits zero it automatically swaps to *"The dates are out — come look!"* —
  no deploy needed for the flip
- **The essentials** — a factual summary block (what VLX is, styles, where, when, since)
- Links to the VLX 2026 photo albums, video and the dancers' Facebook group
- No theme/branding is revealed and no website URL is shown (planning mode)

## SEO, social and AI

Everything is in the `<head>` of `index.html`:

| Area | What's there |
|---|---|
| **SEO** | Keyworded `<title>`, 155-char meta description, `<link rel="canonical">`, `robots` `index,follow` with `max-image-preview:large`, `theme-color`, semantic `<header>/<main>/<footer>/<section>`, a single `<h1>`, and machine-readable `<time datetime="…">` on every date |
| **Social** | Full Open Graph set (`og:type/site_name/locale/url/title/description/image` + `image:width/height/alt`) and Twitter/X `summary_large_image` tags, all pointing at the 1200×630 `og-image.png` |
| **AI / answer engines** | A `@graph` JSON-LD block with `Organization` (incl. `sameAs` social profiles, `foundingDate`), `WebSite` and `WebPage`; the visible **essentials** fact block; `llms.txt` with quotable facts; and `robots.txt` explicitly allowing GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot and Google-Extended |

**On announcement day (19 Sept 2026)**, swap the JSON-LD graph for an `Event` entry with the real
`startDate`/`endDate` — there is a ready-to-fill template in a comment in `index.html`.

### Indexing

This branch is currently **indexable** (`index.follow`, robots allows all). To go back to
hiding the page, change the robots meta in `index.html` to
`<meta name="robots" content="noindex, nofollow" />` and disallow in `robots.txt`.

## Preview locally

```bash
python3 -m http.server 8803
# open http://localhost:8803/
```

## Publishing (GitHub Pages)

1. Repo **Settings → Pages → Build and deployment → Deploy from a branch**
2. Branch: `static-teaser`, folder: **`/ (root)`** → **Save**
3. Served at `https://<user>.github.io/<repo>/` and, once DNS points at GitHub Pages, at the
   custom domain root.

All paths are relative, so it works at a sub-path or a custom domain as-is.

> `og:url`, `og:image`, `canonical` and the sitemap all reference
> `https://www.thevlx.net/`. Until DNS points there, link previews will not fetch the image —
> update those absolute URLs if you temporarily host it somewhere else.

## Editing

| What | Where |
|---|---|
| Countdown target | `index.html` → `new Date('2026-09-19T21:00:00+07:00')` (also update the `<time>` elements) |
| Headline / copy | `index.html` → `h1`, `.call`, `h2.return` |
| **The essentials** facts | `index.html` → the `.facts` `<dl>` |
| Social share image | `social/og-image.html` → re-render to `og-image.png` (1200×630) |
| Meta / OG / JSON-LD | `index.html` `<head>` |
| AI summary | `llms.txt` |
| Facebook / Instagram links | `index.html` → `.mem` cards and `.socials` nav |
| Colours & fonts | `index.html` → the `:root` custom properties in the `<style>` block |
