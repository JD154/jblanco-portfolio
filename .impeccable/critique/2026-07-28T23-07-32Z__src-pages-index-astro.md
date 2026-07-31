---
target: the landing page
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
timestamp: 2026-07-28T23-07-32Z
slug: src-pages-index-astro
---
Method: dual-agent (A: a58466cc52f8f63b5 · B: accb44b060e9ab687)
Surface mode: Experience / Persuade (portfolio landing). Heuristics 7 & 10 scored n/a.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Availability dot, 01/07 counter, progress bar, active states are strong; no section/scroll indicator. |
| 2 | Match System / Real World | 3 | Plain copy, but 🔗 = GitHub is a wrong metaphor and "I'm JB" is cryptic on first contact. |
| 3 | User Control and Freedom | 3 | Carousel arrows + drag + dots, theme, lang, reduced-motion honored; no back-to-top / anchor nav. |
| 4 | Consistency and Standards | 2 | Excellent internal system broken by emoji icons, serif quote voice, and a nested-`<a>` DOM bug in the carousel CTA. |
| 5 | Error Prevention | 3 | Empty-filter copy exists; missing demos degrade gracefully. |
| 6 | Recognition Rather Than Recall | 3 | Labels + active states persistently visible. |
| 7 | Flexibility and Efficiency | n/a | Single-scroll landing page; no power-user accelerators expected. |
| 8 | Aesthetic and Minimalist Design | 3 | Very restrained; undercut by hero's 3 hard `<br>` lines and contact emoji clutter. |
| 9 | Error Recovery | 3 | Few error surfaces; the ones that exist are handled. |
| 10 | Help and Documentation | n/a | Self-explanatory portfolio; docs would be noise. |
| **Total** | | **23/32** | **Good (72%, lower band)** |

## Design Specificity Verdict

**Authored for this product — with two off-world seams.** The page has a real, non-interchangeable spine: the repeated "section toolbar" (7px glowing dot → uppercase tracked label → 1px divider) across About/Projects/Contact realizes the Observatorio Digital brief as an instrument panel. Monochrome discipline holds in both themes (verified across 3 captures); the single green stays quarantined to availability; glass capsules, 1px borders, pill controls, and a theme-flipping `heading-text-shadow` are considered. This is not a template.

Two elements betray the world: (1) **Contact uses full-color OS emoji** (🔗 ✉️ 💼) dropped into a near-monochrome field at the conversion moment, and 🔗 mislabels GitHub; (2) **the hero's largest, most luminous moment says "I'm JB"** — initials — while the name, role, and "booking now" pitch sit in small sub-copy.

**Deterministic scan** (detect.mjs, exit 2, 36 findings): confirms drift the design eye also felt. Dominant signal is **20 off-ramp font sizes** hand-tuned per component (Quote.tsx inline styles a hotspot: 3rem/1.25rem/0.875rem; plus Contact/Projects/Header literals) — type sizing isn't pulled from the DESIGN.md ramp. Also genuine: **`Monaco`** monospace in ContactSection (undeclared face), **radius drift** in ProjectsCarousel (`2rem` + two `2px`), several **undocumented opaque colors** (`rgba(0,0,0,0.85)`, bare `#fff`), and a **`transition: width`** layout-thrash. False positives correctly set aside: `Inter`/`Arial` (committed system fonts) and the ambient-shadow rgba literals (documented shadow vocabulary). The `clamp(3rem,11vw,8rem)` hero size (Header:25) is the intentional responsive fix from the prior polish, not drift.

**Browser console — real bug the design review couldn't see:** repeated React hydration errors — `<a> cannot be a descendant of <a>`. The Projects carousel CTA renders an outer anchor (GlowingButton via Radix `Slot`/`asChild`) wrapping an inner anchor (GlowingEffect), producing invalid nested `<a>`.

## Overall Impression

A genuinely tasteful, brand-specific dark portfolio with a real identity system — that quietly sabotages itself at the two moments that matter most for its job: the **hero** (biggest type carries a nickname, not the pitch; two co-equal CTAs) and the **contact section** (the least on-brand surface, with emoji, no availability reassurance, and — on mobile — no way to reach it at all). The single biggest opportunity: make the persuade moments (hero pitch, contact) as premium and specific as the section-toolbar system already is.

## What's Working

