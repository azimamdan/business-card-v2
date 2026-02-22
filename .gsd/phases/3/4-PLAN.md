---
phase: 3
plan: 4
wave: 2
---

# Plan 3.4: Block Management Editor

## Objective
Build the block management UI: add new blocks (from a menu of 4 types), edit block data inline, delete blocks, reorder with up/down arrows, and toggle visibility. This replaces the remaining "Editor Panel" placeholder.

## Context
- .gsd/DECISIONS.md (Phase 3: up/down reordering, show/hide toggle)
- src/lib/actions/blocks.ts (from Plan 3.1: addBlock, updateBlock, deleteBlock, reorderBlock, toggleBlockVisibility)
- src/lib/types/database.ts (Block, BlockType, HeroData, VCardData, ProjectData, MarkdownData)
- src/components/ui/ (dialog, dropdown-menu, button, input, textarea, switch)

## Tasks

<task type="auto">
  <name>Create Add Block Menu</name>
  <files>
    src/components/dashboard/add-block-menu.tsx [NEW]
  </files>
  <action>
    Client component: A prominent "Add Block" button that opens a shadcn DropdownMenu.

    **Menu items** (each with a lucide-react icon):
    - 🎯 Hero Block — "Visual headline with your introduction"
    - 📇 V-Card Block — "Contact details with 'Add to Contacts' button"
    - 📁 Project Block — "Showcase a project or portfolio piece"
    - 📝 Markdown Block — "Free-form text, lists, and stories"

    On click: calls `addBlock(type, defaultData)` server action with sensible defaults:
    - Hero: `{ headline: "Your Name", subheadline: "Your tagline" }`
    - VCard: `{ firstName: "", lastName: "" }`
    - Project: `{ title: "My Project", description: "" }`
    - Markdown: `{ content: "# Hello\nStart writing..." }`

    **Design:**
    - Button: `w-full border-2 border-dashed border-slate-700 hover:border-accent-brand rounded-2xl py-4`
    - "+" icon with "Add Block" text
    - Dropdown uses dark theme styling
  </action>
  <verify>npx tsc --noEmit</verify>
  <done>Add block menu exists with 4 block type options and default data</done>
</task>

<task type="auto">
  <name>Create Block Editor Cards</name>
  <files>
    src/components/dashboard/block-editor-card.tsx [NEW]
    src/components/dashboard/block-forms/hero-form.tsx [NEW]
    src/components/dashboard/block-forms/vcard-form.tsx [NEW]
    src/components/dashboard/block-forms/project-form.tsx [NEW]
    src/components/dashboard/block-forms/markdown-form.tsx [NEW]
  </files>
  <action>
    **block-editor-card.tsx** — Client component wrapping each block in the editor:
    - Header bar with: Block type label + icon, visibility toggle (Switch), up/down arrow buttons (ChevronUp, ChevronDown from lucide), delete button (Trash2 with confirmation Dialog)
    - Collapsible body: Expand/collapse the edit form (Chevron rotation animation)
    - Body renders the appropriate form based on `block.type`
    - Up arrow disabled on first block, down arrow disabled on last block
    - Delete shows shadcn Dialog: "Are you sure? This cannot be undone."

    **Individual block forms** (all client components using react-hook-form):

    **hero-form.tsx:**
    - Fields: Headline (Input), Subheadline (Input), Avatar URL (Input, optional)
    - Auto-save on blur or explicit "Save" button
    - Calls `updateBlock(blockId, data)` on submit

    **vcard-form.tsx:**
    - Fields: First Name, Last Name, Email, Phone, Title, Company (all Inputs)
    - Grid layout: 2 columns on desktop, stacked on mobile
    - Calls `updateBlock(blockId, data)` on submit

    **project-form.tsx:**
    - Fields: Title (Input), Description (Textarea), URL (Input), Image URL (Input), Tags (comma-separated Input, split to array)
    - Calls `updateBlock(blockId, data)` on submit

    **markdown-form.tsx:**
    - Fields: Content (large Textarea with monospace font, min-h-[200px])
    - Hint text: "Supports GitHub-Flavored Markdown"
    - Calls `updateBlock(blockId, data)` on submit

    **Design for all:**
    - Card: `bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden`
    - Header: `bg-slate-900 px-4 py-3 flex items-center justify-between`
    - Dragged/inactive opacity effect when visibility is off
    - Forms have consistent `space-y-4` internal spacing
  </action>
  <verify>npx tsc --noEmit; npm run build</verify>
  <done>Block editor card with all 4 form variants exist, handle CRUD actions, mobile-responsive</done>
</task>

## Success Criteria
- [ ] Add Block menu offers all 4 block types with icons and descriptions
- [ ] Block editor cards render for each block type with correct form fields
- [ ] Reorder (up/down) buttons work and are properly disabled at boundaries
- [ ] Visibility toggle updates `is_visible` via server action
- [ ] Delete button shows confirmation and removes block
- [ ] All forms save data via `updateBlock` server action
- [ ] `npm run build` passes
