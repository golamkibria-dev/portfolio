# Golam Kibria — Portfolio

A premium, SaaS-grade personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4,
Framer Motion, GSAP, React Three Fiber, Firebase, and Resend.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Firebase / Resend credentials (optional — site works without them)
npm run dev
```

Open http://localhost:3000.

## Connecting real services

The site runs and looks complete out of the box with placeholder content and no backend configured.
To wire up the live integrations:

1. **Contact form emails (Resend)** — create a [Resend](https://resend.com) account, verify a sending
   domain, and set `RESEND_API_KEY` + `CONTACT_TO_EMAIL` in `.env.local`. Until then, `/api/contact`
   responds with a clear 503 instead of silently failing.
2. **Firebase** — create a Firebase project, enable Firestore/Auth/Storage as needed, and fill the
   `NEXT_PUBLIC_FIREBASE_*` vars. `src/lib/firebase.ts` no-ops safely when unconfigured
   (`isFirebaseEnabled` flag), so nothing crashes if you skip this.
3. **Content** — everything (projects, skills, timeline, testimonials, blog posts, FAQs...) lives in
   `src/lib/data.ts`. Edit that one file to personalize the entire site.
4. **Resume / images** — replace `public/resume.pdf`, `public/og-image.png`, `public/icons/*`, and the
   SVGs in `public/projects`, `public/blog`, `public/avatars` with real assets.

## Architecture

```
src/
  app/                 # Routes (App Router): home, blog, api/contact, sitemap, robots, manifest
  components/
    ui/                # Hand-built shadcn-style primitives (Button, Card, Dialog, Tabs, ...)
    layout/             # Navbar, Footer
    sections/           # One file per homepage section (hero, about, skills, projects, ...)
    common/             # Cross-cutting UI: cursor, command palette, loading screen, toasts...
    three/               # React Three Fiber particle background
    providers/           # Theme + service-worker registration
  hooks/                # use-toast, use-scroll-progress, use-active-section, use-media-query
  lib/                  # data.ts (content), utils.ts, firebase.ts
public/
  sw.js                 # Hand-rolled PWA service worker (stale-while-revalidate + offline fallback)
```

## Notable implementation choices

- **Fonts are self-hosted** via `@fontsource-variable/*` packages rather than `next/font/google`, so
  builds never depend on reaching Google's font CDN (useful for restricted/offline CI environments).
- **shadcn UI components are hand-written**, not CLI-generated — same pattern (Radix + `cva` + `cn()`),
  just without depending on the shadcn registry being reachable at generation time.
- **Brand icons** (GitHub/LinkedIn/X) are small inline SVGs in `components/common/brand-icons.tsx`
  since recent `lucide-react` releases dropped bundled brand/logo icons.
- Type-checked (`tsc --noEmit`) and linted (`eslint`) clean; `npm run build` produces a fully static
  homepage/blog with one dynamic API route.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
