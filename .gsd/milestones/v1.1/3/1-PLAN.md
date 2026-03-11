---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Dependencies & Server Actions

## Objective
Install all Phase 3 dependencies (react-hook-form, zod, shadcn components, framer-motion) and create the Server Actions for profile and block CRUD. These are the foundation every other plan depends on.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md (Phase 3 Decisions section)
- src/lib/types/database.ts (Profile, Block, BlockData types)
- src/lib/supabase/server.ts (Supabase server client)
- supabase/schema.sql (profiles, blocks tables)

## Tasks

<task type="auto">
  <name>Install dependencies and shadcn components</name>
  <files>package.json</files>
  <action>
    1. Run `npm install react-hook-form zod @hookform/resolvers framer-motion`
    2. Run `npx shadcn@latest add tabs dialog dropdown-menu separator switch textarea select` (use `--yes` flag for non-interactive)
    - react-hook-form + zod: Form state management with validation.
    - @hookform/resolvers: Connects zod schemas to react-hook-form.
    - framer-motion: Smooth layout transitions and preview animations.
    - shadcn components: UI primitives for the dashboard.
    - Do NOT install @dnd-kit — reordering uses simple up/down arrows for MVP.
  </action>
  <verify>grep "react-hook-form" package.json && grep "zod" package.json && grep "framer-motion" package.json</verify>
  <done>All dependencies installed and shadcn components available in src/components/ui/</done>
</task>

<task type="auto">
  <name>Create Profile Server Actions</name>
  <files>
    src/lib/actions/profile.ts [NEW]
  </files>
  <action>
    Create `src/lib/actions/profile.ts` with `"use server"` directive.

    **Actions to implement:**

    1. `getProfile()` — Fetch current user's profile. Uses `supabase.auth.getUser()` to get uid, then queries `profiles` where `id = uid`. Returns `Profile | null`.

    2. `updateProfile(data: UpdateProfileInput)` — Update display_name, bio, accent_color. Validates with zod schema. Uses `.update()` on `profiles` with `eq('id', uid)`.

    3. `updateSlug(newSlug: string)` — Update the user's slug. Validate: lowercase, alphanumeric + hyphens only, not in RESERVED_SLUGS, min 3 chars. Check uniqueness with a select before update. Return `{ success: boolean, error?: string }`.

    4. `updateAvatar(formData: FormData)` — Accept a File from FormData, upload to Supabase Storage bucket `avatars` with path `{uid}/avatar.{ext}`, get public URL, update `profiles.avatar_url`. Return `{ url: string }`.

    5. `togglePublish(isPublished: boolean)` — Update `profiles.is_published`. Return `{ success: boolean }`.

    **Important:**
    - Every action must call `revalidatePath('/dashboard')` after mutation.
    - Every action must verify `auth.getUser()` and throw if unauthenticated.
    - Use `RESERVED_SLUGS` from `src/lib/constants.ts`.
  </action>
  <verify>npx tsc --noEmit (zero type errors)</verify>
  <done>5 server actions exist, type-check cleanly, use zod validation and revalidatePath</done>
</task>

<task type="auto">
  <name>Create Block Server Actions</name>
  <files>
    src/lib/actions/blocks.ts [NEW]
  </files>
  <action>
    Create `src/lib/actions/blocks.ts` with `"use server"` directive.

    **Actions to implement:**

    1. `getBlocks()` — Fetch all blocks for current user's profile, ordered by sort_order ascending. Returns `Block[]`.

    2. `addBlock(type: BlockType, data: BlockData)` — Insert new block. Set `sort_order` to MAX(existing) + 1. Return the new `Block`.

    3. `updateBlock(blockId: string, data: BlockData)` — Update `blocks.data` where id matches AND profile_id = uid (security). Validate ownership.

    4. `deleteBlock(blockId: string)` — Delete block where id matches AND profile_id = uid. Renumber remaining blocks' sort_order to be sequential.

    5. `reorderBlock(blockId: string, direction: 'up' | 'down')` — Swap sort_order with adjacent block. 'up' means decrement sort_order (swap with block above), 'down' means increment (swap with block below). Validate bounds.

    6. `toggleBlockVisibility(blockId: string, isVisible: boolean)` — Update `blocks.is_visible`.

    **Important:**
    - All actions verify ownership via auth.getUser() → profile_id check.
    - All mutations call `revalidatePath('/dashboard')`.
    - Use transactions where possible (reorder swap).
  </action>
  <verify>npx tsc --noEmit (zero type errors)</verify>
  <done>6 block actions exist, type-check cleanly, enforce ownership, revalidate paths</done>
</task>

## Success Criteria
- [ ] react-hook-form, zod, @hookform/resolvers, framer-motion in dependencies
- [ ] shadcn tabs, dialog, dropdown-menu, separator, switch, textarea, select components installed
- [ ] `src/lib/actions/profile.ts` with 5 actions
- [ ] `src/lib/actions/blocks.ts` with 6 actions
- [ ] `npx tsc --noEmit` passes with zero errors
