---
phase: 6
plan: 6
wave: 4
---

# Plan 6.6: SEO Metadata & Final Polish

## Objective
Update all metadata (titles, descriptions, OG tags) to reference IDCV branding and idcv.me canonical URLs.

## Context
- .gsd/DECISIONS.md (Phase 6 — SEO canonical idcv.me)
- src/app/layout.tsx
- src/app/[username]/page.tsx

## Tasks

<task type="auto">
  <name>Update root metadata and OG tags</name>
  <files>src/app/layout.tsx</files>
  <action>
    Update the `metadata` export:
    - title: "IDCV — Your Modular Identity Canvas"
    - description: "Build your professional identity with modular blocks. IDCV is the source of truth for builders and professionals."
    - Add `metadataBase: new URL("https://idcv.me")`
    - Add `openGraph` object:
      - title: "IDCV — Your Modular Identity Canvas"
      - description: same as above
      - url: "https://idcv.me"
      - siteName: "IDCV"
      - type: "website"
    - Add `twitter` card metadata:
      - card: "summary_large_image"
      - title and description matching OG
  </action>
  <verify>View page source on root — meta tags contain "IDCV" and "idcv.me"</verify>
  <done>Root metadata references IDCV branding and idcv.me origin</done>
</task>

<task type="auto">
  <name>Update dynamic profile metadata</name>
  <files>src/app/[username]/page.tsx</files>
  <action>
    Update `generateMetadata`:
    - Change title from `${name} | Canvas` to `${name} | IDCV`
    - Add `alternates.canonical`: `https://idcv.me/${username}`
    - Add `openGraph`:
      - title: `${name} | IDCV`
      - description: profile.bio
      - url: `https://idcv.me/${username}`
      - type: "profile"
  </action>
  <verify>Navigate to a user profile, view source — title contains "IDCV", canonical URL points to idcv.me</verify>
  <done>Profile pages have correct IDCV metadata with canonical idcv.me URLs</done>
</task>

<task type="checkpoint:human-verify">
  <name>Visual verification of all three themes</name>
  <files>N/A</files>
  <action>
    Present screenshots or ask user to verify:
    1. Landing page in Dark / Light / Sepia
    2. Dashboard in Dark / Light / Sepia
    3. Public profile in Dark / Light / Sepia
    4. Verify theme switcher works in both locations
    5. Verify skeleton loader respects theme
  </action>
  <verify>User confirms all themes render correctly</verify>
  <done>User approves visual output of all three themes</done>
</task>

## Success Criteria
- [ ] Root metadata contains "IDCV" in title/description
- [ ] OG tags reference idcv.me
- [ ] Profile metadata uses "| IDCV" suffix
- [ ] Canonical URLs point to idcv.me
- [ ] All three themes visually verified
- [ ] `npm run build` passes
