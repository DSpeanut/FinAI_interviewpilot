# FinAI InterviewPilot — Agent Guide

**Product**: AI-powered study companion for ML/AI and Finance interview prep.  
**Stack**: Next.js 16 + React 19 + Tailwind CSS 4 + shadcn/ui (base-nova style)
**Managed by**: Claude Code + OpenCode + Codex (multi-agent collaboration)

---

## Quick Start

```bash
# From apps/web/
npm run dev      # Start dev server on localhost:3000
npm run lint     # Run ESLint
npm run build    # Production build
```

---

## Multi-Agent Collaboration

This repository is co-managed by **Claude Code**, **OpenCode**, and **Codex**. Here's how to work effectively in this environment:

### Agent Context Files
| File | Purpose | Last Updated By |
|------|---------|-----------------|
| `CLAUDE.md` | Claude Code's context & instructions | Claude Code |
| `AGENTS.md` | OpenCode's context & instructions (this file) | OpenCode |
| *(Codex context TBD)* | Codex's context & instructions | Codex |

### Handoff Conventions
When you've completed work and another agent will continue:
1. **Update your agent's context file** with what you did and what's next
2. **Use todo comments** in code for unfinished work: `// TODO(codex): Implement error handling here`
3. **Check `content_memory.md`** before adding new wiki content (Claude's progress log)
4. **Check git status** to see what other agents have committed recently

### State Tracking
- **content_memory.md**: Tracks wiki entry progress (Claude-managed, read-only for others)
- **CLAUDE.md**: Claude's current focus and blockers
- **Git commits**: Check `git log --oneline -10` to see recent activity

### Coordination Rules
- **Don't override other agents' in-progress work** without coordination
- **Preserve existing patterns** from all agents (check git history for style decisions)
- **If you see `// TODO(<agent>):` comments**, respect the assignment unless discussed
- **Update AGENTS.md** when you discover new repo-specific gotchas

---

## Architecture

### Monorepo Structure
```
uncle-nick/
├── apps/web/           # Next.js app (this directory)
│   ├── app/           # App Router pages
│   │   ├── library/   # Knowledge Wiki (Feature 1)
│   │   ├── interview/ # Voice Interview Coach (Feature 2)
│   │   ├── sparring/  # Socratic Debate (Feature 4)
│   │   ├── dashboard/ # Progress tracking (Feature 5)
│   │   └── pipeline/  # Job Tracker (Feature 6)
│   ├── components/ui/ # shadcn components
│   ├── components/wiki/ # Wiki-specific components
│   └── lib/           # Utilities, AI providers, Supabase client
├── apps/digest/       # Daily WhatsApp digest (separate service)
└── supabase/          # DB migrations (future)
```

### Feature Status
| Feature | Status | Route |
|---------|--------|-------|
| Library (Wiki) | In Progress | `/library` |
| Interviewer | Planned | `/interview` |
| Sparring Partner | Planned | `/sparring` |
| Dashboard | Planned | `/dashboard` |
| Pipeline | Planned | `/pipeline` |

---

## Tech Stack Specifics

### Next.js 16 Breaking Changes
This is **Next.js 16**, not 14/15. Key differences:
- React 19 with new JSX transform
- Check `node_modules/next/dist/docs/` if APIs behave unexpectedly
- Use App Router conventions (this project uses `app/` directory)

### Tailwind CSS 4
- Uses `@import "tailwindcss"` instead of directives
- Theme defined in `globals.css` with `@theme inline`
- Color system: Mint/green palette (see `--primary: #10B981`)

### shadcn/ui Setup
- **Style**: `base-nova` (not default or new-york)
- **Icon library**: Lucide React
- **Aliases**: `@/components`, `@/lib/utils`
- Add components: `npx shadcn add <component>`

### Path Aliases
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

---

## Code Patterns

### Styling
```tsx
// Use cn() for conditional classes
className={cn("base-classes", condition && "conditional-class")}

// Color tokens from CSS variables
className="bg-primary text-primary-foreground"
```

### Layout Structure
- `layout.tsx`: Root layout with Plus Jakarta Sans font, TopNav
- Pages render in `<main>` with `flex-1 overflow-hidden`
- Full-height layout: `h-screen flex flex-col overflow-hidden`

### Components
- UI components in `components/ui/` (shadcn)
- Feature components in `components/<feature>/`
- Use TypeScript strictly (strict mode enabled)

---

## Content Guidelines

### Wiki Entry Format
Every knowledge entry has 6 required sections:
1. **ELI3** — Plain English, no jargon
2. **When & Why** — 2-3 bullet use cases
3. **Deep Dive** — Full explanation
4. **Watch** — YouTube embed
5. **Key Takeaways** — 5 bullet summary
6. **Interview Edge Cases** — Tradeoffs, gotchas

Plus required **Source** field before publishing.

### Content Principles (from WIKI_STRUCTURE.md)
- Cite credible sources (ESL/ISLR, PRML, arXiv, official docs)
- No blog posts as sole sources
- Verify all equations and mathematical facts
- Flag unclear concepts as `draft` — don't guess

---

## Important Files

| File | Purpose |
|------|---------|
| `PRODUCT_PLAN.md` | Full feature roadmap and architecture |
| `WIKI_STRUCTURE.md` | 10 categories, subcategories, all entries |
| `content_memory.md` | **DO NOT EDIT** — Claude's content progress log |
| `components.json` | shadcn configuration |
| `next.config.ts` | CSP headers configured for YouTube embeds |

---

## Environment & Deployment

### Environment Variables
See `.env.example` at repo root for all required vars:
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY` — Database
- `OPENROUTER_API_KEY` — Free AI tier
- `TWILIO_*` — WhatsApp digest (GitHub Actions)

### Deployment
- **Target**: Railway (monorepo hosting)
- **Trigger**: GitHub Actions on push to `apps/web/**`
- **Digest cron**: Daily at 7am via `apps/digest/run.py`

---

## AI Provider Strategy

| Feature | Default (Free) | Optional Upgrade |
|---------|---------------|------------------|
| Daily digest | OpenRouter Gemini 2.5 Flash | — |
| Interview | OpenRouter Llama 3.3 70B | Claude/GPT-4o |
| Sparring | OpenRouter Llama 3.3 70B | Claude/GPT-4o |

Provider abstraction in `lib/ai/`:
- `types.ts` — Provider interface
- `openrouter.ts`, `claude.ts`, `openai.ts` — Implementations
- `index.ts` — Provider selector

---

## Testing & Quality

```bash
npm run lint     # ESLint with Next.js rules
# No test runner configured yet
```

### Git Ignore
- `.next/`, `out/`, `node_modules/`
- `.env*` files
- `apps/web/content_memory.md` (Claude's log)

---

## Common Gotchas

1. **Next.js 16 ≠ Next.js 14** — Check docs if behavior surprises
2. **Tailwind 4 syntax** — `@import "tailwindcss"` not `@tailwind`
3. **CSP Headers** — YouTube embeds allowed via `frame-src`
4. **Monorepo** — Changes in `apps/web/` only; `apps/digest/` is separate service
5. **Wiki content** — Created via Claude Code (external), not in-app generation
6. **Entry status** — Must have source before publishing (`draft → review → published`)
