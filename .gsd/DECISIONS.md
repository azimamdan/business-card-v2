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
