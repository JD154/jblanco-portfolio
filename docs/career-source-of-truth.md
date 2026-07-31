# Career & Projects — Source of Truth

> Canonical reference for Jesus Blanco's employment history and portfolio projects.
> Use this as the factual basis for the CV, the portfolio site (`src/data/projects.*.json`,
> `ExperienceSection`), and any future rewrites. **Do not invent numbers.** Every metric
> below was provided by Jesus (often as an estimate/range) — keep them as ranges and do
> not sharpen them into false precision.

_Last updated: 2026-07-31._

---

## Profile

- **Name:** Jesus Blanco (JB)
- **Title:** Senior Frontend Developer / Senior Frontend Consultant
- **Experience:** 8 years (professional start Nov 2018; self-taught).
- **Focus:** Scalable, data-intensive web applications; design systems & component
  libraries; accessibility (WCAG); UI/UX architecture for analytics platforms and
  public-facing products.
- **Core stack:** React, Next.js, TypeScript, Vue, Nuxt, Astro, Tailwind, GraphQL, Storybook.
- **Availability:** Open to remote roles across all time zones. Currently booking new projects.
- **Location:** Táchira, Venezuela (shown as "Táchira, Venezuela · Remote").
- **English:** Professional Working Proficiency. **Spanish:** Native.

### Contact & links
- Email: `contact@jblanco.dev`
- Portfolio: `https://jblanco.dev`
- GitHub: `https://github.com/JD154`
- LinkedIn: `https://www.linkedin.com/in/jesus-blanco-08682112a/`
- CV (in repo): `public/Jesus-Blanco-Senior-Frontend-Developer.pdf`

### Education
- **Computer Engineering** — Universidad Nacional Experimental del Táchira (UNET),
  San Cristóbal · 2015–2018.

---

## Employment history (reverse chronological)

### Senior Frontend Developer — Freelance · Mar 2025 – Present
- Four clients since Mar 2025 (see the four freelance projects below).
- Predominantly front-end architecture, UI/UX, consulting/audit, and Figma-to-code work.

### Senior Frontend Developer — Elion Partners · May 2022 – Mar 2025
Real-estate market-intelligence / analytics platform.
- Built a **headless React/TypeScript component library** that **cut manual development
  time by ~50–70%** once stabilized.
- Components were headless with business logic applied, allowing enough customization to
  meet objectives without unnecessary props/conditionals/extra logic.
- Powered an analytics platform used across a **30–50-person** firm (multiple areas).
- Delivered **5 interconnected apps** (predictive valuation models, portfolio dashboards,
  demographic trend analyzers) supporting the **full capital-raising and asset-management
  cycle — from pitch to analytics**.
- Team: **2 dedicated frontend engineers** + 2 full-stack devs who helped when busy.
- **Led a migration** with one of those devs.
- Implemented a company-wide **design system in Storybook**.
- Stack: React, Next.js, TypeScript, Turbo, Storybook, amCharts 5, Mapbox, Zod, Zustand,
  React Query, React Hook Form, React Table, Tailwind CSS.

### Frontend Developer (Mid) — White Peak Tech · Sep 2021 – May 2022  _(second tenure)_
- Led modernization of a **public crowdfunding platform for real estate and art** (not
  internal-only — open to the general public, with its own internal dashboards too).
- Migrated a legacy **Django/HTML** system to **Vue/Nuxt**; goal was to reduce maintenance
  friction and enable future expansion.
- **Legacy code reduced to email templates only** (still in operation).
- Work here was broader: refactors, architecture, code decisions impacting the product.
- Stack: Vue, Nuxt.js (SSR), Vuetify, Django Templates, jQuery, Bootstrap, Axios.

### Junior Frontend Developer — Legal Credit Solutions · Aug 2020 – Sep 2021
Fintech (credit) — internal and client-facing products.
- Co-architected a **Vue design system of ~30 base components** (input, display, layout,
  etc.) **with all their variants**.
- Purpose: unify the company's design system for use across **multiple products** that
  weren't necessarily interconnected but lived under the same fintech umbrella.
- Contributed to Storybook documentation for maintainability and best practices.
- Stack: Vue, Nuxt, REST APIs, Storybook, Sass/Tailwind CSS.
- **Note:** The portfolio project "Credit Healing UI Library" corresponds to this Vue
  design system. (An earlier draft mislabeled its stack as React — corrected to Vue.)

### Junior Frontend Developer — White Peak Tech · Nov 2018 – Jun 2020  _(first tenure)_
- Entered as Junior; the company let him go during the pandemic lockdown as most clients
  temporarily closed.
- Mostly prototyping and small, specific products: dashboards, data-visualization maps,
  landing pages.
- Original CV also noted "4+ investor dashboards using Vue/Nuxt" for this period.
- Stack: Vue, Nuxt, HTML5, CSS3, JavaScript (ES6+), Materialize CSS, Bootstrap.

> **White Peak note:** Same company, two tenures separated by the Legal Credit Solutions
> role. Progression there: Junior (2018–2020) → Mid (2021–2022).

### Earlier roles (on original CV, dropped from the 1-page CV for focus)
- **Web Developer — Inveca de Venezuela S.A** · Aug 2019 – Oct 2019 — WordPress migration
  for a glass manufacturer; hosting restoration, custom theme, content restructuring.
- **Web Developer — Motores y Partes Diesel JU** · Aug 2018 – Sep 2018 — Responsive
  WordPress theme from brand guidelines; hosting/domain/email setup; PHP customization.

---

## Portfolio projects

