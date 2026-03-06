---
phase: 6
plan: 2
wave: 1
---

# Plan 6.2: Theme Switcher Component

## Objective
Create the theme switcher UI component and integrate it into the dashboard header and public profile footer.

## Context
- .gsd/DECISIONS.md (Phase 6 — Option A: Dashboard header + public profile footer)
- src/app/dashboard/layout.tsx
- src/app/[username]/page.tsx

## Tasks

<task type="auto">
  <name>Create ThemeSwitcher component</name>
  <files>src/components/ui/theme-switcher.tsx (NEW)</files>
  <action>
    Create a `"use client"` component:
    - Uses `useTheme()` from `next-themes`
    - Three-way toggle pill: Sun (light), Moon (dark), BookOpen (sepia) — icons from `lucide-react`
    - Compact pill-style UI with smooth transitions
    - Active state uses `bg-accent-brand` glow, inactive uses `bg-muted`
    - Add `suppressHydrationWarning` where needed
    - Accept an optional `variant` prop: `"default"` (full pill) or `"compact"` (icon-only for public profile)
  </action>
  <verify>Component renders without hydration errors</verify>
  <done>ThemeSwitcher component exists and toggles between dark/light/sepia</done>
</task>

<task type="auto">
  <name>Integrate ThemeSwitcher into dashboard header</name>
  <files>src/app/dashboard/layout.tsx</files>
  <action>
    Add `<ThemeSwitcher />` to the dashboard header, placed between the "View Profile" link and the divider/sign-out area.
    - Import ThemeSwitcher at top
    - Position it in the header's right-side flex container
    
    AVOID: Do NOT change branding copy in this plan (handled in Plan 6.4).
    AVOID: Do NOT migrate slate colors in this plan (handled in Plan 6.3).
  </action>
  <verify>Theme switcher appears in dashboard header and cycles themes</verify>
  <done>Dashboard header has a working theme switcher between the action buttons</done>
</task>

<task type="auto">
  <name>Add compact ThemeSwitcher to public profile</name>
  <files>src/app/[username]/page.tsx</files>
  <action>
    Add `<ThemeSwitcher variant="compact" />` as a discreet element in the public profile footer area.
    - Since [username]/page.tsx is a Server Component, wrap the ThemeSwitcher in a small client boundary (it's already a client component with "use client")
    - Place it near the "Created with Canvas" footer link

    AVOID: Do NOT rename "Canvas" text in this plan (Plan 6.4).
    AVOID: Do NOT migrate colors yet (Plan 6.3).
  </action>
  <verify>Public profile page shows a compact theme toggle in footer</verify>
  <done>Public profile has a discreet theme switcher in the footer</done>
</task>

## Success Criteria
- [ ] ThemeSwitcher component renders three options
- [ ] Dashboard header contains the switcher
- [ ] Public profile footer contains a compact switcher
- [ ] No hydration errors
- [ ] `npm run build` passes
