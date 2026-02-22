---
phase: 3
plan: 5
wave: 3
---

# Plan 3.5: Live Preview & Integration

## Objective
Wire everything together: integrate profile settings and block editor into the dashboard page, build the live preview panel that mirrors the public profile, and add the "Copy Link" functionality. This is the final assembly plan.

## Context
- src/app/dashboard/page.tsx (from Plan 3.2 — skeleton with placeholders)
- src/components/dashboard/profile-form.tsx (from Plan 3.3)
- src/components/dashboard/block-editor-card.tsx (from Plan 3.4)
- src/components/dashboard/add-block-menu.tsx (from Plan 3.4)
- src/components/canvas/block-renderer.tsx (from Phase 2)
- src/app/[username]/page.tsx (public profile — reference for preview layout)
- src/lib/actions/profile.ts, blocks.ts (from Plan 3.1)

## Tasks

<task type="auto">
  <name>Build Live Preview Component</name>
  <files>
    src/components/dashboard/live-preview.tsx [NEW]
  </files>
  <action>
    Client component that renders a miniature version of the public profile.

    **Props:** `profile: Profile`, `blocks: Block[]`

    **Structure (mirrors /[username]/page.tsx):**
    - Container: `bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden` with `max-h-[calc(100vh-200px)] overflow-y-auto` (scrollable preview)
    - Profile header: Avatar circle, display_name, bio (same layout as public page)
    - Blocks section: Map visible blocks through `BlockRenderer` component
    - Footer: "Created with Canvas" (same as public page)
    - Accent color applied via CSS custom property `--accent-brand`

    **Scaling:** Apply `transform: scale(0.85) origin-top` on desktop for a "device preview" feel. Full-size on mobile (since mobile preview IS the final view).

    **Empty state:** If no blocks, show dashed border "Add your first block to see it here"
  </action>
  <verify>npx tsc --noEmit</verify>
  <done>Live preview component renders a faithful miniature of the public profile page</done>
</task>

<task type="auto">
  <name>Assemble Dashboard Page & Copy Link</name>
  <files>
    src/app/dashboard/page.tsx [MODIFY]
    src/components/dashboard/copy-link-button.tsx [NEW]
  </files>
  <action>
    **Modify dashboard/page.tsx** to replace placeholders with real components:

    **Data fetching (Server Component):**
    - Call `getProfile()` and `getBlocks()` to get current user data
    - Pass profile and blocks as props to client components

    **Desktop layout (lg+):**
    ```
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <!-- Left: Editor -->
        <ProfileForm profile={profile} />
        <Separator />
        {blocks.map(block => <BlockEditorCard key={block.id} block={block} ... />)}
        <AddBlockMenu />
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <!-- Right: Preview (sticky) -->
        <LivePreview profile={profile} blocks={blocks} />
      </div>
    </div>
    ```

    **Mobile layout (< lg):**
    - Use shadcn Tabs with "Edit" and "Preview" tabs
    - "Edit" tab: same editor column
    - "Preview" tab: LivePreview component
    - Use framer-motion AnimatePresence for smooth tab transitions

    **copy-link-button.tsx** — Client component:
    - Button with Copy icon that calls `navigator.clipboard.writeText(url)`
    - Show "Copied!" toast/tooltip for 2 seconds
    - URL: `${window.location.origin}/${profile.slug}`
    - Only visible when profile is published

    **Design integration:**
    - Scroll behavior: editor scrolls naturally, preview is `sticky` on desktop
    - Proper spacing and dark theme consistency
  </action>
  <verify>npm run build (passes with all routes); navigate to /dashboard in dev</verify>
  <done>Dashboard is fully wired: editor + preview side-by-side on desktop, tabbed on mobile, copy-link works</done>
</task>

## Success Criteria
- [ ] Desktop: side-by-side editor (left) + live preview (right, sticky)
- [ ] Mobile: tabs between Edit and Preview with smooth transitions
- [ ] Live preview renders profile + visible blocks using existing BlockRenderer
- [ ] Preview updates reflect saved changes (server-side revalidation)
- [ ] Copy Link button copies public URL and shows confirmation
- [ ] Empty state handled for new profiles with no blocks
- [ ] `npm run build` passes
