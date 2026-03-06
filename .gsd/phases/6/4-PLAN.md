---
phase: 6
plan: 4
wave: 2
---

# Plan 6.4: Hardcoded Color Migration — Components + Branding Copy

## Objective
Migrate all hardcoded `slate-*` colors in component files and replace all user-facing "Canvas" copy with "IDCV" branding.

## Context
- .gsd/DECISIONS.md (Phase 6 — copy-only replace, idcv.me domain)
- src/components/dashboard/ (all files)
- src/components/blocks/ (all files)

## Tasks

<task type="auto">
  <name>Migrate component hardcoded colors</name>
  <files>
    src/components/dashboard/setup-form.tsx
    src/components/dashboard/slug-editor.tsx
    src/components/dashboard/profile-form.tsx
    src/components/dashboard/block-editor-card.tsx
    src/components/dashboard/add-block-menu.tsx
    src/components/dashboard/live-preview.tsx
    src/components/dashboard/mobile-tabs.tsx
    src/components/dashboard/publish-toggle.tsx
    src/components/dashboard/avatar-upload.tsx
    src/components/dashboard/copy-link-button.tsx
    src/components/dashboard/sign-out-button.tsx
    src/components/dashboard/block-forms/hero-form.tsx
    src/components/dashboard/block-forms/vcard-form.tsx
    src/components/dashboard/block-forms/project-form.tsx
    src/components/dashboard/block-forms/markdown-form.tsx
    src/components/blocks/hero-block.tsx
    src/components/blocks/vcard-block.tsx
    src/components/blocks/project-block.tsx
    src/components/blocks/markdown-block.tsx
  </files>
  <action>
    Apply the same mapping from Plan 6.3 to ALL component files:
    - `bg-slate-950` → `bg-background`
    - `bg-slate-900` → `bg-card`
    - `bg-slate-900/50` → `bg-card/50`
    - `bg-slate-800` → `bg-muted`
    - `text-slate-50` → `text-foreground`
    - `text-slate-400` → `text-muted-foreground`
    - `text-slate-500` → `text-muted-foreground`
    - `text-slate-300` → `text-foreground/70`
    - `text-slate-200` → `text-foreground/80`
    - `border-slate-800` → `border-border`
    - `border-slate-700` → `border-input`
    - `bg-slate-800` (for inputs) → `bg-muted`

    CAREFUL: In block-editor-card.tsx, the `isDragging` styles should still use accent-brand.
  </action>
  <verify>npm run build — no errors</verify>
  <done>All ~19 component files use semantic color classes</done>
</task>

<task type="auto">
  <name>Replace all user-facing "Canvas" copy and domain references</name>
  <files>
    src/app/page.tsx (landing)
    src/app/dashboard/layout.tsx
    src/app/[username]/page.tsx
    src/components/dashboard/slug-editor.tsx
    src/components/dashboard/setup-form.tsx
    src/components/dashboard/live-preview.tsx
    src/app/signup/page.tsx
  </files>
  <action>
    Branding replacements (USER-FACING COPY ONLY):
    1. Landing page `page.tsx`: "Canvas" → "[ IDCV ]" in h1 hero title
    2. Landing page: "Your Digital Identity, Reimagined." → "Your Modular Identity Canvas."
    3. Landing page: "© 2026 Digital Identity Platform" → "© 2026 IDCV"
    4. Dashboard layout: Logo icon "C" → "ID"; "Canvas" span → "IDCV"
    5. Public profile: "Created with Canvas" → "Created with IDCV"

    Domain replacements:
    6. slug-editor.tsx: "canvas.to/" → "idcv.me/" (2 occurrences)
    7. setup-form.tsx: "canvas.to/" → "idcv.me/"
    8. live-preview.tsx: "canvas.to/" → "idcv.me/"
    9. signup/page.tsx: "canvas.to/" → "idcv.me/"

    DO NOT rename any component names, variable names, file names, or import paths.
  </action>
  <verify>grep -r "Canvas" src/ — should only match component names (BlockRenderer, canvas dir), never user-facing text. grep -r "canvas.to" src/ — should return 0 results.</verify>
  <done>All user-facing text says "IDCV" and all domain prefixes say "idcv.me/"</done>
</task>

## Success Criteria
- [ ] Zero hardcoded slate colors in component files
- [ ] No user-facing "Canvas" text anywhere
- [ ] All domain prefixes show "idcv.me/"
- [ ] `npm run build` passes
