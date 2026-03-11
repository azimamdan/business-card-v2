---
phase: 2
plan: 1
wave: 1
depends_on: []
files_modified:
  - package.json
  - src/lib/actions/blocks.ts
  - src/components/dashboard/image-upload-widget.tsx
autonomous: true
user_setup: []

must_haves:
  truths:
    - "A generic server action exists for uploading block images without saving to profiles"
    - "A reusable ImageUploadWidget exists that compresses files before upload"
  artifacts:
    - "browser-image-compression dependency is installed"
    - "src/components/dashboard/image-upload-widget.tsx exists"
---

# Plan 2.1: Image Upload Infrastructure

<objective>
Setup the core infrastructure for generic image uploading and client-side compression.

Purpose: To allow block editors (Hero, Project) to accept file uploads instead of pure text inputs, and guarantee all user-uploaded images are pre-compressed for maximum performance.
Output: `uploadBlockImage` server action and `ImageUploadWidget` UI component.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- .gsd/phases/2/RESEARCH.md
- src/lib/actions/profile.ts (for reference on how updateAvatar does Supabase storage)
</context>

<tasks>

<task type="auto">
  <name>Install Compression Library</name>
  <files>package.json</files>
  <action>
    Run `npm install browser-image-compression`
    AVOID: Modifying other package versions.
  </action>
  <verify>grep browser-image-compression package.json</verify>
  <done>Library is present in package.json and node_modules.</done>
</task>

<task type="auto">
  <name>Create uploadBlockImage Server Action</name>
  <files>src/lib/actions/blocks.ts</files>
  <action>
    Add an exported async function `uploadBlockImage(formData: FormData)` to `blocks.ts`.
    - Authenticate user via Supabase.
    - Extract `file` from `formData`.
    - Generate a unique path: `${user.id}/blocks/${Date.now()}.${fileExt}`.
    - Upload to the existing `avatars` bucket (which is already configured as public).
    - Return `{ url: urlWithTimestamp }`.
    AVOID: Modifying any database tables in this action. It simply hosts the file and returns the URL.
  </action>
  <verify>grep "uploadBlockImage" src/lib/actions/blocks.ts</verify>
  <done>Action exists and returns a public URL.</done>
</task>

<task type="auto">
  <name>Build ImageUploadWidget</name>
  <files>src/components/dashboard/image-upload-widget.tsx</files>
  <action>
    Create a new client component `ImageUploadWidget` that accepts props:
    `value?: string`, `onChange: (url: string) => void`, `label: string`
    - It should display the current `value` as an `<Image>` if it exists, otherwise a placeholder box with a camera icon.
    - Features a hidden file input (accept="image/*").
    - On file select: compress using `browser-image-compression` (options: { maxSizeMB: 0.2, maxWidthOrHeight: 800, useWebWorker: true }).
    - Create `FormData`, append the compressed file, and call `uploadBlockImage(formData)`.
    - Call `onChange(url)` with the returned URL.
    - Display a loading spinner during the upload.
    AVOID: Hardcoding it for avatars. Keep it generic so it can be dropped into any form.
  </action>
  <verify>cat src/components/dashboard/image-upload-widget.tsx</verify>
  <done>Widget gracefully handles compression + upload.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `browser-image-compression` is in `package.json`
- [ ] `uploadBlockImage` is exported from `src/lib/actions/blocks.ts`
- [ ] `ImageUploadWidget` exists and correctly uses compression.
</verification>

<success_criteria>
- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
