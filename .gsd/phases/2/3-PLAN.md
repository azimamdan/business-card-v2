---
phase: 2
plan: 3
wave: 2
---

# Plan 2.3: V-Card (.vcf) Generation API

## Objective
Implement the server-side `.vcf` file generation and download API route. When a user clicks "Add to Contacts" on a VCardBlock, the browser downloads a standards-compliant vCard file that works on iOS, Android, Gmail, and Outlook.

## Context
- .gsd/SPEC.md (success criterion: "V-Card download works perfectly on iOS and Android")
- src/components/blocks/vcard-block.tsx (created in Plan 2.1 — has download button)
- src/lib/types/database.ts (VCardData type)
- supabase/schema.sql (blocks table structure, RLS policies)

## Tasks

<task type="auto">
  <name>Create vCard generation utility</name>
  <files>
    src/lib/vcard.ts [NEW]
  </files>
  <action>
    Create a pure utility function `generateVCard(data: VCardData): string` that produces a vCard 3.0 string.

    VCard 3.0 format (chosen for maximum device compatibility over 4.0):
    ```
    BEGIN:VCARD
    VERSION:3.0
    N:{lastName};{firstName};;;
    FN:{firstName} {lastName}
    ORG:{company}
    TITLE:{title}
    TEL;TYPE=CELL:{phone}
    EMAIL:{email}
    END:VCARD
    ```

    Rules:
    - Omit fields that are empty/undefined (don't render blank lines)
    - Escape special characters in values (commas, semicolons, backslashes per RFC 6350)
    - Function is pure, no side effects, no imports beyond types
    - Export a `escapeVCardValue(value: string): string` helper for testability
    - Use `\r\n` line endings (vCard spec requirement)
  </action>
  <verify>npx tsc --noEmit</verify>
  <done>generateVCard function exists, handles optional fields, uses correct line endings and escaping</done>
</task>

<task type="auto">
  <name>Create /api/vcard/[blockId] API route</name>
  <files>
    src/app/api/vcard/[blockId]/route.ts [NEW]
  </files>
  <action>
    Create a Next.js Route Handler:

    **GET handler:**
    1. Extract `blockId` from params
    2. Create Supabase server client
    3. Fetch the block by ID: `supabase.from('blocks').select('*').eq('id', blockId).eq('type', 'vcard').single()`
    4. Verify the block's profile is published (join or separate query)
    5. If not found or not published: return `NextResponse.json({ error: 'Not found' }, { status: 404 })`
    6. Cast `block.data` to `VCardData`
    7. Call `generateVCard(data)` to get the .vcf string
    8. Return response with:
       - Body: vCard string
       - Headers:
         - `Content-Type: text/vcard; charset=utf-8`
         - `Content-Disposition: attachment; filename="{firstName}_{lastName}.vcf"`

    Security:
    - No auth required (public profiles only — RLS ensures this via "published" check)
    - Validate blockId is a valid UUID format before querying
    - Rate limiting is out of scope for MVP
  </action>
  <verify>npx tsc --noEmit; npm run build (route compiles and builds)</verify>
  <done>API route returns valid .vcf file; build passes; handles missing/invalid block IDs with 404</done>
</task>

## Success Criteria
- [ ] `generateVCard()` utility exists at `src/lib/vcard.ts`
- [ ] API route at `/api/vcard/[blockId]` returns a downloadable `.vcf` file
- [ ] vCard format is v3.0 compliant with proper escaping
- [ ] Missing/invalid block IDs return 404
- [ ] `npm run build` passes
