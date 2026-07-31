---
name: Jesus Blanco Portfolio
description: A precise, luminous digital observatory for senior front-end work.
colors:
  background: "hsl(var(--background))"
  foreground: "hsl(var(--foreground))"
  primary: "hsl(var(--primary))"
  primary-foreground: "hsl(var(--primary-foreground))"
  secondary: "hsl(var(--secondary))"
  secondary-background: "var(--secondary-background)"
  card: "hsla(var(--card), 0.9)"
  muted-foreground: "hsl(var(--muted-foreground))"
  border: "hsl(var(--border))"
  ring: "hsl(var(--ring))"
  availability-deep: "#10b981"
  availability-bright: "#34d399"
typography:
  display:
    fontFamily: "Clash Display, General Sans, sans-serif"
    fontSize: "8vw"
    fontWeight: 600
    lineHeight: 1
  headline:
    fontFamily: "Clash Display, General Sans, sans-serif"
    fontSize: "clamp(2rem, 3.7vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.02em"
  title:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.14em"
  body:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.12em"
  mono:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, monospace"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  control: "0.5rem"
  icon: "0.75rem"
  panel: "1rem"
  showcase: "1.5rem"
  pill: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
    height: "2.25rem"
  button-outline:
    backgroundColor: "{colors.secondary-background}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1rem"
    height: "2.25rem"
  nav-capsule:
    backgroundColor: "{colors.secondary-background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.5rem"
  glass-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.panel}"
    padding: "1.5rem"
  project-showcase:
    backgroundColor: "{colors.secondary-background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.showcase}"
---

# Design System: Jesus Blanco Portfolio

## Overview

**Creative North Star: "Observatorio Digital"**

The portfolio behaves like a precise, luminous observatory: a near-monochrome field provides quiet depth while selected work is brought into sharp focus through scale, light, and motion. Its spatial atmosphere comes from sparse stars, broad tonal gradients, glass-like surfaces, and controlled halos rather than saturated decoration.

The system is technical and professional without becoming generic. Strong uppercase headings and measured metadata create clarity; tactile controls, project imagery, and restrained kinetic responses provide personality. Light and dark themes invert the same neutral hierarchy instead of becoming separate identities. Avoid saturated palettes, gratuitous decoration, and multicolor neon effects.

**Key Characteristics:**

- Reversible monochrome palette with one functional green availability signal.
- Large, high-contrast type set against quiet atmospheric fields.
- Translucent surfaces with fine borders and interaction-led elevation.
- Spatial motion that focuses, unfolds, or settles content rather than decorating it.
- Pill controls, softly rounded panels, and circular navigation actions.

## Colors

The palette moves between Deep Void and Polar Light, using Orbital Mist and fine neutral borders to separate planes without introducing unrelated hues.

### Primary

- **Polar Signal:** The theme-responsive primary action color. It carries filled buttons, progress, selected outlines, and the strongest interactive emphasis.
- **Inverse Signal:** The corresponding text color used on primary fills to preserve decisive contrast in both themes.

### Secondary

- **Orbital Mist:** A low-contrast neutral surface used for icon wells, inactive controls, and subtle tonal grouping.
- **Translucent Orbit:** The partially transparent backdrop behind the navigation capsule, outline buttons, and broad section gradients.

### Tertiary

- **Available Green:** A tightly scoped emerald-to-mint signal used only for current availability. It communicates live status rather than general brand color.

### Neutral

- **Deep Void / Polar Light:** The theme-responsive page background and foreground pair. Their inversion is the foundation of the visual system.
- **Observation Glass:** A slightly translucent card surface for elevated content and contact channels.
- **Distant Type:** Reduced-contrast text for descriptions, metadata, counters, and secondary information.
- **Orbit Line:** The quiet divider and boundary color used around cards, controls, rails, and section toolbars.
- **Focus Signal:** The accessible focus color for keyboard-visible outlines and rings.

### Named Rules

**The Monochrome Field Rule.** Build hierarchy from value, opacity, imagery, and depth before introducing hue.

**The One Green Signal Rule.** Green belongs to verified availability status; do not spread it across unrelated actions or decoration.

**The No Neon Rainbow Rule.** Halos may amplify the active foreground color, but they must not become multicolor spectacle.

