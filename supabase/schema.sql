-- supabase/schema.sql — DDL for profiles + blocks + RLS

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
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
CREATE TABLE IF NOT EXISTS blocks (
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
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON profiles(slug);
CREATE INDEX IF NOT EXISTS idx_blocks_profile_id ON blocks(profile_id);
CREATE INDEX IF NOT EXISTS idx_blocks_sort_order ON blocks(profile_id, sort_order);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- POLICIES

-- Public profiles are visible
DO $$ BEGIN
  CREATE POLICY "Public profiles are visible" ON profiles
    FOR SELECT USING (is_published = true);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Users can manage own profile
DO $$ BEGIN
  CREATE POLICY "Users can manage own profile" ON profiles
    FOR ALL USING (auth.uid() = id);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Blocks are visible for published profiles
DO $$ BEGIN
  CREATE POLICY "Blocks are visible for published profiles" ON blocks
    FOR SELECT USING (
      EXISTS (SELECT 1 FROM profiles WHERE profiles.id = blocks.profile_id AND profiles.is_published = true)
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Users can manage own blocks
DO $$ BEGIN
  CREATE POLICY "Users can manage own blocks" ON blocks
    FOR ALL USING (
      auth.uid() = profile_id
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
