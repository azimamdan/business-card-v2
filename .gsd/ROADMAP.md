# ROADMAP.md

> **Current Phase**: Phase 4 — Polish & Performance
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
**Status**: ✅ Completed (2026-02-22)
**Objective**: Create the authenticated dashboard where users manage their identity.
- Dashboard shell with auth guard and onboarding flow.
- Side-by-side editor (form left, live preview right; tabs on mobile).
- Profile settings: display name, bio, accent color, slug editing, avatar upload (Supabase Storage).
- Block management: add, edit data, delete, reorder (up/down), show/hide toggle.
- Publish/Unpublish toggle (Draft → Live workflow).
- "View Public Profile" + "Copy Link" shortcuts.
- Server Actions for all CRUD. react-hook-form + zod for validation.

### Phase 4: Polish & Performance
**Status**: ✅ Complete
**Goal**: Transform from functional to premium with animations and performance optimization.

**Focus Areas:**
- Framer Motion micro-interactions
- `next/image` optimization
- Mobile responsiveness audit
- Loading skeletons (Image optimization, hydration checks).
- Final mobile-first responsiveness audit.

### Phase 5: Gap Closure & Documentation
**Status**: ✅ Completed (2026-02-22)
**Objective**: Address gaps from milestone audit and consolidate project records.
- Consolidate Phase 1 & 3 verification reports into `.gsd/phases/`.
- Implement drag-and-drop reordering for blocks (UX refinement).
- Verify hydration consistency for dynamic accent colors.

### Phase 6: Project Update
**Status**: ⬜ Not Started
**Objective**: The New Identity ([ IDCV ] Identity Canvas), Visual & Copy Refinement (Triple-Theme, Fonts), Global Updates, Feature Adjustments & SEO, Implementation Task.
**Depends on**: Phase 5

**Tasks**:
- [ ] TBD (run /plan 6 to create)

**Verification**:
- TBD
