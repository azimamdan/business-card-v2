# RESEARCH.md — Phase 1: Landing Page Refinement

## Current State Analysis

### Landing Page (`src/app/page.tsx`)
- Current design is extremely minimal (Logo + Tagline + Button).
- Background has a subtle glow effect (`bg-[var(--accent-brand)]/10`).
- Framer Motion variants are imported from `@/lib/motion-variants`.

### Signup/Login Flows
- Both use standard `Card` components from shadcn.
- `SignupPage` includes slug validation and reserved slug checks.
- Logic is sound, but styling is basic.

### Theme System
- `globals.css` only defines Light and Dark.
- `layout.tsx` `ThemeProvider` only enables `light` and `dark`.
- **Decision Update**: Sepia theme has been removed from scope by user request.

### 3. "Get Started" Flow
- Add a session check to the landing page. If user is logged in, "Get Started" should redirect to `/dashboard` or change text to "Go to Dashboard".

## Discovery Level: 1 (Quick Verification)
- Confirmed shadcn/next-themes pattern for multi-theme support.
- Confirmed current folder structure and file paths.
