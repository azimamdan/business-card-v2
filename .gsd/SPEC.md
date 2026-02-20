# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
Build a "Digital Identity Canvas": a mobile-friendly web app where professionals, freelancers, and developers can create a modular, highly customizable identity page that serves as a living resume, portfolio, and contact card, published to a unique public slug (`/[username]`).

## Goals
1. **Modular Identity**: Enable users to build their page using "Blocks" (Hero/Bio, V-Card, Project Card, Markdown).
2. **"Add to Contacts" Utility**: Provide a seamless `.vcf` download feature for instant contact saving on mobile.
3. **Premium UX/Aesthetics**: Implement a "Linear-style" Dark Mode default with user-customizable accent colors for high-end visual flair.
4. **Time-to-Value**: Enable sign-up to live-page in under 2 minutes.
5. **Dynamic Presence**: Support project showcasing (GitHub/Portfolios) and markdown-based storytelling.

## Non-Goals (Out of Scope for MVP)
- Multi-user team organizational accounts.
- Advanced analytics dashboard (simple view counts only).
- Custom domain mapping (handled via /[username] for now).
- Payments/E-commerce blocks.

## Users
- **Individual Professionals**: Looking for a polished, modern alternative to Linktree.
- **Freelancers**: Needing a quick, premium portfolio/contact page.
- **Developers/SaaS Founders**: Wanting to showcase GitHub projects and professional milestones with a modern tech aesthetic.

## Constraints
- **Framework**: Next.js (App Router).
- **Styling**: Tailwind CSS + shadcn/ui.
- **Auth & Database**: Supabase (Auth, Postgres, RLS).
- **Mobile First**: All UI components must be perfectly optimized for mobile touch and small screens.

## Success Criteria
- [ ] Users can register and publish a profile in < 2 minutes.
- [ ] V-Card download works perfectly on iOS and Android.
- [ ] Profile pages load fast and hit a "premium" aesthetic bar (90+ Lighthouse performance).
- [ ] `/[username]` routing works dynamically without collisions.
