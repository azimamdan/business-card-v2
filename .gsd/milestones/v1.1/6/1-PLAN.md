---
phase: 6
plan: 1
wave: 1
---

# Plan 6.1: Theme Infrastructure & Provider

## Objective
Set up the triple-theme CSS variable system and wire `next-themes` ThemeProvider into the app layout. This is the foundation that all subsequent plans depend on.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md (Phase 6 Decisions)
- src/app/globals.css
- src/app/layout.tsx

## Tasks

<task type="auto">
  <name>Add Sepia theme CSS variables</name>
  <files>src/app/globals.css</files>
  <action>
    Add a `[data-theme='sepia']` CSS variable block AFTER the `.dark` block.
    Use the following palette for the sepia/e-ink feel:
    - Background: `#F5F2E9` (warm cream)
    - Foreground/text: `#433422` (dark charcoal)
    - Card: `#EDE8DC` (slightly darker cream)
    - Muted: `#D9D2C4` (warm grey)
    - Muted-foreground: `#7A6E5E` (medium brown)
    - Border: `#C9C0AE` (warm border)
    - Input: `#C9C0AE`
    - Primary: `#433422` (charcoal)
    - Primary-foreground: `#F5F2E9` (cream)
    - Accent: `#D9D2C4`
    - Destructive: Keep similar to dark theme destructive red

    Also add `--font-geist` and `--font-mono` CSS custom properties.
    Do NOT modify existing `:root` or `.dark` blocks (they work as light/dark already).
  </action>
  <verify>Confirm `[data-theme='sepia']` block exists in globals.css with all required variables</verify>
  <done>globals.css has three complete theme variable sets: `:root`, `.dark`, `[data-theme='sepia']`</done>
</task>

<task type="auto">
  <name>Create ThemeProvider and wire into layout</name>
  <files>
    src/components/ui/theme-provider.tsx (NEW)
    src/app/layout.tsx
  </files>
  <action>
    1. Create `src/components/ui/theme-provider.tsx`:
       - "use client" wrapper around `next-themes` ThemeProvider
       - Export `ThemeProvider` component
       - Configure: `attribute="class"`, `defaultTheme="dark"`, `themes={["light", "dark", "sepia"]}`, `enableSystem={false}`

    2. Modify `src/app/layout.tsx`:
       - Replace `Inter` font import with `Geist` from `next/font/google` and `JetBrains_Mono` from `next/font/google`
       - Set font variables: `--font-geist` (primary) and `--font-mono` (monospace)
       - Remove hardcoded `className="dark"` from `<html>` tag — let next-themes manage it
       - Wrap `{children}` in `<ThemeProvider>`
       - Change `<body>` class from `bg-slate-950 text-slate-50` to `bg-background text-foreground`
       - Update font-sans reference in globals.css `@theme` block from `--font-inter` to `--font-geist`

    AVOID: Do NOT change metadata in this plan (handled in Plan 6.5).
  </action>
  <verify>npm run build — no type errors, ThemeProvider renders</verify>
  <done>App uses next-themes ThemeProvider with dark as default, Geist + JetBrains Mono fonts loaded</done>
</task>

## Success Criteria
- [ ] Three theme variable sets exist in globals.css
- [ ] ThemeProvider wraps the app with dark default
- [ ] Geist font renders as primary, JetBrains Mono available as mono
- [ ] `npm run build` passes
