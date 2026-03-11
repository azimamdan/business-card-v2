---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Landing Page Refinement

## Objective
Finalize the minimalist landing page design and polish the "Get Started" flow.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- .gsd/phases/1/RESEARCH.md
- src/app/page.tsx
- src/app/globals.css
- src/app/layout.tsx

## Tasks

<task type="auto">
  <name>Refine Theme Variables</name>
  <files>src/app/globals.css</files>
  <action>
    - Review and refine light/dark theme variables for optimal contrast and "premium" feel.
    - Ensure consistent naming and values across both themes.
  </action>
  <verify>Check `globals.css` for clean theme variable definitions.</verify>
  <done>Theme variables are refined and consistent.</done>
</task>

<task type="auto">
  <name>Refine Minimalist Landing Page</name>
  <files>src/app/page.tsx</files>
  <action>
    - Ensure copy remains sparse (minimalist logo + tagline).
    - Implement Option B session check: If logged in, change "Get Started" to "Go to Dashboard" and update link.
    - Optimize background glow with `will-change: transform, opacity`.
  </action>
  <verify>Check landing page with and without authenticated session.</verify>
  <done>Landing page is optimized, session-aware, and meets minimalist bar.</done>
</task>

<task type="auto">
  <name>Extended Branding & Metadata Audit</name>
  <files>src/app/layout.tsx, src/app/login/page.tsx, src/app/signup/page.tsx</files>
  <action>
    - Sweep codebase for `canvas.to` and replace with `idcv.me`.
    - Replace all user-facing "Canvas" with "[ IDCV ] Identity Canvas".
    - Audit `src/app/layout.tsx` metadata and OG tags for branding consistency.
    - Ensure `IdcvLogo` usage is standard across auth pages.
  </action>
  <verify>Grep for "canvas.to" and "Canvas". Inspect layout metadata.</verify>
  <done>All branding (copy/links/metadata/og) is synchronized to IDCV.</done>
</task>

## Success Criteria
- [ ] Triple-theme support (Light, Dark, Sepia) is fully functional.
- [ ] Landing page hits the "premium minimalist" bar with clear value prop.
- [ ] Auth flow is consistent and branded correctly.
- [ ] Build and lint pass successfully.
