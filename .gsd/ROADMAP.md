# ROADMAP.md

> **Current Phase**: Phase 2 — The Canvas Ecosystem
> **Milestone**: v1.0 (MVP)

## Must-Haves (from SPEC)
- [ ] User authentication (Supabase Auth)
- [ ] Dynamic routing `/[username]`
- [ ] Modular Block System (Hero, V-Card, Project, Markdown)
- [ ] Profile editing interface
- [ ] "Add to Contacts" (.vcf) generation
- [ ] Dark Mode premium aesthetic (Linear-style)

## Phases

### Phase 1: Foundation & Identity
**Status**: ✅ Completed (2026-02-21)
**Objective**: Set up the core project structure, auth, database schema, and dynamic routing.
- Initialize Next.js project with Tailwind and shadcn/ui.
- Supabase integration (Client, Auth, Database, RLS).
- Schema: `profiles` table (linked to `auth.uid()`) and `blocks` table (`JSONB` data).
- Auth plumbing: sign-up/login pages, middleware for protected routes.
- Minimal landing page at `/` with "Get Started" CTA.
- Dynamic `/[username]` route with reserved slugs validation.
- Seed demo profile with sample blocks for visual testing.

### Phase 2: The Canvas Ecosystem (Blocks)
**Status**: ✅ Completed (2026-02-22)
**Objective**: Build the core rendering engine and the first set of functional blocks.
- **Hero/Bio Block**: Visual identity and introduction.
- **V-Card Block**: Backend logic for .vcf generation and download.
- **Project Card**: Component for showcasing GitHub repos/portfolios.
- **Markdown Block**: Flexible text area for storytelling/resume.

### Phase 3: The Profile Editor
**Status**: ⬜ Not Started
**Objective**: Create the authenticated dashboard where users manage their identity.
- Live-preview editor (add, remove, reorder blocks).
- Appearance settings (Accent Color, slug management).

### Phase 4: Polish & Performance
**Status**: ⬜ Not Started
**Objective**: Refine the "Premium" feel and ensure high performance.
- Framer Motion animations (entry/exit transitions).
- Performance optimization (Image optimization, hydration checks).
- Final mobile-first responsiveness audit.
