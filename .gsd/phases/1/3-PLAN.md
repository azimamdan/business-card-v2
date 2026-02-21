---
phase: 1
plan: 3
wave: 2
---

# Plan 1.3: Auth Plumbing & Middleware

## Objective
Implement Supabase Auth flow (sign-up, login, sign-out) with Next.js middleware for protected route enforcement. This depends on Wave 1 (Next.js scaffold + Supabase client).

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md (Auth in Phase 1, Supabase Auth)
- src/lib/supabase/client.ts (from Plan 1.2)
- src/lib/supabase/server.ts (from Plan 1.2)

## Tasks

<task type="auto">
  <name>Create auth middleware for route protection</name>
  <files>
    - src/middleware.ts (create)
    - src/lib/supabase/middleware.ts (create — middleware-specific Supabase client)
  </files>
  <action>
    1. Create `src/lib/supabase/middleware.ts`: Export a function `updateSession(request)` that creates a Supabase client using `createServerClient` from `@supabase/ssr` with cookie handling appropriate for Next.js middleware (using `request.cookies` and `response.cookies`). This function must call `supabase.auth.getUser()` to refresh the session.
    2. Create `src/middleware.ts`:
       - Import `updateSession` from `src/lib/supabase/middleware.ts`.
       - Call `updateSession` to refresh the auth cookie on every request.
       - Check if user is authenticated. If not, and route is in protected list, redirect to `/login`.
       - Protected routes: `/dashboard`, `/dashboard/*`.
       - Public routes: `/`, `/login`, `/signup`, `/api/*`, and `/[username]` dynamic routes.
       - Use `config.matcher` to exclude static assets and `_next` paths.
    
    AVOID: Do NOT use `getSession()` in middleware — it reads from cookies and can be spoofed. Always use `getUser()` which validates against the Supabase Auth server.
  </action>
  <verify>npm run build (middleware should compile)</verify>
  <done>Middleware protects /dashboard routes, redirects unauthenticated users to /login</done>
</task>

<task type="auto">
  <name>Create login and signup pages</name>
  <files>
    - src/app/login/page.tsx (create)
    - src/app/signup/page.tsx (create)
    - src/app/(auth)/layout.tsx (create — shared auth layout, optional)
  </files>
  <action>
    1. Create `src/app/login/page.tsx`:
       - Centered card using shadcn Card, Input, Button, Label.
       - Email + Password fields.
       - Submit calls `supabase.auth.signInWithPassword()`.
       - On success, redirect to `/dashboard`.
       - On error, display error message with subtle shake animation.
       - "Don't have an account? Sign up" link to `/signup`.
       - Dark slate aesthetic: card on slate-950 bg, subtle border glow using accent color.
    
    2. Create `src/app/signup/page.tsx`:
       - Same card aesthetic as login.
       - Email + Password + Confirm Password fields.
       - Submit calls `supabase.auth.signUp()`.
       - After signup, prompt user to check email for verification (or auto-redirect if email confirmation is disabled).
       - Username/slug field: validate against reserved slugs list (`admin`, `login`, `signup`, `api`, `dashboard`, `settings`).
       - On successful signup, create an entry in the `profiles` table (use a Supabase DB trigger or immediate insert after signup).
       - "Already have an account? Log in" link to `/login`.
    
    3. Both pages should be client components (`"use client"`) since they use browser-side Supabase auth.
    
    AVOID: Do NOT use server actions for the auth flow — Supabase JS client handles this client-side. Server actions can be used for the profile creation after signup.
  </action>
  <verify>npm run build (pages should compile without errors)</verify>
  <done>Login and signup pages functional with dark mode styling and slug validation</done>
</task>

## Success Criteria
- [ ] Unauthenticated users are redirected from `/dashboard` to `/login`
- [ ] Login form authenticates against Supabase Auth
- [ ] Signup form creates user + profile with validated slug
- [ ] Reserved slugs are rejected during signup
