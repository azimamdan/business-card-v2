---
phase: 3
plan: 3
wave: 2
---

# Plan 3.3: Profile Settings Form

## Objective
Build the profile settings form with react-hook-form + zod validation. Covers: display name, bio, accent color picker, slug editing (with warning), avatar upload (Supabase Storage), and publish toggle. This replaces the "Editor Panel" placeholder from Plan 3.2.

## Context
- .gsd/DECISIONS.md (Phase 3: react-hook-form+zod, Supabase Storage, slug editing, publish toggle)
- src/lib/actions/profile.ts (from Plan 3.1: updateProfile, updateSlug, updateAvatar, togglePublish)
- src/lib/types/database.ts (Profile type)
- src/components/ui/ (input, label, button, switch, separator, textarea)
- src/app/dashboard/page.tsx (from Plan 3.2)

## Tasks

<task type="auto">
  <name>Create Zod Schemas for Profile Forms</name>
  <files>
    src/lib/schemas/profile.ts [NEW]
  </files>
  <action>
    Create `src/lib/schemas/profile.ts` with zod schemas:

    1. `profileSchema` — Validates: display_name (min 1, max 50), bio (max 300, optional), accent_color (valid CSS color string, optional).

    2. `slugSchema` — Validates: slug (min 3, max 30, regex `/^[a-z0-9-]+$/`, not in RESERVED_SLUGS). Custom error messages for each rule.

    Export inferred types: `ProfileFormData`, `SlugFormData`.
  </action>
  <verify>npx tsc --noEmit</verify>
  <done>Zod schemas exist with proper validation rules and exported types</done>
</task>

<task type="auto">
  <name>Build Profile Settings Component</name>
  <files>
    src/components/dashboard/profile-form.tsx [NEW]
    src/components/dashboard/avatar-upload.tsx [NEW]
    src/components/dashboard/slug-editor.tsx [NEW]
    src/components/dashboard/publish-toggle.tsx [NEW]
  </files>
  <action>
    **profile-form.tsx** — Client component using react-hook-form + zodResolver:
    - Fields: Display Name (Input), Bio (Textarea), Accent Color (native color `<input type="color">` styled to match dark theme)
    - Submit calls `updateProfile` server action
    - Show loading state on submit button, success toast or inline success message
    - Container: `space-y-6` inside the editor panel card

    **avatar-upload.tsx** — Client component:
    - Circular preview of current avatar (or initial letter fallback)
    - Click to open file picker (accept: image/png, image/jpeg, image/webp, max 2MB)
    - On file select: show preview immediately (URL.createObjectURL), then upload via `updateAvatar` action
    - Loading spinner overlay during upload
    - Error handling for oversized files

    **slug-editor.tsx** — Client component:
    - Current slug displayed as `canvas.to/{slug}`
    - "Edit" button reveals an inline form with react-hook-form + slugSchema
    - Show warning Alert: "⚠️ Changing your username will break any existing links to your profile."
    - Submit calls `updateSlug` action
    - Show error if slug is taken

    **publish-toggle.tsx** — Client component:
    - shadcn Switch with label: "Published" / "Draft"
    - Green dot indicator when published, yellow when draft
    - On toggle: calls `togglePublish` action
    - Show confirmation dialog before unpublishing (if currently published)

    **Design for all components:**
    - Dark theme: `bg-slate-900` inputs, `border-slate-700`, `text-slate-50`
    - Accent color for primary actions
    - Mobile-first: full-width inputs, proper touch targets (min 44px)
  </action>
  <verify>npx tsc --noEmit; npm run build</verify>
  <done>4 profile setting components exist, use react-hook-form+zod, call server actions, mobile-friendly</done>
</task>

## Success Criteria
- [ ] Zod schemas validate profile and slug inputs correctly
- [ ] Profile form saves display_name, bio, accent_color
- [ ] Avatar upload works with Supabase Storage (preview + upload)
- [ ] Slug editor shows warning, validates, and updates
- [ ] Publish toggle switches between Draft/Published state
- [ ] All components mobile-first with proper touch targets
- [ ] `npm run build` passes
