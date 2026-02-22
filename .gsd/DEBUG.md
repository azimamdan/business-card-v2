# Debug Session: 2026-02-22-LINT-VISIBILITY-HYDRATION

## Symptom
1. **Lint Errors**: 12 errors and 24 warnings identified by `npm run lint`.
2. **Visibility Toggle**: Blocks' visibility toggle is not working as expected (needs investigation).
3. **Hydration Mismatch**: "A tree hydrated but some attributes of the server rendered HTML didn't match the client properties" error in `DashboardPage` involving `DndContext` and `aria-describedby` (e.g., `DndDescribedBy-0` vs `DndDescribedBy-2`).

**When:**
- Lint errors occur during build/lint checks.
- Visibility toggle issue occurs in the Dashboard.
- Hydration mismatch occurs on `DashboardPage` load.

**Expected:**
- No lint errors.
- Visibility toggle accurately reflects and updates the `is_hidden` state of blocks.
- No console errors/hydration mismatches on page load.

**Actual:**
- 36 lint problems.
- Visibility state not persisting or responding correctly.
- Console error on `DashboardPage`.

## Evidence
- `npm run lint` output confirms 36 problems.
- User provided code frame for hydration error pointing to `DndContext` and `BlockList`.

## Hypotheses

| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | Hydration error is caused by `@dnd-kit`'s automatic ID generation in an SSR environment. | 95% | CONFIRMED |
| 2 | Visibility toggle fails because local state in `BlockList.tsx` was not syncing with server data after actions. | 95% | CONFIRMED |
| 3 | Lint errors are due to leftover development variables and missing type definitions (`any`). | 100% | CONFIRMED |

## Attempts

### 1. Hydration Mismatch Fix
- **Action**: Added a static `id="block-list-dnd"` to `DndContext` in `BlockList.tsx`.
- **Result**: Resolved the dynamic ID mismatch between server and client.

### 2. Visibility Toggle Sync
- **Action**: Added a `useEffect` hook to `BlockList.tsx` to synchronize local `blocks` state with the `initialBlocks` prop.
- **Result**: UI now correctly reflects state changes (like visibility toggles) after server actions complete and data is revalidated.

### 3. Lint Cleanup
- **Action**: Systematically removed unused imports/variables and replaced `any` types with proper data types or error checking.
- **Result**: `npm run lint` now passes with Exit Code 0.

## Resolution
All three issues (Hydration, Visibility, Linting) have been resolved and verified with automated checks and code reviews.
