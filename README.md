# Vietnam Lindy Exchange — holding page

The **planning-mode holding page** for VLX 2027: the "we will return in 2027" page
with a live countdown to the date announcement.

Fully static — plain HTML + a few lines of inline JS. **No build step, no framework,
no dependencies.** It is intended to be served at the **root** of the domain
(`https://www.thevlx.net/`) while the full site is not yet published.

> The full static site lives on the `static` branch.
> The previous Angular version lives untouched on the `the-vlx` branch.

## Files

```
.
├── index.html      # The holding page (countdown + "relive VLX 2026" links)
├── robots.txt      # Disallows all crawlers while in planning mode
├── favicon.svg
└── favicon.ico
```

## What the page does

- Headline: *"We've been waiting. You've been waiting."* → *"We will return in 2027."*
- **Countdown** to the date announcement: **19 September 2026, 21:00 Vietnam time (GMT+7)**
- When the countdown reaches zero it automatically swaps to
  *"The dates are out — come look!"* — no deploy needed for the flip
- Links to the VLX 2026 photo albums, video and the dancers' Facebook group
- No theme/branding is revealed and no website URL is shown (planning mode)

## Preview locally

```bash
python3 -m http.server 8803
# open http://localhost:8803/
```

## Publishing (GitHub Pages)

1. Repo **Settings → Pages → Build and deployment → Deploy from a branch**
2. Branch: `static-teaser`, folder: **`/ (root)`** → **Save**
3. The page is then served at `https://<user>.github.io/<repo>/` and, once DNS is
   pointed at GitHub Pages, at your custom domain root.

All paths are relative, so it works at a sub-path or a custom domain as-is.

## Editing

| What | Where |
|---|---|
| Countdown target (announcement date/time) | `index.html` → `new Date('2026-09-19T21:00:00+07:00')` |
| Headline / copy | `index.html` → the `h1`, `.call` and `.return` elements |
| Facebook / Instagram links | `index.html` → the `.mem` cards and the `.socials` nav |
| "Relive VLX 2026" cards | `index.html` → `.mem-grid` |
| Colours & fonts | `index.html` → the `:root` custom properties in the `<style>` block |

### At go-live

- Remove the `<meta name="robots" content="noindex, nofollow">` line
- Open up `robots.txt` (or delete it)
- Swap the domain over to the full site on the `static` branch