Order below matches the carousel (most recent first). Each project has two copy tiers in
`src/data/projects.*.json`: **short** (`roleShort`/`challengeShort`/`decisionShort`, shown
in the carousel) and **long** (`role`/`challenge`/`decision`, shown on the case-study
detail page). `description` is the shared lede.

**Confidentiality:** the four 2025–26 freelance clients are **anonymized** in public copy.
Real context is recorded here for reference only — do not publish client names without
explicit permission.

**Assets:** the four freelance projects currently use the placeholder
`public/projects/_placeholder.svg` and have **no public demo** (`url: ""`). Replace with
real ~16:10 screenshots when available; add a demo URL only if the client authorizes it.

### 1. Workflow Orchestration Audit — Freelance (Client C) · ~May 2026
- **What:** Audit, refactor, and UI/UX overhaul of a workflow-orchestration front-end that
  had been assembled largely with AI coding assistants.
- **Goal:** (1) assess reusability and best practices of the codebase; (2) ensure stability;
  then polish UI/UX and add new features.
- **Stack:** Next.js, TypeScript, shadcn/ui, React Query.
- Demo: none. Image: placeholder.

### 2. Product Marketing Site — Freelance (Client C, same company as #1) · 2026
- **What:** Marketing landing page taken from Figma to code.
- **Requirement:** architecture focused on fluidity and SEO for marketing goals; ability to
  create/modify pages in the future without developer intervention. Also handled analytics,
  SEO, and domain/deploy management on Cloudflare.
- **Stack:** Astro, custom components, Tailwind CSS, Cloudflare, SEO.
- Demo: none. Image: placeholder.

### 3. Logistics Finance Module — Freelance (Client B) · Dec 2025
- **What:** Front-end of a finance module for a US logistics company. Not from scratch —
  parallel work alongside a large team already refactoring the application; aligned with the
  team to build the needed module in parallel.
- **Goal:** connect a Next.js/GraphQL front-end to **n8n** workflows bridged to **QuickBooks**,
  improving internal workflows by unifying 2–3 systems into one UI/UX instead of maintaining
  several.
- **Stack:** Next.js, GraphQL, n8n, QuickBooks.
- Demo: none. Image: placeholder.

### 4. Remittance Operations Platform — Freelance (Client A) · Aug 2025
- **What:** Front-end architecture + UI/UX orchestration for a remittances and
  currency-exchange company. System served as a **single source of truth** for workers to
  administer and execute sending/receiving remittances.
- **Detail:** a set of modules (sub-pages) each containing the specific business logic a
  given user would use; a **scope-based permission system** isolated each person to only
  what their daily operations required.
- **Stack:** Next.js, TypeScript, GraphQL, DaisyUI (among others).
- Demo: none. Image: placeholder.

### 5. I.R Management Platform — Elion Partners
- Multi-application investor-relations platform pairing a shared interface language with
  dense operational data.
- Role: reusable UI patterns and complex data visualizations across independent sub-apps.
- Anchored implementation in the company design system for consistency.
- **Stack:** React, TypeScript, Next.js, amCharts 5. Demo: `https://ir.jblanco.dev/`.

### 6. inUI Library — Elion Partners
- The **headless internal UI library** at the core of the product suite (the library that
  cut manual dev time ~50–70% and was used across the 30–50-person firm).
- **Stack:** React, TypeScript, Tailwind CSS, Reakit, RadixUI, Storybook.
- Demo: `https://inui.jblanco.dev/`.

### 7. Investor Onboarding Portal — Elion Partners
- Investor registration + document-management platform bringing KYC and compliance into one
  onboarding flow; reduced a paperwork-heavy process.
- **Stack:** Vue.js, Next.js, Tailwind CSS. Demo: `https://onboarding.jblanco.dev/`.

### 8. Credit Healing UI Library — Legal Credit Solutions
- The **30-component Vue design system** (inputs, layout, data display, full variants)
  unifying UI across multiple fintech products under one brand; Storybook-documented.
- **Stack:** Vue.js, TypeScript, Storybook, Sass. Demo: `https://chui.jblanco.dev/`.
- (Stack corrected from React → Vue this session.)

### 9. Covid News Dashboard — Personal
- Interactive dashboard for real-time regional COVID-19 statistics; aggregated multiple APIs
  and rendered with amCharts 4.
- **Stack:** Vue.js, Nuxt.js, amCharts 4, Tailwind CSS, Axios. Demo: none (has real screenshot).

### 10. Social News Dashboard — Personal
- Social-news aggregator that keeps defined trending topics visible with no user interaction;
  continuously updates and auto-scrolls.
- **Stack:** HTML5, CSS3, JavaScript, APIs. Demo: none (has real screenshot).

### 11. Material Start Page — Personal (first frontend project)
- Responsive start page built from scratch on Material Design principles, no UI framework;
  every component hand-built.
- **Stack:** HTML5, CSS3, JavaScript, Material Design. Demo: `https://material-bookmark.jblanco.dev/`.

---

## Metric provenance (keep honest)

| Metric | Value | Source |
| --- | --- | --- |
| Years of experience | 8 (since Nov 2018) | Jesus (chose "8") |
| Elion dev-time saved | ~50–70% | Jesus (estimate, once library stabilized) |
| Elion company size | 30–50 people | Jesus (estimate) |
| Elion apps delivered | 5 interconnected apps | Original CV + Jesus |
| Elion frontend team | 2 dedicated + 2 full-stack support | Jesus |
| Legal Credit components | ~30 Vue components | Jesus |
| White Peak (Mid) legacy | reduced to email templates only | Jesus |
| Freelance clients | 4 (since Mar 2025) | Jesus |

Anything not in this table or the sections above is **not established** — ask Jesus before
publishing it.
