---
phase: 2
plan: 2
wave: 2
depends_on: ["2-1-PLAN.md"]
files_modified:
  - src/components/dashboard/avatar-upload.tsx
  - src/components/dashboard/block-forms/hero-form.tsx
  - src/components/dashboard/block-forms/project-form.tsx
autonomous: true
user_setup: []

must_haves:
  truths:
    - "Avatar uploads are compressed before hitting Supabase"
    - "Hero and Project blocks support actual file uploads via the new widget"
  artifacts:
    - "AvatarUpload uses browser-image-compression"
    - "HeroForm uses ImageUploadWidget"
    - "ProjectForm uses ImageUploadWidget"
---

# Plan 2.2: Apply Compression and Upload Widgets

<objective>
Refactor existing forms to utilize client-side compression and the new generic image upload widget.

Purpose: To enforce the 800px / 200KB compression limit across all image uploads in the application and replace raw URL string inputs in blocks with a user-friendly file upload widget.
Output: Updated `AvatarUpload`, `HeroForm`, and `ProjectForm` components.
</objective>

<context>
Load for context:
- src/components/dashboard/avatar-upload.tsx
- src/components/dashboard/block-forms/hero-form.tsx
- src/components/dashboard/block-forms/project-form.tsx
- src/components/dashboard/image-upload-widget.tsx (created in 2.1)
</context>

<tasks>

<task type="auto">
  <name>Refactor AvatarUpload Compression</name>
  <files>src/components/dashboard/avatar-upload.tsx</files>
  <action>
    Import `browser-image-compression`. 
    In `handleFileChange`, before creating the `FormData`, compress the selected `file` with:
    `maxSizeMB: 0.2`, `maxWidthOrHeight: 800`, `useWebWorker: true`.
    Append the COMPRESSED file to `FormData` (ensuring it retains the original extension/name or a valid image name).
    AVOID: Breaking the existing revert logic or `setPreviewUrl` blob behavior.
  </action>
  <verify>grep "browser-image-compression" src/components/dashboard/avatar-upload.tsx</verify>
  <done>Avatars are heavily compressed client-side before upload.</done>
</task>

<task type="auto">
  <name>Integrate Widget into HeroForm</name>
  <files>src/components/dashboard/block-forms/hero-form.tsx</files>
  <action>
    Replace the text `<Input>` for `avatarUrl` with the new `<ImageUploadWidget>`.
    Bind the widget's `value` to `data.avatarUrl` and `onChange` to updating the state.
    AVOID: Changing any other form fields.
  </action>
  <verify>grep "ImageUploadWidget" src/components/dashboard/block-forms/hero-form.tsx</verify>
  <done>Hero images can be seamlessly uploaded.</done>
</task>

<task type="auto">
  <name>Integrate Widget into ProjectForm</name>
  <files>src/components/dashboard/block-forms/project-form.tsx</files>
  <action>
    Replace the text `<Input>` for `imageUrl` with the new `<ImageUploadWidget>`.
    Bind the widget's `value` to `data.imageUrl` and `onChange` to updating the state.
    AVOID: Breaking the grid layout. Incorporate the widget cleanly.
  </action>
  <verify>grep "ImageUploadWidget" src/components/dashboard/block-forms/project-form.tsx</verify>
  <done>Project thumbnails can be seamlessly uploaded.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `AvatarUpload` compresses files explicitly.
- [ ] `HeroForm` imports and uses `ImageUploadWidget`.
- [ ] `ProjectForm` imports and uses `ImageUploadWidget`.
</verification>

<success_criteria>
- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
