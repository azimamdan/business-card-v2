---
phase: 5
plan: fix-drag-and-drop
wave: 2
gap_closure: true
---

# Fix: Drag-and-Drop Reordering

## Problem
Currently, users can only reorder blocks using up/down arrow buttons. This is a functional but suboptimal UX for a "premium" canvas experience.

## Root Cause
Drag-and-drop was deferred from Phase 3 to simplify the initial editor implementation.

## Tasks

<task type="auto">
  <name>Install dnd-kit or similar</name>
  <files>package.json</files>
  <action>Install `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities` to handle reordering logic.</action>
  <verify>npm list @dnd-kit/core</verify>
  <done>Dependencies installed.</done>
</task>

<task type="auto">
  <name>Implement Sortable list in Block Editor</name>
  <files>src/components/dashboard/block-list.tsx [NEW or MODIFY]</files>
  <action>
    Refactor the block list in the dashboard to use `SortableContext`.
    - Implement `onDragEnd` handler to update local state and call `reorderBlocks` Server Action.
    - Add a drag handle icon to `BlockEditorCard`.
  </action>
  <verify>Visual check: blocks can be dragged and reordered in dev.</verify>
  <done>Blocks can be reordered via drag-and-drop.</done>
</task>