1. **The section-toolbar system** — restrained, repeated, recognizable. It gives the page identity instead of decoration.
2. **Reversible luminous hero** — monochrome holds in both themes; the glow token flips direction per theme. A considered detail.
3. **Projects carousel information design** — fixed 16:10 frame with blurred ambient fill absorbs varying screenshot ratios; ring + 01/07 counter + progress bar give strong status.

## Priority Issues

**[P0] Mobile loses the only path to contact.** The availability badge is the nav's only route to `scrollToContact`, and it's `display:none` below 480px — leaving the navbar center empty (verified at 375px). No anchor nav, no persistent mobile CTA, and the "booking now" signal disappears. A recruiter on a phone has zero navigation to contact.
- *Fix:* keep a compact availability/contact pill on mobile, or add a persistent inline "Get in touch" CTA. → **/impeccable adapt**

**[P1] Nested `<a>` hydration bug in the carousel CTA.** Detector + console confirm invalid nested anchors (Radix `Slot` outer `<a>` wrapping GlowingEffect inner `<a>`) on the primary "View Project" action. Invalid DOM + repeated hydration errors on the most important interactive element in the Projects section.
- *Fix:* render the GlowingEffect as a non-anchor wrapper, or make GlowingButton the only anchor. → **/impeccable harden**

**[P1] Content visibility is hostage to JS animation.** About/Projects/Contact initialize at `opacity:0` and only appear if IntersectionObserver + GSAP fire and complete (both agents independently hit blank sections when rAF throttled). On slow hydration or JS failure the page's substance can stay invisible.
- *Fix:* animate from a visible baseline (or `@starting-style` / guaranteed-visible fallback); never gate content presence on animation completion. → **/impeccable harden**

**[P1] Contact emoji break the world at the conversion moment.** 🔗✉️💼 are multicolor and casual; 🔗 mislabels GitHub and screen-reader-announces as "link." This deflates the premium build-up exactly where the visitor decides.
- *Fix:* monochrome 1px line icons inheriting `currentColor`; restate the green availability signal here. → **/impeccable colorize** (icon/system pass) then **/impeccable clarify**

**[P2] Hero under-commits identity and action.** Largest element = "I'm JB" (initials) while name/role/availability sit small; two co-equal CTAs compete. For recruiter fit-assessment this buries the pitch.
- *Fix:* let the hero-moment carry role/value; demote "I'm JB"; make one CTA clearly primary. Remove the three hard `<br>` in the description (6 ragged mobile lines) and control measure with `max-width`. → **/impeccable bolder** + **/impeccable clarify**

## Persona Red Flags

**Casey (mobile) — most critical:** availability/contact affordance gone <480px; hero copy wraps to 6 ragged lines; large dead-space below hero CTAs; 150px rail thumbnails are small drag targets.

**Sam (a11y):** the h1 is split into per-character spans (DOM reads `I ' m J B` as separate nodes) — the most important heading is fragmented for screen readers. Emoji announce misleading names (🔗 "link" for GitHub). Light-mode description ~#71717a on near-white is borderline ~4.6:1 — verify AA. Positives: focus-visible rings, `aria-current` on active card, reduced-motion honored.

**Jordan (first-timer):** "I'm JB" doesn't say who/what until sub-copy is read; the availability pill looks like a status label, not the button it is; no explicit "Contact" nav; GitHub handle "JD154" doesn't obviously map to "Jesus Blanco."

## Minor Observations

- **Credibility bug:** "Investor Onboarding Portal" lists `Vue.js` + `Next.js` together (Next is React) — a sharp reviewer reads this as an error and it undercuts the senior claim. (`src/data/projects.en.json`)
- Two of seven projects have `url:""` → dead-end "Demo Unavailable" pills; consider linking to a repo or case study.
- Contact `Monaco` monospace is undeclared in DESIGN.md typography.
- Redundant carousel controls (arrows + drag + 7-card rail + progress) for one navigation job.
- Off-ramp font sizes (20 hits) — promote to the DESIGN.md ramp; Quote.tsx inline styles are the hotspot.

## Questions to Consider

1. If a recruiter screenshots one frame, the biggest glowing words are "I'm JB." Should the hero-moment carry the pitch (Senior FE · 7 yrs · booking) instead of a nickname?
2. "Currently booking" is the strongest persuade asset — why does it live only in a nav pill that vanishes on mobile, and never reappear at the contact section where the decision is made?
3. Contact is where the experience converts, yet it's the least "Observatorio Digital" surface. What would make contact the most premium moment rather than the most generic?
4. Every section's content is invisible until JS animates it in. Is the motion serving the work — or is the work hostage to the motion?
