# FinAI InterviewPilot — Product & Architecture Plan

> A personal AI-powered study companion for ML/AI and Finance/Quant Finance interview prep.

---

## 1. Product Overview

| # | Feature | Nickname |
|---|---------|----------|
| 1 | Knowledge Wiki | **The Library** |
| 2 | Voice Interview Coach | **The Interviewer** |
| 3 | Daily WhatsApp Digest | **The Brief** |
| 4 | Socratic Debate Buddy | **The Sparring Partner** |
| 5 | Progress Dashboard | **The Report Card** |
| 6 | Job Application Tracker | **The Pipeline** |

---

## 2. Feature Breakdown

### 2.1 The Library — Knowledge Wiki
- Personal Wikipedia covering 10 top-level categories (see `WIKI_STRUCTURE.md`)
- Entries pre-seeded from `WIKI_STRUCTURE.md` as empty shells — content created via Claude Code (not in-app generation)
- Each entry has a difficulty tag: **Beginner / Intermediate / Advanced**
- Status lifecycle: `draft → review → published`
- Tags (many-to-many) for cross-category linking
- UI: persistent sidebar (expandable categories, multi-select subcategories) + main area (entry grid → full post page)
- Serves as the **single source of truth** for all other features
- Open source friendly — wiki browsing works without any API key

**Entry template (6 sections):**
1. **ELI3** — plain English, no jargon
2. **When & Why** — 2-3 bullet points on use cases
3. **Deep Dive** — full explanation + visualizations
4. **Watch** — embedded YouTube video (manually added)
5. **Key Takeaways** — 5 bullet summary
6. **Interview Edge Cases** — tradeoffs, gotchas, what interviewers look for
7. **Source** — required link/paper/book before publishing

### 2.2 The Interviewer — Voice Interview Coach
- Draws questions from The Library based on user-selected topics/domains/difficulty
- Session config: pick category(s), subcategory(s), difficulty, question count
- AI agent asks question → user responds via **voice (speech-to-text)**
- Agent evaluates answer, gives feedback, follows up or moves on
- Feels like a real human interviewer (conversational, not robotic)
- Session results saved to progress history
- **AI model**: user-selectable (OpenRouter free default, upgrade to Claude/OpenAI in settings)
- Usage limits (session/token-based) — designed in schema, implemented later for SaaS

**Voice flow:**
```
Agent speaks question (TTS)
  → User responds (STT → text)
    → AI evaluates + responds (TTS)
      → repeat
```

### 2.3 The Brief — Daily WhatsApp Digest
- Triggered daily via **GitHub Actions cron**
- Three content components per message:
  1. **Finance Byte** — 2 one-liner insights generated from Finance & Quant Finance subcategories not recently sent
  2. **ML/AI Byte** — 3 one-liner insights from remaining 9 categories, each from a different category, not recently sent
  3. **News Flash** — latest AI + finance/asset management headlines via Google News RSS
- AI generates insights from category + subcategory name only (no wiki content needed)
- Digest history tracked to ensure rotation and diversity across categories & subcategories
- Generated insight text saved to history for reference
- Delivered via **Twilio WhatsApp API**
- **AI model**: OpenRouter free (Gemini 2.5 Flash) — no paid API needed

### 2.4 The Sparring Partner — Deep Study Buddy
- Debate/Socratic mode: agent challenges your understanding of a concept
- User picks a topic → agent takes a position or plays devil's advocate
- Pushes back on shallow answers, asks "why", surfaces edge cases
- Distinct persona/tone from The Interviewer (more intellectual sparring, less formal Q&A)
- **AI model**: user-selectable (OpenRouter free default, upgrade to Claude/OpenAI in settings)
- Usage limits (session/token-based) — designed in schema, implemented later for SaaS

### 2.5 The Report Card — Progress Dashboard
- Tracks all activity across features 2 and 4
- Metrics:
  - Topics covered over time (heatmap)
  - Mock interview scores/feedback trends
  - Weak areas surfaced by frequency of wrong/incomplete answers
  - Streak / consistency tracking
- Visual charts: line graphs, radar chart (domain coverage), heatmap calendar
- Weekly summary view

### 2.6 The Pipeline — Job Application Tracker
- Track every job application end-to-end in one place
- Each application entry includes:
  - Company, role, team, location, job URL
  - Status (Wishlist → Applied → OA → Phone Screen → Onsite → Offer → Rejected)
  - Date applied, date of last activity
  - Notes / interview reflections per stage
  - Contacts (recruiter, hiring manager)
- Kanban board view (drag-and-drop by status) + table/list view
- Filter by status, company, domain (ML/Quant/Finance)
- Link interview sessions from **The Interviewer** to a specific application
- Reminder/follow-up flags

---

