# [ IDCV ] Identity Canvas

> Your Digital Identity, Reimagined.

A mobile-first web app where professionals, freelancers, and developers can build a modular, customizable identity page — serving as a living resume, portfolio, and contact card — published to a unique public URL.

🌐 **Live:** [identitycanvas.netlify.app](https://identitycanvas.netlify.app)

---

## Features

- **Modular Blocks** — Build your page using Hero/Bio, V-Card, Project Card, and Markdown blocks
- **Add to Contacts** — Seamless `.vcf` download for instant contact saving on mobile
- **Dual Theme** — Dark (default) and Light mode with user-customizable accent colors
- **Live Editor** — Side-by-side desktop editor with mobile tab layout
- **Drag & Drop** — Reorder blocks with `@dnd-kit`
- **Avatar Upload** — Direct upload to Supabase Storage with client-side compression
- **Public Profile** — Shareable at `identitycanvas.netlify.app/[username]`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth & Database | Supabase (Auth, Postgres, RLS) |
| Storage | Supabase Storage |
| Animations | Framer Motion |
| Forms | react-hook-form + Zod |
| Deployment | Netlify |

---

## Project Structure

```
src/
├── app/
│   ├── [username]/       # Public profile route
│   ├── dashboard/        # Profile editor
│   ├── login/            # Auth pages
│   └── signup/
├── components/
│   └── blocks/           # HeroBlock, VCardBlock, ProjectBlock, MarkdownBlock
├── lib/
│   └── actions/          # Server Actions (profiles, blocks)
└── supabase/             # DB schema and migrations
```

---

## Milestones

| Version | Description |
|---------|-------------|
| v1.1 | Core product — Auth, Blocks, Editor, Themes, Drag & Drop |
| v1.2 | Polish — Minimalist landing page, image optimization, mobile UX |

---

## Copyright

© 2026 Azim Amdan. All rights reserved.

This project and its source code are proprietary. No part of this codebase may be used, copied, modified, or distributed without explicit written permission from the author.