# MonyPoly IT — Consulting & Staffing website

Marketing site built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Motion** for animation.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```
src/
  app/
    actions/forms.ts      Server Actions for the contact + newsletter forms (server-side validation)
    layout.tsx            Fonts, metadata, navbar, footer
    page.tsx              Home page — composes the sections below
    privacy/, terms/      Placeholder legal pages
  components/
    layout/               Navbar (active-section tracking, mobile menu), footer, newsletter form
    sections/             Hero, Services, Stats, Staffing, Approach, Mission, Contact
    ui/                   Reusable primitives: Reveal/Stagger, SpotlightCard, Counter, Magnetic, Marquee, …
  hooks/                  useActiveSection
  lib/
    site.ts               Brand name, contact details, nav items  ← edit first
    content.ts            All copy: services, stats, staffing models, phases, roles, principles
    motion.ts             Shared easing + variants
```

## Customising

- **Branding & contact info:** `src/lib/site.ts`
- **Copy and services:** `src/lib/content.ts`
- **Colours / fonts:** design tokens in the `@theme` block of `src/app/globals.css`
- **Form delivery:** replace `deliver()` in `src/app/actions/forms.ts` with your email provider or CRM (Resend, HubSpot, etc.). It currently logs submissions in development.

## Animation notes

All motion respects `prefers-reduced-motion`. Pointer-driven effects (spotlight cards, magnetic buttons, emblem tilt) write to CSS variables / motion values so they never re-render React.