## 3. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js Frontend (Railway)                   │
│                                                                  │
│  ⚡ Token/Cost widget (top left — pulls from api_usage_log)      │
│                                                                  │
│  ┌──────────┐ ┌────────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  Library │ │Interviewer │ │Sparring  │ │Dashboard/Pipeline│ │
│  │  (Wiki)  │ │(Voice UI)  │ │ Partner  │ │  /Job Tracker    │ │
│  └────┬─────┘ └─────┬──────┘ └────┬─────┘ └────────┬─────────┘ │
└───────┼─────────────┼─────────────┼────────────────┼────────────┘
        │             │             │                │
┌───────▼─────────────▼─────────────▼────────────────▼────────────┐
│                      Next.js API Routes                           │
│     /wiki    /interview    /debate    /progress    /pipeline      │
│                                                                   │
│                   AI Provider Abstraction Layer                   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Feature → Model mapping (user-configurable in settings)    │ │
│  │                                                             │ │
│  │  Digest       → OpenRouter free (Gemini 2.5 Flash)  $0     │ │
│  │  Interview    → OpenRouter free (Llama 3.3 70B)     $0     │ │
│  │               → Claude Sonnet   [optional upgrade]  paid   │ │
│  │               → GPT-4o          [optional upgrade]  paid   │ │
│  │  Sparring     → OpenRouter free (Llama 3.3 70B)     $0     │ │
│  │               → Claude Sonnet   [optional upgrade]  paid   │ │
│  │               → GPT-4o          [optional upgrade]  paid   │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬────────────────────────────────────────┘
                           │
          ┌────────────────┼──────────────────────┐
          │                │                      │
   ┌──────▼──────┐  ┌──────▼──────┐  ┌───────────▼──────┐
   │  Supabase   │  │  Twilio     │  │  Google News RSS  │
   │  Postgres   │  │  WhatsApp   │  │  (no API key)     │
   │  + Auth     │  │             │  └──────────────────┘
   │  + RLS      │  └─────────────┘
   └─────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  GitHub Actions (Cron: daily 7am)                │
│   apps/digest/run.py                                            │
│   → read digest_history → pick categories (not recently sent)   │
│   → OpenRouter free generates insights                          │
│   → fetch Google News RSS                                       │
│   → format message → send via Twilio WhatsApp                   │
│   → log to digest_history + api_usage_log                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | **Next.js 14** (App Router) | Full-stack, file-based routing, API routes |
| Styling | **Tailwind CSS** + shadcn/ui | Fast, clean UI components |
| Database | **Supabase** (Postgres + Auth + RLS) | Scales well, multi-user ready from day one |
| AI (free) | **OpenRouter** (Llama 3.3 70B, Gemini 2.5 Flash) | Free tier, 27+ models, OpenAI-compatible |
| AI (paid, optional) | **Claude Sonnet** or **GPT-4o** | Better quality for interview/sparring if needed |
| Wiki content | **Claude Code** (manual, not in-app) | User generates content outside the app |
| Voice STT | **Web Speech API** (browser) | Zero cost, browser-native |
| Voice TTS | **Web Speech API** (browser) | Zero cost to start, ElevenLabs later if needed |
| WhatsApp | **Twilio WhatsApp API** | Reliable, easy sandbox for dev |
| News | **Google News RSS** | Free, no API key needed |
| Scheduler | **GitHub Actions** (cron) | Free, no infra needed |
| Charts | **Recharts** or **Tremor** | React-native, good defaults |
| Hosting | **Railway** (monorepo) | No timeout limits, easy scaling |

---

## 5. Data Model

```sql
-- Auth (managed by Supabase)
users
  id, email, created_at

-- Wiki
categories
  id, name, slug, order

subcategories
  id, category_id, name, slug, order

tags
  id, name, slug

wiki_entries
  id, user_id, subcategory_id
  title, slug
  difficulty     (enum: beginner/intermediate/advanced)
  status         (enum: draft/review/published)
  eli3           text
  when_and_why   text
  deep_dive      text
  key_takeaways  text
  edge_cases     text
  youtube_url    text
  source         text    -- required before publish
  created_at, updated_at

wiki_entry_tags
  entry_id, tag_id

-- Digest
digest_history
  id, user_id
  sent_at
  category_id, subcategory_id
  component          (enum: finance_byte/ml_ai_byte/news)
  generated_insight  text

-- API Usage & Cost Tracking
api_usage_log
  id, user_id
  feature    (enum: digest/interview/sparring)
  provider   (enum: openrouter/claude/openai)
  model      text
  input_tokens, output_tokens
  cost_usd
  created_at

-- Interview (future)
interview_sessions
  id, user_id, categories[], difficulty
  model_used
  started_at, ended_at, score, feedback_json

interview_messages
  id, session_id, role (enum: agent/user), content, timestamp

-- Debate (future)
debate_sessions
  id, user_id, topic
  model_used
  started_at, ended_at, notes

-- Usage Limits (future — for SaaS billing)
usage_tracking
  id, user_id, month
  interview_sessions_used
  sparring_sessions_used
  tokens_consumed

-- Progress (future)
progress_snapshots
  id, user_id, date, domains_covered[], weak_areas[], streak

-- Job Tracker (future)
job_applications
  id, user_id, company, role, team, location, job_url
  status  (enum: wishlist/applied/oa/phone_screen/onsite/offer/rejected)
  applied_at, last_activity_at, follow_up_by
  notes, contacts_json, domain

application_interview_links
  id, application_id, interview_session_id
```

