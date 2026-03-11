# Debug Session: 2026-03-11-MOBILE-DRAWER-THEME

## Symptom

### Bug 1: Block dialogs don't open on mobile
**When:** Clicking "Add New Block" or any existing block card on mobile.
**Expected:** A bottom-sheet drawer appears with content (block type picker or edit form).
**Actual:** Screen dims (overlay appears) but no visible content — drawer is off-screen.

### Bug 2: Theme switcher toggle is narrow/squashed
**When:** Dashboard header on mobile viewports.
**Expected:** Two full 44×44px circular theme buttons visible.
**Actual:** The toggle is narrower than expected, buttons appear compressed.

## Evidence

### Bug 1
- `block-editor-card.tsx` (L146–182) and `add-block-menu.tsx` (L97–144) both use a Radix `<Dialog>` as a mobile bottom-sheet.
- They override `<DialogContent>` className with `fixed bottom-0 top-auto translate-y-0`.
- However, the base `DialogContent` in `dialog.tsx` (L64) applies `fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`.
- Using `cn()` (tailwind-merge), the conflicting positional utilities don't cleanly resolve—the base centering styles remain, placing the sheet at the viewport center or off-screen instead of bottom-anchored.
- The overlay still renders (hence the dimming), but the content is invisible because it's mis-positioned.

### Bug 2
- `theme-switcher.tsx` (L53): container is `min-w-[100px] w-[100px]`.
- Two buttons: each `w-11 h-11` (44px).
- Container has `p-1` (4px each side = 8px) + `gap-1` (4px).
- Required width: 44 + 44 + 4 + 8 = 100px exactly. But `border` adds 2px, so content is clipped.

## Hypotheses

| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | Tailwind-merge can't resolve `top-[50%]` vs `top-auto` conflict in cn() — both survive | 95% | CONFIRMED via code inspection |
| 2 | Container width too small for 2×44px buttons + padding + gap + border | 90% | CONFIRMED via math |

## Resolution Plan
- Bug 1: Use `showCloseButton={false}` on DialogContent, which is already supported, and replace the hard-coded centering classes entirely for the mobile drawer variant.
- Bug 2: Widen the container or let it auto-size with `w-auto`.
