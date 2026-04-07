# AI Workspace Instructions: Bruglii Studio

## Project Overview

**Bruglii Studio** is an integrated Next.js + Sanity CMS application combining a modern web frontend with an embedded content management studio. The architecture is a single codebase with co-located frontend, API routes, and Sanity Studio.

### Stack
- **Frontend**: Next.js 16.2.2 (App Router) + React 19.2.4 with TypeScript (strict)
- **CMS**: Sanity 5.19.0 with `next-sanity` 12.2.1 integration
- **Styling**: Tailwind CSS 4 + PostCSS 4, styled-components 6 (optional)
- **UI**: lucide-react icons, framer-motion animations
- **Tooling**: ESLint 9, TypeScript 5 (strict mode enabled)

## Quick Start

### Prerequisites & Setup
```bash
# Environment variables (create .env.local if missing)
NEXT_PUBLIC_SANITY_PROJECT_ID=tvtp5ubl
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-03  # Default matches sanity/env.ts

# Install dependencies
npm install

# Start dev server
npm run dev
```

Access:
- **Frontend**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

### Essential Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production server
npm run lint       # Run ESLint (with strict configs)
```

## Architecture & File Structure

### Core Folders
```
app/                          # Next.js App Router (pages, layouts, API routes)
├── layout.tsx              # Root layout with Geist fonts, Tailwind setup
├── page.tsx                # Home page
├── globals.css             # Global styles + Tailwind imports
├── studio/[[...tool]]/     # Sanity Studio route (dynamic catch-all)
└── bruglii/[[...tool]]/ # Duplicate Studio route (⚠️ clarify which is authoritative)

sanity/                       # Sanity CMS content & configuration
├── env.ts                  # Environment variable setup + API versioning
├── structure.ts            # Sanity Studio structure/sidebar config
├── lib/
│   ├── client.ts          # Sanity client (CDN-enabled by default)
│   ├── image.ts           # @sanity/image-url integration
│   └── live.ts            # Live Preview helper (if configured)
├── schemaTypes/
│   ├── index.ts           # Schema registry (export all types here)
│   └── painting.ts        # Example document type: paintings with title, slug, image

