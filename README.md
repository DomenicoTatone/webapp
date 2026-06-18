# DeepLink Pro

Affiliate deep-link generator for travel (Booking, Tradedoubler, GetYourGuide,
Civitatis), plus a Menorca car-rental link helper and a client-side image
compressor. Static SPA, deployed to GitHub Pages.

This is the modern rebuild of the original vanilla-JS app — same features, but
typed, component-based, tested, installable (PWA) and with a refined design.

## Stack

- **React 19** + **TypeScript** (strict) + **Vite**
- **Tailwind CSS v4** + shadcn-style Radix primitives (`src/components/ui`)
- **react-router** (shareable URLs per tab), **react-i18next** (it/en/es/fr/de)
- **Vitest** + Testing Library
- **vite-plugin-pwa** (installable + offline)

## Scripts

| command | description |
| --- | --- |
| `npm run dev` | dev server (Booking data proxied to S3 to avoid CORS) |
| `npm run build` | type-check + production build |
| `npm test` | run unit tests |
| `npm run deploy` | build + push `dist/` to the `gh-pages` branch |
| `node scripts/gen-icons.mjs` | regenerate PWA icons & OG image from the SVG source |

CI (`.github/workflows/deploy.yml`) type-checks, tests, builds and deploys to
the `gh-pages` branch on every push to `master`.

## Architecture

```
src/
  components/ui/        shadcn-style primitives (Button, Card, Select, …)
  components/shared/    reusable building blocks (CopyButton, LinkResultCard, …)
  components/layout/    Header, Footer, Fab, Layout
  pages/                one component per tab
  services/             linkGenerator (+ tests), bookingData (fetch + JSON5)
  data/affiliates.ts    single source of truth for all affiliate IDs & programs
  i18n/                 i18next setup + typed locale files (locale parity is
                        enforced by TypeScript)
```

## Notable improvements over the original

- **Affiliate IDs are defined once** in `data/affiliates.ts`, so homepage links
  and deep-link generators can't drift apart (the old app had mismatched
  GetYourGuide and Civitatis IDs — both attribution bugs).
- Booking data is loaded with `fetch` + safe JSON5 parsing instead of injecting
  and executing remote `<script>` tags.
- Typed `i18n` keys with compile-time locale parity.
- Real SVG icons (no emoji), light/dark theme, shareable routes, localized meta.
- The Civitatis deep link now appends `?aid=` to the product URL (the documented
  method) instead of the old `/affiliate/?aid=&url=` wrapper, which silently
  redirected to the affiliate panel and never attributed the sale.
