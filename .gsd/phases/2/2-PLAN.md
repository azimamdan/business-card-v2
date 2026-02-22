---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: Canvas Rendering Engine

## Objective
Replace the raw JSON block rendering in `[username]/page.tsx` with the Canvas engine — a `BlockRenderer` component that maps block types to their corresponding visual components. This turns the profile page from a debug view into a production-quality "Digital Identity Canvas."

## Context
- .gsd/SPEC.md
- src/app/[username]/page.tsx (current: renders JSON.stringify for blocks)
- src/components/blocks/index.ts (created in Plan 2.1)
- src/lib/types/database.ts (Block, BlockType types)

## Tasks

<task type="auto">
  <name>Create BlockRenderer dispatcher component</name>
  <files>
    src/components/canvas/block-renderer.tsx [NEW]
    src/components/canvas/index.ts [NEW]
  </files>
  <action>
    Create `src/components/canvas/` with the core rendering engine.

    **block-renderer.tsx** — Client component:
    - Accepts a `Block` object as prop
    - Uses a switch/map on `block.type` to render the correct block component
    - Casts `block.data` to the correct typed interface (HeroData, VCardData, etc.)
    - Includes a fallback for unknown block types (renders nothing or a subtle notice)
    - Pattern: Record<BlockType, React.ComponentType<{ data: any; blockId: string }>>

    **index.ts** — Re-exports BlockRenderer.

    Design rule: BlockRenderer is a pure dispatcher with ZERO styling of its own. Individual blocks own their appearance.
  </action>
  <verify>npx tsc --noEmit (zero type errors)</verify>
  <done>BlockRenderer exists and correctly dispatches to all 4 block types</done>
</task>

<task type="auto">
  <name>Integrate Canvas into profile page</name>
  <files>
    src/app/[username]/page.tsx [MODIFY]
  </files>
  <action>
    Replace the raw JSON rendering section in `[username]/page.tsx`:

    **Current code (lines 76-91):**
    ```tsx
    blocks.map((block) => (
      <div key={block.id} className="...">
        <pre>{JSON.stringify(block.data, null, 2)}</pre>
        <div>{block.type} BLOCK</div>
      </div>
    ))
    ```

    **Replace with:**
    ```tsx
    blocks.map((block) => (
      <BlockRenderer key={block.id} block={block} />
    ))
    ```

    - Import `BlockRenderer` from `@/components/canvas`
    - Import `Block` type from `@/lib/types/database` for proper typing
    - Cast the Supabase response to `Block[]` for type safety
    - Keep the existing profile header, footer, and empty-state unchanged
    - Do NOT change any Server Component logic (data fetching stays server-side)
  </action>
  <verify>npx tsc --noEmit; npm run build (zero errors, build succeeds)</verify>
  <done>Profile page renders real block components instead of JSON; build passes</done>
</task>

## Success Criteria
- [ ] `BlockRenderer` component exists at `src/components/canvas/block-renderer.tsx`
- [ ] Profile page uses `BlockRenderer` instead of raw JSON
- [ ] `npm run build` succeeds with zero errors
- [ ] No changes to data-fetching logic (Server Component integrity preserved)
