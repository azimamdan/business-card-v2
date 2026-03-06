---
phase: 6
plan: 5
wave: 3
---

# Plan 6.5: Logo, Favicon & Skeleton Loaders

## Objective
Create the IDCV SVG logo component, generate a favicon, and update skeleton loaders to respect theme colors.

## Context
- .gsd/DECISIONS.md (Phase 6 — SVG-in-code, JetBrains Mono, theme-aware skeletons)
- src/app/[username]/loading.tsx
- src/app/favicon.ico

## Tasks

<task type="auto">
  <name>Create IDCV logo component</name>
  <files>src/components/ui/idcv-logo.tsx (NEW)</files>
  <action>
    Create an SVG component:
    - Renders `[ IDCV ]` text in a monospace/JetBrains Mono style
    - Accepts `size` prop ("sm" | "md" | "lg") for header vs landing contexts
    - Uses `currentColor` so it adapts to any theme
    - Clean, minimalist bracket aesthetic
    - Export as default and named export
  </action>
  <verify>Component renders at all three sizes without visual issues</verify>
  <done>IdcvLogo component exists and renders cleanly</done>
</task>

<task type="auto">
  <name>Generate favicon and update loading skeleton</name>
  <files>
    src/app/icon.svg (NEW — Next.js metadata convention)
    src/app/[username]/loading.tsx
  </files>
  <action>
    1. Create `src/app/icon.svg`:
       - Simple SVG favicon of `[ ID ]` bracket motif
       - Works at small sizes (16x16, 32x32)
       - Dark text on transparent (or simple contrast)

    2. Update `src/app/[username]/loading.tsx`:
       - Replace all hardcoded `bg-slate-950`, `bg-slate-800`, `bg-slate-800/50`, `bg-slate-700` with semantic classes
       - Use `bg-background` for main container
       - Use `bg-muted` and `bg-muted/50` for skeleton pulse elements
       - Use `border-border` for borders
       - This ensures no "dark flash" when loading in Light or Sepia mode

    3. Optionally delete `src/app/favicon.ico` (Next.js will prefer `icon.svg`)
  </action>
  <verify>Browser shows new favicon; navigate to public profile — skeleton uses theme-appropriate colors</verify>
  <done>Favicon shows bracket motif; skeleton loaders respect active theme</done>
</task>

## Success Criteria
- [ ] IdcvLogo component renders at multiple sizes
- [ ] Favicon shows in browser tab
- [ ] Skeleton loader uses semantic theme colors
- [ ] No dark flash on Light/Sepia mode page load
- [ ] `npm run build` passes
