# VLX 2027 — project instructions

## Git / deployment

- **Do NOT push any changes to GitHub until the user explicitly says to push.**
  Make edits and commit locally if useful, but hold all `git push` (and any
  GitHub Pages deploy) until the user gives the go-ahead in their message.

  *(Added 2026-10-05 at the user's request.)*

## Scope

- **Work only on the static website (branch `static`).** Do not add anything
  more to the `vlx-2027-minimal-homepage` (minimal homepage) branch.

  *(Added 2026-10-05 at the user's request.)*

## Current state (updated 2026-10-05)

- The **live site (`thevlx.net`) is the `static` branch**; GitHub Pages source = `static`.
- Edit the site in the **git worktree at `~/ai-projects/vlx-static-wt`** (checked out on `static`).
  Do NOT edit the main working dir for site content (it's on `vlx-2027-minimal-homepage`).
- Preview: from that worktree, `python3 -m http.server 8810`, then open http://localhost:8810/
- Everything is committed & pushed. **Do not push without the user's explicit OK** (see above).
- **Pending:** the two daytime-event venues in the Programme — Sat "Dance By The Beach" and
  Sun "Afternoon Dance" (currently "To be updated").
