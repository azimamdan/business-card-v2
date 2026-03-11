---
phase: 3
plan: 2
wave: 2
---

# Plan 3.2: Public Profile && Landing Page Touch Targets

## Objective
Audit and fix touch targets across the public-facing pages to meet the minimum 44x44px rule. Ensure that `next/image` usage has absolute zero Layout Shift (CLS) on mobile viewports.

## Context
- .gsd/SPEC.md
- src/components/ui/theme-switcher.tsx
- src/components/blocks/vcard-block.tsx
- src/app/[username]/page.tsx
- src/app/page.tsx

## Tasks

<task type="auto">
  <name>Theme Switcher & V-Card Target Compliance</name>
  <files>src/components/ui/theme-switcher.tsx, src/components/blocks/vcard-block.tsx</files>
  <action>
    - Ensure `theme-switcher.tsx` on both `default` and `compact` variants has buttons rendering at `w-11 h-11` (or equivalent padding) to hit the 44px box.
    - Check the `vcard-block.tsx` anchor tags (Email and Phone buttons) to ensure their minimal height visually or effectively spans 44px.
  </action>
  <verify>npm run lint</verify>
  <done>Theme toggles and vCard contact buttons pass 44x44px target sizes.</done>
</task>

<task type="auto">
  <name>Landing Page Target Audit</name>
  <files>src/app/page.tsx</files>
  <action>
    - Verify and correct the "Log in" and "Already have an account?" link at the bottom of the Landing Page Hero. Adding padding (`py-2`, `px-4`) can expand the clickable zone without breaking the visual flow.
    - Make sure the main `Get Started` button uses `h-12` or similar (which is > 44px).
  </action>
  <verify>npm run build</verify>
  <done>Landing Page link targets meet the 44px threshold.</done>
</task>

<task type="checkpoint:human-verify">
  <name>Zero CLS Verification</name>
  <files>src/app/[username]/page.tsx, src/components/blocks/project-block.tsx</files>
  <action>
    - Manually review the public profile on a mobile emulator. 
    - Check that the `next/image` setup for Profile Avatars and Project Block thumbnails does not suffer from Layout Shifts while images defer-load. Ensure parent containers are explicitly sizing the space.
  </action>
  <verify>Visual layout test</verify>
  <done>Zero CLS observed on image load.</done>
</task>

## Success Criteria
- [ ] Theme Switcher buttons measure >= 44x44px bounding box.
- [ ] Public Page touch targets meet minimum accessible sizes.
- [ ] No image pop-in layout shifts on slow connections.