frontend/                    # ⚠️ **Orphaned/unused Vite app** — clarify purpose or remove
public/                      # Static assets served by Next.js
```

### Key Configuration Files
- **sanity.config.ts**: Sanity Studio config (basePath: `/studio`, projectId, dataset)
- **next.config.ts**: Next.js configuration (currently empty)
- **tsconfig.json**: TypeScript strict mode enabled
- **eslint.config.mjs**: ESLint rules (Next.js standard)
- **postcss.config.mjs**: Tailwind CSS 4 processing

## Development Conventions

### TypeScript & Type Safety
- **Strict mode enabled globally** — all files are subject to strict type checking
- Use `as const` for typed literals; avoid `any` without clear justification
- Example: When fetching Sanity documents, type responses explicitly:
  ```typescript
  import { client } from '@/sanity/lib/client'
  
  interface Painting {
    _id: string
    title: string
    slug: { current: string }
  }
  
  const painting = await client.fetch<Painting>(
    `*[_type == "painting" && slug.current == $slug][0]`,
    { slug }
  )
  ```

### Server Components by Default
- Next.js App Router uses **Server Components by default** in Next.js 16
- Use `'use client'` directive only for interactive components
- Keep data fetching on the server; pass data to client components as props
- Example from `sanity.config.ts`: Already has `'use client'` for Studio embedding

### Styling
- **Primary**: Tailwind CSS 4 — utility-first approach
- **Secondary**: `styled-components` for complex component styles (if needed)
- Import Tailwind in `globals.css`:
  ```css
  @import "tailwindcss";
  ```
- Root layout applies Geist fonts with CSS variables: `--font-geist-sans`, `--font-geist-mono`

### Sanity Schema Pattern
- Use `defineType()` + `defineField()` (modern Sanity v5 approach)
- Register all schemas in `sanity/schemaTypes/index.ts`:
  ```typescript
  import { painting } from './painting'
  
  export const schema = {
    types: [painting],
  }
  ```
- Example schema reference: [sanity/schemaTypes/painting.ts](../../sanity/schemaTypes/painting.ts)

### Sanity Client Usage
- Centralized client in [sanity/lib/client.ts](../../sanity/lib/client.ts) with `useCdn: true`
- For static generation: Set `useCdn: false` if building static pages or using ISR
- Import: `import { client } from '@/sanity/lib/client'`
- Query using GROQ: `client.fetch<T>(groqQuery, params)`

## Important Implementation Details

### Environment Variables
Located in [sanity/env.ts](../../sanity/env.ts) with fallbacks:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: **tvtp5ubl** (live project ID)
- `NEXT_PUBLIC_SANITY_DATASET`: **production** (required)
- `NEXT_PUBLIC_SANITY_API_VERSION`: Defaults to `2026-04-03` (current date)

These **must** be set in `.env.local` before development. They are prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

### API Versioning
The API version is set to **2026-04-03** (see `sanity/env.ts`). This must match your Sanity API expectations. Before writing queries, verify:
1. The configured API version in `sanity/env.ts`
2. That your Sanity schemas are compatible with this version

## Known Issues & Gotchas

### ⚠️ Active Issues
1. **Duplicate Studio Routes**: Both `/app/studio` and `/app/bruglii` reference the same Studio page
   - **Action**: Consolidate to a single route; recommend `/studio`
   - **Why**: Confusion about which route is "live"; potential for divergent configurations

2. **Orphaned /frontend Folder**: A Vite app exists but isn't part of the build
   - **Action**: Clarify if this is a backup/reference, or remove if unused
   - **Why**: Confusion during project onboarding; complicates CI/CD

3. **Next.js 16+ Breaking Changes**: Per [AGENTS.md](../AGENTS.md)
   - **Action**: Before writing Next.js code, read [Next.js docs in node_modules](node_modules/next/dist/docs/)
   - **Why**: This version has API changes; training data may be outdated

4. **Default Metadata Unchanged**: Root layout still has placeholder "Create Next App" title
   - **Action**: Update [app/layout.tsx](../../app/layout.tsx) metadata
   - **Why**: Site will show generic title until fixed

### Potential Pitfalls for Developers
- **CDN-based queries**: `useCdn: true` caches responses. For fresh writes, temporarily set to `false` or purge cache
- **Reference integrity**: Sanity enforces references; cannot delete a document if it's referenced elsewhere
- **Path aliases**: Project uses `@/*` → root. Be cautious of import conflicts; consider scoping further (`@/app/*`, `@/sanity/*`)
- **Admin routes**: Any `/api/*` routes should be protected; current config lacks auth scaffolding

## Common Tasks

### Adding a New Content Type
1. Create a file in `sanity/schemaTypes/`:
   ```typescript
   import { defineType, defineField } from 'sanity'
   
   export const article = defineType({
     name: 'article',
     type: 'document',
     fields: [
       defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
       // ... more fields
     ],
   })
   ```
2. Register in `sanity/schemaTypes/index.ts`:
   ```typescript
   import { article } from './article'
   export const schema = { types: [painting, article] }
   ```
3. Deploy schema: `npx sanity@latest schema deploy` (if using cloud-only) or restart dev server

### Fetching Sanity Data in a Next.js Page
```typescript
// app/paintings/page.tsx
import { client } from '@/sanity/lib/client'

export default async function PaintingsPage() {
  const paintings = await client.fetch(
    `*[_type == "painting"] | order(_createdAt desc) { _id, title, slug, image }`
  )
  
  return <div>{/* render paintings */}</div>
}
```

### Querying with GROQ Parameters
```typescript
const painting = await client.fetch(
  `*[_type == "painting" && slug.current == $slug][0]`,
  { slug: 'my-painting' }
)
```

### Debugging Queries
1. Use Sanity Vision: Visit http://localhost:3000/studio and use the Vision tool
2. Or use `npx sanity@latest query` to run GROQ in CLI
3. Check schema in `sanity/structure.ts` for available fields

## External Documentation

- **[Sanity Docs](https://www.sanity.io/docs)** — Latest reference for schemas, queries, APIs
- **[Next.js Documentation](https://nextjs.org/docs)** — App Router, data fetching, deployment
- **[next-sanity](https://www.npmjs.com/package/next-sanity)** — Integration library reference
- **[Tailwind CSS 4](https://tailwindcss.com/docs)** — New @import style in globals.css
- **[GROQ Reference](https://www.sanity.io/docs/groq)** — Query language

## Questions or Additions?

This document is a living reference. As new conventions or issues emerge, update this file or contact the team. Key areas to expand:
- Authentication/authorization strategy (if needed)
- Deployment & CI/CD pipeline
- Image optimization strategy (Sanity image URLs + Next.js Image component)
- Caching and revalidation strategy
