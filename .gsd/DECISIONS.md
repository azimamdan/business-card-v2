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

## Phase 2 (v1.2) Decisions

**Date:** 2026-03-11

### Scope
- Optimize all image types (avatars, project thumbnails, image blocks).
- Target 90+ Lighthouse on public profiles, prioritizing LCP.
- No migration of existing images; applies to new uploads only.

### Approach
- Chose: Option A (Client-side compression before upload).
- Details: Max ~800px / 200KB compression before uploading to Supabase Storage.
- Standard pattern: Use `next/image` with `fill` + `object-cover` for all dynamic images.
- Configuration: Add Supabase domain to `remotePatterns` in Next.js config.

### Constraints
- Ensure layouts do not break with the `fill` + `object-cover` pattern.
## Phase 3 (v1.2) Decisions

**Date:** 2026-03-11

### Scope
- **Priority Areas**: 1. Dashboard Block Editor, 2. Public Profile, 3. Landing Page.
- **Touch Targets**: Hard rule: All interactive elements must be minimum 44x44px.
- **Acceptance Criteria**: Zero Layout Shift (CLS) from `next/image` on mobile viewports.

### Approach
- **Strategy**: Option B (CSS refinements + mobile-native interaction patterns).
- **Mobile Patterns**: Implement bottom sheets (vaul) for block editing forms on mobile devices to replace desktop-side-panel/modal paradigms.
- **Audit**: Systematic audit of all clickable elements for touch-target compliance.

### Constraints
- Maintain premium, minimalist "IDCV" aesthetic while increasing target sizes.
- Ensure smooth transitions between mobile-native patterns and desktop layouts.

## Phase 4 (v1.2) Decisions

**Date:** 2026-03-11

### Scope
- Verify all v1.2 requirements and formally close the milestone.
- **Branding checklist:** Sweep for `canvas.to`, "Canvas", `<title>`/og: metadata, and `idcv.me` slug prefix.
- Explicitly re-verify dashboard block editor on mobile and verify no CLS regressions from Phase 2.

### Approach
- **Combined Audit & Manual Walkthrough:**
  1. Run the `/audit-milestone` automated workflow first.
  2. Do a manual end-to-end walkthrough covering: sign-up, avatar upload, block add/reorder on mobile, theme toggle, and vCard download on mobile.

### Constraints
- Must ensure all traces of old "Canvas" branding are fully purged in codebase and metadata.
