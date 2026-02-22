---
phase: 3
plan: 2
wave: 1
---

# Plan 3.2: Dashboard Shell & Layout

## Objective
Create the authenticated dashboard structure: layout with navigation, auth guard, onboarding flow for new users, and the side-by-side editor skeleton with mobile tab support.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md (Phase 3: side-by-side editor, onboarding guard)
- src/lib/supabase/server.ts
- src/lib/supabase/middleware.ts (already redirects unauthenticated to /login)
- src/lib/actions/profile.ts (from Plan 3.1)
- src/app/globals.css (design tokens)

## Tasks

<task type="auto">
  <name>Create Dashboard Layout</name>
  <files>
    src/app/dashboard/layout.tsx [NEW]
  </files>
  <action>
    Create `src/app/dashboard/layout.tsx` as a Server Component.

    **Layout structure:**
    - Full-screen `min-h-screen bg-slate-950 text-slate-50`
    - Top header bar:
      - Left: App logo/name "Canvas" (link to `/`)
      - Right: User info (display_name or email), "View Profile" button (links to `/{slug}`, opens new tab), "Sign Out" button
    - If profile is published: show a "Copy Link" button next to "View Profile"
    - Main content area: `{children}` with proper padding
    - Fetch user session via `supabase.auth.getUser()` in the layout
    - Fetch profile via `getProfile()` action for the header info

    **Sign Out:** Create an inline client component or a separate `src/components/dashboard/sign-out-button.tsx` that calls `supabase.auth.signOut()` and redirects to `/login`.

    **Design:**
    - Header: `bg-slate-900/80 backdrop-blur-sm border-b border-slate-800`
    - Sticky header with `sticky top-0 z-50`
    - Responsive: hide "View Profile" text on mobile, show icon only
  </action>
  <verify>npm run build (build succeeds); curl localhost:3000/dashboard returns HTML with "Canvas" header</verify>
  <done>Dashboard layout renders with header, auth info, and view-profile link</done>
</task>

<task type="auto">
  <name>Create Dashboard Page with Onboarding Guard</name>
  <files>
    src/app/dashboard/page.tsx [NEW]
  </files>
  <action>
    Create `src/app/dashboard/page.tsx` as a Server Component.

    **Logic flow:**
    1. Call `getProfile()` to check if user has a profile.
    2. If NO profile exists: render an onboarding card — "Welcome! Let's set up your identity canvas." with a form to enter display_name and slug (redirect to a setup flow or inline form).
    3. If profile EXISTS: render the main editor layout.

    **Main editor layout (profile exists):**
    - Use a responsive grid: `grid grid-cols-1 lg:grid-cols-2 gap-6`
    - Left column: Editor panel (placeholder for now — "Editor Panel" text)
    - Right column: Preview panel (placeholder for now — "Preview Panel" text)
    - On mobile: Use shadcn `Tabs` component with "Edit" and "Preview" tabs
    - Wrap with `framer-motion` `AnimatePresence` for tab transitions

    **Design:**
    - `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`
    - Cards use `bg-slate-900 border border-slate-800 rounded-2xl`
  </action>
  <verify>npm run build (build succeeds with /dashboard route)</verify>
  <done>Dashboard page renders with onboarding guard and responsive editor/preview skeleton</done>
</task>

## Success Criteria
- [ ] `/dashboard` route exists and is protected by middleware
- [ ] Layout renders header with Canvas branding, user info, view-profile, sign-out
- [ ] New users (no profile) see onboarding flow
- [ ] Existing users see side-by-side editor skeleton
- [ ] Mobile view shows Edit/Preview tabs
- [ ] `npm run build` passes
