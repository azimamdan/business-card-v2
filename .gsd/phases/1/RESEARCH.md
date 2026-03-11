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
- **Decision Log v1.1** required a `Sepia` theme which is currently missing.

## Proposed Refinements

### 1. Landing Page Visuals
- **Typography**: Enhance the tagline with a more premium font weight or size balance.
- **Copy**: Add a secondary "Feature sub-line" to explain the product clearly.
  - *Current*: "Your Digital Identity, Reimagined."
  - *Proposed*: "Your Digital Identity, Reimagined. Build a modular profile that works as a resume, portfolio, and V-Card—all in one link."
- **Effect**: Add a subtle noise texture or a more dynamic background gradient to the "Landing Page" to increase the "premium" feel.

### 2. Triple-Theme Implementation
- **Sepia Theme Variables**:
  ```css
  [data-theme='sepia'] {
    --background: oklch(0.95 0.02 85); /* #F5F2E9 approx */
    --foreground: oklch(0.25 0.05 45); /* #433422 approx */
    --primary: oklch(0.25 0.05 45);
    /* ... other variables ... */
  }
  ```
- **ThemeProvider Update**: Update `layout.tsx` to include `themes={["light", "dark", "sepia"]}`.

### 3. "Get Started" Flow
- Add a session check to the landing page. If user is logged in, "Get Started" should redirect to `/dashboard` or change text to "Go to Dashboard".

## Discovery Level: 1 (Quick Verification)
- Confirmed shadcn/next-themes pattern for multi-theme support.
- Confirmed current folder structure and file paths.
