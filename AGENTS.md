<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SmartBasket — Agent Environment Context

Before generating any code, strictly follow the rules defined in `04_AI_PROMPT_GUIDELINE.md`.

## Key Rules:

1. Stack: React (Functional Components) + Tailwind CSS + Lucide Icons.
2. Layout: Mobile-first centered web container (`max-w-[430px] mx-auto min-h-screen bg-slate-50`).
3. Design Tokens: Strictly use color tokens and typography scale from `02_DESIGN_SYSTEM.md`.
4. States: Every component must explicitly export `Default`, `Loading`, `Error`, and `Empty` state variations.
5. DOM & Flexbox: Use explicit Flexbox (`flex flex-col`, `gap-*`) to ensure clean HTML to Figma conversion (Auto Layout ready).
