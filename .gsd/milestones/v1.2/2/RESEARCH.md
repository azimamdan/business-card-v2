---
phase: 2
level: 1
researched_at: 2026-03-11
---

# Phase 2 Research

## Questions Investigated
1. **What client-side compression library should be used?**
2. **How is `next/image` currently configured and utilized?**
3. **What is the current image upload mechanism for profiles and blocks?**

## Findings

### Client-side Compression
`browser-image-compression` is the industry standard for this use case in Next.js apps. It natively supports constraints like `maxSizeMB` and `maxWidthOrHeight` while returning a standard `File` or `Blob` that can directly be uploaded to Supabase.

**Recommendation:** Install `browser-image-compression` and wrap existing upload functions to compress BEFORE pushing to Supabase.

### Next.js Image Config & Usage
`next/image` is already implemented effectively in the codebase! 
- `next.config.ts` has `remotePatterns` correctly mapped to `ealrcbfjlzojhzvffsfu.supabase.co`.
- `AvatarUpload`, `ProjectBlock`, and `HeroBlock` components are already utilizing `<Image fill className="object-cover" />` with appropriate `sizes`.
- Profile page correctly uses the `priority` prop for the avatar LCP.

**Recommendation:** No major config changes needed. Just ensure new block image inputs respect the `fill` pattern if any new components are added.

### Upload Mechanisms in Dashboard
Currently, **only** the `AvatarUpload` component supports uploading local image files to Supabase Storage. The block editors (`ProjectForm`, `HeroForm`) strictly accept string URLs for images.
To satisfy the requirement of "new uploads only" for block images via client-side compression, we will need to introduce an Image Upload interface to these forms instead of just relying on text inputs.

**Recommendation:** Build a generic Image Upload widget (similar to `AvatarUpload`) that compresses the file client-side and pushes it to Supabase Storage (e.g., under a `blocks/` path within the existing `avatars` bucket, or a dedicated bucket if the user prefers). Use this widget within the `ProjectForm` and `HeroForm`.

## Decisions Made
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Compression Library | `browser-image-compression` | Reliable, explicit width/size controls (800px / 200KB). |
| Image Component | Existing `next/image` | Already implemented correctly with LCP `priority` and `remotePatterns`. |
| Block Image Inputs | New File Upload Widget | Required because blocks currently only accept string URLs, and we need to process local files. |

## Patterns to Follow
- Use `<Image fill sizes="..." className="object-cover" />` for all dynamic user-generated imagery to preserve layouts.
- Always apply `priority` to the largest image above the fold (e.g., Profile Avatar or Hero Block image).

## Anti-Patterns to Avoid
- **Uploading raw files**: Do not bypass `browser-image-compression`. 
- **Raw `<img>` tags**: Do not revert to native HTML image tags.

## Dependencies Identified
| Package | Version | Purpose |
|---------|---------|---------|
| `browser-image-compression` | latest | Shrinking images on the client before Supabase upload. |

## Ready for Planning
- [x] Questions answered
- [x] Approach selected
- [x] Dependencies identified