---

## 6. Repo Structure

```
uncle-nick/
├── apps/
│   ├── web/                          # Next.js 14 app
│   │   ├── app/
│   │   │   ├── library/              # Feature 1: Wiki
│   │   │   ├── interview/            # Feature 2: Voice interview
│   │   │   ├── sparring/             # Feature 4: Debate buddy
│   │   │   ├── dashboard/            # Feature 5: Progress
│   │   │   └── pipeline/             # Feature 6: Job tracker
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn/ui base components
│   │   │   ├── wiki/                 # Wiki-specific components
│   │   │   └── cost-widget/          # Token/cost display (top left)
│   │   └── lib/
│   │       ├── ai/
│   │       │   ├── types.ts          # AIProvider interface
│   │       │   ├── openrouter.ts     # OpenRouter implementation
│   │       │   ├── claude.ts         # Claude implementation
│   │       │   ├── openai.ts         # OpenAI implementation
│   │       │   └── index.ts          # Provider selector
│   │       ├── supabase.ts           # Supabase client
│   │       └── voice.ts              # STT/TTS helpers
│   └── digest/                       # Daily digest service
│       ├── run.py                    # Entry point
│       ├── news_fetcher.py           # Google News RSS
│       ├── insight_generator.py      # OpenRouter insight generation
│       └── whatsapp_sender.py        # Twilio sender
├── supabase/
│   └── migrations/                   # Centralized schema versioning
├── .github/
│   └── workflows/
│       ├── deploy.yml                # Railway deploy (watches apps/web/**)
│       └── daily_digest.yml          # Cron trigger (watches apps/digest/**)
├── .env.example                      # All required env vars with placeholders
└── PRODUCT_PLAN.md
```

---

## 7. Build Order

| Phase | What to build |
|-------|--------------|
| 1 | Supabase setup + schema migrations + seed categories/subcategories |
| 2 | Wiki UI — sidebar, entry grid, full entry page (read-only first) |
| 3 | Daily digest — GitHub Actions + OpenRouter + Twilio |
| 4 | Interview Coach (text first, then voice) |
| 5 | Progress Dashboard |
| 6 | Sparring Partner |
| 7 | Job Application Tracker |

---

## 8. AI Model Strategy

| Feature | Default (Free) | Optional Upgrade (Paid) |
|---------|---------------|------------------------|
| Daily digest | OpenRouter — Gemini 2.5 Flash | — |
| Interview Coach | OpenRouter — Llama 3.3 70B | Claude Sonnet / GPT-4o |
| Sparring Partner | OpenRouter — Llama 3.3 70B | Claude Sonnet / GPT-4o |
| Wiki content | Claude Code (external, not in-app) | — |

- Model selection is **user-configurable in settings** per feature
- API keys are **optional** — app works without them (free tier default)
- If no key provided, OpenRouter free models are used automatically

---

## 9. Decisions Log

| Decision | Choice |
|----------|--------|
| Hosting | Railway (monorepo) |
| Repo structure | Monorepo — `apps/web` + `apps/digest` |
| Auth | Supabase Auth + RLS, `user_id` scoped from day one |
| Users | Single user now, multi-user ready (open source + optional SaaS) |
| Wiki content creation | Claude Code (external) — no in-app AI generation |
| Entry format | 6 structured sections + source (required to publish) |
| Entry status | draft → review → published |
| Difficulty | Beginner / Intermediate / Advanced |
| Versioning | None — concepts don't change often |
| Tags | Yes — many-to-many for cross-category linking |
| Categories | Stored in DB, seeded from WIKI_STRUCTURE.md |
| UI layout | Sidebar (multi-select) + main area (entry grid → full post) |
| Digest components | Finance Byte (2) + ML/AI Byte (3) + News Flash |
| Digest AI | OpenRouter free — generates from category/subcategory name only |
| Digest rotation | `digest_history` tracks category + subcategory + generated insight |
| News source | Google News RSS (free, no API key) |
| WhatsApp | Twilio WhatsApp API |
| AI providers | OpenRouter (free default) + Claude + OpenAI (optional paid) |
| Model selection | User-configurable per feature in settings |
| Cost tracking | `api_usage_log` table → token widget top left of UI |
| Usage limits | Schema designed now (`usage_tracking`), implemented later for SaaS |
| Open source | Yes — bring your own keys, works fully on free tier |
