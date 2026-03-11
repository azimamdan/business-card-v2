# Phase 4: Polish & Performance — Implementation Plan

> **Goal**: Transform the app from functional to premium. Framer Motion animations on public-facing pages, `next/image` optimization everywhere, micro-interactions on dashboard controls, and a mobile responsiveness audit.

## Wave 1: Infrastructure (dependencies first)

### Task 1.1: Configure `next/image` for Supabase

#### [MODIFY] [next.config.ts](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/next.config.ts)
- Add `images.remotePatterns` for `ealrcbfjlzojhzvffsfu.supabase.co`.
- This unblocks all `<img>` → `next/image` swaps.

### Task 1.2: Create shared Framer Motion utilities

#### [NEW] [motion-variants.ts](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/lib/motion-variants.ts)
- Define reusable animation variants: `fadeInUp`, `staggerContainer`, `scaleOnHover`, `springToggle`.
- Single source of truth for all motion config — no duplicated timings.

#### [NEW] [animated-section.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/ui/animated-section.tsx)
- Thin `"use client"` wrapper using `motion.div` + `whileInView`.
- Accepts `variants`, `delay`, `className` props.
- Used to wrap server-rendered content on the public profile without converting the page to a Client Component.

---

## Wave 2: Public Profile — Premium Reveal (highest priority)

### Task 2.1: Staggered block reveals on `/[username]`

#### [MODIFY] [page.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/app/%5Busername%5D/page.tsx)
- Wrap the `<header>` and each `<BlockRenderer>` in `<AnimatedSection>` with staggered delays.
- Replace raw `<img>` for the profile avatar with `next/image` (96x96, `object-cover`, rounded).
- Keep the page as a **Server Component** — `AnimatedSection` is the only client boundary.

### Task 2.2: Upgrade block renderers

#### [MODIFY] [hero-block.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/blocks/hero-block.tsx)
- Replace CSS `animate-in` with Framer Motion `fadeInUp` variant (viewport-triggered).
- Replace `<img>` for `data.avatarUrl` with `next/image`.

#### [MODIFY] [project-block.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/blocks/project-block.tsx)
- Replace CSS `animate-in` with Framer Motion `fadeInUp` variant.
- Replace `<img>` for `data.imageUrl` with `next/image` (responsive, `fill` mode with `object-cover`).
- Add `whileHover={{ scale: 1.02 }}` on the card container for a subtle lift.

#### [MODIFY] [vcard-block.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/blocks/vcard-block.tsx)
- Replace CSS `animate-in` with Framer Motion `fadeInUp` variant.
- Add spring scale on the "Add to Contacts" button hover.

#### [MODIFY] [markdown-block.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/blocks/markdown-block.tsx)
- Replace CSS `animate-in` with Framer Motion `fadeInUp` variant.

---

## Wave 3: Landing Page — Hero Animations

### Task 3.1: Animate the landing page

#### [MODIFY] [page.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/app/page.tsx)
- Convert to `"use client"` (it's already thin, no data fetching).
- Add `motion.h1` with gradient text reveal animation on load.
- Add `motion.p` subtitle slide-up with delay.
- Add `motion.div` on CTA button with spring scale.
- Add subtle pulse/float animation on the background glow.

---

## Wave 4: Dashboard — Snappy & Professional

### Task 4.1: Animated mobile tab transitions

#### [MODIFY] [page.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/app/dashboard/page.tsx)
- Wrap mobile `TabsContent` blocks with `<AnimatePresence mode="wait">` and `motion.div` for crossfade transitions when switching Edit/Preview.
- Need to extract mobile tabs into a small client component (`DashboardMobileTabs`) to use `AnimatePresence`.

### Task 4.2: Micro-interactions on controls

#### [MODIFY] [publish-toggle.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/dashboard/publish-toggle.tsx)
- Wrap the status indicator dot in `motion.span` with a spring `layoutId` animation when toggling states.

#### [MODIFY] [add-block-menu.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/dashboard/add-block-menu.tsx)
- Add `whileHover/whileTap` scale on menu items.

### Task 4.3: Image optimization in dashboard

#### [MODIFY] [avatar-upload.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/dashboard/avatar-upload.tsx)
- Replace `<img>` with `next/image` for the avatar preview (80x80).
- Note: `previewUrl` from `URL.createObjectURL` works with `next/image` using `unoptimized` prop for blob URLs, or we use a conditional render (blob → `<img>`, Supabase URL → `next/image`).

#### [MODIFY] [live-preview.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/components/dashboard/live-preview.tsx)
- Replace `<img>` with `next/image` for the avatar in the preview header.

---

## Wave 5: Loading Skeleton for Public Profile

### Task 5.1: Profile loading skeleton

#### [NEW] [loading.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/app/%5Busername%5D/loading.tsx)
- Next.js convention: `loading.tsx` beside `page.tsx` creates an automatic `Suspense` boundary.
- Skeleton with pulsing placeholder for avatar circle, name bar, bio bar, and 2-3 block placeholders.
- Matches the dark aesthetic (`bg-slate-800 animate-pulse`).

---

## Wave 6: Mobile Responsiveness Audit

### Task 6.1: Systematic pass

- Audit all pages at 375px (iPhone SE) and 390px (iPhone 14) widths.
- Focus areas:
  - Landing page CTA button size and padding.
  - Login/Signup card padding and input spacing.
  - Dashboard mobile tabs — ensure they're easy to tap (min 44px height).
  - Public profile blocks — ensure full-width rendering without overflow.
  - Block editor cards — drag handle and action buttons accessibility.

#### Files potentially modified (only if issues found):
- `src/app/page.tsx` (landing)
- `src/app/login/page.tsx`
- `src/app/signup/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/dashboard/block-editor-card.tsx`

---

## Auth/Login Pages (Low Priority Polish)

### Task 7.1: Subtle entrance animations

#### [MODIFY] [login/page.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/app/login/page.tsx)
- Wrap the `Card` in a `motion.div` with `fadeInUp` for a polished entrance.

#### [MODIFY] [signup/page.tsx](file:///c:/Users/azima/Desktop/Coding%20Projects/Vibe%20coding/business-card-v2/src/app/signup/page.tsx)
- Same treatment — `motion.div` `fadeInUp` wrapper.

---

## Verification Plan

### Automated
```bash
npm run build
```
- Must pass cleanly (no TypeScript errors, no build failures).
- Validates all `next/image` configs resolve correctly.

### Manual (User)
1. **Landing Page**: Open `/` — verify hero text and CTA animate in on load.
2. **Public Profile**: Open `/[your-username]` — scroll down and verify blocks fade in one by one as they enter the viewport.
3. **Dashboard Mobile**: Open dashboard on a phone (or DevTools 375px) — switch between Edit/Preview tabs and verify smooth crossfade transition.
4. **Image Quality**: Inspect Network tab — confirm avatar and project images are served as WebP by Next.js image optimization.
5. **Loading Skeleton**: Hard-refresh the public profile page — verify the skeleton shows briefly before content appears.
6. **Interactions**: Hover over project cards and buttons — verify subtle scale animations are smooth.
