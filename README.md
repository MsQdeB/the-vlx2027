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

```bash
npx firebase deploy --only hosting
```

(Firebase project: `the-vlx` — see `.firebaserc`. Create a new Firebase project for 2027 or reuse the existing one.)

## Things to update during the 2027 cycle

- **Registration opening date** → `src/app/feature/registrations/registrations.ts` (`targetDate`)
- **Registration form link** → `src/app/feature/registrations/registrations.ts` (`onRegisterClick`)
- **Pricing & sold-out state** → `src/app/feature/registrations/registrations.html`
- **T-shirt pre-order** → `src/app/feature/registrations/registrations.html`
- **Program / venues / map links** → `src/app/feature/overview/overview.html`
- **Bands line-up** → `src/app/feature/livebands/livebands.ts`
- **After-movie YouTube IDs** → `src/app/feature/youtube-highlights/youtube-highlights.ts`
- **Accommodation map link** → `src/app/feature/accommodation/accommodation.html`