## Typography

**Display / Headline Font:** Clash Display (self-hosted; General Sans and sans-serif fallbacks). Its architectural, almost engineered caps carry every oversized moment.  
**Body / Interface Font:** General Sans (self-hosted; system-ui and sans-serif fallbacks).  
**Technical / Mono Font:** JetBrains Mono for contact addresses and the project counter — the instrument-panel voice that signals "authored by an engineer" and reinforces the section-toolbar motif.

**Character:** Clash Display gives the display and headline moments a precise, object-like presence; General Sans carries the rest with widely tracked labels and highly readable body copy; JetBrains Mono anchors the technical readouts. This pairing replaces the earlier Inter/Arial system to give the interface a distinct, non-default identity while staying minimal.

### Hierarchy

- **Display** (Clash Display, ~600, 8vw, 1): Reserved for the interactive hero signature ("I'm JB"); characters respond as individual spatial objects.
- **Headline** (Clash Display, 700, clamp(2rem, 3.7vw, 3.5rem), 1.03): Uppercase pitch, project, and section statements with tight tracking and a theme-aware luminous text shadow.
- **Title** (General Sans, 600, 0.875rem, 0.14em, uppercase): Refined section toolbar labels — compact, wide-tracked, semibold rather than heavy — paired with a small controlled-halo dot and a fading hairline divider.
- **Body** (General Sans, 400, 1.0625rem, 1.65): Project descriptions and supporting copy, typically constrained to about 34rem.
- **Label** (General Sans, 600, 0.6875rem, 0.12em, uppercase): Availability, metadata, and compact interface language.
- **Mono** (JetBrains Mono, 500, 1.0625rem, 1.5): Contact addresses and the oversized project counter.

### Named Rules

**The Two-Volume Rule.** Use either commanding display/headline type or quiet body/label type; avoid adding intermediate decorative hierarchies.

**The Uppercase Interface Rule.** Uppercase belongs to headings, filters, labels, and metadata, never to long-form reading copy.

## Layout

The page is a sequence of full-width atmospheric sections, most occupying at least one viewport. Content sits in centered containers from 1200px to 1280px wide with generous horizontal padding and a recurring vertical rhythm of 1rem, 1.5rem, 2rem, 3rem, and 4rem.

Section openings use a slim toolbar pattern: uppercase label and 7px signal dot aligned above a one-pixel divider, with filters or secondary controls allowed on the opposite edge. Primary compositions are either centered and narrow, as in the hero, or split 40/60 between explanatory copy and visual evidence. Contact channels use an auto-fitting grid with a 300px minimum column.

At 1024px, asymmetric two-column narratives collapse to one column. At 900px, the project showcase stacks copy above imagery. At 768px, viewport-height sections relax, text scales down, and padding tightens. At 480px, auxiliary availability UI disappears and components favor compact wrapping over compression.

**The Artifact-First Rule.** In project presentations, imagery owns the larger column and copy explains it; never reduce the work to a decorative thumbnail beside dominant prose.

## Elevation & Depth

The depth philosophy is **Capas orbitales**. Tonal gradients and translucent glass establish the resting planes; shadows, border brightening, halos, blur-to-sharp focus, and small upward movement appear when an item becomes active or interactive. Surfaces remain calm at rest and gain lift in response to attention.

### Shadow Vocabulary

- **Ambient Panel** (`0 4px 20px rgba(0, 0, 0, 0.08)`): Low resting separation for compact translucent cards.
- **Interactive Lift** (`0 8px 30px rgba(0, 0, 0, 0.12)`): Hover elevation paired with a 2px to 4px upward translation.
- **Showcase Depth** (`0 30px 70px rgba(0, 0, 0, 0.28)`): Reserved for the featured project image, the dominant visual artifact.
- **Active Orbit** (`0 0 22px color-mix(in srgb, var(--color-foreground) 22%, transparent)`): Focused halo around the selected project card or nearby interactive edge.
- **Luminous Type:** A layered foreground-colored text shadow used only on major headings.

### Named Rules

**The Lift-on-Attention Rule.** Resting surfaces are quietly layered; stronger shadows and translation appear only on hover, focus, selection, or featured status.

