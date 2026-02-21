---
phase: 1
plan: 4
wave: 2
---

# Plan 1.4: Dynamic Routing, Landing Page & Seed Data

## Objective
Implement the `/[username]` dynamic route, the minimal landing page at `/`, and seed a demo profile for visual testing. Depends on Wave 1 (scaffold + schema).

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md (root /[username], landing page, seed demo profile)
- src/lib/supabase/server.ts (from Plan 1.2)
- src/lib/types/database.ts (from Plan 1.2)
- supabase/schema.sql (from Plan 1.2)

## Tasks

<task type="auto">
  <name>Create dynamic /[username] route</name>
  <files>
    - src/app/[username]/page.tsx (create)
    - src/lib/constants.ts (create — reserved slugs list)
  </files>
  <action>
    1. Create `src/lib/constants.ts`:
       ```typescript
       export const RESERVED_SLUGS = [
         'admin', 'login', 'signup', 'api', 'dashboard',
         'settings', 'about', 'help', 'support', 'terms',
         'privacy', 'blog', 'pricing', 'contact'
       ];
       ```
    
    2. Create `src/app/[username]/page.tsx` as a SERVER COMPONENT:
       - Accept `params.username` from the route.
       - Query `profiles` table WHERE `slug = params.username` AND `is_published = true`.
       - If not found, call `notFound()` from `next/navigation`.
       - If found, also query `blocks` table WHERE `profile_id = profile.id` ORDER BY `sort_order`.
       - Render a minimal profile shell for now:
         - Display name, bio, avatar placeholder.
         - Accent color applied as CSS variable.
         - List blocks as JSON (will be replaced by block renderers in Phase 2).
       - Use `generateMetadata` for dynamic OG/SEO tags (title = display_name, description = bio).
    
    IMPORTANT: This is a dynamic route at the ROOT level. Next.js resolves static routes (like `/login`, `/dashboard`) BEFORE dynamic ones, so there are no collisions. However, the `RESERVED_SLUGS` list will be used during SIGNUP to prevent users from registering these slugs.
  </action>
  <verify>npm run build (dynamic route should compile)</verify>
  <done>Dynamic /[username] route fetches and renders profile data, returns 404 for missing profiles</done>
</task>

<task type="auto">
  <name>Create minimal landing page</name>
  <files>
    - src/app/page.tsx (modify — replace default Next.js page)
  </files>
  <action>
    1. Replace `src/app/page.tsx` with a minimal, premium landing page:
       - Dark slate-950 background.
       - Centered hero section:
         - App name/logo: "Canvas" (or project name TBD) in large, clean Inter font.
         - Subtitle: "Your Digital Identity, Reimagined." or similar.
         - "Get Started" button (shadcn Button, links to `/signup`).
         - "Log In" text link below the button.
       - Subtle accent color glow effect on the CTA button.
       - Mobile-responsive (looks great on phone screens).
    
    AVOID: Do NOT over-build this. It's a minimal landing page — no navigation, no features list. Just brand + CTA. Polish comes in Phase 4.
  </action>
  <verify>npm run build (page compiles); visual check at localhost:3000</verify>
  <done>Landing page displays brand name, subtitle, and Get Started CTA with premium dark aesthetic</done>
</task>

<task type="auto">
  <name>Create seed data SQL script</name>
  <files>
    - supabase/seed.sql (create)
  </files>
  <action>
    Create `supabase/seed.sql` with a demo profile and sample blocks:

    ```sql
    -- NOTE: This seed requires a user to exist in auth.users first.
    -- For local development, create a test user via Supabase Dashboard or Auth API,
    -- then update the UUID below.

    -- Demo profile (using a placeholder UUID — update after creating auth user)
    INSERT INTO profiles (id, slug, display_name, bio, avatar_url, accent_color, is_published)
    VALUES (
      '00000000-0000-0000-0000-000000000001',
      'demo',
      'Shantanu Demo',
      'Builder. Creator. Digital Identity Enthusiast.',
      '',
      'hsl(250, 100%, 65%)',
      true
    );

    -- Hero block
    INSERT INTO blocks (profile_id, type, data, sort_order)
    VALUES (
      '00000000-0000-0000-0000-000000000001',
      'hero',
      '{"headline": "Hey, I''m Shantanu 👋", "subheadline": "Full-stack developer & digital identity enthusiast"}',
      0
    );

    -- V-Card block
    INSERT INTO blocks (profile_id, type, data, sort_order)
    VALUES (
      '00000000-0000-0000-0000-000000000001',
      'vcard',
      '{"firstName": "Shantanu", "lastName": "Demo", "email": "hello@example.com", "phone": "+1234567890", "title": "Full-Stack Developer", "company": "Canvas"}',
      1
    );

    -- Project block
    INSERT INTO blocks (profile_id, type, data, sort_order)
    VALUES (
      '00000000-0000-0000-0000-000000000001',
      'project',
      '{"title": "Canvas", "description": "Digital Identity Platform", "url": "https://github.com/example/canvas", "tags": ["Next.js", "Supabase", "TypeScript"]}',
      2
    );

    -- Markdown block
    INSERT INTO blocks (profile_id, type, data, sort_order)
    VALUES (
      '00000000-0000-0000-0000-000000000001',
      'markdown',
      '{"content": "## About Me\n\nI build tools that help people express their professional identity online. Currently focused on making the web more personal and less generic.\n\n**Skills:** TypeScript, React, Next.js, Supabase, PostgreSQL"}',
      3
    );
    ```

    This script is meant to be run manually in the Supabase SQL Editor after schema.sql. Include a comment at the top explaining the UUID requirement.
  </action>
  <verify>Test-Path "supabase/seed.sql"</verify>
  <done>Seed SQL script ready with demo profile and 4 sample blocks (hero, vcard, project, markdown)</done>
</task>

## Success Criteria
- [ ] `/demo` route renders the seed profile data (after DB is populated)
- [ ] `/nonexistent` route returns a 404 page
- [ ] `/` landing page displays brand + "Get Started" CTA
- [ ] Seed SQL is valid and ready to execute in Supabase SQL Editor
