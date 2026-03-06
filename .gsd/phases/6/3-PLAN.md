---
phase: 6
plan: 3
wave: 2
---

# Plan 6.3: Hardcoded Color Migration — Pages

## Objective
Migrate all hardcoded `slate-*` Tailwind classes to semantic CSS variable classes across page-level files so themes actually change what the user sees.

## Context
- .gsd/DECISIONS.md (Phase 6 — Color migration mapping)
- src/app/layout.tsx (already done in 6.1)
- src/app/page.tsx
- src/app/login/page.tsx
- src/app/signup/page.tsx
- src/app/dashboard/layout.tsx
- src/app/dashboard/page.tsx
- src/app/[username]/page.tsx
- src/app/[username]/loading.tsx

## Tasks

<task type="auto">
  <name>Migrate page-level hardcoded colors</name>
  <files>
    src/app/page.tsx
    src/app/login/page.tsx
    src/app/signup/page.tsx
    src/app/dashboard/layout.tsx
    src/app/dashboard/page.tsx
    src/app/[username]/page.tsx
    src/app/[username]/loading.tsx
  </files>
  <action>
    Apply the following mapping across ALL listed files:

    | Hardcoded | Semantic |
    |-----------|----------|
    | `bg-slate-950` | `bg-background` |
    | `bg-slate-900` | `bg-card` |
    | `bg-slate-900/50` | `bg-card/50` |
    | `bg-slate-900/80` | `bg-card/80` |
    | `bg-slate-800` | `bg-muted` |
    | `bg-slate-800/50` | `bg-muted/50` |
    | `bg-slate-800/80` | `bg-muted/80` |
    | `text-slate-50` | `text-foreground` |
    | `text-slate-400` | `text-muted-foreground` |
    | `text-slate-500` | `text-muted-foreground` |
    | `text-slate-300` | `text-foreground/70` |
    | `text-slate-200` | `text-foreground/80` |
    | `text-slate-600` | `text-muted-foreground/70` |
    | `text-slate-700` | `text-muted-foreground/50` |
    | `border-slate-800` | `border-border` |
    | `border-slate-700` | `border-input` |
    | `text-white` in the context of theme-dependent elements | `text-foreground` |

    CAREFUL:
    - `shadow-purple-500/10` → leave as-is (accent decoration)
    - Gradient classes (e.g., `from-white to-slate-500`) → use `from-foreground to-muted-foreground` or similar
    - `bg-white` buttons → use `bg-primary text-primary-foreground`
    - Leave `text-red-*` destructive styles alone
  </action>
  <verify>npm run build — no errors; open app in dark mode — visual parity with current design</verify>
  <done>All 7 page-level files use semantic color classes instead of hardcoded slate</done>
</task>

## Success Criteria
- [ ] No hardcoded `bg-slate-950` or `bg-slate-900` in page files
- [ ] Dark mode renders identically to before
- [ ] Light mode shows clean white/gray palette
- [ ] Sepia mode shows cream/charcoal palette
- [ ] `npm run build` passes
