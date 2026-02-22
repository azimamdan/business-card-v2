---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Block Renderer Components

## Objective
Create the four core block renderer components (HeroBlock, VCardBlock, ProjectBlock, MarkdownBlock) as client components with premium "Linear-style" dark aesthetics. These components consume typed `BlockData` and render rich, interactive UI. This plan also installs the `react-markdown` + `remark-gfm` dependency for the Markdown block.

## Context
- .gsd/SPEC.md
- src/lib/types/database.ts (existing types: HeroData, VCardData, ProjectData, MarkdownData)
- src/app/globals.css (existing design tokens, accent-brand variable)
- package.json (current deps — need to add react-markdown + remark-gfm)

## Tasks

<task type="auto">
  <name>Install react-markdown and remark-gfm</name>
  <files>package.json</files>
  <action>
    Run `npm install react-markdown remark-gfm` to add markdown rendering capability.
    - react-markdown: Renders markdown as React components (no dangerouslySetInnerHTML).
    - remark-gfm: Adds GitHub Flavored Markdown (tables, strikethrough, tasklists).
    - Do NOT install `rehype-raw` — we don't need raw HTML rendering and it reduces XSS surface.
  </action>
  <verify>npx tsc --noEmit (no type errors); grep "react-markdown" package.json</verify>
  <done>react-markdown and remark-gfm are in dependencies</done>
</task>

<task type="auto">
  <name>Create Block Renderer Components</name>
  <files>
    src/components/blocks/hero-block.tsx [NEW]
    src/components/blocks/vcard-block.tsx [NEW]
    src/components/blocks/project-block.tsx [NEW]
    src/components/blocks/markdown-block.tsx [NEW]
    src/components/blocks/index.ts [NEW]
  </files>
  <action>
    Create `src/components/blocks/` directory with 4 component files + barrel export.

    **hero-block.tsx** — Client component rendering HeroData:
    - Large headline text with `text-3xl md:text-4xl font-bold tracking-tight`
    - Subheadline in muted `text-slate-400`
    - Optional avatar (circular, border uses profile accent color via CSS var `--accent-brand`)
    - Subtle entry animation-ready class names (Phase 4 will add Framer Motion)
    - Container: `rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8`

    **vcard-block.tsx** — Client component rendering VCardData:
    - Display name (firstName + lastName), title, company in a structured card
    - Email and phone as clickable `mailto:` and `tel:` links with lucide-react icons (Mail, Phone, Building2, Briefcase)
    - "Add to Contacts" button (styled with accent color) — onClick triggers download from `/api/vcard/[blockId]` (built in Plan 2.3)
    - Button uses `Download` icon from lucide-react
    - Container matches hero-block card style for visual consistency

    **project-block.tsx** — Client component rendering ProjectData:
    - Title, description, external link (opens in new tab with `rel="noopener noreferrer"`)
    - Tags rendered as small pills: `bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full`
    - Optional image with `rounded-lg overflow-hidden` and object-cover
    - External link icon from lucide-react (ExternalLink)
    - Container matches card style

    **markdown-block.tsx** — Client component rendering MarkdownData:
    - Uses `react-markdown` with `remarkGfm` plugin
    - Apply prose-like styles via a custom `prose-canvas` class:
      - Headings: `text-slate-50 font-bold`
      - Paragraphs: `text-slate-300 leading-relaxed`
      - Links: `text-accent-brand hover:underline`
      - Code: `bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded text-sm`
      - Lists: `text-slate-300` with proper markers
    - Container matches card style

    **index.ts** — Re-exports all four block components for clean imports.

    Design constraints:
    - All components accept their specific data type + block id as props
    - Use `"use client"` directive on all components
    - All components use Tailwind classes from the existing design system (slate palette)
    - Use lucide-react for icons (already installed)
    - NO placeholder images — use icon/text fallbacks
  </action>
  <verify>npx tsc --noEmit (zero type errors); ls src/components/blocks/ shows 5 files</verify>
  <done>4 block components + barrel export exist, type-check cleanly, use consistent card styling</done>
</task>

## Success Criteria
- [ ] `react-markdown` and `remark-gfm` in dependencies
- [ ] All 4 block components exist under `src/components/blocks/`
- [ ] Components use strict TypeScript types from `database.ts`
- [ ] `npx tsc --noEmit` passes with zero errors
