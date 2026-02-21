---
phase: 1
plan: 2
wave: 1
---

# Plan 1.2: Supabase Integration & Database Schema

## Objective
Set up the Supabase client libraries, environment variables, and create the database schema (`profiles` and `blocks` tables) with Row Level Security (RLS) policies.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md (Supabase, JSONB, RLS policies)

## Tasks

<task type="auto">
  <name>Install Supabase packages and configure client</name>
  <files>
    - package.json (modify — add @supabase/supabase-js, @supabase/ssr)
    - .env.local (create — NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
    - .env.example (create — template without real values)
    - src/lib/supabase/client.ts (create — browser client)
    - src/lib/supabase/server.ts (create — server-side client using cookies)
    - .gitignore (modify — ensure .env.local is ignored)
  </files>
  <action>
    1. Run `npm install @supabase/supabase-js @supabase/ssr`.
    2. Create `.env.local` with placeholder values:
       ```
       NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
       NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
       ```
    3. Create `.env.example` as a template (no real keys).
    4. Create `src/lib/supabase/client.ts`: Export a `createClient()` function using `createBrowserClient` from `@supabase/ssr`.
    5. Create `src/lib/supabase/server.ts`: Export a `createClient()` function using `createServerClient` from `@supabase/ssr` with cookie handling for Next.js App Router (use `cookies()` from `next/headers`).
    6. Ensure `.gitignore` includes `.env.local`.
    
    AVOID: Do NOT use the deprecated `createClientComponentClient` / `createServerComponentClient` from `@supabase/auth-helpers-nextjs`. Use `@supabase/ssr` instead.
  </action>
  <verify>npm run build (should compile with the new imports)</verify>
  <done>Supabase client utilities created for both browser and server contexts</done>
</task>

<task type="auto">
  <name>Create database schema SQL and type definitions</name>
  <files>
    - supabase/schema.sql (create — DDL for profiles + blocks + RLS)
    - src/lib/types/database.ts (create — TypeScript types matching schema)
  </files>
  <action>
    Create `supabase/schema.sql` with:

    ```sql
    -- Profiles table
    CREATE TABLE profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      slug TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL DEFAULT '',
      bio TEXT DEFAULT '',
      avatar_url TEXT DEFAULT '',
      accent_color TEXT DEFAULT 'hsl(250, 100%, 65%)',
      is_published BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Blocks table
    CREATE TABLE blocks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      type TEXT NOT NULL CHECK (type IN ('hero', 'vcard', 'project', 'markdown')),
      data JSONB NOT NULL DEFAULT '{}',
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_visible BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX idx_profiles_slug ON profiles(slug);
    CREATE INDEX idx_blocks_profile_id ON blocks(profile_id);
    CREATE INDEX idx_blocks_sort_order ON blocks(profile_id, sort_order);

    -- RLS
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

    -- Public can read published profiles
    CREATE POLICY "Public profiles are visible" ON profiles
      FOR SELECT USING (is_published = true);

    -- Owner can do everything with their own profile
    CREATE POLICY "Users can manage own profile" ON profiles
      FOR ALL USING (auth.uid() = id);

    -- Public can read blocks for published profiles
    CREATE POLICY "Blocks are visible for published profiles" ON blocks
      FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = blocks.profile_id AND profiles.is_published = true)
      );

    -- Owner can manage own blocks
    CREATE POLICY "Users can manage own blocks" ON blocks
      FOR ALL USING (
        auth.uid() = profile_id
      );
    ```

    Create `src/lib/types/database.ts` with TypeScript interfaces matching the schema:
    - `Profile` interface
    - `Block` interface with discriminated union for block `data` types (HeroData, VCardData, ProjectData, MarkdownData)
  </action>
  <verify>Test-Path "supabase/schema.sql"; Test-Path "src/lib/types/database.ts"</verify>
  <done>Database schema SQL ready for execution, TypeScript types defined</done>
</task>

## Success Criteria
- [ ] Supabase client utilities compile and import correctly
- [ ] Schema SQL is valid and ready to run in Supabase SQL Editor
- [ ] TypeScript types match schema 1:1
