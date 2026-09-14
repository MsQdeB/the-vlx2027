# The VLX 2027 — Vietnam Lindy Exchange

Official website for the **17th edition** of the Vietnam Lindy Exchange.
**March 19–21, 2027 · Hội An, Vietnam** — [www.thevlx.net](https://www.thevlx.net/)

This branch (`static`) is a **fully static website** — plain HTML + CSS + a little
vanilla JS. There is **no build step, no framework, and no dependencies**. Drop the
files on any static host and it just works.

> The previous Angular version lives untouched on the `the-vlx` branch.

## Structure

```
.
├── index.html          # The full magazine-cover homepage (all sections)
├── terms.html          # Terms & Conditions (a real file → HTTP 200 on GitHub Pages)
├── volunteers.html     # Volunteer application (a real file)
├── styles.css          # One consolidated stylesheet (design tokens + all components)
├── app.js              # The only script: menu, countdown, gallery, scroll-to-top
├── vlx-2027.ics        # Calendar file (Apple / .ics download)
├── robots.txt          # Planning-mode crawl rules
├── favicon.svg
├── favicon.ico
├── assets/             # All images + locally-hosted Font Awesome
│   ├── gallery/        #   ~35 slideshow photos
│   ├── live-bands/     #   band photos
│   ├── overview/       #   venue / programme photos
│   ├── fontawesome/    #   Font Awesome CSS + webfonts (no CDN needed)
│   └── …
├── teaser/             # The old holding page (kept working as-is)
└── static-preview/     # Reference screenshots of the static build
```

**Everything is relative.** There are no leading-`/` paths, so the site works
identically at a domain root (`https://example.com/`), at a project subpath
(`https://example.com/the-vlx2027/`) or on a custom domain — with no rebuild.

## Preview locally

Any plain static server will do — there is **no SPA fallback**, which is the point:

```bash
python3 -m http.server 8803
# then open http://localhost:8803/
```

`index.html`, `terms.html`, `volunteers.html`, `vlx-2027.ics` and the asset URLs
all resolve to real files (HTTP 200).

## Publishing

### GitHub Pages (recommended)

1. Push this branch (or merge it into the branch Pages serves).
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Choose the branch and the **`/ (root)`** folder, then **Save**.

Because every link is relative, it works whether Pages serves the site at the
repository sub-path (`…github.io/the-vlx2027/`) or at a custom domain.

> At go-live remember to (a) delete the `noindex` meta lines from the three HTML
> files (there is a comment marking them) and (b) open `robots.txt` back up.

### Any other static host

Upload the repository root — `index.html`, `styles.css`, `app.js`, `assets/`,
`vlx-2027.ics`, `robots.txt` — to Netlify, Cloudflare Pages, S3, nginx, etc. No
`package.json`, no build command, no `node_modules`.

## Editing content

All content is plain HTML in the root files. Nothing is generated, so you edit and
save — no rebuild.

| What | Where |
|---|---|
| Masthead, nav links | `index.html` (and the same block in `terms.html` / `volunteers.html`) |
| Announcement text | `index.html` → `announcement-container` |
| Programme / venues / map links | `index.html` → `overview-container` |
| **Registration open date** (countdown) | `app.js` → the `target` date in the *registration timer* block |
| Registration / pricing text | `index.html` → `registrations-container` |
| T-shirt pre-order | `index.html` → `tshirt-preorder-section` |
| Bands line-up | `index.html` → `livebands-container` |
| Transportation | `index.html` → `transportation-container` |
| Accommodation + map link | `index.html` → `accommodation-container` |
| YouTube after-movie | `index.html` → `youtube-container` (`<iframe src="…/embed/VIDEO_ID">`) |
| Gallery photos | `index.html` → the thumbnail filmstrip (add/remove `<div class="thumbnail">` entries; the counter/total is computed by `app.js`) |
| Calendar buttons | `index.html` → `save-buttons` (Google / Outlook / Yahoo links + `vlx-2027.ics`) and `vlx-2027.ics` itself |
| FAQ | `index.html` → `faq-container` (native `<details>` items) |
| Footer / socials | `index.html` (and the footer block in `terms.html` / `volunteers.html`) |
| Terms & Conditions | `terms.html` |
| Volunteer call | `volunteers.html` |

### Design tokens

The vintage “magazine / broadsheet” look is driven by the custom properties at the
top of `styles.css` (`--paper`, `--ink`, `--red`, `--serif`, `--display`, `--sans`,
`--blackletter`, …). Change a token there and the whole site follows. Fonts
(UnifrakturMaguntia, Playfair Display, Lora, Libre Franklin) are loaded from Google
Fonts; Font Awesome is served locally from `assets/fontawesome/`.
