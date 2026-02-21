---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Next.js Project Scaffold

## Objective
Initialize a fresh Next.js project with App Router, Tailwind CSS, and shadcn/ui. This creates the foundation that all subsequent plans depend on.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md (Dark Mode default, Tailwind + shadcn)

## Tasks

<task type="auto">
  <name>Initialize Next.js with Tailwind</name>
  <files>
    - package.json (created)
    - src/app/layout.tsx (created)
    - src/app/page.tsx (created)
    - tailwind.config.ts (created)
    - tsconfig.json (created)
    - next.config.ts (created)
  </files>
  <action>
    Run `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` in the project root.
    
    IMPORTANT: Use `./` to initialize IN the current directory. Use `--yes` or non-interactive flags to avoid prompts.
    
    After initialization:
    - Verify `package.json` contains next, react, tailwind dependencies.
    - Verify `src/app/layout.tsx` and `src/app/page.tsx` exist.
  </action>
  <verify>npx next build (should compile without errors)</verify>
  <done>Next.js project scaffolded with TypeScript, Tailwind, App Router, src/ dir</done>
</task>

<task type="auto">
  <name>Initialize shadcn/ui</name>
  <files>
    - components.json (created)
    - src/lib/utils.ts (created)
    - src/components/ui/ (directory created)
  </files>
  <action>
    Run `npx -y shadcn@latest init` with these options:
    - Style: "new-york"
    - Base color: "slate" (matches Linear dark aesthetic)
    - CSS variables: yes
    
    After init, install initial components:
    - `npx shadcn@latest add button input card label`
    
    Verify `components.json` exists and `src/components/ui/button.tsx` exists.
  </action>
  <verify>Test-Path "components.json"; Test-Path "src/components/ui/button.tsx"</verify>
  <done>shadcn/ui initialized with button, input, card, label components</done>
</task>

<task type="auto">
  <name>Configure Dark Mode default and base styling</name>
  <files>
    - src/app/globals.css (modify)
    - tailwind.config.ts (modify)
    - src/app/layout.tsx (modify)
  </files>
  <action>
    1. In `tailwind.config.ts`, set `darkMode: "class"`.
    2. In `src/app/layout.tsx`, add `className="dark"` to the `<html>` tag to enforce dark mode by default.
    3. In `src/app/globals.css`, add CSS custom property `--accent-color` with a default value (e.g., `hsl(250, 100%, 65%)` — a vivid purple).
    4. Set base body styles: `bg-slate-950 text-slate-50` for the dark canvas feel.
    5. Add the Google Font "Inter" import and set it as the default.
  </action>
  <verify>npm run dev -- --port 3001 (page should load with dark background)</verify>
  <done>Dark mode default active, Inter font loaded, accent color CSS variable defined</done>
</task>

## Success Criteria
- [ ] `npm run dev` starts without errors
- [ ] Page renders with dark background (slate-950) and Inter font
- [ ] shadcn/ui components available in `src/components/ui/`
