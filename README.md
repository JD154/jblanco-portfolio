# Jesus Blanco Portfolio

Static Astro portfolio with interactive React islands, bilingual English and Spanish content, and Cloudflare Workers static-assets deployment.

## Commands

- `bun run dev`: start the Astro development server.
- `bun run check`: run Astro and TypeScript checks.
- `bun run lint`: lint TypeScript, React, and Astro files.
- `bun test`: run the Bun test suite.
- `bun run build`: build the static site into `dist/`.
- `bun run preview`: preview the production build.
- `bun run deploy`: build and deploy the `dist/` assets with Wrangler.

## Internationalization

`src/pages/index.astro` renders English at `/`; `src/pages/es/index.astro` renders Spanish at `/es/`. UI copy lives in `src/i18n/ui.ts`, and localized project content lives in `src/data/projects.en.json` and `src/data/projects.es.json`. Keep both project arrays structurally aligned when adding or editing a project.
