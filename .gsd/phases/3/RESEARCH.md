---
phase: 3
level: 2
researched_at: 2026-03-11
---

# Phase 3 Research: Mobile UX Polish & Audit

## Questions Investigated
1. **Which library is best for mobile bottom sheets in this stack?**
2. **How to systematically implement the 44px touch target rule?**
3. **Are there any CLS issues with current next/image usage on mobile?**

## Findings

### 1. Mobile-Native Bottom Sheets
**vaul** is the gold standard for React bottom sheets. It is built on Radix UI's `Dialog` primitive, which we already use. It supports snap points, background scaling, and touch gestures.
- **Recommendation:** Install `vaul` and use it for editing forms on mobile (< 768px).

### 2. Touch Target Audit
Systematic check revealed that most icons and small buttons use `size-8` or `h-8` (32px) or `h-9`/`size-9` (36px). None meet the 44px requirement.
- **Grip Handles:** Currently 32x32px.
- **Delete Buttons:** Currently 32x32px.
- **Theme Switcher:** Toggles are 32x32px.
- **Recommendation:** Add `xl` or `touch` size to `buttonVariants` (h-11, size-11) or use larger padding/hitboxes via CSS.

### 3. CLS Verification
Current `next/image` usage in `ProfilePage` and `ProjectBlock` uses `fill` with `relative` parents that have fixed or responsive heights (`h-48`, `h-64`). This prevents layout shifts effectively.
- **Recommendation:** Maintain this pattern and verify for any new blocks.

## Decisions Made
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Bottom Sheets | `vaul` | Mobile-first, Radix-compatible, premium feel. |
| Touch Target Scale | 44px (h-11) | Accessibility standard and specific user requirement. |
| Button Refactor | Extend `button.tsx` | Ensure consistency across the app. |

## Patterns to Follow
- Use `vaul`'s `Drawer` for components that behave as `Dialog` or `Dropdown` on desktop but need to be sheets on mobile.
- Use `h-11` or `size-11` for all standalone interactive icons/buttons on mobile.

## Dependencies Identified
| Package | Version | Purpose |
|---------|---------|---------|
| `vaul` | Latest | Mobile-native bottom sheets |

## Risks
- **Vaul + Radix Dialog Conflicts**: Since `vaul` uses Radix Dialog, ensure that nesting doesn't cause focus trapping issues.
- **Visual Clutter**: 44px targets can look bulky on a clean minimalist dashboard; must use subtle padding/transparent hitboxes where possible.

## Ready for Planning
- [x] Questions answered
- [x] Approach selected
- [x] Dependencies identified
