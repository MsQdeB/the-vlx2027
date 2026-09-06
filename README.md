# The VLX 2027 — Vietnam Lindy Exchange

Official website for the **17th edition** of the Vietnam Lindy Exchange.
**March 12–14, 2027 · Hội An, Vietnam** — [www.thevlx.net](https://www.thevlx.net/)

Built with [Angular CLI](https://github.com/angular/angular-cli) version 20 and hosted on Firebase Hosting.

> Based on the [`the-vlx2026`](https://github.com/MsQdeB/the-vlx2026) codebase.

## Development server

```bash
npm ci
ng serve
```

Open `http://localhost:4200/`. The app reloads automatically on changes.

## Building

```bash
npm run build
```

Build artifacts are stored in `dist/the-vlx/browser`.

## Deploying

The site has **two Firebase Hosting targets**:

| Target | Site | URL | Content |
|---|---|---|---|
| `teaser` | `vlx-2027` | https://vlx-2027.web.app | Holding page (planning mode) |
| `production` | `the-vlx2027` | https://the-vlx2027.web.app | The full website |

```bash
# Publish/refresh the public holding page
npx firebase-tools deploy --only hosting:teaser

# Publish the FULL website to the private URL (only when ready!)
npm run build && npx firebase-tools deploy --only hosting:production

# GO-LIVE: when VLX 2027 details are final, deploy production and
# attach your custom domain in Firebase console → Hosting → the-vlx2027 → Add custom domain.
# Also remove the `robots noindex` meta lines from src/index.html.
```

## Things to update during the 2027 cycle

- **Registration opening date** → `src/app/feature/registrations/registrations.ts` (`targetDate`)
- **Registration form link** → `src/app/feature/registrations/registrations.ts` (`onRegisterClick`)
- **Pricing & sold-out state** → `src/app/feature/registrations/registrations.html`
- **T-shirt pre-order** → `src/app/feature/registrations/registrations.html`
- **Program / venues / map links** → `src/app/feature/overview/overview.html`
- **Bands line-up** → `src/app/feature/livebands/livebands.ts`
- **After-movie YouTube IDs** → `src/app/feature/youtube-highlights/youtube-highlights.ts`
- **FAQ answers** → `src/app/feature/faq/faq.ts`
- **Calendar times** → `src/app/feature/save-the-date/save-the-date.ts` and `public/vlx-2027.ics`
- **Accommodation map link** → `src/app/feature/accommodation/accommodation.html`
