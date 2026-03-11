# DECISIONS.md (ADR)

| Date | Decision | Rationale | Alternatives |
|------|----------|-----------|--------------|
| 2026-02-20 | Supabase over Clerk/NextAuth | Unified auth/data layer, Postgres RLS, user preference. | Clerk, NextAuth |
| 2026-02-20 | `/[username]` root routing | Essential for "Digital Identity" branding. | `/p/[username]` |
| 2026-02-20 | Dark Mode default | "Linear-style" premium aesthetic requirement. | Multi-theme, Light default |
| 2026-02-21 | Auth in Phase 1 | RLS requires `auth.uid()` FK on `profiles`, better to wire early. | Defer to Phase 3 |
| 2026-02-21 | JSONB for block data | Flexible schema; no migrations for new block types. | Typed columns per block |
| 2026-02-21 | Minimal landing page at `/` | Establishes brand immediately with "Get Started" CTA. | Redirect to `/login` |
| 2026-02-21 | Seed demo profile | Enables visual testing of Dark Mode + Accent Color before editor. | No seed data |
| 2026-02-21 | Reserved slugs list | Prevents `/[username]` collisions with static routes. | DB-only validation |

## Phase 1 Decisions

**Date:** 2026-02-21

### Scope
- Auth plumbing (Supabase client, middleware, RLS) included in Phase 1.
- Minimal landing page at `/` with "Get Started" CTA.
- Seed demo profile (`/demo` or `/shantanu`) with sample blocks.

### Approach
- `blocks.data` column uses `JSONB` for maximum flexibility.
- Reserved slugs: `admin`, `login`, `signup`, `api`, `dashboard`, `settings`.
- RLS: Public `SELECT` on published profiles; owner-only `INSERT`/`UPDATE`/`DELETE`.

### Constraints
- User will provide `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

## Phase 3 Decisions

**Date:** 2026-02-22

### Scope
- Visible **Publish/Unpublish toggle** (Draft → Live workflow).
- **Slug editing** allowed with a warning about breaking existing links.
- **Avatar upload** via Supabase Storage (not URL-only).
- **Show/hide toggle** per block (`is_visible`) exposed in the editor.

### Approach
- **Side-by-side editor** (Option A): Form left, live preview right on desktop. Tabs (Edit/Preview) on mobile.
- Dark Mode / shadcn-ui aesthetic throughout the dashboard shell.
- **Up/Down arrow buttons** for block reordering (drag-and-drop deferred to Phase 4).
- **react-hook-form + zod** for form state and validation.
- **Next.js Server Actions** for all CRUD (profiles + blocks).

### Dashboard Essentials
- "View Public Profile" button + "Copy Link" shortcut (when published).
- Onboarding guard: redirect to "Claim your username" if profile doesn't exist.

### Constraints
- Must be mobile-first; editor must work beautifully on phones.
- Supabase Storage bucket required for avatar uploads.

## Phase 4 Decisions

**Date:** 2026-02-22

### Scope
- Full Premium + Performance (Option A + C from discussion).
- Public profile and landing page are the highest priority polish targets.
- Dashboard should feel snappy and professional but is secondary to public-facing pages.

### Approach
- **Framer Motion**: Staggered viewport-triggered reveals on public profile blocks. Hero animations on landing page. Spring micro-interactions on buttons/toggles.
- **next/image**: Replace all raw `<img>` tags with `next/image`. Configure `remotePatterns` for Supabase.
- **Loading Skeletons**: Use Next.js `loading.tsx` convention for the public profile route.
- **Mobile Tab Transitions**: Use `AnimatePresence` for crossfade between Edit/Preview tabs.
- **Thin Client Wrappers**: Keep public profile as a Server Component; wrap animated sections in a small `"use client"` `AnimatedSection` component.

### Constraints
- Server Component architecture preserved for SEO on public profile.
- Framer Motion bundle size (~30KB gzipped) accepted for premium feel.
- Blob URLs from avatar upload use `unoptimized` prop with `next/image`.

## Phase 6 Decisions

**Date:** 2026-03-06

### Scope
- **Rebrand**: All user-facing copy from "Canvas" → "[ IDCV ] Identity Canvas". Internal component names stay unchanged.
- **Domain**: `canvas.to/` → `idcv.me/` in all user-facing slug prefixes.
- **Fonts**: Geist (primary) + JetBrains Mono (monospace for technical data). Replace Inter.
- **Triple-Theme**: Dark (default, Linear-style), Light (Clean/Apple).
- **Logo/Favicon**: SVG-in-code `[ IDCV ]` in JetBrains Mono.
- **Loading Skeletons**: Must respect active theme colors to prevent flashing.

### Approach
- Chose: `next-themes` (already installed) with `data-theme` attribute strategy.
- Chose: CSS Variables for both themes (`:root` light, `.dark`).
- Chose: Geist font (over Inter) for techy aesthetic.
- Chose: SVG-in-code logo (over external image asset).
- Chose: Theme switcher in Dashboard header + discreet toggle on Public Profile (Option A).

### Constraints
- Search/replace is **copy-only** — no internal component/variable renames.

## Phase 1 (v1.2) Decisions

**Date:** 2026-03-11

### Scope
- **Sepia Theme**: Removed from project scope entirely. The application will remain Dual-Theme (Light/Dark).
- **Landing Page**: Keep sparse, minimalist design. No secondary tagline added.
- **Branding Audit**: Extended to include `canvas.to` domain references and all Metadata/OG tags.

### Approach
- **Session Awareness**: Option B (Change button text to "Go to Dashboard" if authenticated) instead of silent redirect.
- **Optimization**: Use `will-change: transform, opacity` for the landing page glow effect to ensure mobile performance.

### Constraints
- Must maintain ultra-minimalist aesthetic.
- Branding must be consistent with `[ IDCV ] Identity Canvas` and `idcv.me`.
