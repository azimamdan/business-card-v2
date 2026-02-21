-- supabase/seed.sql — Demo profile and sample blocks
-- INSTRUCTIONS: 
-- 1. Create a user in Supabase Auth (locally or on remote project).
-- 2. Note the User ID (UUID).
-- 3. Replace '00000000-0000-0000-0000-000000000001' with your User ID.
-- 4. Run this script in the Supabase SQL Editor.

-- Demo profile
INSERT INTO profiles (id, slug, display_name, bio, avatar_url, accent_color, is_published)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'demo',
  'Shantanu Demo',
  'Builder. Creator. Digital Identity Enthusiast.',
  '',
  'hsl(250, 100%, 65%)',
  true
) ON CONFLICT (id) DO UPDATE SET 
  slug = EXCLUDED.slug,
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  is_published = EXCLUDED.is_published;

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
