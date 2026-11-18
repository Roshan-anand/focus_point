# Focus Point Photography — Brand & Theme Spec

**Sources:** Instagram profile — https://www.instagram.com/focus_point_sullia/ (grid sample, ~18 recent posts, viewed 18 Nov 2026) and the studio's logo (`logo.jpg`)

## Who they are
Professional photographer in Sullia (Karnataka, Western Ghats). Services: wedding photography, modelling shoots, album making. Portfolio is dominated by **outdoor wedding & engagement portraits** shot in lush estate/forest locations, plus **dark studio work** (framed-photo product shots, indoor reels/podcast-style content).

## What the photos say (visual audit)

| Observation | Evidence |
|---|---|
| **Green dominates the portfolio** | Almost every hero shot is framed against dense foliage — moss green, sage, deep olive backgrounds from the Western Ghats landscape |
| Ivory & cream second | Brides in cream sarees/kasavu, couples in white/ivory outfits |
| Warm gold accents | Temple jewellery, framed prints, warm evening light |
| Deep darks | Studio/product shots and reels on near-black backgrounds — matches the logo |
| Warm skin tones | Terracotta/warm-brown base across portraits |

**Objective check** — dominant-color extraction from the live grid (excluding UI chrome):

```
#4C4635  moss / deep olive   ██████████  ← photo-dominant
#626255  sage / grey-green   █████████
#737E7C  eucalyptus grey     ████
#C2BBB1  ivory / warm white  █████████
#A39566  gold / khaki        ███████
#9D6548  terracotta / skin   ████
#121417  near-black          (dark UI + studio shots)
```

**The color that shines the most: GREEN** — muted, natural greens (moss → sage), always paired with ivory and gold.

## Proposed palette

| Role | Color | Hex | Notes |
|---|---|---|---|
| Base / dark | Charcoal Black | `#121417` | From the logo background — site base, footer, nav |
| Base / light | Ivory Silk | `#F4F1EA` | Primary light background / text on dark |
| **Primary accent** | **Moss Green** | `#5A6B4F` | Their signature — buttons, links, highlights |
| Secondary accent | Sage | `#8A9B8A` | Soft section tints, tags, hovers |
| Warm accent | Temple Gold | `#C9A45C` | CTAs, dividers, award/badge moments |
| Support | Terracotta | `#9D6548` | Warm highlights, use sparingly |
| Text on light | Deep Bark | `#2E2A24` | Body text on ivory |

## Theme direction for the portfolio site
- **Mood:** "Elegant dark editorial meets Western Ghats greenery" — moody charcoal canvas (echoing the logo) with photography sections that let the greens breathe.
- **Logo treatment:** White script wordmark sits perfectly on the charcoal base; use gold only for a thin accent line or hover states.
- **Typography:** Elegant serif or refined script for headings (mirrors logo), clean sans-serif for body.
- **Layout cues:** Full-bleed photo hero (one of their green wedding shots), dark gallery frames like their product shots, ivory content sections between dark galleries for rhythm.
- **Avoid:** Saturated/neon colors, pure blue-grey corporate tones — they'd fight the natural, warm portfolio.

## Sources
- **Instagram profile:** https://www.instagram.com/focus_point_sullia/ — `@focus_point_sullia`, 1,027 followers (bio: "Professional photographer · Wedding photography · Modelling photography · Album making"). Post grid sampled 18 Nov 2026; analysis based on ~18 most recent posts visible before Instagram's login wall.
- **Logo:** `logo.jpg` (white script wordmark on charcoal background, provided by the client).
- **Method:** Screenshots of the live post grid with the dominant-color extraction run on them (ImageMagick, 7-color histogram).
