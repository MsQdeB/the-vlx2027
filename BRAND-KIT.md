# THE VLX 2027 — Branding Kit
*"Magazine Cover" theme — vintage broadsheet, in the spirit of The New York Times*

---

## 1. Typography

Four typefaces, each with a distinct editorial role. All are free on Google Fonts
(embedded via `src/styles.css`, no license cost).

### THE VLX — Wordmark / Masthead
| | |
|---|---|
| **Font** | UnifrakturMaguntia |
| **Role** | Newspaper masthead ("The VLX") in the site header and teaser page |
| **Style** | Blackletter ("Old English") — the New York Times masthead reference |
| **Usage rule** | Only for the masthead wordmark and the "CONTACT US"-style display moments in **title case or lowercase** — never all-caps (blackletter caps are illegible) |
| **Weights** | 400 (single weight) |
| **Source** | https://fonts.google.com/specimen/UnifrakturMaguntia |

### Display Headlines
| | |
|---|---|
| **Font** | Playfair Display |
| **Role** | All big headlines: cover title (VIETNAM LINDY EXCHANGE), section titles ("Programme", "Subscriptions", "On Stage", "The Reader Asks"), countdown numerals, drop caps, event names |
| **Character** | High-contrast Didone-style serif — classic magazine cover energy |
| **Weights used** | 700, 800 (+ italics for decks and quotes) |
| **Source** | https://fonts.google.com/specimen/Playfair+Display |

### Body Text
| | |
|---|---|
| **Font** | Lora |
| **Role** | All running copy: article text, event details, FAQ answers, band descriptions |
| **Character** | Workhorse text serif, pairs naturally with Playfair |
| **Weights used** | 400–600, regular italic widely used for editorial asides |
| **Source** | https://fonts.google.com/specimen/Lora |

### Labels / UI / Navigation
| | |
|---|---|
| **Font** | Libre Franklin |
| **Role** | Eyebrows & kickers ("Programme", "Announcement", "On Stage"), nav links, datelines, time chips, buttons, thumbnail counters — always UPPERCASE with wide letter-spacing (0.2–0.4em) |
| **Character** | Franklin Gothic lineage — literally the NYT's house sans |
| **Weights used** | 400, 600, 700, 800 |
| **Source** | https://fonts.google.com/specimen/Libre+Franklin |

**Type hierarchy cheat-sheet:**
```
MASTHEAD        UnifrakturMaguntia 400, ~2.5rem
H1 / Cover      Playfair Display 800, clamp(3rem → 5.4rem), uppercase
Section titles  Playfair Display 800, clamp(2.2rem → 3.4rem)
Event titles    Playfair Display 700, 1.25rem
Eyebrows        Libre Franklin 700–800, 0.68rem, letter-spacing .4em, uppercase
Body            Lora 400, 17px / 1.75 line-height
Buttons/nav     Libre Franklin 600–800, 0.72rem, letter-spacing 0.16–0.3em, uppercase
```

---

## 2. Color Palette

### Paper tones (backgrounds)
| Token | Hex | Use |
|---|---|---|
| Paper | `#F4EFE2` | Main page background |
| Paper 2 | `#EDE6D4` | Alternating section background (programme, FAQ, gallery) |
| Paper 3 | `#E6DCC4` | Letterpress offset shadows only |

### Ink (text & structural)
| Token | Hex | Use |
|---|---|---|
| Ink | `#1B1713` | Headlines, body, black tiles/bands, countdown tiles, footer |
| Ink Soft | `#4C453A` | Secondary body copy |
| Ink Faint | `#857C6B` | Captions, datelines, muted labels |
| Rule | `#16120E` | Double rules, borders, press frames |

### Accents
| Token | Hex | Use |
|---|---|---|
| Oxblood Red | `#8A2A1E` | Links, drop caps, eyebrow labels, hover states, "Registration opens" date |
| Press Gold | `#A87C26` | "Notice to all dancers" eyebrow on the black band, footer link hover |
| Brand Orange | `#B5541A` | Reserve accent — nod to the historical VLX orange (currently unused in production styles) |

### On-ink (text on dark bands)
| Token | Hex |
|---|---|
| Cream on ink | `#F4EFE2` (same as Paper) |
| Cream muted (75%) | `rgba(244, 239, 226, 0.75)` |
| Hero cover scrim | `rgba(24, 18, 12, 0.5 → 0.78)` gradient |

### Palette summary (for design tools)
```
Paper        #F4EFE2   ████
Paper 2      #EDE6D4   ████
Paper 3      #E6DCC4   ████
Ink          #1B1713   ████
Ink Soft     #4C453A   ████
Ink Faint    #857C6B   ████
Rule         #16120E   ████
Oxblood Red  #8A2A1E   ████
Press Gold   #A87C26   ████
Brand Orange #B5541A   ████
```

---

## 3. Signature graphic devices

- **Double rules** — thick 3px + thin 1px pairs, the recurring newspaper divider
- **Hairlines** — `#C6BBA2` for gentle row separators inside sections
- **Letterpress blocks** — ink tiles/boxes with a hard offset shadow in Paper 3 (`box-shadow: 4px 4px 0`)
- **Press-print photos** — hairline frame, 6px paper mat, hard offset shadow, sepia/grayscale tint (`grayscale(25–40%) sepia(10–14%)`) that fades to full color on hover
- **Dateline chip** — ink block, cream Libre Franklin uppercase, letter-spacing 0.3em
- **Drop caps** — Playfair Display 800, 3.6em, oxblood red, on lead paragraphs
- **Time chips** — small ink-bordered boxes, Franklin 800
- **Cover frame** — hero photo inset 18px with cream 1px border + 4px outline

---

## 4. Where the tokens live

All tokens are defined once in `the-vlx2027/src/styles.css` (`:root { --paper, --ink, --red, ... }`) and referenced by every component stylesheet — so a palette change is a one-file edit.

---

## 5. What printed materials (posters, flyers, social) need

- Masthead: **The VLX** in UnifrakturMaguntia, black on cream
- Cover line: **Playfair Display 800 uppercase** for the big date block
- Minimum: ink `#1B1713` + paper `#F4EFE2` + one oxblood red accent
- Avoid pure black (#000) and pure white (#FFF) — the system lives on warm near-black and warm near-white
