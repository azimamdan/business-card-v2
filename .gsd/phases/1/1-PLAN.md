---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Landing Page & Theme Refinement

## Objective
Finalize the minimalist landing page design, implement the triple-theme system (adding Sepia), and polish the "Get Started" flow.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- .gsd/phases/1/RESEARCH.md
- src/app/page.tsx
- src/app/globals.css
- src/app/layout.tsx

## Tasks

<task type="auto">
  <name>Implement Triple-Theme (Sepia)</name>
  <files>src/app/globals.css, src/app/layout.tsx</files>
  <action>
    - Define `.sepia` theme variables in `globals.css` using the values: bg `#F5F2E9`, text `#433422`.
    - Map other semantic variables (primary, muted, accent, etc.) to harmonious sepia tones.
    - Update `ThemeProvider` in `layout.tsx` to include `sepia` in the `themes` array.
  </action>
  <verify>Check `globals.css` for `.sepia` and `layout.tsx` for `ThemeProvider` update.</verify>
  <done>Sepia theme variables exist and theme provider allows sepia selection.</done>
</task>

<task type="auto">
  <name>Refine Minimalist Landing Page</name>
  <files>src/app/page.tsx</files>
  <action>
    - Add sub-headline to the landing page explaining the "Digital Identity Canvas" concept (Resume, Portfolio, V-Card).
    - Enhance typography (weight/spacing) for a premium minimalist feel.
    - Implement a session check: If a user is logged in, show "Go to Dashboard" and link to `/dashboard`.
    - Add a subtle visual refinement (e.g., optimized glow or faint texture) to the background.
  </action>
  <verify>Run `npm run build` and `npm run lint`.</verify>
  <done>Landing page copy is complete, layout is polished, and session logic is implemented.</done>
</task>

<task type="auto">
  <name>Technical Debt & Branding Audit</name>
  <files>src/app/signup/page.tsx, src/app/login/page.tsx</files>
  <action>
    - Audit `signup` and `login` pages for consistent `IdcvLogo` usage and branding.
    - Search for and replace any remaining "Canvas" text with "[ IDCV ] Identity Canvas" in user-facing copy.
    - Verify mobile responsiveness of auth forms.
  </action>
  <verify>Search for "Canvas" in `src/app`. Run `npm run lint`.</verify>
  <done>All branding is consistent and auth pages are polished.</done>
</task>

## Success Criteria
- [ ] Triple-theme support (Light, Dark, Sepia) is fully functional.
- [ ] Landing page hits the "premium minimalist" bar with clear value prop.
- [ ] Auth flow is consistent and branded correctly.
- [ ] Build and lint pass successfully.
