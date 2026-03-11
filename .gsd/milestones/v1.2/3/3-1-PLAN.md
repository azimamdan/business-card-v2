---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Dashboard Block Editor Mobile UX UI

## Objective
Implement a mobile-native editing experience for blocks in the dashboard by integrating `vaul` for bottom sheets, and enlarge touch targets to a minimum of 44x44px. This improves the overall accessibility and feel of the product on mobile devices.

## Context
- .gsd/SPEC.md
- .gsd/phases/3/RESEARCH.md
- src/components/dashboard/block-editor-card.tsx
- src/components/dashboard/add-block-menu.tsx

## Tasks

<task type="auto">
  <name>Install Details & UI Button Size Expansion</name>
  <files>package.json, src/components/ui/button.tsx</files>
  <action>
    - Ensure `vaul` is installed (check package.json, add if missing). Wait, the research indicated it needs to be installed. Use `npm install vaul`. 
    - Update `src/components/ui/button.tsx` to include an `xl` or `touch` size variant (`h-11 px-6`, or `size-11` for icons).
  </action>
  <verify>npm run lint</verify>
  <done>Button component has a touch-compliant size variant and `vaul` is a dependency.</done>
</task>

<task type="auto">
  <name>Implement Mobile Drawers for Dashboard Editor</name>
  <files>src/components/dashboard/block-editor-card.tsx, src/components/dashboard/add-block-menu.tsx</files>
  <action>
    - Refactor `block-editor-card.tsx` so that clicking the header on mobile (< 768px) opens the editing form (`HeroForm`, `VCardForm`, etc.) in a `vaul` Drawer instead of a standard inline collapsible (accordion). On desktop, it can remain an accordion or adapt cleanly. Use an `isMobile` hook or CSS hiding if appropriate, but `vaul` should only render the sheet on small screens.
    - Refactor `add-block-menu.tsx` so that adding a block opens a `vaul` Drawer on mobile.
    - Increase the touch target areas of the GripVertical reorder handle and Trash2 delete button in `block-editor-card.tsx` to `h-11 w-11` with generous padding so the visual icon stays small but the clickable bounding box is larger.
  </action>
  <verify>npm run lint && npm run build</verify>
  <done>Dashboard uses Vaul drawers for editing on mobile and has 44x44px target bounds for handles.</done>
</task>

## Success Criteria
- [ ] `vaul` is installed and imported correctly.
- [ ] Dashboard Block editing opens in a bottom sheet on mobile screens.
- [ ] Delete button and Grip handles are 44x44px minimum touch targets.
