<!-- BEGIN:nextjs-agent-rules -->
# ⚠️ This is NOT the Next.js you know

**Next.js 16.2.2** has breaking changes — APIs, conventions, and file structure differ from earlier versions and training data. Before writing any code:

1. **Always check the [Next.js docs](./node_modules/next/dist/docs/)** in this project — these are authoritative for this version
2. **Heed deprecation notices** — many older patterns no longer work
3. **Assume Server Components by default** — App Router uses `'use client'` only for interactive components
4. **This project also uses Sanity 5.19.0** — see [.github/copilot-instructions.md](./.github/copilot-instructions.md) for full architecture & conventions

**For any Next.js code, read the docs first.** This repo's instructions also cover TypeScript strict mode, Sanity integration, and common gotchas specific to this setup.
<!-- END:nextjs-agent-rules -->