**The One Deep Plane Rule.** Only the featured artifact receives showcase-level depth within a composition.

## Shapes

The form language combines softly rounded observation panels with compact technical controls. Standard controls use an 8px radius, icon wells use 12px, cards use 16px, and featured or quotation surfaces use 24px. Pills are reserved for navigation capsules, filters, status controls, and unavailable states; circular geometry belongs to dots and directional controls.

Borders are consistently one pixel and low contrast. Clipping is purposeful around project imagery and glass surfaces, while glow-enabled wrappers remain visible when their effect must extend beyond the edge.

**The Nested Radius Rule.** Inner shapes step down from their container: 24px showcase, 16px card, 12px icon well, 8px control.

## Components

Components are **tactile and precise**: neutral at rest, decisively responsive under pointer or keyboard attention, and never louder than the work they frame.

### Buttons

- **Shape:** Compact rounded controls (8px) with 2.25rem default height and 1rem horizontal padding.
- **Primary:** Theme-responsive primary fill with inverse text, restrained shadow, and proximity glow.
- **Hover / Focus:** A subtle fill shift; focus-visible uses a one-pixel ring. Active press scales to 0.97.
- **Secondary / Ghost:** Outline buttons use Translucent Orbit, a fine border, backdrop blur, and the same luminous text treatment. Ghost controls reveal tonal fill only on interaction.

### Chips

- **Style:** Project filters reuse the primary and outline button forms, preserving consistent height, radius, and typography.
- **State:** Selected filters become filled primary controls; unselected filters remain translucent and bordered.

### Cards / Containers

- **Corner Style:** 16px for standard cards and 24px for featured, quotation, or showcase surfaces.
- **Background:** Observation Glass or Translucent Orbit over the section gradient.
- **Shadow Strategy:** Low ambient depth at rest, Interactive Lift on hover, Showcase Depth only for the featured artifact.
- **Border:** One-pixel Orbit Line, strengthening toward the foreground on hover or active state.
- **Internal Padding:** 1rem to 1.5rem for compact cards; 2rem for statement containers.

### Navigation

- **Style:** A centered, three-column capsule with translucent background, fine border, subtle shadow, and backdrop blur. JB anchors the left; availability stays centered; language and theme controls sit right.
- **Typography:** Compact Inter labels with availability in tracked uppercase.
- **States:** Text and borders move toward the foreground; keyboard focus receives an explicit two-pixel outline.
- **Mobile:** The availability badge disappears below 480px while identity and essential controls remain.

### Project Observatory

The signature project carousel is a 40/60 split between uppercase project narrative and a 16:10 featured image. A blurred enlargement of the same image creates ambient fill behind the contained screenshot. A masked filmstrip supports direct selection; inactive cards dim, the active card receives a foreground ring and halo, and controls combine circular arrows, a thin progress track, and an oversized numeric counter.

Motion follows focus: the showcase unfolds from perspective on entry, new copy settles upward, imagery resolves from blur and scale, and the active rail card scrolls into view. All nonessential transitions are removed when reduced motion is requested.

### Section Toolbar

Each major section begins with a compact, wide-tracked uppercase label, a 7px foreground dot with a controlled halo, and a one-pixel hairline divider that fades to transparent toward the trailing edge. The label is semibold rather than heavy, keeping the motif quiet and refined. This repeated instrument-panel motif creates orientation without introducing conventional navigation chrome inside the page.

## Do's and Don'ts

### Do:

- **Do** preserve the reversible monochrome hierarchy across light and dark themes.
- **Do** let project imagery, large type, and selected states establish focal order.
- **Do** use one-pixel neutral borders, controlled blur, and interaction-led shadows to separate planes.
- **Do** keep motion spatial and purposeful: unfold, focus, settle, reveal, or confirm.
- **Do** disable nonessential motion and preserve clear focus-visible states.

### Don't:

- **Don't** introduce saturated palettes, gratuitous decoration, or multicolor neon effects.
- **Don't** apply strong glow, deep shadow, and scale to every element at once.
- **Don't** use green outside verified availability status.
- **Don't** replace the section toolbar, nested radius hierarchy, or project-first composition with generic dashboard patterns.
- **Don't** allow atmospheric effects to reduce text contrast, obscure project imagery, or compete with interaction.
