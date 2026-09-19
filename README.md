# The VLX 2027 — Vietnam Lindy Exchange

Official website for the **17th edition** of the Vietnam Lindy Exchange.
**March 19–21, 2027 · Hội An, Vietnam** — [www.thevlx.net](https://www.thevlx.net/)

This branch (`vlx-2027-minimal-homepage`) is a **minimal, editorial homepage** —
plain HTML + CSS + a little vanilla JS, with **no build step, no framework, and no
dependencies**. Drop the files on any static host and it just works.

It is intentionally **light on confirmed detail**: many venues, bands, DJs, themes
and floors are still being confirmed, so those fields read *“To be updated”* and the
page focuses on **save-the-date energy** — dates, a registration countdown, and a
first look at the programme. The fuller site lives on the `static` branch.

> The previous Angular version lives untouched on the `the-vlx` branch.
> The planning-mode holding page lives on the `static-teaser` branch.

## What this branch changes vs `static`

- **Removed** the Transportation, Accommodation and Terms sections (and `terms.html`).
- **Programme** trimmed to a minimal, editorial layout — every venue, music line and
  floor reads *“To be updated”*; themes are set in small type; “Afternoon Tea Dance in
  Old Town” → **“Afternoon Dance”**; Sunday 20:00–00:00 is now the **Farewell Dance**.
  Photos are kept as reference from previous editions.
- **Live bands**: the two band profiles were replaced with a short teaser — the
  line-up is *“to be announced soon”*.
- **In Motion**: added last year's recap video (a Facebook reel) alongside the
  existing highlights video.
- **Archives**: kept the photo slideshow and added a link out to the full Facebook
  photo album.
- **T-shirt pre-order** section removed.
- **Save the dates**: only the **Google Calendar** button remains (Outlook, Yahoo and
  the `.ics` download were removed).
- **FAQ** adjusted to match (no transportation / accommodation / terms references).

## Structure

```
.
├── index.html          # The minimal editorial homepage (all sections)
├── volunteers.html     # Volunteer application (internal, noindex, unlinked)
├── styles.css          # One consolidated stylesheet (design tokens + all components)
├── app.js              # The only script: menu, countdown, gallery, scroll-to-top
├── robots.txt          # Planning-mode crawl rules
├── favicon.ico / favicon-*.png / apple-touch-icon.png
├── assets/             # All images + locally-hosted Font Awesome
│   ├── gallery/        #   ~35 slideshow photos (previous editions)
│   ├── live-bands/     #   band photos (kept for when the line-up is announced)
│   └── fontawesome/    #   Font Awesome CSS + webfonts (no CDN needed)
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

`index.html`, `volunteers.html` and the asset URLs all resolve to real files (HTTP 200).

## Publishing

### GitHub Pages (recommended)

1. Push this branch (or merge it into the branch Pages serves).
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Choose the branch and the **`/ (root)`** folder, then **Save**.

Because every link is relative, it works whether Pages serves the site at the
repository sub-path (`…github.io/the-vlx2027/`) or at a custom domain.

> At go-live remember to (a) delete the `noindex` meta lines from the HTML files
> (there is a comment marking them) and (b) open `robots.txt` back up.

### Any other static host

Upload the repository root — `index.html`, `styles.css`, `app.js`, `assets/`,
`robots.txt` — to Netlify, Cloudflare Pages, S3, nginx, etc. No `package.json`,
no build command, no `node_modules`.

## Editing content

All content is plain HTML in the root files. Nothing is generated, so you edit and
save — no rebuild.

| What | Where |
|---|---|
| Masthead, nav links | `index.html` (and the same block in `volunteers.html`) |
| Announcement text | `index.html` → `announcement-container` |
| **Registration open date** (countdown) | `app.js` → the `target`/`MILESTONES` dates in the *registration timer* block |
| Registration / pricing text | `index.html` → `registrations-container` |
| Programme (days, times, venues, music, floors, themes) | `index.html` → `overview-container` |
| Live bands teaser | `index.html` → `livebands-container` |
| Videos (YouTube + Facebook reel) | `index.html` → `youtube-container` (`videos-grid`) |
| Gallery photos + Facebook album link | `index.html` → `gallery-container` |
| Calendar button | `index.html` → `save-buttons` |
| FAQ | `index.html` → `faq-container` (native `<details>` items) |
| Footer / socials | `index.html` (and the footer block in `volunteers.html`) |
| Volunteer call | `volunteers.html` |

### Design tokens

The vintage “magazine / broadsheet” look is driven by the custom properties at the
top of `styles.css` (`--paper`, `--ink`, `--red`, `--serif`, `--display`, `--sans`,
`--blackletter`, …). Change a token there and the whole site follows. Fonts
(UnifrakturMaguntia, Playfair Display, Lora, Libre Franklin) are loaded from Google
Fonts; Font Awesome is served locally from `assets/fontawesome/`.
